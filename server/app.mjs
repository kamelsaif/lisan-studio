import express from 'express';
import multer from 'multer';
import axios from 'axios';
import FormData from 'form-data';
import ffmpegPath from 'ffmpeg-static';
import ffprobePackage from '@ffprobe-installer/ffprobe';
import { createReadStream } from 'node:fs';
import { mkdir, readFile, writeFile, rename, readdir, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';
import { spawn } from 'node:child_process';
import { pipeline } from 'node:stream/promises';


const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
export const MAX_BYTES = 3 * 1024 ** 3;
const allowedExtensions = new Set(['.mp4', '.mov', '.webm', '.mkv', '.m4v', '.avi']);
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export class StudioError extends Error {
  constructor(message, status = 400) { super(message); this.status = status; }
}

export function toSrt(segments, translated = true) {
  const timestamp = seconds => {
    const ms = Math.max(0, Math.round(Number(seconds || 0) * 1000));
    const h = Math.floor(ms / 3600000);
    const m = Math.floor(ms / 60000) % 60;
    const s = Math.floor(ms / 1000) % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')},${String(ms % 1000).padStart(3, '0')}`;
  };
  return segments.filter(s => translated ? s.translation : s.text || s.source_text).map((s, i) =>
    `${i + 1}\n${timestamp(s.start_s)} --> ${timestamp(s.end_s)}\n${String(translated ? s.translation : s.text || s.source_text).replace(/\r/g, '')}\n`
  ).join('\n');
}

function runMedia(binary, args, timeout = 30_000) {
  return new Promise((resolve, reject) => {
    const child = spawn(binary, args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let out = '', err = '';
    const timer = setTimeout(() => { child.kill('SIGKILL'); reject(new StudioError('Video processing took too long. Please try a smaller file.', 422)); }, timeout);
    child.stdout.on('data', chunk => { if (out.length < 2_000_000) out += chunk; });
    child.stderr.on('data', chunk => { err = (err + chunk).slice(-10000); });
    child.on('error', () => { clearTimeout(timer); reject(new StudioError('The video tools could not start. Relaunch the app.', 500)); });
    child.on('close', code => {
      clearTimeout(timer);
      if (code === 0) resolve(out);
      else {
        const error = new StudioError('This video could not be read or exported. Try an MP4 with a spoken audio track.', 422);
        error.mediaDiagnostic = err || `Video tool exited with code ${code}.`;
        reject(error);
      }
    });
  });
}

export async function probeVideo(file) {
  const info = JSON.parse(await runMedia(ffprobePackage.path, ['-v', 'error', '-show_format', '-show_streams', '-of', 'json', file]));
  const video = info.streams.find(s => s.codec_type === 'video');
  const audio = info.streams.find(s => s.codec_type === 'audio');
  if (!video) throw new StudioError('Please upload a video file.', 422);
  if (!audio) throw new StudioError('This video has no audio track to dub. Choose a video with English speech.', 422);
  const duration = Number(info.format.duration || video.duration);
  if (!Number.isFinite(duration) || duration <= 0) throw new StudioError('The video duration could not be read.', 422);
  return { duration, width: video.width, height: video.height, codec: video.codec_name };
}

export async function muxVideo(source, audio, destination, media) {
  const copy = media.codec === 'h264';
  const args = ['-y', '-hide_banner', '-loglevel', 'error', '-i', source, '-i', audio,
    '-map', '0:v:0', '-map', '1:a:0', '-c:v', copy ? 'copy' : 'libx264'];
  if (!copy) args.push('-preset', 'fast', '-crf', '20', '-pix_fmt', 'yuv420p', '-vf', 'pad=ceil(iw/2)*2:ceil(ih/2)*2');
  args.push('-c:a', 'aac', '-b:a', '192k', '-af', 'apad', '-t', String(media.duration),
    '-metadata:s:a:0', 'language=ara', '-movflags', '+faststart', '-f', 'mp4', destination);
  await runMedia(ffmpegPath, args, 2 * 60 * 60 * 1000);
}

export async function createStudio(options = {}) {
  const app = express();
  const dataDir = options.dataDir || path.join(root, 'data');
  const jobsDir = path.join(dataDir, 'jobs');
  const uploadDir = path.join(dataDir, 'uploads');
  const apiBase = options.apiBase || 'https://api.elevenlabs.io';
  const pollMs = options.pollMs || 10_000;
  const jobs = new Map(), running = new Map(), reservations = new Map();
  let apiKey = options.apiKey || process.env.ELEVENLABS_API_KEY || '';
  let connected = false;
  await mkdir(jobsDir, { recursive: true, mode: 0o700 });
  await mkdir(uploadDir, { recursive: true, mode: 0o700 });
  if (!apiKey) {
    try { apiKey = JSON.parse(await readFile(path.join(dataDir, 'connection.json'), 'utf8')).apiKey || ''; } catch {}
  }
  for (const name of await readdir(jobsDir)) {
    if (!/^[a-f0-9-]{36}$/.test(name)) continue;
    try {
      const job = JSON.parse(await readFile(path.join(jobsDir, name, 'job.json'), 'utf8'));
      if (!['completed', 'failed', 'needs_review'].includes(job.status)) {
        job.status = job.projectId ? 'paused' : 'needs_review';
        job.error = job.projectId ? 'Reconnect and resume to check the existing dub.' : 'The upload was interrupted. Check ElevenLabs for an existing project before starting again; the request may already have used credits.';
      }
      jobs.set(job.id, job);
    } catch {}
  }

  const safeMessage = error => {
    if (error instanceof StudioError) return error.message;
    const status = error.response?.status;
    if (status === 401) return 'Your ElevenLabs API key was rejected. Reconnect with a valid key.';
    if (status === 403) return 'Your ElevenLabs key or plan does not allow this action. Check its Dubbing permissions and account plan.';
    if (status === 402) return 'ElevenLabs needs more credits or a different plan to complete this dub.';
    if (status === 429) return 'ElevenLabs is busy or your account has reached its limit. Wait, then resume the existing job.';
    if (status === 422) return 'ElevenLabs could not accept this video or dubbing setting. Check the file and your account.';
    if (error.code === 'ENOSPC') return 'This Mac needs more free disk space for the video.';
    return 'The connection or processing was interrupted. Resume the existing job when your connection is ready.';
  };
  const api = (key, method, endpoint, extra = {}) => axios({
    method, url: apiBase + endpoint, headers: { 'xi-api-key': key, ...(extra.headers || {}) },
    timeout: 60_000, maxRedirects: 0, maxBodyLength: Infinity, maxContentLength: Infinity, ...extra
  }).then(r => r.data);
  const persist = async job => {
    job.updatedAt = new Date().toISOString();
    const dir = path.join(jobsDir, job.id);
    await mkdir(dir, { recursive: true, mode: 0o700 });
    const temp = path.join(dir, `job-${randomUUID()}.tmp`);
    await writeFile(temp, JSON.stringify(job, null, 2), { mode: 0o600 });
    await rename(temp, path.join(dir, 'job.json'));
  };
  const view = job => ({
    id: job.id, name: job.name, filename: job.filename, status: job.status, media: job.media,
    createdAt: job.createdAt, updatedAt: job.updatedAt, error: job.error || null,
    warnings: job.warnings || [], hasAudio: !!job.hasAudio, hasVideo: !!job.hasVideo,
    hasSubtitles: !!job.hasSubtitles, transcript: job.transcript || [], projectId: job.projectId || null
  });

  const processJob = async (job, key) => {
    const dir = path.join(jobsDir, job.id);
    try {
      job.error = null;
      if (!job.projectId) {
        job.status = 'uploading';
        await persist(job);
        const form = new FormData();
        form.append('file', createReadStream(path.join(dir, 'source')), { filename: job.filename });
        form.append('source_language', 'en');
        form.append('target_language', 'ar');
        form.append('model_id', 'dubbing_v2');
        form.append('reference', job.name);
        for (const term of job.keyterms) form.append('keyterms', term);
        const project = await api(key, 'POST', '/v1/dubbing/project', {
          data: form, headers: { 'xi-api-key': key, ...form.getHeaders() }, timeout: 30 * 60_000
        });
        job.projectId = project.project_id;
        job.languageId = project.language_ids?.[0] || null;
        if (!job.projectId) throw new StudioError('ElevenLabs did not return a project ID. Check your account before starting another dub.', 502);
        await persist(job);
      }
      const deadline = Date.now() + 24 * 60 * 60 * 1000;
      while (Date.now() < deadline) {
        const project = await api(key, 'GET', `/v1/dubbing/project/${encodeURIComponent(job.projectId)}`);
        if (project.status === 'failed') throw new StudioError('ElevenLabs could not prepare this video. Check its audio and file format.', 422);
        job.warnings = (project.warnings || []).map(w => w.message || w.type).filter(Boolean);
        if (project.status !== 'ready') { job.status = 'preparing'; await persist(job); await delay(pollMs); continue; }
        if (!job.languageId) {
          const result = await api(key, 'GET', `/v1/dubbing/project/${encodeURIComponent(job.projectId)}/language`);
          const language = result.languages?.find(l => l.target_language === 'ar');
          if (!language) throw new StudioError('The Arabic target is missing. Check the existing project in ElevenLabs before retrying.', 502);
          job.languageId = language.language_id;
          await persist(job);
        }
        const languagePath = `/v1/dubbing/project/${encodeURIComponent(job.projectId)}/language/${encodeURIComponent(job.languageId)}`;
        const language = await api(key, 'GET', languagePath);
        if (language.status === 'failed') throw new StudioError('ElevenLabs could not generate the Arabic dub. Check the existing project in your account.', 422);
        if (language.status === 'stale') throw new StudioError('This dub changed in ElevenLabs. Regenerate it there before resuming the download.', 409);
        if (language.status !== 'completed') { job.status = 'dubbing'; await persist(job); await delay(pollMs); continue; }
        job.warnings.push(...(language.warnings || []).map(w => w.message || w.type).filter(Boolean));
        job.status = 'exporting'; await persist(job);
        if (!job.hasAudio) {
          const url = language.outputs?.lossless_audio;
          if (!url || (!options.allowHttpOutputs && new URL(url).protocol !== 'https:')) throw new StudioError('ElevenLabs has not provided a downloadable audio output yet. Resume in a moment.', 502);
          const response = await axios.get(url, { responseType: 'stream', timeout: 30 * 60_000, maxContentLength: Infinity });
          await pipeline(response.data, (await import('node:fs')).createWriteStream(path.join(dir, 'arabic.wav.part'), { mode: 0o600 }));
          await rename(path.join(dir, 'arabic.wav.part'), path.join(dir, 'arabic.wav'));
          job.hasAudio = true; await persist(job);
        }
        await muxVideo(path.join(dir, 'source'), path.join(dir, 'arabic.wav'), path.join(dir, 'arabic.mp4.part'), job.media);
        await rename(path.join(dir, 'arabic.mp4.part'), path.join(dir, 'arabic.mp4'));
        job.hasVideo = true;
        try {
          const transcript = await api(key, 'GET', languagePath + '/transcript');
          job.transcript = transcript.segments || [];
          const srt = toSrt(job.transcript);
          if (srt) { await writeFile(path.join(dir, 'arabic.srt'), srt, { mode: 0o600 }); job.hasSubtitles = true; }
        } catch { job.warnings.push('The video is ready. A transcript was not available for this account.'); }
        job.status = 'completed'; await persist(job);
        return;
      }
      throw new StudioError('This dub is taking longer than expected. Resume later to check the existing project.', 504);
    } catch (error) {
      if (error.mediaDiagnostic) console.error('Local video processing:', error.mediaDiagnostic);
      job.status = !job.projectId ? (error.response ? 'failed' : 'needs_review') : error instanceof StudioError && error.status < 500 ? 'failed' : 'paused';
      job.error = safeMessage(error);
      if (!job.projectId && !error.response) job.error += ' Check ElevenLabs before starting again; the upload may already have used credits.';
      await persist(job);
    }
  };
  const launch = job => {
    if (running.has(job.id)) return;
    const task = processJob(job, apiKey).finally(() => running.delete(job.id));
    running.set(job.id, task);
  };

  app.disable('x-powered-by');
  app.use((req, res, next) => {
    const hostname = req.hostname;
    if (!['127.0.0.1', 'localhost', '[::1]'].includes(hostname)) return res.status(403).json({ error: 'This app is only available on this Mac.' });
    const origin = req.headers.origin;
    if (origin && ![`http://127.0.0.1:${req.socket.localPort}`, `http://localhost:${req.socket.localPort}`].includes(origin)) return res.status(403).json({ error: 'This request did not come from Lisan Studio.' });
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('Referrer-Policy', 'no-referrer');
    res.setHeader('Content-Security-Policy', "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' blob: data:; media-src 'self' blob:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'");
    if (req.path.startsWith('/api/')) res.setHeader('Cache-Control', 'no-store');
    next();
  });
  app.use(express.json({ limit: '16kb' }));
  app.get('/api/config', (req, res) => res.json({ app: 'lisan-studio', connected, hasKey: !!apiKey, maxBytes: MAX_BYTES, activeJobs: running.size }));
  app.post('/api/connection', async (req, res) => {
    const key = String(req.body.apiKey || apiKey || '').trim();
    if (!key || key.length > 500) throw new StudioError('Enter an ElevenLabs API key.');
    await api(key, 'GET', '/v1/dubbing/project?page_size=1');
    if (req.body.remember) await writeFile(path.join(dataDir, 'connection.json'), JSON.stringify({ apiKey: key }), { mode: 0o600 });
    else await rm(path.join(dataDir, 'connection.json'), { force: true });
    apiKey = key; connected = true;
    res.json({ connected: true });
  });
  app.delete('/api/connection', async (req, res) => {
    if (running.size) throw new StudioError('Wait for your active dub to finish before disconnecting.', 409);
    await rm(path.join(dataDir, 'connection.json'), { force: true });
    apiKey = ''; connected = false; res.json({ connected: false });
  });
  app.get('/api/jobs', (req, res) => res.json([...jobs.values()].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).map(view)));
  const findJob = id => { const job = jobs.get(id); if (!job) throw new StudioError('This project could not be found.', 404); return job; };
  app.get('/api/jobs/:id', (req, res) => res.json(view(findJob(req.params.id))));

  const upload = multer({ dest: uploadDir, limits: { fileSize: MAX_BYTES, files: 1, fields: 8, fieldSize: 8000 } });
  app.post('/api/jobs', (req, res, next) => {
    if (!connected || !apiKey) return res.status(401).json({ error: 'Connect your ElevenLabs account first.' });
    const token = req.get('Idempotency-Key');
    if (!token || !/^[a-f0-9-]{36}$/.test(token)) return res.status(400).json({ error: 'The upload request is missing its identifier. Refresh the app.' });
    const existing = [...jobs.values()].find(j => j.requestId === token);
    if (existing) return res.status(200).json(view(existing));
    if (reservations.has(token)) return res.status(409).json({ error: 'This upload is already being received. Please wait.' });
    if (running.size || reservations.size) return res.status(409).json({ error: 'Finish your current upload or dub before starting another.' });
    reservations.set(token, true);
    res.on('finish', () => reservations.delete(token));
    res.on('close', () => reservations.delete(token));
    next();
  }, upload.single('video'), async (req, res) => {
    const file = req.file;
    try {
      if (!file) throw new StudioError('Choose a video to upload.');
      if (req.body.consent !== 'true') throw new StudioError('Confirm that you can use the video and that you agree to use your ElevenLabs credits.');
      const extension = path.extname(file.originalname).toLowerCase();
      if (!allowedExtensions.has(extension)) throw new StudioError('Choose an MP4, MOV, WEBM, MKV, M4V or AVI video.');
      const media = await probeVideo(file.path);
      const keyterms = [...new Set(String(req.body.keyterms || '').split(',').map(s => s.trim()).filter(Boolean))];
      if (keyterms.length > 1000 || keyterms.some(s => s.length > 50 || s.split(/\s+/).length > 5 || /[<>{}\[\]\\]/.test(s))) throw new StudioError('Use short brand names or terms, separated by commas. Each term can have up to 50 characters and 5 words.');
      const id = randomUUID(), dir = path.join(jobsDir, id);
      await mkdir(dir, { recursive: true, mode: 0o700 });
      await rename(file.path, path.join(dir, 'source'));
      const job = { id, requestId: req.get('Idempotency-Key'), name: String(req.body.name || file.originalname).trim().slice(0, 200) || 'Untitled video', filename: path.basename(file.originalname), media, keyterms, status: 'uploading', createdAt: new Date().toISOString(), hasVideo: false, hasAudio: false, hasSubtitles: false };
      jobs.set(id, job); await persist(job); launch(job);
      res.status(202).json(view(job));
    } catch (error) { if (file) await rm(file.path, { force: true }); throw error; }
  });
  app.post('/api/jobs/:id/resume', (req, res) => {
    if (!connected || !apiKey) throw new StudioError('Reconnect your ElevenLabs account before resuming.', 401);
    const job = findJob(req.params.id);
    if (!job.projectId) throw new StudioError('Check ElevenLabs for the interrupted upload before creating another project.', 409);
    if (running.has(job.id)) return res.json(view(job));
    if (running.size || reservations.size) throw new StudioError('Wait for your current dub to finish.', 409);
    if (job.status === 'completed') return res.json(view(job));
    launch(job); res.json(view(job));
  });
  app.get('/api/jobs/:id/file/:kind', async (req, res) => {
    const job = findJob(req.params.id), kind = req.params.kind;
    const files = { source: ['source', null], video: ['arabic.mp4', 'video/mp4'], audio: ['arabic.wav', 'audio/wav'], subtitles: ['arabic.srt', 'application/x-subrip'] };
    if (!files[kind]) throw new StudioError('This file type is not available.', 404);
    const [file, contentType] = files[kind];
    const location = path.join(jobsDir, job.id, file);
    try { await stat(location); } catch { throw new StudioError('This file is not ready yet.', 404); }
    if (contentType) res.type(contentType);
    else res.type(({ '.mp4': 'video/mp4', '.m4v': 'video/mp4', '.mov': 'video/quicktime', '.webm': 'video/webm', '.mkv': 'video/x-matroska', '.avi': 'video/x-msvideo' })[path.extname(job.filename).toLowerCase()] || 'application/octet-stream');
    const base = job.filename.replace(/\.[^.]+$/, '').replace(/[^a-zA-Z0-9_\-\p{L} ]/gu, '_').slice(0, 120);
    if (req.query.download === '1') res.download(location, kind === 'source' ? job.filename : `${base}_ar.${file.split('.').pop()}`);
    else res.sendFile(location);
  });
  app.use(express.static(path.join(root, 'public')));
  app.use((error, req, res, next) => {
    if (res.headersSent) return next(error);
    const status = error.code === 'LIMIT_FILE_SIZE' ? 413 : error instanceof multer.MulterError ? 400 : error.status || error.response?.status || 500;
    const message = error.code === 'LIMIT_FILE_SIZE' ? 'This video is larger than 3 GiB. Choose a smaller file.' : error instanceof multer.MulterError ? 'Upload one video at a time.' : safeMessage(error);
    res.status(Math.min(599, Math.max(400, status))).json({ error: message });
  });
  const connectionReady = apiKey
    ? api(apiKey, 'GET', '/v1/dubbing/project?page_size=1').then(() => { connected = true; }).catch(() => { connected = false; })
    : Promise.resolve();
  return { app, jobs, running, connectionReady, waitForIdle: async () => Promise.all([...running.values()]) };
}
