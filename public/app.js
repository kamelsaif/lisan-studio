const icons = {
  wave: '<path d="M3 10v4M7 5v14M12 8v8M17 3v18M21 9v6"/>',
  studio: '<rect x="3" y="5" width="18" height="14" rx="3"/><path d="m10 9 5 3-5 3z"/>',
  folder: '<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>',
  plug: '<path d="M8 3v5M16 3v5M6 8h12v3a6 6 0 0 1-12 0zM12 17v4"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9.4 9a2.7 2.7 0 0 1 5.2.9c0 1.8-2.6 2.1-2.6 3.6M12 17h.01"/>',
  right: '<path d="m9 5 7 7-7 7"/>',
  arrow: '<path d="M4 12h16m-5-5 5 5-5 5"/>',
  upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 15v5a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-5"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6"/><path d="m10 12 5 3-5 3z"/>',
  sparkles: '<path d="m12 3 2.4 6.6L21 12l-6.6 2.4L12 21l-2.4-6.6L3 12l6.6-2.4zM20 2v4M18 4h4"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10a7 7 0 0 0 14 0M12 17v5M8 22h8"/>',
  shield: '<path d="m12 3 8 3v5c0 5-4 8-8 10-4-2-8-5-8-10V6z"/><path d="m8 11 3 3 5-5"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a19 19 0 0 1 0 18 19 19 0 0 1 0-18"/>',
  download: '<path d="M12 3v13m-5-5 5 5 5-5M4 16v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  play: '<path d="m8 4 12 8-12 8z"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0v4M12 14v3"/>',
  loader: '<path d="M21 12a9 9 0 1 1-6-8.5"/>',
  subtitles: '<rect x="2" y="4" width="20" height="16" rx="3"/><path d="M6 12h4M14 12h4M6 16h12"/>'
};
const icon = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name] || ''}</svg>`;
const strings = {
  en: {
    workspace: 'Your local workspace', workspaceLabel: 'WORKSPACE', studio: 'Dubbing studio', videos: 'My videos', connection: 'Connection', local: 'On this Mac', private: 'Private workspace', powered: 'POWERED BY', poweredDesc: 'A familiar voice.\nA whole new audience.', connected: 'ElevenLabs connected', notConnected: 'Connect ElevenLabs', eyebrow: 'LET YOUR VIDEO SPEAK ARABIC', hero: 'Same story.<br><span>A new language.</span>', heroDesc: 'Turn English speech into Arabic. Keep the original video.', uploadTitle: 'Add your video', original: 'ORIGINAL VIDEO', dropTitle: 'Drop your English video here', dropDesc: 'A new audience is one upload away.', browse: 'Browse files', formats: 'MP4, MOV, WEBM, MKV, M4V or AVI · Up to 3 GiB', noVideo: 'No video on hand?', sample: 'Try the 20-second sample', loadingSample: 'Loading the sample…', projectName: 'Video name', optional: 'Optional', settings: 'Make it yours', from: 'FROM', to: 'TO', originalVoice: 'Keep the speaker’s voice', originalVoiceDesc: 'Voice matching by ElevenLabs', voiceNote: 'Arabic (ar). Voice matching varies with the source. On-screen text and lip movements stay as they are.', advanced: 'Names & special terms', keyterms: 'Brand names, separated by commas', keytermsNote: 'Help ElevenLabs recognize names and important words.', consent: 'I can use this video. I agree to send it to ElevenLabs and use my account credits.', start: 'Dub to Arabic', connectStart: 'Connect to start dubbing', uploading: 'Uploading to your Mac', creditNote: 'Uses ElevenLabs credits · Subject to your account’s plan', feature1: 'Original visuals', feature1b: 'Keep your video’s look', feature2: 'Arabic speech', feature2b: 'Bring your story to life', feature3: 'Ready to download', feature3b: 'MP4 video + WAV audio', recent: 'Recent videos', recentDesc: 'Your work, all in one place', empty: 'Your first Arabic video starts here.', footer: 'Files stored on this Mac · Dubbing processed by ElevenLabs', footerRight: 'Made for a wider audience.', output: 'Your Arabic video', source: 'English original', arabic: 'Arabic dub', downloadVideo: 'Download video', downloadAudio: 'Download audio', downloadSubs: 'Arabic subtitles', transcript: 'Review the translation', stepUpload: 'Upload', stepPrepare: 'Prepare', stepDub: 'Dub', stepExport: 'Export', processingTitle: 'A new voice is on its way', processingDesc: 'You can leave this page open or come back later.<br>Keep the local app running while ElevenLabs processes your video.', paused: 'This project needs your attention', resume: 'Resume existing project', connectTitle: 'Connect ElevenLabs', connectDesc: 'Use a key from your <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noreferrer">ElevenLabs account</a> with Dubbing access.', apiKey: 'ElevenLabs API key', keyPlaceholder: 'Paste your API key', remember: 'Remember on this Mac', keyNote: 'Saved only in the local app’s private data folder. Never included in the page, source package, or downloads.', connectedDesc: 'Your account is ready to dub. You can replace your key when it expires.', connectSave: 'Connect account', verify: 'Verify saved key', disconnect: 'Disconnect & remove saved key', helpTitle: 'English in. Arabic out.', help1: 'Choose an English video', help1desc: 'Drag it in or browse your files. Preview it before you start.', help2: 'Connect your ElevenLabs account', help2desc: 'Use an API key with Dubbing access. Your ElevenLabs plan and credits apply.', help3: 'Dub, review, download', help3desc: 'We send the video to ElevenLabs, then combine the Arabic audio with your original visuals on this Mac.', helpNote: 'Dubbing translates speech. It does not translate words inside the video or change lip movements. Review the Arabic before sharing.', libraryTitle: 'Your video library', libraryDesc: 'Pick a project to preview, resume, or download it.', newVideo: 'New video', fileTooLarge: 'This video is larger than 3 GiB. Choose a smaller file.', unsupported: 'Choose an MP4, MOV, WEBM, MKV, M4V or AVI video.', network: 'Could not connect to the local app. Make sure it is running.', uploadUncertain: 'The upload response was interrupted. Check My videos before trying again.', jobInProgress: 'Your current dub is still processing.', close: 'Close', remove: 'Remove video', saved: 'Your ElevenLabs account is connected.', preparing: 'Preparing video', dubbing: 'Dubbing Arabic', exporting: 'Exporting video', completed: 'Ready', failed: 'Needs attention', needs_review: 'Check ElevenLabs', pausedStatus: 'Paused', refresh: 'Reconnect', sampleName: 'Work Smarter · workshop sample', sampleLabel: '20-second English sample', connectedBtn: 'Account connected', namePlaceholder: 'Give your video a name'
  },
  ar: {
    workspace: 'مساحة العمل على جهازك', workspaceLabel: 'مساحة العمل', studio: 'استوديو الدبلجة', videos: 'فيديوهاتي', connection: 'ربط الحساب', local: 'على هذا الماك', private: 'مساحة عمل خاصة', powered: 'بدعم من', poweredDesc: 'نفس الصوت.\nجمهور جديد.', connected: 'ElevenLabs متصل', notConnected: 'ربط ElevenLabs', eyebrow: 'خلّي فيديوهاتك تتكلم عربي', hero: 'نفس الحكاية.<br><span>بلغة جديدة.</span>', heroDesc: 'حوّل الكلام الإنجليزي للعربية مع الحفاظ على الفيديو الأصلي.', uploadTitle: 'أضف الفيديو', original: 'الفيديو الأصلي', dropTitle: 'اسحب الفيديو الإنجليزي هنا', dropDesc: 'جمهور جديد يبدأ برفع فيديو.', browse: 'اختيار فيديو', formats: 'MP4, MOV, WEBM, MKV, M4V, AVI · حتى ٣ GiB', noVideo: 'ليس لديك فيديو الآن؟', sample: 'جرّب المثال: ٢٠ ثانية', loadingSample: 'جاري تحميل المثال…', projectName: 'اسم الفيديو', optional: 'اختياري', settings: 'جهّز الدبلجة', from: 'من', to: 'إلى', originalVoice: 'الحفاظ على صوت المتحدث', originalVoiceDesc: 'مطابقة الصوت بواسطة ElevenLabs', voiceNote: 'العربية (ar). مطابقة الصوت تعتمد على المصدر. النصوص داخل الصورة وحركة الشفاه تظل كما هي.', advanced: 'الأسماء والكلمات المهمة', keyterms: 'أسماء العلامات، مفصولة بفواصل إنجليزية', keytermsNote: 'ساعد ElevenLabs على التعرّف على الأسماء والكلمات المهمة.', consent: 'لديّ الحق في استخدام الفيديو. أوافق على إرساله إلى ElevenLabs واستخدام رصيد حسابي.', start: 'دبلجة للعربية', connectStart: 'اربط الحساب لبدء الدبلجة', uploading: 'جاري الرفع على جهازك', creditNote: 'يستخدم رصيد ElevenLabs · حسب خطة حسابك', feature1: 'الفيديو الأصلي', feature1b: 'نفس الصورة والتفاصيل', feature2: 'كلام بالعربية', feature2b: 'وصل حكايتك لجمهور جديد', feature3: 'جاهز للتنزيل', feature3b: 'فيديو MP4 وصوت WAV', recent: 'آخر الفيديوهات', recentDesc: 'كل شغلك في مكان واحد', empty: 'أول فيديو بالعربي يبدأ من هنا.', footer: 'الملفات محفوظة على الماك · الدبلجة تتم لدى ElevenLabs', footerRight: 'حكايتك تستحق جمهورًا أوسع.', output: 'فيديوك بالعربية', source: 'الأصل الإنجليزي', arabic: 'الدبلجة العربية', downloadVideo: 'تنزيل الفيديو', downloadAudio: 'تنزيل الصوت', downloadSubs: 'الترجمة العربية', transcript: 'مراجعة الترجمة', stepUpload: 'رفع', stepPrepare: 'تجهيز', stepDub: 'دبلجة', stepExport: 'تصدير', processingTitle: 'فيديوك بيتجهّز بصوت عربي', processingDesc: 'يمكنك ترك الصفحة مفتوحة أو الرجوع لاحقًا.<br>أبقِ التطبيق المحلي يعمل أثناء معالجة الفيديو في ElevenLabs.', paused: 'هذا المشروع يحتاج مراجعتك', resume: 'استكمال المشروع الحالي', connectTitle: 'ربط حساب ElevenLabs', connectDesc: 'استخدم مفتاحًا من <a href="https://elevenlabs.io/app/settings/api-keys" target="_blank" rel="noreferrer">حسابك في ElevenLabs</a> مع صلاحية الدبلجة.', apiKey: 'مفتاح ElevenLabs API', keyPlaceholder: 'أدخل مفتاح API', remember: 'حفظ على هذا الماك', keyNote: 'محفوظ فقط في مجلد بيانات التطبيق المحلي الخاص. لا يظهر في الصفحة أو حزمة المصدر أو التنزيلات.', connectedDesc: 'حسابك جاهز للدبلجة. يمكنك استبدال المفتاح عند انتهاء صلاحيته.', connectSave: 'ربط الحساب', verify: 'التحقق من المفتاح المحفوظ', disconnect: 'قطع الاتصال وحذف المفتاح المحفوظ', helpTitle: 'إنجليزي يدخل. عربي يطلع.', help1: 'اختر فيديو بالإنجليزية', help1desc: 'اسحب الفيديو أو اختره من ملفاتك. يمكنك معاينته قبل البداية.', help2: 'اربط حسابك في ElevenLabs', help2desc: 'استخدم مفتاح API بصلاحية الدبلجة. تُطبق خطة حسابك ورصيدك في ElevenLabs.', help3: 'دبلج، راجع، ونزّل', help3desc: 'نرسل الفيديو إلى ElevenLabs، ثم ندمج الصوت العربي مع الصورة الأصلية على هذا الماك.', helpNote: 'الدبلجة تترجم الكلام. لا تترجم النصوص داخل الصورة أو تغيّر حركة الشفاه. راجع العربية قبل المشاركة.', libraryTitle: 'مكتبة الفيديوهات', libraryDesc: 'اختر مشروعًا لمعاينته أو استكماله أو تنزيله.', newVideo: 'فيديو جديد', fileTooLarge: 'الفيديو أكبر من ٣ GiB. اختر ملفًا أصغر.', unsupported: 'اختر فيديو MP4 أو MOV أو WEBM أو MKV أو M4V أو AVI.', network: 'تعذّر الاتصال بالتطبيق المحلي. تأكد أنه يعمل.', uploadUncertain: 'انقطع الرد بعد الرفع. راجع فيديوهاتك قبل المحاولة مرة أخرى.', jobInProgress: 'الفيديو الحالي ما زال تحت المعالجة.', close: 'إغلاق', remove: 'إزالة الفيديو', saved: 'تم ربط حساب ElevenLabs.', preparing: 'تجهيز الفيديو', dubbing: 'دبلجة عربية', exporting: 'تصدير الفيديو', completed: 'جاهز', failed: 'يحتاج مراجعة', needs_review: 'راجع ElevenLabs', pausedStatus: 'متوقف', refresh: 'إعادة الربط', sampleName: 'اشتغل أذكى · مثال الورشة', sampleLabel: 'مثال إنجليزي مدته ٢٠ ثانية', connectedBtn: 'الحساب متصل', namePlaceholder: 'اكتب اسم الفيديو'
  }
};
const state = { lang: localStorage.getItem('lisan-language') || 'en', page: 'studio', config: {}, file: null, fileUrl: null, duration: null, name: '', keyterms: '', consent: false, jobs: [], selectedId: null, uploading: false, uploadPercent: 0, uploadToken: null, error: '', preview: 'arabic' };
if (!strings[state.lang]) state.lang = 'en';
const t = key => strings[state.lang][key] || key;
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const $ = selector => document.querySelector(selector);
const activeJob = () => state.jobs.find(j => ['uploading', 'preparing', 'dubbing', 'exporting'].includes(j.status));
const selectedJob = () => state.jobs.find(j => j.id === state.selectedId);
const duration = seconds => `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;
const size = bytes => bytes > 1024 ** 3 ? `${(bytes / 1024 ** 3).toFixed(1)} GiB` : `${(bytes / 1024 ** 2).toFixed(1)} MB`;
const wave = (processing = false) => `<div class="${processing ? 'processing-wave' : 'wave'}" aria-hidden="true">${[10, 19, 29, 18, 36, 25, 12, 22, 31, 15, 8].map((h, i) => `<i style="--h:${h}px;--delay:${i * .08}s"></i>`).join('')}</div>`;
const statusName = value => t(value === 'paused' ? 'pausedStatus' : value === 'uploading' ? 'stepUpload' : value);
const toast = text => { $('#toast').textContent = text; $('#toast').hidden = false; clearTimeout(toast.timer); toast.timer = setTimeout(() => $('#toast').hidden = true, 5000); };

async function request(url, options) {
  let response;
  try { response = await fetch(url, options); } catch { throw new Error(t('network')); }
  const body = await response.json();
  if (!response.ok) throw new Error(body.error || t('network'));
  return body;
}
function projectRows(jobs) {
  if (!jobs.length) return `<div class="empty-projects">${icon('folder')}<span>${t('empty')}</span></div>`;
  return `<div class="project-list">${jobs.map(job => `<button type="button" class="project-row" data-project="${job.id}"><span class="file-icon">${icon('studio')}</span><span class="project-name"><strong>${esc(job.name)}</strong><small>${job.media ? duration(job.media.duration) + ' · ' : ''}English → العربية · ${new Date(job.createdAt).toLocaleDateString(state.lang === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short' })}</small></span><span class="project-status ${job.status}">${statusName(job.status)}</span>${icon('right')}</button>`).join('')}</div>`;
}
function render() {
  document.documentElement.lang = state.lang;
  document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
  document.title = `Lisan Studio · ${t('studio')}`;
  $('#app').innerHTML = `<div class="layout">
    <aside class="sidebar"><div class="brand"><span class="brand-mark">${icon('wave')}</span><span>lisan<small>STUDIO</small></span></div><div class="workspace-tag"><span></span>${t('workspace')}</div><div class="nav-label">${t('workspaceLabel')}</div>
      <nav class="nav" aria-label="${t('workspaceLabel')}"><button type="button" data-nav="studio" aria-label="${t('studio')}" class="${state.page === 'studio' ? 'active' : ''}">${icon('studio')}<span>${t('studio')}</span></button><button type="button" data-nav="library" aria-label="${t('videos')}" class="${state.page === 'library' ? 'active' : ''}">${icon('folder')}<span>${t('videos')}</span><span class="count">${state.jobs.length}</span></button><button type="button" data-action="connect" aria-label="${t('connection')}">${icon('plug')}<span>${t('connection')}</span></button></nav>
      <div class="sidebar-bottom"><div class="powered"><div class="powered-label">${t('powered')}</div><div class="eleven"><b>Ⅱ</b> ElevenLabs</div><p>${t('poweredDesc').replace('\n', '<br>')}</p></div><div class="local-user"><div class="avatar">L</div><span>${t('local')}<small>${t('private')}</small></span></div></div>
    </aside><main class="main"><header class="topbar"><div class="breadcrumb"><span>${t('workspace')}</span>${icon('right')}<span class="current">${t(state.page === 'library' ? 'videos' : 'studio')}</span></div><div class="top-actions"><button type="button" class="connection-btn" data-action="connect"><span class="status-dot ${state.config.connected ? 'connected' : ''}"></span><span>${t(state.config.connected ? 'connected' : 'notConnected')}</span></button><button type="button" class="language-btn" data-action="language">${state.lang === 'en' ? 'العربية' : 'English'}</button><button type="button" class="help-btn" data-action="help" aria-label="${t('helpTitle')}">${icon('help')}</button></div></header>
    <div class="content ${state.page === 'library' ? 'library' : ''}">${state.page === 'library' ? libraryMarkup() : studioMarkup()}<footer class="footer"><span>${icon('lock')}${t('footer')}</span><span>${t('footerRight')}</span></footer></div></main></div>`;
  bind(); renderOutput();
}
function libraryMarkup() {
  return `<section class="hero"><div><div class="eyebrow">${icon('folder')}${t('videos')}</div><h1>${t('libraryTitle')}</h1><p>${t('libraryDesc')}</p></div><button type="button" class="secondary-btn" data-action="new">${icon('upload')}${t('newVideo')}</button></section><div id="library-projects">${projectRows(state.jobs)}</div>`;
}
function studioMarkup() {
  const busy = state.uploading || !!activeJob();
  return `<section class="hero"><div><div class="eyebrow">${icon('sparkles')}${t('eyebrow')}</div><h1>${t('hero')}</h1><p>${t('heroDesc')}</p></div><div class="hero-art" aria-hidden="true"><div class="voice-card"><strong>En</strong><span>ORIGINAL</span></div>${wave()}<div class="voice-card arabic"><strong>ع</strong><span>العربية</span></div></div></section>
    <div class="error-banner" id="main-error" role="alert" ${state.error ? '' : 'hidden'}>${esc(state.error)}</div>
    <div class="studio-grid"><section class="panel"><div class="panel-heading"><h2><span class="step-num">01</span>${t('uploadTitle')}</h2><span class="small-tag">${t('original')}</span></div><div class="upload-body"><input id="video-file" type="file" accept="video/*,.mp4,.mov,.webm,.mkv,.m4v,.avi" hidden>
    ${state.file ? `<div class="source-preview"><video id="source-player" src="${esc(state.fileUrl)}" controls playsinline preload="metadata"></video></div><div class="file-summary"><span class="file-icon">${icon('file')}</span><div class="file-info"><h3>${esc(state.file.name)}</h3><p id="file-details">${size(state.file.size)}${state.duration ? ' · ' + duration(state.duration) : ''} · English</p></div><button type="button" class="icon-button" data-action="remove" aria-label="${t('remove')}" ${busy ? 'disabled' : ''}>${icon('close')}</button></div><label class="input-label" for="project-name">${t('projectName')}</label><input class="text-input" id="project-name" value="${esc(state.name)}" placeholder="${t('namePlaceholder')}" maxlength="200" ${busy ? 'disabled' : ''}>` : `<div class="dropzone" id="dropzone"><div class="upload-icon">${icon('upload')}</div><h3>${t('dropTitle')}</h3><p>${t('dropDesc')}</p><button type="button" class="browse-btn" id="browse" ${busy ? 'disabled' : ''}>${icon('folder')}${t('browse')}</button><div class="formats">${t('formats')}</div></div><div class="sample-line">${t('noVideo')}<button type="button" class="text-btn" id="sample" ${busy ? 'disabled' : ''}>${t('sample')}${icon('arrow')}</button></div>`}
    </div></section><section class="panel"><div class="panel-heading"><h2><span class="step-num">02</span>${t('settings')}</h2></div><div class="settings-body"><div class="language-route"><span class="lang-icon">EN</span><div class="route-text"><small>${t('from')}</small><strong>English</strong></div>${icon('arrow')}<span class="lang-icon arabic">ع</span><div class="route-text"><small>${t('to')}</small><strong lang="ar">العربية</strong></div></div><hr class="setting-divider"><div class="voice-option"><span class="round-icon">${icon('mic')}</span><div><h3>${t('originalVoice')}</h3><p>${t('originalVoiceDesc')}</p></div><span class="checkmark">${icon('check')}</span></div><p class="voice-note">${t('voiceNote')}</p><details class="advanced" ${state.keyterms ? 'open' : ''}><summary>${t('advanced')}</summary><label class="input-label" for="keyterms">${t('optional')}</label><input id="keyterms" class="text-input" value="${esc(state.keyterms)}" placeholder="${t('keyterms')}" maxlength="4000" ${busy ? 'disabled' : ''}><p>${t('keytermsNote')}</p></details><label class="consent"><input id="consent" type="checkbox" ${state.consent ? 'checked' : ''} ${busy ? 'disabled' : ''}><span>${t('consent')}</span></label><button type="button" class="primary-btn" id="dub-button" ${!state.file || !state.consent || busy ? 'disabled' : ''}>${icon(state.uploading ? 'loader' : 'sparkles', state.uploading ? 'spin' : '')}<span>${state.uploading ? `${t('uploading')} · ${state.uploadPercent}%` : t(state.config.connected ? 'start' : 'connectStart')}</span></button><p class="credits-note">${t('creditNote')}</p></div></section></div>
    <div id="output-container"></div><div class="feature-row"><div class="feature">${icon('studio')}<span>${t('feature1')}<small>${t('feature1b')}</small></span></div><div class="feature">${icon('globe')}<span>${t('feature2')}<small>${t('feature2b')}</small></span></div><div class="feature">${icon('download')}<span>${t('feature3')}<small>${t('feature3b')}</small></span></div></div><section class="recent"><div class="section-title"><h2>${t('recent')}</h2><p>${t('recentDesc')}</p></div><div id="recent-projects">${projectRows(state.jobs.slice(0, 3))}</div></section>`;
}
function bindProjects() {
  document.querySelectorAll('[data-project]').forEach(button => button.onclick = () => { state.selectedId = button.dataset.project; state.preview = 'arabic'; state.page = 'studio'; render(); $('#output-container')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); });
}
function bind() {
  document.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => { state.page = b.dataset.nav; render(); });
  document.querySelectorAll('[data-action=connect]').forEach(b => b.onclick = showConnection);
  $('[data-action=language]').onclick = () => { state.lang = state.lang === 'en' ? 'ar' : 'en'; localStorage.setItem('lisan-language', state.lang); render(); };
  $('[data-action=help]').onclick = showHelp;
  if ($('[data-action=new]')) $('[data-action=new]').onclick = () => { state.selectedId = null; state.page = 'studio'; clearFile(); render(); };
  if ($('#browse')) $('#browse').onclick = () => $('#video-file').click();
  if ($('#video-file')) $('#video-file').onchange = e => chooseFile(e.target.files[0]);
  if ($('#sample')) $('#sample').onclick = useSample;
  if ($('[data-action=remove]')) $('[data-action=remove]').onclick = () => { clearFile(); render(); };
  if ($('#source-player')) $('#source-player').onloadedmetadata = e => { state.duration = Number.isFinite(e.target.duration) ? e.target.duration : null; $('#file-details').textContent = `${size(state.file.size)}${state.duration ? ' · ' + duration(state.duration) : ''} · English`; };
  if ($('#project-name')) $('#project-name').oninput = e => state.name = e.target.value;
  if ($('#keyterms')) $('#keyterms').oninput = e => state.keyterms = e.target.value;
  if ($('#consent')) $('#consent').onchange = e => { state.consent = e.target.checked; $('#dub-button').disabled = !state.file || !state.consent || state.uploading || !!activeJob(); };
  if ($('#dub-button')) $('#dub-button').onclick = startDubbing;
  const zone = $('#dropzone');
  if (zone) {
    zone.ondragover = e => { e.preventDefault(); if (!activeJob() && !state.uploading) zone.classList.add('dragover'); };
    zone.ondragleave = () => zone.classList.remove('dragover');
    zone.ondrop = e => { e.preventDefault(); zone.classList.remove('dragover'); if (!activeJob() && !state.uploading) chooseFile(e.dataTransfer.files[0]); };
  }
  bindProjects();
}
function clearFile() { if (state.fileUrl) URL.revokeObjectURL(state.fileUrl); Object.assign(state, { file: null, fileUrl: null, name: '', duration: null, consent: false, uploadToken: null, error: '' }); }
function chooseFile(file) {
  if (!file) return;
  if (activeJob() || state.uploading) return toast(t('jobInProgress'));
  if (file.size > (state.config.maxBytes || 3 * 1024 ** 3)) { state.error = t('fileTooLarge'); render(); return; }
  if (!/\.(mp4|mov|webm|mkv|m4v|avi)$/i.test(file.name)) { state.error = t('unsupported'); render(); return; }
  clearFile(); state.file = file; state.fileUrl = URL.createObjectURL(file); state.name = file.name.replace(/\.[^.]+$/, ''); state.uploadToken = crypto.randomUUID(); state.selectedId = null; render();
}
async function useSample() {
  const button = $('#sample'); button.disabled = true; button.textContent = t('loadingSample');
  try { const response = await fetch('/sample.mp4'); if (!response.ok) throw new Error(t('network')); const blob = await response.blob(); chooseFile(new File([blob], 'work-smarter-sample.mp4', { type: 'video/mp4' })); state.name = t('sampleName'); if ($('#project-name')) $('#project-name').value = state.name; }
  catch (error) { state.error = error.message; render(); }
}
function showError(message) { state.error = message; if ($('#main-error')) { $('#main-error').textContent = message; $('#main-error').hidden = !message; } else toast(message); }
async function startDubbing() {
  if (!state.config.connected) return showConnection();
  if (!state.file || !state.consent || state.uploading || activeJob()) return;
  state.uploading = true; state.uploadPercent = 0; state.error = ''; render();
  const form = new FormData(); form.append('video', state.file); form.append('name', state.name); form.append('keyterms', state.keyterms); form.append('consent', 'true');
  try {
    const job = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest(); xhr.open('POST', '/api/jobs'); xhr.setRequestHeader('Idempotency-Key', state.uploadToken);
      xhr.upload.onprogress = e => { if (e.lengthComputable) { state.uploadPercent = Math.round(e.loaded / e.total * 100); const text = $('#dub-button span'); if (text) text.textContent = `${t('uploading')} · ${state.uploadPercent}%`; } };
      xhr.onload = () => { try { const body = JSON.parse(xhr.responseText); if (xhr.status >= 200 && xhr.status < 300) resolve(body); else reject(new Error(body.error || t('network'))); } catch { reject(new Error(t('uploadUncertain'))); } };
      xhr.onerror = () => reject(new Error(t('uploadUncertain'))); xhr.send(form);
    });
    state.selectedId = job.id; state.jobs = [job, ...state.jobs.filter(j => j.id !== job.id)]; state.preview = 'arabic';
  } catch (error) { state.error = error.message; await refreshJobs(); }
  finally { state.uploading = false; render(); }
}
function renderOutput() {
  const container = $('#output-container'), job = selectedJob();
  if (!container || !job) return;
  const stageIndex = ({ uploading: 0, preparing: 1, dubbing: 2, exporting: 3, completed: 4 })[job.status] ?? 0;
  const settled = ['paused', 'failed', 'needs_review'].includes(job.status);
  container.innerHTML = `<section class="panel output-panel"><div class="panel-heading"><h2>${icon(job.status === 'completed' ? 'check' : 'wave')}${job.status === 'completed' ? t('output') : esc(job.name)}</h2><span class="small-tag">${statusName(job.status)}</span></div><div class="output-body"><div class="stages">${['stepUpload', 'stepPrepare', 'stepDub', 'stepExport'].map((key, i) => `<div class="stage ${i < stageIndex ? 'done' : i === stageIndex ? 'active' : ''}"><span class="stage-bar"></span>${t(key)}</div>`).join('')}</div>
  ${job.hasVideo ? `<div class="preview-tabs"><button type="button" data-preview="arabic" class="${state.preview === 'arabic' ? 'active' : ''}">${t('arabic')}</button><button type="button" data-preview="source" class="${state.preview === 'source' ? 'active' : ''}">${t('source')}</button></div><video class="output-video" controls playsinline src="/api/jobs/${job.id}/file/${state.preview === 'source' ? 'source' : 'video'}"></video><div class="download-row"><a href="/api/jobs/${job.id}/file/video?download=1" download>${icon('download')}${t('downloadVideo')}</a><a href="/api/jobs/${job.id}/file/audio?download=1" download>${icon('mic')}${t('downloadAudio')}</a>${job.hasSubtitles ? `<a href="/api/jobs/${job.id}/file/subtitles?download=1" download>${icon('subtitles')}${t('downloadSubs')}</a>` : ''}</div>` : settled ? `<div class="processing-note"><h3>${t('paused')}</h3><p>${esc(job.error)}</p></div>${job.projectId ? `<button type="button" class="secondary-btn" id="resume-job">${icon('arrow')}${t('resume')}</button>` : ''}` : `<div class="processing-note">${wave(true)}<h3>${t('processingTitle')}</h3><p>${t('processingDesc')}</p></div>`}
  ${job.hasVideo && job.error ? `<div class="warning">${esc(job.error)}</div>` : ''}${(job.warnings || []).map(w => `<div class="warning">${esc(w)}</div>`).join('')}
  ${job.transcript?.length ? `<details class="transcript"><summary>${t('transcript')}</summary><div class="transcript-lines">${job.transcript.map(s => `<div class="transcript-line"><time>${duration(s.start_s || 0)}</time><p lang="en" dir="ltr">${esc(s.source_text)}</p><p lang="ar" dir="rtl">${esc(s.translation || '')}</p></div>`).join('')}</div></details>` : ''}</div></section>`;
  container.querySelectorAll('[data-preview]').forEach(b => b.onclick = () => { state.preview = b.dataset.preview; renderOutput(); });
  if ($('#resume-job')) $('#resume-job').onclick = async () => {
    if (!state.config.connected) return showConnection();
    $('#resume-job').disabled = true;
    try { await request(`/api/jobs/${job.id}/resume`, { method: 'POST' }); await refreshJobs(); render(); } catch (e) { toast(e.message); $('#resume-job').disabled = false; }
  };
}
function showConnection() {
  const dialog = $('#connection-dialog');
  dialog.innerHTML = `<div class="dialog-top"><h2 id="connection-title">${t('connectTitle')}</h2><button type="button" class="icon-button" id="close-connection" aria-label="${t('close')}">${icon('close')}</button></div><p class="dialog-desc">${state.config.connected ? t('connectedDesc') : t('connectDesc')}</p><form id="connection-form"><label class="input-label" for="api-key">${t('apiKey')}</label><input id="api-key" class="text-input" type="password" placeholder="${t('keyPlaceholder')}" autocomplete="off" spellcheck="false" maxlength="500"><label class="consent"><input id="remember-key" type="checkbox" checked><span>${t('remember')}</span></label><p class="modal-note">${t('keyNote')}</p><div class="dialog-error" id="connection-error" role="alert" hidden></div><button type="submit" class="primary-btn" id="save-connection">${icon('plug')}<span>${t(state.config.hasKey && !state.config.connected ? 'verify' : 'connectSave')}</span></button>${state.config.hasKey ? `<button type="button" class="text-btn" id="disconnect" style="margin-top:17px;font-size:10px">${t('disconnect')}</button>` : ''}</form>`;
  $('#close-connection').onclick = () => dialog.close();
  $('#connection-form').onsubmit = async event => {
    event.preventDefault(); const button = $('#save-connection'); button.disabled = true;
    try {
      await request('/api/connection', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ apiKey: $('#api-key').value, remember: $('#remember-key').checked }) });
      $('#api-key').value = ''; state.config = await request('/api/config'); dialog.close(); render(); toast(t('saved'));
    } catch (e) { $('#api-key').value = ''; $('#connection-error').hidden = false; $('#connection-error').textContent = e.message; }
    finally { button.disabled = false; }
  };
  if ($('#disconnect')) $('#disconnect').onclick = async () => { try { await request('/api/connection', { method: 'DELETE' }); state.config = await request('/api/config'); dialog.close(); render(); } catch (e) { $('#connection-error').hidden = false; $('#connection-error').textContent = e.message; } };
  if (!dialog.open) dialog.showModal();
}
function showHelp() {
  const dialog = $('#help-dialog'); dialog.innerHTML = `<div class="dialog-top"><h2 id="help-title">${t('helpTitle')}</h2><button type="button" class="icon-button" id="close-help" aria-label="${t('close')}">${icon('close')}</button></div><div class="help-steps">${[1, 2, 3].map(i => `<div class="help-step"><div><strong>${t('help' + i)}</strong><p>${t('help' + i + 'desc')}</p></div></div>`).join('')}</div><p class="modal-note">${t('helpNote')}</p>`; $('#close-help').onclick = () => dialog.close(); dialog.showModal();
}
async function refreshJobs() {
  const old = JSON.stringify(state.jobs); state.jobs = await request('/api/jobs');
  if (!state.selectedId && activeJob()) state.selectedId = activeJob().id;
  if (JSON.stringify(state.jobs) !== old) {
    if ($('#recent-projects')) $('#recent-projects').innerHTML = projectRows(state.jobs.slice(0, 3));
    if ($('#library-projects')) $('#library-projects').innerHTML = projectRows(state.jobs);
    const count = $('.count'); if (count) count.textContent = state.jobs.length;
    bindProjects(); renderOutput();
    if ($('#dub-button') && !state.uploading) $('#dub-button').disabled = !state.file || !state.consent || !!activeJob();
    if ($('#consent')) $('#consent').disabled = !!activeJob();
    for (const selector of ['#project-name', '#keyterms', '#browse', '#sample', '[data-action=remove]']) if ($(selector)) $(selector).disabled = !!activeJob();
  }
}
async function init() {
  render();
  try { [state.config, state.jobs] = await Promise.all([request('/api/config'), request('/api/jobs')]); const current = activeJob(); if (current) state.selectedId = current.id; render(); } catch (error) { showError(error.message); }
  setInterval(async () => { try { await refreshJobs(); const config = await request('/api/config'); if (config.connected !== state.config.connected) { state.config = config; render(); } } catch {} }, 4000);
}
document.querySelectorAll('dialog').forEach(d => d.addEventListener('click', event => { if (event.target === d) { const r = d.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) d.close(); } }));
init();
