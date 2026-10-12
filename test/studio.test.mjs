import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, stat } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { createServer } from 'node:http';
import { randomUUID } from 'node:crypto';
import { createStudio, probeVideo, toSrt } from '../server/core.mjs';

const fixture = path.resolve('public/sample.mp4');
const wavFixture = path.resolve('test/fixtures/reference.wav');
async function listen(server) { await new Promise(resolve => server.listen(0, '127.0.0.1', resolve)); return `http://127.0.0.1:${server.address().port}`; }
const close = server => new Promise(resolve => server.close(resolve));
const json = (res, value, code = 200) => { res.writeHead(code, { 'Content-Type': 'application/json' }); res.end(JSON.stringify(value)); };

test('Dubbing workflow uploads English, targets Arabic, waits, exports a playable video and resumes safely', async () => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), 'lisan-test-'));
  const key = 'test-key-never-returned-to-browser';
  let projectCreations = 0, projectReads = 0, targetReads = 0, base, uploadFields = '';
  const provider = createServer(async (req, res) => {
    if (req.url === '/output.wav') { res.writeHead(200, { 'Content-Type': 'audio/wav' }); res.end(await readFile(wavFixture)); return; }
    assert.equal(req.headers['xi-api-key'], key);
    if (req.url.startsWith('/v1/dubbing/project?')) return json(res, { projects: [] });
    if (req.url === '/v1/dubbing/project' && req.method === 'POST') {
      projectCreations++; const chunks = []; for await (const chunk of req) chunks.push(chunk);
      uploadFields = Buffer.concat(chunks).toString('latin1');
      return json(res, { project_id: 'project_test', language_ids: ['language_ar'], status: 'queued' }, 201);
    }
    if (req.url === '/v1/dubbing/project/project_test') return json(res, { status: ++projectReads < 2 ? 'preparing' : 'ready' });
    if (req.url === '/v1/dubbing/project/project_test/language/language_ar') return json(res, { status: ++targetReads < 2 ? 'processing' : 'completed', outputs: { lossless_audio: base + '/output.wav' } });
    if (req.url === '/v1/dubbing/project/project_test/language/language_ar/transcript') return json(res, { segments: [{ id: 's1', start_s: 0, end_s: 3.072, source_text: 'Welcome to our workshop.', translation: 'أهلًا بكم في ورشتنا.' }] });
    json(res, { error: 'Unexpected endpoint' }, 404);
  });
  base = await listen(provider);
  const studio = await createStudio({ dataDir, apiBase: base, apiKey: key, pollMs: 10, allowHttpOutputs: true });
  await studio.connectionReady;
  const server = createServer(studio.app), local = await listen(server);
  try {
    const configText = await (await fetch(local + '/api/config')).text();
    assert.equal(JSON.parse(configText).connected, true);
    assert.equal(configText.includes(key), false);
    assert.equal((await fetch(local + '/api/connection', { method: 'POST', headers: { 'Content-Type': 'application/json', Origin: 'https://untrusted.test' }, body: JSON.stringify({ apiKey: key }) })).status, 403);

    const token = randomUUID(), file = await readFile(fixture);
    const form = new FormData();
    form.append('video', new Blob([file], { type: 'video/mp4' }), 'sample.mp4');
    form.append('name', 'Arabic test'); form.append('keyterms', 'Zarqa'); form.append('consent', 'true');
    const response = await fetch(local + '/api/jobs', { method: 'POST', headers: { 'Idempotency-Key': token }, body: form });
    assert.equal(response.status, 202, await response.clone().text());
    const job = await response.json();
    await studio.waitForIdle();
    const result = await (await fetch(`${local}/api/jobs/${job.id}`)).json();
    assert.equal(result.status, 'completed', JSON.stringify(result));
    assert.equal(result.hasVideo, true); assert.equal(result.hasAudio, true); assert.equal(result.hasSubtitles, true);
    assert.equal(uploadFields.includes('name="source_language"\r\n\r\nen'), true);
    assert.equal(uploadFields.includes('name="target_language"\r\n\r\nar'), true);
    assert.equal(uploadFields.includes('name="model_id"\r\n\r\ndubbing_v2'), true);
    assert.equal(uploadFields.includes('name="keyterms"\r\n\r\nZarqa'), true);

    const output = path.join(dataDir, 'jobs', job.id, 'arabic.mp4');
    const media = await probeVideo(output);
    assert.ok(Math.abs(media.duration - 20) < .1);
    assert.equal(media.width, 1280); assert.equal(media.height, 720);
    const range = await fetch(`${local}/api/jobs/${job.id}/file/video`, { headers: { Range: 'bytes=0-255' } });
    assert.equal(range.status, 206);
    assert.equal((await range.arrayBuffer()).byteLength, 256);
    const subtitle = await (await fetch(`${local}/api/jobs/${job.id}/file/subtitles`)).text();
    assert.ok(subtitle.includes('أهلًا بكم')); assert.ok(subtitle.includes('00:00:03,072'));
    const retry = await fetch(local + '/api/jobs', { method: 'POST', headers: { 'Idempotency-Key': token }, body: form });
    assert.equal(retry.status, 200); assert.equal((await retry.json()).id, job.id); assert.equal(projectCreations, 1);
    const persisted = await readFile(path.join(dataDir, 'jobs', job.id, 'job.json'), 'utf8');
    assert.equal(persisted.includes(key), false);
    const all = await (await fetch(local + '/api/jobs')).text(); assert.equal(all.includes(key), false);
    assert.equal((await fetch(local + '/api/jobs/not-a-job')).status, 404);
  } finally { await close(server); await close(provider); await rm(dataDir, { recursive: true, force: true }); }
});

test('Invalid videos and uploads without consent never spend provider credits', async () => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), 'lisan-validation-'));
  let created = 0;
  const provider = createServer((req, res) => { if (req.method === 'POST') created++; json(res, { projects: [] }); });
  const providerBase = await listen(provider);
  const studio = await createStudio({ dataDir, apiBase: providerBase, apiKey: 'test-key' });
  await studio.connectionReady;
  const server = createServer(studio.app), local = await listen(server);
  try {
    const form = new FormData(); form.append('video', new Blob([await readFile(fixture)]), 'sample.mp4');
    const response = await fetch(local + '/api/jobs', { method: 'POST', headers: { 'Idempotency-Key': randomUUID() }, body: form });
    assert.equal(response.status, 400); assert.equal(created, 0); assert.equal(studio.jobs.size, 0);
    const invalid = new FormData(); invalid.append('video', new Blob(['not a video']), 'broken.mp4'); invalid.append('consent', 'true');
    assert.equal((await fetch(local + '/api/jobs', { method: 'POST', headers: { 'Idempotency-Key': randomUUID() }, body: invalid })).status, 422);
    assert.equal(created, 0);
  } finally { await close(server); await close(provider); await rm(dataDir, { recursive: true, force: true }); }
});

test('An uncertain provider upload is flagged for review and is never silently repeated', async () => {
  const dataDir = await mkdtemp(path.join(os.tmpdir(), 'lisan-recovery-'));
  let created = 0;
  const provider = createServer(async (req, res) => {
    if (req.method === 'GET') return json(res, { projects: [] });
    for await (const chunk of req) {}
    created++; req.socket.destroy();
  });
  const providerBase = await listen(provider);
  const studio = await createStudio({ dataDir, apiBase: providerBase, apiKey: 'test-key', pollMs: 10 });
  await studio.connectionReady;
  const server = createServer(studio.app), local = await listen(server);
  try {
    const token = randomUUID(), form = new FormData(); form.append('video', new Blob([await readFile(fixture)]), 'sample.mp4'); form.append('consent', 'true');
    const job = await (await fetch(local + '/api/jobs', { method: 'POST', headers: { 'Idempotency-Key': token }, body: form })).json();
    await studio.waitForIdle();
    const result = await (await fetch(`${local}/api/jobs/${job.id}`)).json();
    assert.equal(result.status, 'needs_review'); assert.equal(created, 1);
    assert.equal((await fetch(`${local}/api/jobs/${job.id}/resume`, { method: 'POST' })).status, 409);
    await fetch(local + '/api/jobs', { method: 'POST', headers: { 'Idempotency-Key': token }, body: form });
    assert.equal(created, 1);
  } finally { await close(server); await close(provider); await rm(dataDir, { recursive: true, force: true }); }
});

test('Subtitle timestamps preserve precise Arabic segment timing', () => {
  const result = toSrt([{ start_s: 59.9999, end_s: 61.123, translation: 'مرحبًا' }]);
  assert.ok(result.includes('00:01:00,000 --> 00:01:01,123'));
});
