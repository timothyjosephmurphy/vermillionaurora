// /testimonials/: loads approved testimonials at request time and submits the public form.
// Photos are resized in the browser (max 2000 px, JPEG) which also drops their EXIF/GPS metadata;
// the Worker strips metadata again server-side, so a raw upload is still safe.
const MAX_PHOTOS = 4, MAX_BYTES = 10 * 1024 * 1024, MAX_EDGE = 2000;
const HEIC2ANY = {src: 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js', integrity: 'sha384-OTofQ0MEeiSgh62havBcemCIK0gqj809wX6UA0uPISNMRnR6NZyCdGzX3SbLrgwL'};
const el = (tag, props = {}, ...children) => { const n = Object.assign(document.createElement(tag), props); n.append(...children.filter(c => c != null && c !== false)); return n; };

function card(t) {
  const li = el('li', {className: 'testimonial', id: t.id});
  const [first, ...rest] = t.photos || [];
  const who = t.name || 'A collector';
  if (first) li.append(el('img', {className: 'testimonial-photo', src: first, alt: `${t.painting || 'Painting by TJ Murphy'} with ${who}`, loading: 'lazy', decoding: 'async'}));
  if (rest.length) li.append(el('ul', {className: 'testimonial-thumbs'}, ...rest.map((src, i) => el('li', {}, el('a', {href: src, target: '_blank', rel: 'noopener'}, el('img', {src, alt: `More from ${who} (photo ${i + 2})`, loading: 'lazy', decoding: 'async'}))))));
  li.append(el('blockquote', {}, el('p', {textContent: `“${t.quote}”`})));
  const meta = el('span', {}, el('strong', {textContent: who}), t.city ? ` · ${t.city}` : '');
  if (t.painting || t.paintingHref) meta.append(el('br'), t.paintingHref ? el('a', {href: t.paintingHref, textContent: t.painting || 'See the painting'}) : t.painting);
  li.append(el('p', {className: 'testimonial-meta'}, meta));
  return li;
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

function setupForm() {
  const form = document.querySelector('[data-testimonial-form]');
  if (!form) return;
  const input = form.querySelector('[data-photo-input]'), previews = form.querySelector('[data-photo-previews]');
  const status = form.querySelector('[data-form-status]'), submit = form.querySelector('button[type=submit]');
  const say = (text, error = false) => { status.textContent = text; status.classList.toggle('error', error); };
  let photos = [];
  const render = () => {
    previews.replaceChildren(...photos.map((file, i) => {
      const li = el('li');
      if (isHeic(file)) li.append(el('span', {className: 'no-preview', textContent: 'HEIC photo'}));
      else { const url = URL.createObjectURL(file); li.append(el('img', {src: url, alt: `Selected photo ${i + 1}: ${file.name}`, onload: () => URL.revokeObjectURL(url)})); }
      li.append(el('button', {type: 'button', textContent: '×', ariaLabel: `Remove photo ${i + 1} (${file.name})`, onclick: () => { photos.splice(i, 1); render(); input.focus(); }}));
      return li;
    }));
  };
  input.addEventListener('change', () => {
    const chosen = [...input.files];
    input.value = '';
    const tooBig = chosen.filter(f => f.size > MAX_BYTES);
    const ok = chosen.filter(f => f.size <= MAX_BYTES && (/^image\//.test(f.type) || /\.(jpe?g|png|webp|hei[cf])$/i.test(f.name)));
    const room = MAX_PHOTOS - photos.length;
    photos = [...photos, ...ok.slice(0, Math.max(0, room))];
    render();
    const notes = [];
    if (tooBig.length) notes.push(`${tooBig.map(f => f.name).join(', ')} ${tooBig.length > 1 ? 'are' : 'is'} over 10 MB.`);
    if (ok.length > room) notes.push(`You can add up to ${MAX_PHOTOS} photos.`);
    if (chosen.length > ok.length + tooBig.length) notes.push('Only JPEG, PNG, WebP or HEIC photos can be added.');
    say(notes.join(' '), notes.length > 0);
  });
  form.addEventListener('submit', async event => {
    event.preventDefault();
    form.querySelectorAll('[aria-invalid]').forEach(n => n.removeAttribute('aria-invalid'));
    const invalid = [...form.querySelectorAll('input,textarea,select')].filter(n => n.name !== 'website' && !n.checkValidity());
    if (invalid.length) {
      invalid.forEach(n => n.setAttribute('aria-invalid', 'true'));
      const first = invalid[0];
      say(first.name === 'consent' ? 'Please tick the consent box so I can publish your testimonial.' : first.name === 'email' ? 'Please enter a valid email address.' : 'Please fill in the required fields.', true);
      first.focus();
      return;
    }
    submit.disabled = true;
    try {
      const data = new FormData(form);
      data.delete('photos');
      if (photos.length) say(`Preparing ${photos.length === 1 ? 'your photo' : photos.length + ' photos'}…`);
      for (const file of photos) data.append('photos', await prepare(file));
      say('Sending…');
      const r = await fetch(form.action, {method: 'POST', body: data, headers: {Accept: 'application/json'}});
      const result = await r.json().catch(() => ({}));
      if (!r.ok || !result.success) throw Error(result.error || 'Sorry, something went wrong. Please try again, or email tj@vermillionaurora.com.');
      form.hidden = true;
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
