// Collector testimonials: public submission, owner moderation, and the approved list for /testimonials/ and the map.
// Storage: the existing private R2 bucket COMMISSION_UPLOADS (no new bindings).
//   testimonials/records/<id>.json   one record per submission (status pending | approved), includes the private email
//   testimonials/images/<id>/<n>.<ext> photos after metadata stripping (EXIF GPS removed); HEIC is kept private only
//   testimonials/approved.json       public index rebuilt on every approve / unpublish / delete
//   testimonials/rate/<day>/<hash>   per-visitor submission counters (hashed IP), purged by the hourly cron
//   testimonials/videos/<id>/, testimonials/uploads/<id>.json   optional video + poster (see testimonial-videos.mjs)
// Nothing is published until TJ approves it on https://tjm.art/testimonial-manager/.
import {inventory} from './checkout-catalog.mjs';
import {authorized} from './etsy-connection.mjs';
import {issueCollectorCode} from './print-codes.mjs';
import {sellerMailToken} from './shipping-email.mjs';
import {isSiteOrigin} from './site-origins.mjs';
import {cleanImage} from './image-metadata.mjs';
import {PUBLISH_NOTICE, PUBLISH_NOTICE_VERSION, ANONYMOUS_NAME} from './testimonial-notice.mjs';
import {videoUpload, verifiedUpload, discardUpload, deleteVideoFiles, manifestKey, serveMedia, playbackType, signedVideoUrls, privateMedia, purgeTestimonialVideos, MAX_VIDEO_BYTES} from './testimonial-videos.mjs';
export {MAX_VIDEO_BYTES};

export const OWNER_ORIGIN = 'https://tjm.art';
export const MANAGER_URL = 'https://tjm.art/testimonial-manager/';
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
export const MAX_PHOTOS = 4;
export const DAILY_LIMIT = 5;        // per visitor (hashed IP) per UTC day
export const DAILY_TOTAL_LIMIT = 60; // across everyone, bounds storage abuse
export const MAX_POSTER_BYTES = 2 * 1024 * 1024;
const ACCEPTED = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif']);
const EXT = {'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp', 'image/heic': 'heic', 'image/heif': 'heif'};
const ID = /^t-\d{8}-[0-9a-f]{12}$/;
const RECORDS = 'testimonials/records/';
const INDEX = 'testimonials/approved.json';
const RATE = 'testimonials/rate/';
const recordKey = id => RECORDS + id + '.json';
const imageKey = (id, n, type) => `testimonials/images/${id}/${n}.${EXT[type]}`;
const privateHeaders = {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow'};
const reply = (body, status = 200, extra = {}) => Response.json(body, {status, headers: {...privateHeaders, ...extra}});
const clean = (v, n) => typeof v === 'string' ? v.replace(/\0/g, '').replace(/\r\n?/g, '\n').trim().slice(0, n) : '';
const oneLine = (v, n) => clean(v, n).replace(/\s+/g, ' ');
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const day = (now = Date.now()) => new Date(now).toISOString().slice(0, 10);
const hex = buf => [...new Uint8Array(buf)].map(n => n.toString(16).padStart(2, '0')).join('');
const sha = async text => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
const round2 = n => Math.round(n * 100) / 100;
export const validSlug = slug => typeof slug === 'string' && /^[a-z0-9-]{1,150}$/.test(slug) && Object.hasOwn(inventory, slug);
const validCoord = (lat, lng) => Number.isFinite(lat) && Number.isFinite(lng) && Math.abs(lat) <= 90 && Math.abs(lng) <= 180;

export async function testimonialsApi(request, env, ctx, now = Date.now()) {
  const path = new URL(request.url).pathname;
  if (path === '/testimonials/api/submit') return submit(request, env, ctx, now);
  if (path === '/testimonials/api/approved' && ['GET', 'HEAD'].includes(request.method)) return approvedList(env);
  const photo = /^\/testimonials\/api\/photo\/(t-\d{8}-[0-9a-f]{12})\/([0-3])$/.exec(path);
  if (photo && ['GET', 'HEAD'].includes(request.method)) return publicPhoto(env, photo[1], Number(photo[2]));
  if (path === '/testimonials/api/owner') return owner(request, env, now);
  const upload = /^\/testimonials\/api\/video\/(start|part|complete|abort)$/.exec(path);
  if (upload) return videoUpload(request, env, now, upload[1], {rateLimited});
  if (!['GET', 'HEAD'].includes(request.method)) return reply({error: 'Not found'}, 404);
  const privateVideo = /^\/testimonials\/api\/video\/private\/(t-\d{8}-[0-9a-f]{12})\/(video|poster)$/.exec(path);
  if (privateVideo) return privateMedia(request, env, privateVideo[1], privateVideo[2], now, id => loadRecord(env, id));
  const video = /^\/testimonials\/api\/video\/(t-\d{8}-[0-9a-f]{12})(\/poster)?$/.exec(path);
  if (video) return publicVideo(request, env, video[1], Boolean(video[2]));
  return reply({error: 'Not found'}, 404);
}

// ---------- Public submission ----------
function wantsHtml(request) {
  const accept = request.headers.get('Accept') || '';
  return accept.includes('text/html') && !accept.includes('application/json');
}
function done(request, ok, payload, status) {
  if (wantsHtml(request)) return new Response(null, {status: 303, headers: {...privateHeaders, Location: `${OWNER_ORIGIN}/testimonials/?${ok ? 'thanks=1' : 'error=' + encodeURIComponent(payload.error)}#share`}});
  return reply(payload, status);
}

async function rateLimited(env, request, now, {scope = '', perVisitor = DAILY_LIMIT, total: totalLimit = DAILY_TOTAL_LIMIT} = {}) {
  const bucket = env.COMMISSION_UPLOADS, today = day(now);
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const visitor = `${RATE}${today}/${scope ? scope + '-' : ''}${(await sha(`testimonial-rate:${scope}${today}:${ip}:${env.COMMISSION_MANAGER_TOKEN || ''}`)).slice(0, 32)}`;
  const total = `${RATE}${today}/_${scope || 'all'}`;
  const read = async key => { const o = await bucket.get(key); return o ? Number(await o.text()) || 0 : 0; };
  const [mine, all] = await Promise.all([read(visitor), read(total)]);
  if (mine >= perVisitor || all >= totalLimit) return true;
  await Promise.all([bucket.put(visitor, String(mine + 1)), bucket.put(total, String(all + 1))]);
  return false;
}

async function submit(request, env, ctx, now) {
  if (request.method === 'OPTIONS') return new Response(null, {status: 204, headers: {...privateHeaders, 'Access-Control-Allow-Origin': OWNER_ORIGIN, 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type'}});
  if (request.method !== 'POST') return reply({success: false, error: 'Method not allowed'}, 405);
  const origin = request.headers.get('Origin');
  if (origin && !isSiteOrigin(origin)) return reply({success: false, error: 'Origin not allowed'}, 403);
  if (!env.COMMISSION_UPLOADS) return reply({success: false, error: 'Submissions are temporarily unavailable.'}, 503);
  if (!(request.headers.get('Content-Type') || '').includes('multipart/form-data')) return reply({success: false, error: 'Expected multipart form data'}, 400);
  const fail = (error, status = 400) => done(request, false, {success: false, error}, status);
  let form;
  try { form = await request.formData(); } catch { return fail('The form could not be read. Please try again with smaller photos.', 413); }
  // Optional video, uploaded beforehand through /testimonials/api/video/* (the browser sends its id and upload token).
  const videoId = oneLine(form.get('videoId'), 40);
  const upload = videoId ? await verifiedUpload(env, videoId, form.get('videoToken')) : null;
  // Honeypot: bots fill every field. Pretend success and store nothing (an uploaded video is deleted too).
  if (clean(form.get('website'), 200)) {
    if (upload && upload.manifest.state !== 'attached') await discardUpload(env, upload.manifest).catch(() => {});
    return done(request, true, {success: true}, 200);
  }
  if (videoId && (!upload || upload.manifest.state !== 'complete')) return fail('Your video upload didn’t finish or has expired. Please choose the video again.');
  const video = upload?.manifest;
  const name = oneLine(form.get('name'), 80);
  const email = oneLine(form.get('email'), 254);
  const quote = clean(form.get('quote'), 2000);
  const city = oneLine(form.get('city'), 100);
  const slug = oneLine(form.get('paintingSlug'), 150);
  const paintingSlug = validSlug(slug) ? slug : '';
  const paintingTitle = oneLine(form.get('painting'), 200);
  // Email is optional: it's only for the thank-you print code. Without one, approval publishes but sends nothing.
  if (email && !validEmail(email)) return fail('Please check your email address, or leave it blank.');
  if (!video && quote.length < 3) return fail('Please write a few words about what the painting means to you, or add a video.');
  const files = form.getAll('photos').filter(f => f instanceof File && f.size > 0);
  if (files.length > MAX_PHOTOS) return fail(`Please choose up to ${MAX_PHOTOS} photos.`);
  const photos = [];
  for (const [n, file] of files.entries()) {
    if (file.size > MAX_PHOTO_BYTES) return fail(`“${file.name.slice(0, 60)}” is too large. Photos need to be 10 MB or smaller.`);
    let cleaned;
    try { cleaned = cleanImage(new Uint8Array(await file.arrayBuffer())); } catch { return fail(`“${file.name.slice(0, 60)}” is not a JPEG, PNG, WebP or HEIC photo.`); }
    if (!ACCEPTED.has(cleaned.type)) return fail('Photos must be JPEG, PNG, WebP or HEIC.');
    photos.push({n, ...cleaned, originalName: oneLine(file.name, 120)});
  }
  // Poster: a still frame the browser captured from the video (JPEG). Metadata is stripped like any photo.
  let poster = null;
  const posterFile = video ? form.get('posterFrame') : null;
  if (posterFile instanceof File && posterFile.size > 0 && posterFile.size <= MAX_POSTER_BYTES) {
    try { const p = cleanImage(new Uint8Array(await posterFile.arrayBuffer())); if (['image/jpeg', 'image/png', 'image/webp'].includes(p.type)) poster = p; } catch {}
  }
  if (await rateLimited(env, request, now)) return fail('Thank you! I’ve received several testimonials from you today. Please try again tomorrow or email tj@vermillionaurora.com.', 429);

  const id = video ? video.id : `t-${day(now).replace(/-/g, '')}-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  const bucket = env.COMMISSION_UPLOADS;
  const posterKey = poster ? `testimonials/videos/${id}/poster.${EXT[poster.type]}` : '';
  const duration = Number(form.get('videoDuration'));
  const geo = city ? await geocodeCity(city, env).catch(() => null) : null;
  const record = {
    id, status: 'pending', createdAt: new Date(now).toISOString(),
    name, email, quote, city, paintingSlug, paintingTitle,
    // No checkbox: sending the form under the notice above the button is the consent to publish (after TJ approves).
    publishConsent: 'implied-by-submit',
    consent: {publish: true, basis: 'implied-by-submit', notice: PUBLISH_NOTICE, noticeVersion: PUBLISH_NOTICE_VERSION,
      shownVersion: oneLine(form.get('publishNotice'), 20) || null,
      scope: 'name (if given), words, photos and city (approximate city pin on the map)', at: new Date(now).toISOString()},
    geo,
    photos: photos.map(p => ({n: p.n, key: imageKey(id, p.n, p.type), type: p.type, bytes: p.bytes.byteLength, originalName: p.originalName, publishable: p.publishable, removed: p.removed})),
    ...(video ? {video: {
      key: video.key, type: video.type, bytes: video.size, originalName: video.originalName,
      duration: Number.isFinite(duration) && duration > 0 && duration < 36000 ? Math.round(duration) : null,
      poster: poster ? {key: posterKey, type: poster.type} : null,
      // Two separate, optional permissions. Neither ticked = the video is for TJ only, never shown anywhere.
      consent: {site: form.get('videoSite') === 'yes', social: form.get('videoSocial') === 'yes', at: new Date(now).toISOString()},
    }} : {}),
  };
  const written = [];
  let stored;
  try {
    for (const p of photos) { const key = imageKey(id, p.n, p.type); await bucket.put(key, p.bytes, {httpMetadata: {contentType: p.type}}); written.push(key); }
    if (poster) { await bucket.put(posterKey, poster.bytes, {httpMetadata: {contentType: poster.type}}); written.push(posterKey); }
    stored = await bucket.put(recordKey(id), JSON.stringify(record), {httpMetadata: {contentType: 'application/json'}});
    // The video now belongs to this testimonial: retention follows the record from here on.
    if (video) await bucket.put(manifestKey(id), JSON.stringify({...video, state: 'attached', recordId: id, attachedAt: new Date(now).toISOString()}), {httpMetadata: {contentType: 'application/json'}});
  } catch (error) {
    console.error('Testimonial storage failed');
    if (written.length) await bucket.delete(written).catch(() => {});
    return fail('Sorry, your testimonial could not be saved. Please try again.', 500);
  }
  // Record the notification outcome on the private record so the owner page can show it (skipped if TJ already acted).
  const mark = extra => bucket.put(recordKey(id), JSON.stringify({...record, ...extra}), {onlyIf: {etagMatches: stored?.etag}, httpMetadata: {contentType: 'application/json'}}).catch(() => {});
  const notify = notifyOwner(env, record).then(() => mark({notifiedAt: new Date().toISOString()}), error => {
    console.error('Testimonial notification failed', String(error?.message || '').slice(0, 120));
    return mark({notifyError: String(error?.message || 'failed').slice(0, 120)});
  });
  if (ctx?.waitUntil) ctx.waitUntil(notify); else await notify;
  return done(request, true, {success: true, id}, 200);
}

// City-level geocoding only: the visitor types a city, never an address; coordinates are rounded to ~1 km.
export async function geocodeCity(city, env = {}) {
  const query = oneLine(city, 100);
  if (!query) return null;
  const ua = {'User-Agent': 'tjm.art testimonials map (tj@vermillionaurora.com)', 'Accept-Language': 'en'};
  try {
    const r = await fetch(`https://nominatim.openstreetmap.org/search?${new URLSearchParams({q: query, format: 'jsonv2', limit: '1', featureType: 'settlement', addressdetails: '0'})}`, {headers: ua, signal: AbortSignal.timeout(4000)});
    if (r.ok) {
      const [hit] = await r.json();
      const lat = Number(hit?.lat), lng = Number(hit?.lon);
      if (validCoord(lat, lng)) return {lat: round2(lat), lng: round2(lng), label: oneLine(hit.display_name, 160), source: 'OpenStreetMap Nominatim'};
    }
  } catch {}
  try {
    const [placeName, ...rest] = query.split(',').map(s => s.trim()).filter(Boolean);
    const r = await fetch(`https://geocoding-api.open-meteo.com/v1/search?${new URLSearchParams({name: placeName, count: '10', language: 'en', format: 'json'})}`, {headers: ua, signal: AbortSignal.timeout(4000)});
    if (r.ok) {
      const results = (await r.json()).results || [];
      const want = rest.join(' ').toLowerCase();
      const score = x => (want && [x.admin1, x.country, x.country_code].some(v => v && want.includes(String(v).toLowerCase())) ? 1e12 : 0) + (x.population || 0);
      const hit = results.sort((a, b) => score(b) - score(a))[0];
      if (hit && validCoord(hit.latitude, hit.longitude)) return {lat: round2(hit.latitude), lng: round2(hit.longitude), label: [hit.name, hit.admin1, hit.country].filter(Boolean).join(', '), source: 'Open-Meteo / GeoNames'};
    }
  } catch {}
  return null;
}

// Same Gmail identity and inbox as commission requests (tj@vermillionaurora.com). Photos are not attached.
async function notifyOwner(env, record) {
  const token = await sellerMailToken(env);
  const sender = 'tj@vermillionaurora.com';
  const painting = record.paintingTitle || (record.paintingSlug ? record.paintingSlug : 'Not specified');
  const body = [
    'New testimonial waiting for your approval', '',
    `Name: ${record.name || 'Not given (shown as “A collector”)'}`,
    `Email (private): ${record.email || 'Not given (no thank-you code will be sent)'}`,
    `Painting: ${painting}${record.paintingSlug ? ` (https://tjm.art/products/${record.paintingSlug}/)` : ''}`,
    `City: ${record.city || 'Not given'}`,
    `Photos: ${record.photos.length}`,
    `Video: ${record.video ? `yes (${Math.round(record.video.bytes / 1048576)} MB${record.video.duration ? `, ${record.video.duration} s` : ''}) · may show on tjm.art: ${record.video.consent.site ? 'yes' : 'no'} · may share on social media: ${record.video.consent.social ? 'yes' : 'no'}` : 'none'}`, '',
    'Testimonial:', record.quote || '(no written words; see the video)', '',
    `Approve or reject: ${MANAGER_URL}`,
    'Nothing is published until you approve it. After approval you can issue their at-cost print code from the same page.',
    `Reference: ${record.id}`,
  ].join('\r\n');
  const mime = [
    `From: TJM.art Website <${sender}>`, `To: ${sender}`, ...(record.email ? [`Reply-To: ${record.email}`] : []),
    `Subject: ${mimeHeader(`New testimonial — ${record.name || 'no name given'}`)}`,
    'MIME-Version: 1.0', 'Content-Type: text/plain; charset="UTF-8"', 'Content-Transfer-Encoding: 8bit', '', body, '',
  ].join('\r\n');
  const r = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST', signal: AbortSignal.timeout(15000),
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({raw: base64url(mime)}),
  });
  if (!r.ok) throw Error(`Gmail ${r.status}`);
}
function utf8b64(v) { const b = new TextEncoder().encode(v); let s = ''; for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode(...b.subarray(i, i + 0x8000)); return btoa(s); }
const mimeHeader = v => `=?UTF-8?B?${utf8b64(v)}?=`;
const base64url = v => utf8b64(v).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

// ---------- Public read ----------
async function readIndex(env) {
  const o = await env.COMMISSION_UPLOADS?.get(INDEX);
  return o ? await o.json() : {testimonials: []};
}
async function approvedList(env) {
  if (!env.COMMISSION_UPLOADS) return reply({testimonials: []}, 200);
  const index = await readIndex(env);
  return Response.json({testimonials: (index.testimonials || []).map(forClient), updatedAt: index.updatedAt || null}, {headers: {'Cache-Control': 'public, max-age=60, must-revalidate', 'CDN-Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff'}});
}
async function publicPhoto(env, id, n) {
  if (!env.COMMISSION_UPLOADS) return reply({error: 'Not found'}, 404);
  const entry = (await readIndex(env)).testimonials?.find(t => t.id === id);
  const key = entry?.photoKeys?.[entry.photos.findIndex(url => url.endsWith(`/${id}/${n}`))];
  if (!key) return reply({error: 'Not found'}, 404);
  const object = await env.COMMISSION_UPLOADS.get(key);
  if (!object) return reply({error: 'Not found'}, 404);
  const type = object.httpMetadata?.contentType;
  if (!['image/jpeg', 'image/png', 'image/webp'].includes(type)) return reply({error: 'Not found'}, 404);
  return new Response(object.body, {headers: {'Content-Type': type, 'Cache-Control': 'public, max-age=86400', 'X-Content-Type-Options': 'nosniff', 'Content-Disposition': 'inline', 'Cross-Origin-Resource-Policy': 'cross-origin'}});
}
// Only videos listed in the public index are served: approved, set to show by TJ, and the collector ticked
// "TJ can show my video on tjm.art". Everything else 404s here.
async function publicVideo(request, env, id, poster) {
  if (!env.COMMISSION_UPLOADS) return reply({error: 'Not found'}, 404);
  const entry = (await readIndex(env)).testimonials?.find(t => t.id === id);
  const keys = entry?.videoKeys;
  if (!entry?.video || !keys) return reply({error: 'Not found'}, 404);
  if (poster) return keys.poster ? serveMedia(request, env.COMMISSION_UPLOADS, keys.poster, {contentType: keys.posterType, cache: 'public, max-age=86400'}) : reply({error: 'Not found'}, 404);
  return serveMedia(request, env.COMMISSION_UPLOADS, keys.video, {contentType: entry.video.type, cache: 'public, max-age=3600'});
}
async function loadRecord(env, id) {
  const o = await env.COMMISSION_UPLOADS?.get(recordKey(id));
  return o ? o.json() : null;
}

// Public shape of an approved record. Email, original file names and moderation notes never leave the owner API.
// A video is public only when all three hold: TJ approved the testimonial, TJ left "show the video" on, and the
// collector ticked "TJ can show my video on tjm.art". The social-media permission never makes anything public here.
export const videoIsPublic = record => record.status === 'approved' && record.published?.video === true && Boolean(record.video) && !record.video.expired && record.video.consent?.site === true;
export function publicEntry(record) {
  const pub = record.published || {};
  const photos = (pub.photos || []).map(n => record.photos.find(p => p.n === n)).filter(p => p && p.publishable);
  const v = videoIsPublic(record) ? record.video : null;
  return {
    id: record.id,
    // No name given (or TJ cleared it) = “A collector”.
    name: ('name' in pub ? pub.name : record.name) || ANONYMOUS_NAME,
    city: pub.city ?? record.city ?? '',
    painting: pub.painting ?? record.paintingTitle ?? '',
    paintingHref: (pub.paintingSlug ?? record.paintingSlug) ? `/products/${pub.paintingSlug ?? record.paintingSlug}/` : '',
    quote: pub.quote ?? record.quote ?? '',
    photos: photos.map(p => `/testimonials/api/photo/${record.id}/${p.n}`),
    photoKeys: photos.map(p => p.key),
    video: v ? {src: `/testimonials/api/video/${record.id}`, type: playbackType(v.type), poster: v.poster ? `/testimonials/api/video/${record.id}/poster` : '', duration: v.duration || null} : null,
    ...(v ? {videoKeys: {video: v.key, poster: v.poster?.key || '', posterType: v.poster?.type || ''}} : {}),
    pin: pub.pin && validCoord(pub.pin[0], pub.pin[1]) ? [round2(pub.pin[0]), round2(pub.pin[1])] : null,
    approvedAt: record.approvedAt,
  };
}
const forClient = entry => { const {photoKeys, videoKeys, ...rest} = entry; return rest; };
// An approved testimonial with nothing to show (a private video and no words or photos) stays off the public page.
const hasPublicContent = entry => Boolean(entry.quote || entry.video || entry.photos.length);

async function listRecords(bucket) {
  const out = [];
  let cursor;
  do {
    const page = await bucket.list({prefix: RECORDS, limit: 500, ...(cursor ? {cursor} : {})});
    for (const item of page.objects) { const o = await bucket.get(item.key); if (o) out.push(await o.json()); }
    cursor = page.truncated ? page.cursor : null;
  } while (cursor);
  return out;
}
export async function rebuildIndex(env, now = Date.now()) {
  const approved = (await listRecords(env.COMMISSION_UPLOADS)).filter(r => r.status === 'approved')
    .sort((a, b) => String(b.approvedAt).localeCompare(String(a.approvedAt))).map(publicEntry).filter(hasPublicContent);
  // photoKeys stay in the stored index (used to serve photos) but are stripped from the public JSON response below.
  await env.COMMISSION_UPLOADS.put(INDEX, JSON.stringify({updatedAt: new Date(now).toISOString(), testimonials: approved}), {httpMetadata: {contentType: 'application/json'}});
  return approved.length;
}

// ---------- Owner moderation ----------
async function owner(request, env, now) {
  if (request.method !== 'POST' || request.headers.get('Origin') !== OWNER_ORIGIN || !await authorized(request, env)) return reply({error: 'Invalid management credential or origin.'}, 403);
  if (!env.COMMISSION_UPLOADS) return reply({error: 'Private storage unavailable'}, 503);
  let input;
  try { input = await request.json(); } catch { return reply({error: 'Invalid request'}, 400); }
  const bucket = env.COMMISSION_UPLOADS;
  if (input.action === 'list') {
    const records = (await listRecords(bucket)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return reply({records: await Promise.all(records.map(async r => ({...r, public: r.status === 'approved' ? forClient(publicEntry(r)) : null, videoUrls: await signedVideoUrls(env, r, now)})))});
  }
  if (input.action === 'geocode') return reply({geo: await geocodeCity(input.city, env)});
  if (!ID.test(input.id || '')) return reply({error: 'Invalid testimonial'}, 400);
  const object = await bucket.get(recordKey(input.id));
  if (!object) return reply({error: 'Testimonial not found'}, 404);
  const record = await object.json();
  const save = async next => {
    const ok = await bucket.put(recordKey(next.id), JSON.stringify(next), {onlyIf: {etagMatches: object.etag}, httpMetadata: {contentType: 'application/json'}});
    if (!ok) return null;
    await rebuildIndex(env, now);
    return next;
  };
  if (input.action === 'photo') {
    const photo = record.photos.find(p => p.n === Number(input.n));
    const data = photo && await bucket.get(photo.key);
    if (!data) return reply({error: 'Photo not found'}, 404);
    return new Response(data.body, {headers: {...privateHeaders, 'Content-Type': photo.type}});
  }
  if (input.action === 'approve') {
    const name = oneLine(input.name ?? record.name, 80), quote = clean(input.quote ?? record.quote, 2000);
    if (!quote && !record.video) return reply({error: 'Testimonial text is required'}, 400);
    const slug = oneLine(input.paintingSlug ?? record.paintingSlug, 150);
    if (slug && !validSlug(slug)) return reply({error: 'Unknown painting page (product slug)'}, 400);
    const photos = (Array.isArray(input.photos) ? input.photos : record.photos.map(p => p.n)).map(Number)
      .filter(n => record.photos.some(p => p.n === n && p.publishable));
    const lat = Number(input.lat), lng = Number(input.lng);
    const city = oneLine(input.city ?? record.city, 100);
    const pin = input.map !== false && city && input.lat !== '' && input.lng !== '' && validCoord(lat, lng) ? [round2(lat), round2(lng)] : null;
    const next = {...record, status: 'approved', approvedAt: record.approvedAt || new Date(now).toISOString(),
      published: {name, quote, city, painting: oneLine(input.painting ?? record.paintingTitle, 200), paintingSlug: slug, photos, pin,
        // TJ can keep a video off the page; it can only go on it when the collector gave the tjm.art permission.
        video: Boolean(record.video) && input.video !== false && record.video.consent?.site === true}};
    const saved = await save(next);
    if (!saved) return reply({error: 'Record changed; reload'}, 409);
    // Approval from Pending issues the code (once) and, unless unticked, sends the thank-you email (once). Edits to an
    // already-published testimonial never issue or send anything.
    if (record.status === 'approved') return reply({record: {...saved, public: forClient(publicEntry(saved))}, thanks: {}});
    const thanked = await thankCollector(env, saved, {send: input.sendThanks !== false, now});
    return reply({record: {...thanked.record, public: forClient(publicEntry(thanked.record))}, thanks: thanked.result});
  }
  if (input.action === 'sendThanks') {
    if (record.status !== 'approved') return reply({error: 'Approve the testimonial first'}, 409);
    const thanked = await thankCollector(env, record, {send: true, force: input.force === true, now});
    return reply({record: thanked.record, thanks: thanked.result}, thanked.result.error || thanked.result.noEmail ? 409 : 200);
  }
  // A collector asked to withdraw a video permission (e.g. by email). Permissions can be withdrawn here, never granted.
  if (input.action === 'withdrawVideoConsent') {
    if (!record.video) return reply({error: 'No video on this testimonial'}, 400);
    const consent = {...record.video.consent, withdrawnAt: new Date(now).toISOString()};
    if (input.site === true) consent.site = false;
    if (input.social === true) consent.social = false;
    const saved = await save({...record, video: {...record.video, consent}, ...(record.published ? {published: {...record.published, video: record.published.video && consent.site}} : {})});
    return saved ? reply({record: {...saved, public: saved.status === 'approved' ? forClient(publicEntry(saved)) : null, videoUrls: await signedVideoUrls(env, saved, now)}}) : reply({error: 'Record changed; reload'}, 409);
  }
  if (input.action === 'unpublish') {
    const {approvedAt, ...rest} = record;
    const saved = await save({...rest, status: 'pending', unpublishedAt: new Date(now).toISOString()});
    return saved ? reply({record: saved}) : reply({error: 'Record changed; reload'}, 409);
  }
  if (input.action === 'delete') {
    if (input.confirm !== record.id) return reply({error: 'Confirm the testimonial to delete'}, 400);
    const keys = record.photos.map(p => p.key).filter(k => k.startsWith(`testimonials/images/${record.id}/`));
    if (keys.length) await bucket.delete(keys);
    if (record.video) { await deleteVideoFiles(bucket, record.id); await bucket.delete(manifestKey(record.id)); }
    await bucket.delete(recordKey(record.id));
    await rebuildIndex(env, now);
    return reply({deleted: true});
  }
  if (input.action === 'issueCode') {
    if (record.status !== 'approved') return reply({error: 'Approve the testimonial before issuing a code'}, 409);
    const thanked = await thankCollector(env, record, {send: false, now});
    return reply({record: thanked.record, thanks: thanked.result}, thanked.result.error || thanked.result.noEmail ? 409 : 200);
  }
  return reply({error: 'Unknown action'}, 400);
}

// ---------- Thank-you code and email (on approval) ----------
// Idempotent per submission: the code is issued once and stored on the private record (record.thanks.code), and the
// email is sent at most once (record.thanks.emailAttemptAt is written before sending; a retry after an unknown outcome
// needs force:true from the owner). Set TESTIMONIAL_THANKS_EMAIL="false" on the Worker to turn automatic emails off.
export const THANKS_REPLY_TO = 'tj@tjm.art';
async function writeRecord(env, record, etag) {
  return env.COMMISSION_UPLOADS.put(recordKey(record.id), JSON.stringify(record), {...(etag ? {onlyIf: {etagMatches: etag}} : {}), httpMetadata: {contentType: 'application/json'}});
}
export const NO_EMAIL_NOTE = 'No email, so no code sent';
async function thankCollector(env, start, {send, force = false, now}) {
  const bucket = env.COMMISSION_UPLOADS;
  let object = await bucket.get(recordKey(start.id));
  let record = object ? await object.json() : start;
  let etag = object?.etag;
  const result = {};
  // No email given: the testimonial still publishes, but no code is issued and no thank-you is sent.
  if (!record.email) return {record, result: {noEmail: true, emailSkipped: NO_EMAIL_NOTE}};
  if (!record.thanks?.code) {
    if (!env.CART_ORDERS) return {record, result: {error: 'Print codes are unavailable on this Worker'}};
    // Claim issuance first so two approvals can never issue two codes.
    if (record.thanks?.issuingAt && now - Date.parse(record.thanks.issuingAt) < 120000) return {record, result: {error: 'A code is being issued; reload in a moment'}};
    const claimed = await writeRecord(env, {...record, thanks: {...record.thanks, issuingAt: new Date(now).toISOString()}}, etag);
    if (!claimed) return {record, result: {error: 'Record changed; reload'}};
    const issued = await issueCollectorCode(env, {name: record.name || '(no name given)', email: record.email, note: `Testimonial ${record.id}`});
    record = {...record, thanks: {code: issued.code, issuedAt: issued.issuedAt}};
    const stored = await writeRecord(env, record, null); // we hold the claim; never lose an issued code
    etag = stored?.etag;
    result.issued = true;
  }
  result.code = record.thanks.code;
  const enabled = env.TESTIMONIAL_THANKS_EMAIL !== 'false';
  if (send && !record.thanks.emailedAt) {
    if (!enabled) result.emailSkipped = 'Thank-you emails are turned off (TESTIMONIAL_THANKS_EMAIL=false)';
    else if (record.thanks.emailAttemptAt && !force) result.error = `An email attempt was made at ${record.thanks.emailAttemptAt} with an unknown result. Check the Sent folder of tj@vermillionaurora.com, then confirm to resend.`;
    else {
      const attempt = await writeRecord(env, {...record, thanks: {...record.thanks, emailAttemptAt: new Date(now).toISOString()}}, etag);
      if (!attempt) result.error = 'Record changed; reload';
      else {
        try {
          const id = await sendThanksEmail(env, record);
          record = {...record, thanks: {...record.thanks, emailAttemptAt: new Date(now).toISOString(), emailedAt: new Date(now).toISOString(), emailId: id, emailError: undefined}};
          result.emailed = true;
        } catch (error) {
          record = {...record, thanks: {...record.thanks, emailAttemptAt: undefined, emailError: String(error?.message || 'Email failed').slice(0, 160)}};
          result.error = 'The code was issued but the thank-you email could not be sent: ' + record.thanks.emailError;
        }
        await writeRecord(env, record, attempt.etag);
      }
    }
  }
  return {record, result};
}

export function thanksEmail(record) {
  // Greet by first name when there is one; otherwise a neutral greeting.
  const given = [record.published?.name, record.name].map(n => (n || '').trim()).find(n => n && n !== ANONYMOUS_NAME);
  const first = given ? given.split(/\s+/)[0] : '';
  const painting = record.published?.painting || record.paintingTitle;
  const subject = 'Thank you, and a print code for you';
  // A private video with no words or photos is not on the site, so the email doesn't link to it.
  const onSite = record.status !== 'approved' || hasPublicContent(publicEntry(record));
  const thanks = `Thank you so much for sharing what ${painting ? `“${painting}”` : 'my painting'} means to you. It means a lot to me that it has a good home with you.`;
  const body = [
    `Hi ${first || 'there'},`, '',
    ...(onSite ? [`${thanks} Your testimonial is now on my site:`, `https://tjm.art/testimonials/#${record.id}`] : [thanks]), '',
    'As a thank-you, here is your personal print code:', '',
    `    ${record.thanks.code}`, '',
    'It gets you fine-art prints of any of my paintings at the print lab’s cost plus shipping, with no markup. Put as many prints as you like in one order; the code works for one order. It doesn’t apply to original paintings or commission deposits.', '',
    'To use it: choose a print on any painting’s page (https://tjm.art/gallery/), then go to your cart at https://tjm.art/cart/ and enter the code in the “Discount code” box before calculating shipping & tax.', '',
    'Thank you again for being part of this.', '',
    'With gratitude,', 'TJ Murphy', 'https://tjm.art',
  ].join('\n');
  return {subject, body};
}
async function sendThanksEmail(env, record) {
  const token = await sellerMailToken(env);
  const {subject, body} = thanksEmail(record);
  const mime = [
    'From: TJ Murphy <tj@vermillionaurora.com>', `To: ${record.email}`, `Reply-To: ${THANKS_REPLY_TO}`,
    `Subject: ${mimeHeader(subject)}`, `Message-ID: <testimonial-thanks-${record.id}@tjm.art>`,
    'MIME-Version: 1.0', 'Content-Type: text/plain; charset="UTF-8"', 'Content-Transfer-Encoding: base64', '',
    utf8b64(body + '\n\nPrivacy: https://tjm.art/privacy/'), '',
  ].join('\r\n');
  const r = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST', signal: AbortSignal.timeout(20000),
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({raw: utf8b64(mime).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')}),
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.id) throw Error(`Gmail ${r.status}`);
  return data.id;
}

// Hourly cron: video retention (unattached uploads after 24 h, unapproved videos after 90 days, orphans).
export const purgeVideos = (env, now = Date.now()) => purgeTestimonialVideos(env, now, {recordKey});

// Hourly cron: delete rate-limit counters from previous days.
export async function purgeTestimonialRateLimits(env, now = Date.now()) {
  const bucket = env.COMMISSION_UPLOADS;
  if (!bucket) return 0;
  const today = day(now);
  const page = await bucket.list({prefix: RATE, limit: 500});
  const old = page.objects.map(o => o.key).filter(k => k.slice(RATE.length, RATE.length + 10) < today);
  if (old.length) await bucket.delete(old);
  return old.length;
}
