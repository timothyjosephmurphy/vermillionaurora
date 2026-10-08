// /testimonials/: loads approved testimonials at request time and submits the public form.
// Photos are resized in the browser (max 2000 px, JPEG) which also drops their EXIF/GPS metadata;
// the Worker strips metadata again server-side, so a raw upload is still safe.
const MAX_PHOTOS = 4, MAX_BYTES = 10 * 1024 * 1024, MAX_EDGE = 2000;
// Videos go straight from the browser to private storage in 8 MiB parts (/testimonials/api/video/*), then the form
// is sent with the upload's id. Must match MAX_VIDEO_BYTES in cloudflare/testimonial-videos.mjs.
const MAX_VIDEO_BYTES = 50 * 1024 * 1024;
const VIDEO_RULE = 'Videos need to be MP4, MOV or WebM, up to 50 MB.';
const VIDEO_EXT = {mp4: 'video/mp4', m4v: 'video/mp4', mov: 'video/quicktime', webm: 'video/webm'};
const HEIC2ANY = {src: 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js', integrity: 'sha384-OTofQ0MEeiSgh62havBcemCIK0gqj809wX6UA0uPISNMRnR6NZyCdGzX3SbLrgwL'};
const el = (tag, props = {}, ...children) => { const n = Object.assign(document.createElement(tag), props); n.append(...children.filter(c => c != null && c !== false)); return n; };

function card(t) {
  const li = el('li', {className: 'testimonial', id: t.id});
  const [first, ...rest] = t.photos || [];
  const who = t.name || 'A collector';
  if (first) li.append(el('img', {className: 'testimonial-photo', src: first, alt: `${t.painting || 'Painting by TJ Murphy'} with ${who}`, loading: 'lazy', decoding: 'async'}));
  if (rest.length) li.append(el('ul', {className: 'testimonial-thumbs'}, ...rest.map((src, i) => el('li', {}, el('a', {href: src, target: '_blank', rel: 'noopener'}, el('img', {src, alt: `More from ${who} (photo ${i + 2})`, loading: 'lazy', decoding: 'async'}))))));
  if (t.video) li.append(videoPlayer(t, who));
  if (t.quote) li.append(el('blockquote', {}, el('p', {textContent: `“${t.quote}”`})));
  const meta = el('span', {}, el('strong', {textContent: who}), t.city ? ` · ${t.city}` : '');
  if (t.painting || t.paintingHref) meta.append(el('br'), t.paintingHref ? el('a', {href: t.paintingHref, textContent: t.painting || 'See the painting'}) : t.painting);
  li.append(el('p', {className: 'testimonial-meta'}, meta));
  return li;
}

// Inline player: nothing downloads until it is near the screen (poster image) or played; no autoplay, never sound
// on its own. Without a captured poster, preload="metadata" is switched on near the viewport so the first frame shows.
let nearViewport;
function videoPlayer(t, who) {
  const video = el('video', {controls: true, playsInline: true, preload: 'none', ariaLabel: `Video from ${who}${t.painting ? ` about “${t.painting}”` : ''}`});
  video.setAttribute('playsinline', '');
  if (t.video.poster) video.poster = t.video.poster;
  video.append(el('source', {src: t.video.src, type: t.video.type}));
  const fallback = el('p', {className: 'video-fallback', hidden: true}, 'This video can’t play in this browser. Try Safari or another device, or ', el('a', {href: t.video.src, textContent: 'open the video file'}), '.');
  video.querySelector('source').addEventListener('error', () => { fallback.hidden = false; });
  if (!t.video.poster) {
    nearViewport ||= 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.preload = 'metadata'; nearViewport.unobserve(e.target); } }), {rootMargin: '400px'}) : null;
    if (nearViewport) nearViewport.observe(video); else video.preload = 'metadata';
  }
  return el('figure', {className: 'testimonial-video'}, video, fallback);
}

async function loadApproved() {
  const list = document.querySelector('[data-testimonial-list]');
  if (!list) return;
  try {
    const r = await fetch('/testimonials/api/approved', {cache: 'no-cache', headers: {Accept: 'application/json'}});
    if (!r.ok) return;
    const {testimonials = []} = await r.json();
    const fresh = testimonials.filter(t => !document.getElementById(t.id));
    list.append(...fresh.map(card));
  } catch {}
  if (list.children.length) document.querySelectorAll('[data-has-testimonials]').forEach(n => { n.hidden = false; });
  if (location.hash && location.hash !== '#share') document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
}

let heicLoader;
function loadHeic2any() {
  heicLoader ||= new Promise((resolve, reject) => {
    const s = el('script', {src: HEIC2ANY.src, integrity: HEIC2ANY.integrity, crossOrigin: 'anonymous', async: true});
    s.onload = () => window.heic2any ? resolve(window.heic2any) : reject(Error('HEIC converter unavailable'));
    s.onerror = () => reject(Error('HEIC converter unavailable'));
    document.head.append(s);
  });
  return heicLoader;
}
const isHeic = f => /image\/hei[cf]/i.test(f.type) || /\.hei[cf]$/i.test(f.name);
async function decode(blob) {
  if ('createImageBitmap' in window) { try { return await createImageBitmap(blob, {imageOrientation: 'from-image'}); } catch {} }
  const url = URL.createObjectURL(blob);
  try { const img = new Image(); img.src = url; await img.decode(); return img; } finally { setTimeout(() => URL.revokeObjectURL(url), 1000); }
}
// Returns a metadata-free JPEG File, or the original file if the browser cannot decode it.
async function prepare(file) {
  try {
    let source = file, image;
    try { image = await decode(source); } catch (error) {
      if (!isHeic(file)) throw error;
      const heic2any = await loadHeic2any();
      source = await heic2any({blob: file, toType: 'image/jpeg', quality: 0.9});
      if (Array.isArray(source)) source = source[0];
      image = await decode(source);
    }
    const w = image.width, h = image.height, scale = Math.min(1, MAX_EDGE / Math.max(w, h));
    const canvas = el('canvas', {width: Math.round(w * scale), height: Math.round(h * scale)});
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    image.close?.();
    const blob = await new Promise((res, rej) => canvas.toBlob(b => b ? res(b) : rej(Error('encode')), 'image/jpeg', 0.86));
    return new File([blob], file.name.replace(/\.[^.]+$/, '') + '.jpg', {type: 'image/jpeg'});
  } catch { return file; }
}

// ---------- Video ----------
const videoType = f => /^video\/(mp4|quicktime|webm)$/.test(f.type) ? f.type : VIDEO_EXT[(/\.([a-z0-9]+)$/i.exec(f.name)?.[1] || '').toLowerCase()] || '';
const mb = n => `${(n / 1048576).toFixed(n < 10485760 ? 1 : 0)} MB`;
// Phones store the recording location as an ISO 6709 string ("+47.6062-122.3321+050.000/"). Blank it with spaces
// before upload (same length, so the file stays valid). Same scan as blankLocations() in testimonial-videos.mjs.
const ISO6709 = /^[+-]\d{2}(?:\.\d+)?[+-]\d{3}(?:\.\d+)?(?:[+-]\d+(?:\.\d+)?)?(?:CRS[A-Za-z0-9:_]*)?\/$/;
const isoChar = c => (c >= 0x30 && c <= 0x39) || c === 0x2b || c === 0x2d || c === 0x2e || (c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a) || c === 0x3a || c === 0x5f;
function blankLocations(bytes) {
  for (let i = bytes.indexOf(0x2f); i !== -1; i = bytes.indexOf(0x2f, i + 1)) {
    if (i < 12 || !isoChar(bytes[i - 1]) || bytes[i - 1] === 0x2b || bytes[i - 1] === 0x2d) continue;
    let s = i - 1;
    const min = Math.max(0, i - 64);
    while (s > min && isoChar(bytes[s - 1])) s--;
    if (i - s < 11) continue;
    const text = String.fromCharCode(...bytes.subarray(s, i + 1));
    for (let k = 0; k < text.length - 11; k++) if ((text[k] === '+' || text[k] === '-') && ISO6709.test(text.slice(k))) { bytes.fill(0x20, s + k, i + 1); break; }
  }
}
// One part's bytes, scanned with 64 bytes of overlap on each side so a location string split across two parts is
// still caught in both.
async function partBytes(file, start, end) {
  const from = Math.max(0, start - 64), to = Math.min(file.size, end + 64);
  const buf = new Uint8Array(await file.slice(from, to).arrayBuffer());
  blankLocations(buf);
  return buf.subarray(start - from, start - from + (end - start));
}
function putPart(url, token, bytes, onProgress) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', url);
    xhr.setRequestHeader('X-Upload-Token', token);
    xhr.setRequestHeader('Content-Type', 'application/octet-stream');
    xhr.upload.onprogress = e => onProgress(e.loaded);
    xhr.onload = () => { let d = {}; try { d = JSON.parse(xhr.responseText); } catch {} xhr.status === 200 && d.etag ? resolve(d) : reject(Object.assign(Error(d.error || `Upload failed (${xhr.status})`), {status: xhr.status})); };
    xhr.onerror = () => reject(Error('The connection dropped.'));
    xhr.ontimeout = () => reject(Error('The upload timed out.'));
    xhr.timeout = 180000;
    xhr.send(new Blob([bytes]));
  });
}
const postJson = async (path, body) => {
  const r = await fetch(path, {method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'}, body: JSON.stringify(body)});
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw Error(d.error || 'Sorry, the video upload failed. Please try again.');
  return d;
};
async function uploadVideo(file, type, onProgress) {
  const s = await postJson('/testimonials/api/video/start', {type, size: file.size, name: file.name});
  const parts = [];
  let sent = 0;
  try {
    for (let n = 1; n <= s.parts; n++) {
      const start = (n - 1) * s.partBytes, end = Math.min(file.size, start + s.partBytes);
      const bytes = await partBytes(file, start, end);
      for (let attempt = 1; ; attempt++) {
        try { parts.push(await putPart(`/testimonials/api/video/part?id=${s.id}&n=${n}`, s.token, bytes, loaded => onProgress(sent + loaded))); break; }
        catch (error) {
          if (attempt >= 4 || (error.status >= 400 && error.status < 500)) throw error;
          await new Promise(r => setTimeout(r, 1500 * attempt));
        }
      }
      sent += end - start;
      onProgress(sent);
    }
    await postJson('/testimonials/api/video/complete', {id: s.id, token: s.token, parts});
  } catch (error) {
    postJson('/testimonials/api/video/abort', {id: s.id, token: s.token}).catch(() => {});
    throw error;
  }
  return {id: s.id, token: s.token};
}
// A still frame from about a second in, as a JPEG, for the player's poster. Null if the browser can't decode it.
function capturePoster(video) {
  return new Promise(resolve => {
    const timer = setTimeout(() => resolve(null), 6000);
    const grab = () => {
      try {
        const w = video.videoWidth, h = video.videoHeight;
        if (!w || !h) return resolve(null);
        const scale = Math.min(1, 1280 / Math.max(w, h));
        const canvas = el('canvas', {width: Math.round(w * scale), height: Math.round(h * scale)});
        canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(b => { clearTimeout(timer); resolve(b && b.size > 2000 ? b : null); }, 'image/jpeg', 0.82);
      } catch { clearTimeout(timer); resolve(null); }
    };
    const seek = () => { video.addEventListener('seeked', grab, {once: true}); video.currentTime = Math.min(1, (video.duration || 2) / 3); };
    if (video.readyState >= 1) seek(); else video.addEventListener('loadedmetadata', seek, {once: true});
    video.addEventListener('error', () => { clearTimeout(timer); resolve(null); }, {once: true});
  });
}

function setupVideo(form, say) {
  const field = form.querySelector('[data-video-field]');
  if (!field || !('Blob' in window) || !File.prototype.slice) return null;
  form.querySelectorAll('[data-video-only]').forEach(n => { n.hidden = false; });
  const choose = field.querySelector('[data-video-choose]'), record = field.querySelector('[data-video-record]');
  const input = field.querySelector('[data-video-input]'), capture = field.querySelector('[data-video-capture]');
  const selected = field.querySelector('[data-video-selected]'), preview = field.querySelector('[data-video-preview]');
  const consent = field.querySelector('[data-video-consent]'), progress = field.querySelector('[data-video-progress]');
  const bar = field.querySelector('[data-video-bar]'), progressText = field.querySelector('[data-video-progress-text]');
  const quote = form.querySelector('textarea[name=quote]'), quoteLabel = form.querySelector('[data-quote-label]');
  // Phones get two buttons: record a new selfie video (front camera) or pick one from the library. capture="user"
  // sits only on the record input, so the library stays available.
  if (matchMedia('(pointer: coarse)').matches) { record.hidden = false; field.querySelector('[data-video-choose-label]').textContent = 'Choose from my videos'; }
  record.addEventListener('click', () => capture.click());
  choose.addEventListener('click', () => input.click());
  const state = {file: null, type: '', duration: null, poster: null, uploaded: null, url: ''};
  const reset = () => {
    if (state.url) URL.revokeObjectURL(state.url);
    Object.assign(state, {file: null, type: '', duration: null, poster: null, uploaded: null, url: ''});
    preview.removeAttribute('src'); preview.load();
    selected.hidden = consent.hidden = progress.hidden = true;
    quote.required = true; quoteLabel.textContent = 'Your testimonial (required)';
    choose.hidden = false; record.hidden = !matchMedia('(pointer: coarse)').matches;
  };
  const pick = file => {
    if (!file) return;
    const type = videoType(file);
    // Format and size are only mentioned when a file doesn't fit (no hint text under the buttons).
    if (!type) return say(VIDEO_RULE, true);
    if (file.size > MAX_VIDEO_BYTES) return say(`${VIDEO_RULE} That one is ${mb(file.size)}; please trim it or record a shorter clip.`, true);
    if (file.size < 1024) return say('That video file is empty. Please try again.', true);
    reset();
    Object.assign(state, {file, type, url: URL.createObjectURL(file)});
    field.querySelector('[data-video-name]').textContent = file.name || 'Your video';
    field.querySelector('[data-video-size]').textContent = mb(file.size);
    preview.src = state.url;
    preview.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(preview.duration)) { state.duration = preview.duration; field.querySelector('[data-video-size]').textContent = `${mb(file.size)} · ${Math.floor(preview.duration / 60)}:${String(Math.round(preview.duration % 60)).padStart(2, '0')}`; }
    }, {once: true});
    capturePoster(preview).then(b => { if (state.file === file) state.poster = b; });
    selected.hidden = consent.hidden = false;
    choose.hidden = record.hidden = true;
    quote.required = false; quoteLabel.textContent = 'Your words (optional with a video)';
    say('');
    field.querySelector('[data-video-remove]').focus();
  };
  for (const n of [input, capture]) n.addEventListener('change', () => { const f = n.files[0]; n.value = ''; pick(f); });
  field.querySelector('[data-video-remove]').addEventListener('click', () => { reset(); choose.focus(); });
  return {
    has: () => Boolean(state.file),
    // Uploads once per chosen file (a failed form send can be retried without uploading again).
    async addTo(data) {
      if (!state.file) return;
      if (!state.uploaded) {
        progress.hidden = false;
        const total = state.file.size;
        const show = done => { const pct = Math.min(100, Math.floor(done / total * 100)); bar.value = pct; progressText.textContent = `Uploading your video… ${pct}% (${mb(done)} of ${mb(total)}). Please keep this page open.`; };
        show(0);
        let lock = null;
        try { lock = await navigator.wakeLock?.request('screen'); } catch {}
        try { state.uploaded = await uploadVideo(state.file, state.type, show); }
        catch (error) { progressText.textContent = 'The upload stopped.'; throw error; }
        finally { lock?.release?.().catch(() => {}); }
        progressText.textContent = 'Video uploaded.';
      }
      data.set('videoId', state.uploaded.id);
      data.set('videoToken', state.uploaded.token);
      if (state.duration) data.set('videoDuration', String(Math.round(state.duration)));
      if (state.poster) data.set('posterFrame', new File([state.poster], 'poster.jpg', {type: 'image/jpeg'}));
    },
  };
}

function setupForm() {
  const form = document.querySelector('[data-testimonial-form]');
  if (!form) return;
  const input = form.querySelector('[data-photo-input]'), previews = form.querySelector('[data-photo-previews]');
  const field = form.querySelector('[data-photo-field]'), add = form.querySelector('[data-photo-add]'), count = form.querySelector('[data-photo-count]');
  // With JavaScript, a styled "Add photos" button replaces the native input (kept visually hidden, out of the tab order);
  // without it, the native file input stays visible and submits normally.
  field.classList.add('js-photos');
  input.tabIndex = -1;
  add.hidden = false;
  add.addEventListener('click', () => input.click());
  const status = form.querySelector('[data-form-status]'), submit = form.querySelector('button[type=submit]');
  const say = (text, error = false) => { status.textContent = text; status.classList.toggle('error', error); };
  const video = setupVideo(form, say);
  let photos = [];
  const render = () => {
    previews.replaceChildren(...photos.map((file, i) => {
      const li = el('li');
      if (isHeic(file)) li.append(el('span', {className: 'no-preview', textContent: 'HEIC photo'}));
      else { const url = URL.createObjectURL(file); li.append(el('img', {src: url, alt: `Selected photo ${i + 1}: ${file.name}`, onload: () => URL.revokeObjectURL(url)})); }
      li.append(el('button', {type: 'button', textContent: '×', ariaLabel: `Remove photo ${i + 1} (${file.name})`, onclick: () => { photos.splice(i, 1); render(); (previews.querySelector('li:last-child button') || add).focus(); }}));
      return li;
    }));
    const full = photos.length >= MAX_PHOTOS;
    add.hidden = full;
    add.lastChild.textContent = photos.length ? ' Add more photos' : ' Add photos';
    count.textContent = photos.length ? `${photos.length} of ${MAX_PHOTOS} photos added${full ? ' (maximum)' : ''}.` : '';
  };
  input.addEventListener('change', () => {
    const chosen = [...input.files];
    input.value = '';
    const tooBig = chosen.filter(f => f.size > MAX_BYTES);
    const ok = chosen.filter(f => f.size <= MAX_BYTES && (/^image\//.test(f.type) || /\.(jpe?g|png|webp|hei[cf])$/i.test(f.name)));
    const room = MAX_PHOTOS - photos.length;
    photos = [...photos, ...ok.slice(0, Math.max(0, room))];
    render();
    if (photos.length) (add.hidden ? previews.querySelector('li:last-child button') : add).focus();
    const notes = [];
    if (tooBig.length) notes.push(`${tooBig.map(f => `“${f.name}”`).join(', ')} ${tooBig.length > 1 ? 'are' : 'is'} too large. Photos need to be 10 MB or smaller.`);
    if (ok.length > room) notes.push(`You can add up to ${MAX_PHOTOS} photos.`);
    if (chosen.length > ok.length + tooBig.length) notes.push('That file type won’t work. Please use JPEG, PNG, WebP or HEIC.');
    say(notes.join(' '), notes.length > 0);
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    form.querySelectorAll('[aria-invalid]').forEach(n => n.removeAttribute('aria-invalid'));
    const invalid = [...form.querySelectorAll('input,textarea,select')].filter(n => n.name !== 'website' && n.type !== 'file' && !n.checkValidity());
    if (invalid.length) {
      invalid.forEach(n => n.setAttribute('aria-invalid', 'true'));
      const first = invalid[0];
      say(first.name === 'email' ? 'Please check your email address, or leave it blank.' : first.name === 'quote' ? 'Please write a few words about the painting, or add a video.' : 'Please fill in the required fields.', true);
      first.focus();
      return;
    }
    submit.disabled = true;
    try {
      const data = new FormData(form);
      data.delete('photos');
      if (photos.length) say(`Preparing ${photos.length === 1 ? 'your photo' : photos.length + ' photos'}…`);
      for (const file of photos) data.append('photos', await prepare(file));
      if (video?.has()) { say('Uploading your video…'); await video.addTo(data); }
      else { data.delete('videoSite'); data.delete('videoSocial'); }
      say('Sending…');
      const r = await fetch(form.action, {method: 'POST', body: data, headers: {Accept: 'application/json'}});
      const result = await r.json().catch(() => ({}));
      if (!r.ok || !result.success) throw Error(result.error || 'Sorry, something went wrong. Please try again, or email tj@tjm.art.');
      form.hidden = true;
      if (video?.has()) document.querySelector('[data-thanks-video]').hidden = false;
      if (!data.get('email')) document.querySelector('[data-thanks-code]').hidden = true; // no email, no code
      const thanks = document.querySelector('[data-thanks]');
      thanks.hidden = false; thanks.focus();
    } catch (error) {
      say(error.message, true);
    } finally { submit.disabled = false; }
  });
  // Non-JavaScript fallback redirects back here with ?thanks=1 or ?error=...
  const params = new URLSearchParams(location.search);
  if (params.has('thanks')) { form.hidden = true; document.querySelector('[data-thanks]').hidden = false; }
  else if (params.get('error')) say(params.get('error'), true);
}

loadApproved();
setupForm();
