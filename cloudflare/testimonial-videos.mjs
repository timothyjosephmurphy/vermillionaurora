// Video testimonials: browser -> Worker -> R2 multipart upload, signed private playback for moderation, public playback
// of approved videos the collector agreed to show on tjm.art, and the retention sweep run by the hourly cron.
// Storage (private R2 bucket COMMISSION_UPLOADS, no new bindings, no R2 CORS or public bucket access needed):
//   testimonials/videos/<id>/video.<mp4|mov|webm>   the video, assembled by R2 from 8 MiB parts
//   testimonials/videos/<id>/poster.jpg            a still frame captured in the visitor's browser (optional)
//   testimonials/uploads/<id>.json                 upload manifest: uploading | complete | attached (+ recordId)
// Why the Worker relays the parts: R2 presigned URLs would need R2 API keys on the Worker plus bucket CORS; relaying
// 8 MiB parts stays far under the Worker request-body limit and lets the Worker check every byte it stores.
// A testimonial that uses a video gets the upload's id, so the record, the video and the manifest share <id>.
import {isSiteOrigin} from './site-origins.mjs';

export const MAX_VIDEO_BYTES = 50 * 1024 * 1024; // 50 MB: roughly 1–3 minutes of default 1080p phone video
export const PART_BYTES = 8 * 1024 * 1024;
export const VIDEO_TYPES = {'video/mp4': 'mp4', 'video/quicktime': 'mov', 'video/webm': 'webm'};
export const VIDEO_DAILY_LIMIT = 4;        // upload starts per visitor (hashed IP) per UTC day
export const VIDEO_DAILY_TOTAL_LIMIT = 40; // across everyone
export const UNATTACHED_TTL = 24 * 3600e3; // finished or abandoned uploads never attached to a testimonial
export const PENDING_TTL = 90 * 86400e3;   // videos on testimonials that stay unapproved (same 90 days as commission files)
const VIEW_TTL = 6 * 3600e3;               // signed moderation playback links
export const ID = /^t-\d{8}-[0-9a-f]{12}$/;
export const UPLOADS = 'testimonials/uploads/';
export const videoPrefix = id => `testimonials/videos/${id}/`;
export const manifestKey = id => `${UPLOADS}${id}.json`;
const privateHeaders = {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow'};
const reply = (body, status = 200) => Response.json(body, {status, headers: privateHeaders});
const hex = buf => [...new Uint8Array(buf)].map(n => n.toString(16).padStart(2, '0')).join('');
const day = now => new Date(now).toISOString().slice(0, 10);
export const newId = now => `t-${day(now).replace(/-/g, '')}-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;

async function hmac(env, text) {
  if (!env.COMMISSION_MANAGER_TOKEN) throw Error('signing key unavailable');
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(`testimonial-video:${env.COMMISSION_MANAGER_TOKEN}`), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(text)));
}
function same(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let d = 0; for (let i = 0; i < a.length; i++) d |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return d === 0;
}
export const uploadToken = (env, m) => hmac(env, `upload:${m.id}:${m.uploadId}`);
async function readManifest(bucket, id) {
  if (!ID.test(id || '')) return null;
  const o = await bucket.get(manifestKey(id));
  return o ? {manifest: await o.json(), etag: o.etag} : null;
}
// Returns the manifest when the token matches it, otherwise null.
export async function verifiedUpload(env, id, token) {
  const found = await readManifest(env.COMMISSION_UPLOADS, id);
  if (!found || !same(String(token || ''), await uploadToken(env, found.manifest))) return null;
  return found;
}

// File signatures: ISO base media (mp4 / mov) and EBML (webm). Older QuickTime files may start with wide/free/mdat/moov.
export function sniffVideo(b) {
  if (b.length >= 4 && b[0] === 0x1a && b[1] === 0x45 && b[2] === 0xdf && b[3] === 0xa3) return 'webm';
  if (b.length >= 12) {
    const box = String.fromCharCode(...b.subarray(4, 8));
    if (box === 'ftyp') return String.fromCharCode(...b.subarray(8, 12)) === 'qt  ' ? 'mov' : 'mp4';
    if (['moov', 'mdat', 'wide', 'free', 'skip', 'pnot'].includes(box)) return 'mov';
  }
  return null;
}
const family = t => t === 'webm' || t === 'video/webm' ? 'webm' : 'isobmff';

// Phones write the recording location as an ISO 6709 string ("+47.6062-122.3321+050.000/"): iPhone in the
// com.apple.quicktime.location.ISO6709 item, Android in the ©xyz atom. Blank it with spaces (same length, so every box
// size and offset stays valid). The browser does this for the whole file before uploading; the Worker repeats it per part.
// Byte scan (no full-buffer decode: about 5 ms per 8 MiB part): find each "/", walk back over the characters an ISO 6709
// string can contain, and blank the earliest "+"/"-" start that forms a full latitude+longitude string.
const ISO6709 = /^[+-]\d{2}(?:\.\d+)?[+-]\d{3}(?:\.\d+)?(?:[+-]\d+(?:\.\d+)?)?(?:CRS[A-Za-z0-9:_]*)?\/$/;
const isoChar = c => (c >= 0x30 && c <= 0x39) || c === 0x2b || c === 0x2d || c === 0x2e || (c >= 0x41 && c <= 0x5a) || (c >= 0x61 && c <= 0x7a) || c === 0x3a || c === 0x5f;
export function blankLocations(bytes) {
  let count = 0;
  for (let i = bytes.indexOf(0x2f); i !== -1; i = bytes.indexOf(0x2f, i + 1)) {
    if (i < 12 || !isoChar(bytes[i - 1]) || bytes[i - 1] === 0x2b || bytes[i - 1] === 0x2d) continue;
    let s = i - 1;
    const min = Math.max(0, i - 64);
    while (s > min && isoChar(bytes[s - 1])) s--;
    if (i - s < 11) continue;
    const text = String.fromCharCode(...bytes.subarray(s, i + 1));
    for (let k = 0; k < text.length - 11; k++) {
      if ((text[k] === '+' || text[k] === '-') && ISO6709.test(text.slice(k))) { bytes.fill(0x20, s + k, i + 1); count++; break; }
    }
  }
  return count;
}

async function limited(env, request, now, rateLimited) {
  return rateLimited(env, request, now, {scope: 'video', perVisitor: VIDEO_DAILY_LIMIT, total: VIDEO_DAILY_TOTAL_LIMIT});
}

// POST /testimonials/api/video/start {type, size, name}
// PUT  /testimonials/api/video/part?id=&n=   (X-Upload-Token header, body = exactly one part)
// POST /testimonials/api/video/complete {id, token, parts:[{partNumber, etag}]}
// POST /testimonials/api/video/abort {id, token}
export async function videoUpload(request, env, now, action, {rateLimited}) {
  const bucket = env.COMMISSION_UPLOADS;
  if (!isSiteOrigin(request.headers.get('Origin'))) return reply({error: 'Origin not allowed'}, 403);
  if (!bucket || !env.COMMISSION_MANAGER_TOKEN) return reply({error: 'Video uploads are temporarily unavailable.'}, 503);
  if (action === 'part') {
    if (request.method !== 'PUT') return reply({error: 'Method not allowed'}, 405);
    const url = new URL(request.url), n = Number(url.searchParams.get('n'));
    const found = await verifiedUpload(env, url.searchParams.get('id'), request.headers.get('X-Upload-Token'));
    if (!found || found.manifest.state !== 'uploading') return reply({error: 'This upload has expired. Please choose the video again.'}, 403);
    const m = found.manifest;
    if (!Number.isInteger(n) || n < 1 || n > m.parts) return reply({error: 'Invalid part'}, 400);
    const expected = n < m.parts ? PART_BYTES : m.size - PART_BYTES * (m.parts - 1);
    const declared = Number(request.headers.get('Content-Length'));
    if (Number.isFinite(declared) && declared > 0 && declared !== expected) return reply({error: 'Unexpected part size'}, 400);
    const bytes = new Uint8Array(await request.arrayBuffer());
    if (bytes.byteLength !== expected) return reply({error: 'Unexpected part size'}, 400);
    if (n === 1) {
      const kind = sniffVideo(bytes);
      if (!kind || family(kind) !== family(m.type)) {
        await discardUpload(env, m);
        return reply({error: 'That file doesn’t look like an MP4, MOV or WebM video.'}, 415);
      }
    }
    blankLocations(bytes);
    try {
      const part = await bucket.resumeMultipartUpload(m.key, m.uploadId).uploadPart(n, bytes);
      return reply({partNumber: part.partNumber, etag: part.etag});
    } catch { return reply({error: 'The upload could not be saved. Please try again.'}, 502); }
  }
  if (request.method !== 'POST') return reply({error: 'Method not allowed'}, 405);
  let input;
  try { input = await request.json(); } catch { return reply({error: 'Invalid request'}, 400); }
  if (action === 'start') {
    const type = String(input.type || '').toLowerCase(), size = Number(input.size);
    if (!VIDEO_TYPES[type]) return reply({error: 'Videos need to be MP4, MOV or WebM, up to 50 MB.'}, 415);
    if (!Number.isInteger(size) || size < 1024) return reply({error: 'That video file is empty.'}, 400);
    if (size > MAX_VIDEO_BYTES) return reply({error: `Videos need to be MP4, MOV or WebM, up to ${MAX_VIDEO_BYTES / 1024 / 1024} MB.`}, 413);
    if (await limited(env, request, now, rateLimited)) return reply({error: 'Thank you! You’ve started several video uploads today. Please try again tomorrow or email tj@tjm.art.'}, 429);
    const id = newId(now), key = `${videoPrefix(id)}video.${VIDEO_TYPES[type]}`;
    const upload = await bucket.createMultipartUpload(key, {httpMetadata: {contentType: type}});
    const manifest = {id, key, uploadId: upload.uploadId, type, size, parts: Math.ceil(size / PART_BYTES), originalName: String(input.name || '').replace(/[\0-\x1f]/g, '').slice(0, 120), state: 'uploading', createdAt: new Date(now).toISOString()};
    await bucket.put(manifestKey(id), JSON.stringify(manifest), {httpMetadata: {contentType: 'application/json'}});
    return reply({id, token: await uploadToken(env, manifest), partBytes: PART_BYTES, parts: manifest.parts});
  }
  const found = await verifiedUpload(env, input.id, input.token);
  if (!found) return reply({error: 'This upload has expired. Please choose the video again.'}, 403);
  const m = found.manifest;
  if (action === 'abort') {
    if (m.state === 'attached') return reply({error: 'Already sent'}, 409);
    await discardUpload(env, m);
    return reply({aborted: true});
  }
  if (action === 'complete') {
    if (m.state === 'complete') return reply({id: m.id, bytes: m.size});
    if (m.state !== 'uploading') return reply({error: 'This upload has expired. Please choose the video again.'}, 409);
    const parts = Array.isArray(input.parts) ? input.parts.map(p => ({partNumber: Number(p?.partNumber), etag: String(p?.etag || '')})) : [];
    if (parts.length !== m.parts || parts.some((p, i) => p.partNumber !== i + 1 || !p.etag)) return reply({error: 'Some of the video is missing. Please try again.'}, 400);
    try { await bucket.resumeMultipartUpload(m.key, m.uploadId).complete(parts); } catch { return reply({error: 'The video could not be assembled. Please try again.'}, 502); }
    const head = await bucket.head(m.key);
    if (!head || head.size !== m.size) { await bucket.delete(m.key); return reply({error: 'The video arrived incomplete. Please try again.'}, 400); }
    await bucket.put(manifestKey(m.id), JSON.stringify({...m, state: 'complete', completedAt: new Date(now).toISOString()}), {httpMetadata: {contentType: 'application/json'}});
    return reply({id: m.id, bytes: m.size});
  }
  return reply({error: 'Not found'}, 404);
}

// Removes an upload that was never attached (abort, honeypot, wrong file type, expiry).
export async function discardUpload(env, m) {
  const bucket = env.COMMISSION_UPLOADS;
  if (m.state === 'uploading') { try { await bucket.resumeMultipartUpload(m.key, m.uploadId).abort(); } catch {} }
  await deleteVideoFiles(bucket, m.id);
  await bucket.delete(manifestKey(m.id));
}
export async function deleteVideoFiles(bucket, id) {
  const page = await bucket.list({prefix: videoPrefix(id), limit: 20});
  const keys = page.objects.map(o => o.key);
  if (keys.length) await bucket.delete(keys);
  return keys.length;
}

// ---------- Playback ----------
// iPhone .mov files are served as video/mp4: Chrome and Firefox refuse video/quicktime but play the same H.264 bytes as
// MP4. (HEVC recordings still need a browser with HEVC support; the page falls back to a message and a download link.)
export const playbackType = type => type === 'video/webm' ? 'video/webm' : 'video/mp4';

function parseRange(header, size) {
  const m = /^bytes=(\d*)-(\d*)$/.exec(header || '');
  if (!m || (m[1] === '' && m[2] === '')) return null;
  let start, end;
  if (m[1] === '') { const suffix = Number(m[2]); if (!suffix) return 'invalid'; start = Math.max(0, size - suffix); end = size - 1; }
  else { start = Number(m[1]); end = m[2] === '' ? size - 1 : Math.min(Number(m[2]), size - 1); }
  return start >= size || end < start ? 'invalid' : {start, end};
}
// Streams an R2 object with HTTP Range support (video seeking needs 206 responses).
export async function serveMedia(request, bucket, key, {contentType, cache, download}) {
  const head = await bucket.head(key);
  if (!head) return reply({error: 'Not found'}, 404);
  const size = head.size;
  const headers = {'Content-Type': contentType, 'Accept-Ranges': 'bytes', 'Cache-Control': cache, 'X-Content-Type-Options': 'nosniff', 'Cross-Origin-Resource-Policy': 'same-origin', 'Content-Disposition': download ? `attachment; filename="${download}"` : 'inline', ...(head.httpEtag ? {ETag: head.httpEtag} : {})};
  const range = parseRange(request.headers.get('Range'), size);
  if (range === 'invalid') return new Response(null, {status: 416, headers: {...headers, 'Content-Range': `bytes */${size}`}});
  if (!range) {
    if (request.method === 'HEAD') return new Response(null, {headers: {...headers, 'Content-Length': String(size)}});
    const object = await bucket.get(key);
    return object ? new Response(object.body, {headers: {...headers, 'Content-Length': String(size)}}) : reply({error: 'Not found'}, 404);
  }
  const length = range.end - range.start + 1;
  const partial = {...headers, 'Content-Range': `bytes ${range.start}-${range.end}/${size}`, 'Content-Length': String(length)};
  if (request.method === 'HEAD') return new Response(null, {status: 206, headers: partial});
  const object = await bucket.get(key, {range: {offset: range.start, length}});
  return object ? new Response(object.body, {status: 206, headers: partial}) : reply({error: 'Not found'}, 404);
}

// Signed, expiring links let the moderation page's <video> element play private videos (it cannot send the owner
// credential as a header). They only ever point at one record's own video or poster.
export async function signedVideoUrls(env, record, now) {
  if (!record.video || record.video.expired) return null;
  const exp = now + VIEW_TTL, base = `/testimonials/api/video/private/${record.id}`;
  const sign = async kind => `${base}/${kind}?exp=${exp}&sig=${await hmac(env, `view:${record.id}:${kind}:${exp}`)}`;
  return {video: await sign('video'), download: (await sign('video')) + '&download=1', poster: record.video.poster ? await sign('poster') : ''};
}
export async function privateMedia(request, env, id, kind, now, loadRecord) {
  const url = new URL(request.url), exp = Number(url.searchParams.get('exp'));
  if (!env.COMMISSION_MANAGER_TOKEN || !Number.isFinite(exp) || exp < now || exp > now + VIEW_TTL + 60e3
    || !same(url.searchParams.get('sig') || '', await hmac(env, `view:${id}:${kind}:${exp}`))) return reply({error: 'This link has expired. Reload the moderation page.'}, 403);
  const record = await loadRecord(id);
  const v = record?.video;
  if (!v || v.expired) return reply({error: 'Not found'}, 404);
  if (kind === 'poster') return v.poster ? serveMedia(request, env.COMMISSION_UPLOADS, v.poster.key, {contentType: v.poster.type, cache: 'private, no-store'}) : reply({error: 'Not found'}, 404);
  const ext = v.key.split('.').pop();
  return serveMedia(request, env.COMMISSION_UPLOADS, v.key, {contentType: playbackType(v.type), cache: 'private, no-store', download: url.searchParams.get('download') ? `testimonial-${id}.${ext}` : ''});
}

// ---------- Retention (hourly cron) ----------
// uploading/complete for more than 24 h without a testimonial -> aborted and deleted.
// attached to a record that no longer exists -> deleted.
// attached to a testimonial still unapproved 90 days after it arrived (or after it was unpublished) -> the video and
//   poster are deleted and the record is marked video.expired; the written testimonial itself is untouched.
// approved testimonials keep their video until TJ deletes the testimonial.
export async function purgeTestimonialVideos(env, now = Date.now(), {recordKey}) {
  const bucket = env.COMMISSION_UPLOADS;
  if (!bucket) return {removed: 0};
  let removed = 0, cursor;
  do {
    const page = await bucket.list({prefix: UPLOADS, limit: 200, ...(cursor ? {cursor} : {})});
    for (const item of page.objects) {
      const o = await bucket.get(item.key);
      if (!o) continue;
      let m; try { m = await o.json(); } catch { continue; }
      if (!ID.test(m.id || '')) continue;
      if (m.state !== 'attached') {
        if (now - Date.parse(m.createdAt) > UNATTACHED_TTL) { await discardUpload(env, m); removed++; }
        continue;
      }
      const ro = await bucket.get(recordKey(m.recordId || m.id));
      if (!ro) { await deleteVideoFiles(bucket, m.id); await bucket.delete(item.key); removed++; continue; }
      const record = await ro.json();
      if (record.status === 'approved') continue;
      const since = Math.max(Date.parse(record.createdAt) || 0, Date.parse(record.unpublishedAt || '') || 0);
      if (now - since <= PENDING_TTL) continue;
      const saved = await bucket.put(recordKey(record.id), JSON.stringify({...record, video: {...record.video, expired: true, expiredAt: new Date(now).toISOString()}}), {onlyIf: {etagMatches: ro.etag}, httpMetadata: {contentType: 'application/json'}});
      if (!saved) continue; // TJ acted at the same moment; try again next hour
      await deleteVideoFiles(bucket, m.id);
      await bucket.delete(item.key);
      removed++;
    }
    cursor = page.truncated ? page.cursor : null;
  } while (cursor);
  return {removed};
}
