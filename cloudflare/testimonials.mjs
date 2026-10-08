// Collector testimonials: public submission, owner moderation, and the approved list for /testimonials/ and the map.
// Storage: the existing private R2 bucket COMMISSION_UPLOADS (no new bindings).
//   testimonials/records/<id>.json   one record per submission (status pending | approved), includes the private email
//   testimonials/images/<id>/<n>.<ext> photos after metadata stripping (EXIF GPS removed); HEIC is kept private only
//   testimonials/approved.json       public index rebuilt on every approve / unpublish / delete
//   testimonials/rate/<day>/<hash>   per-visitor submission counters (hashed IP), purged by the hourly cron
// Nothing is published until TJ approves it on https://tjm.art/testimonial-manager/.
import {inventory} from './checkout-catalog.mjs';
import {authorized} from './etsy-connection.mjs';
import {issueCollectorCode} from './print-codes.mjs';
import {sellerMailToken} from './shipping-email.mjs';
import {isSiteOrigin} from './site-origins.mjs';
import {cleanImage} from './image-metadata.mjs';

export const OWNER_ORIGIN = 'https://tjm.art';
export const MANAGER_URL = 'https://tjm.art/testimonial-manager/';
export const MAX_PHOTO_BYTES = 10 * 1024 * 1024;
export const MAX_PHOTOS = 4;
export const DAILY_LIMIT = 5;        // per visitor (hashed IP) per UTC day
export const DAILY_TOTAL_LIMIT = 60; // across everyone, bounds storage abuse
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

async function rateLimited(env, request, now) {
  const bucket = env.COMMISSION_UPLOADS, today = day(now);
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const visitor = `${RATE}${today}/${(await sha(`testimonial-rate:${today}:${ip}:${env.COMMISSION_MANAGER_TOKEN || ''}`)).slice(0, 32)}`;
  const total = `${RATE}${today}/_all`;
  const read = async key => { const o = await bucket.get(key); return o ? Number(await o.text()) || 0 : 0; };
  const [mine, all] = await Promise.all([read(visitor), read(total)]);
  if (mine >= DAILY_LIMIT || all >= DAILY_TOTAL_LIMIT) return true;
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
  // Honeypot: bots fill every field. Pretend success and store nothing.
  if (clean(form.get('website'), 200)) return done(request, true, {success: true}, 200);
  const name = oneLine(form.get('name'), 80);
  const email = oneLine(form.get('email'), 254);
  const quote = clean(form.get('quote'), 2000);
  const city = oneLine(form.get('city'), 100);
  const slug = oneLine(form.get('paintingSlug'), 150);
  const paintingSlug = validSlug(slug) ? slug : '';
  const paintingTitle = oneLine(form.get('painting'), 200);
  if (!name) return fail('Please enter your name as you’d like it shown.');
  if (!email || !validEmail(email)) return fail('Please enter a valid email address so I can send your thank-you.');
  if (quote.length < 3) return fail('Please write a few words about what the painting means to you.');
  if (form.get('consent') !== 'yes') return fail('Please tick the consent box so I can publish your testimonial.');
  const files = form.getAll('photos').filter(f => f instanceof File && f.size > 0);
  if (files.length > MAX_PHOTOS) return fail(`Please choose up to ${MAX_PHOTOS} photos.`);
  const photos = [];
  for (const [n, file] of files.entries()) {
    if (file.size > MAX_PHOTO_BYTES) return fail(`Each photo must be 10 MB or smaller (“${file.name.slice(0, 60)}” is too large).`);
    let cleaned;
    try { cleaned = cleanImage(new Uint8Array(await file.arrayBuffer())); } catch { return fail(`“${file.name.slice(0, 60)}” is not a JPEG, PNG, WebP or HEIC photo.`); }
    if (!ACCEPTED.has(cleaned.type)) return fail('Photos must be JPEG, PNG, WebP or HEIC.');
    photos.push({n, ...cleaned, originalName: oneLine(file.name, 120)});
  }
  if (await rateLimited(env, request, now)) return fail('Thank you! I’ve received several testimonials from you today. Please try again tomorrow or email tj@vermillionaurora.com.', 429);

  const id = `t-${day(now).replace(/-/g, '')}-${crypto.randomUUID().replace(/-/g, '').slice(0, 12)}`;
  const bucket = env.COMMISSION_UPLOADS;
  const geo = city ? await geocodeCity(city, env).catch(() => null) : null;
  const record = {
    id, status: 'pending', createdAt: new Date(now).toISOString(),
    name, email, quote, city, paintingSlug, paintingTitle,
    consent: {publish: true, scope: 'name, words, photos and city (approximate city pin on the map)', at: new Date(now).toISOString()},
    geo,
    photos: photos.map(p => ({n: p.n, key: imageKey(id, p.n, p.type), type: p.type, bytes: p.bytes.byteLength, originalName: p.originalName, publishable: p.publishable, removed: p.removed})),
  };
  const written = [];
  try {
    for (const p of photos) { const key = imageKey(id, p.n, p.type); await bucket.put(key, p.bytes, {httpMetadata: {contentType: p.type}}); written.push(key); }
    await bucket.put(recordKey(id), JSON.stringify(record), {httpMetadata: {contentType: 'application/json'}});
  } catch (error) {
    console.error('Testimonial storage failed');
    if (written.length) await bucket.delete(written).catch(() => {});
    return fail('Sorry, your testimonial could not be saved. Please try again.', 500);
  }
  const notify = notifyOwner(env, record).catch(error => console.error('Testimonial notification failed', String(error?.message || '').slice(0, 120)));
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
    `Name: ${record.name}`,
    `Email (private): ${record.email}`,
    `Painting: ${painting}${record.paintingSlug ? ` (https://tjm.art/products/${record.paintingSlug}/)` : ''}`,
    `City: ${record.city || 'Not given'}`,
    `Photos: ${record.photos.length}`, '',
    'Testimonial:', record.quote, '',
    `Approve or reject: ${MANAGER_URL}`,
    'Nothing is published until you approve it. After approval you can issue their at-cost print code from the same page.',
    `Reference: ${record.id}`,
  ].join('\r\n');
  const mime = [
    `From: TJM.art Website <${sender}>`, `To: ${sender}`, `Reply-To: ${record.email}`,
    `Subject: ${mimeHeader(`New testimonial — ${record.name}`)}`,
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
  return Response.json({testimonials: (index.testimonials || []).map(forClient), updatedAt: index.updatedAt || null}, {headers: {'Cache-Control': 'public, max-age=60', 'Access-Control-Allow-Origin': '*', 'X-Content-Type-Options': 'nosniff'}});
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

// Public shape of an approved record. Email, original file names and moderation notes never leave the owner API.
export function publicEntry(record) {
  const pub = record.published || {};
  const photos = (pub.photos || []).map(n => record.photos.find(p => p.n === n)).filter(p => p && p.publishable);
  return {
    id: record.id,
    name: pub.name || record.name,
    city: pub.city ?? record.city ?? '',
    painting: pub.painting ?? record.paintingTitle ?? '',
    paintingHref: (pub.paintingSlug ?? record.paintingSlug) ? `/products/${pub.paintingSlug ?? record.paintingSlug}/` : '',
    quote: pub.quote || record.quote,
    photos: photos.map(p => `/testimonials/api/photo/${record.id}/${p.n}`),
    photoKeys: photos.map(p => p.key),
    pin: pub.pin && validCoord(pub.pin[0], pub.pin[1]) ? [round2(pub.pin[0]), round2(pub.pin[1])] : null,
    approvedAt: record.approvedAt,
  };
}
const forClient = entry => { const {photoKeys, ...rest} = entry; return rest; };

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
    .sort((a, b) => String(b.approvedAt).localeCompare(String(a.approvedAt))).map(publicEntry);
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
    return reply({records: records.map(r => ({...r, public: r.status === 'approved' ? forClient(publicEntry(r)) : null}))});
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
    if (!name || !quote) return reply({error: 'Name and testimonial text are required'}, 400);
    const slug = oneLine(input.paintingSlug ?? record.paintingSlug, 150);
    if (slug && !validSlug(slug)) return reply({error: 'Unknown painting page (product slug)'}, 400);
    const photos = (Array.isArray(input.photos) ? input.photos : record.photos.map(p => p.n)).map(Number)
      .filter(n => record.photos.some(p => p.n === n && p.publishable));
    const lat = Number(input.lat), lng = Number(input.lng);
    const city = oneLine(input.city ?? record.city, 100);
    const pin = input.map !== false && city && input.lat !== '' && input.lng !== '' && validCoord(lat, lng) ? [round2(lat), round2(lng)] : null;
    const next = {...record, status: 'approved', approvedAt: record.approvedAt || new Date(now).toISOString(),
      published: {name, quote, city, painting: oneLine(input.painting ?? record.paintingTitle, 200), paintingSlug: slug, photos, pin}};
    const saved = await save(next);
    if (!saved) return reply({error: 'Record changed; reload'}, 409);
    const thanked = await thankCollector(env, saved, {send: input.sendThanks !== false, now});
    return reply({record: {...thanked.record, public: forClient(publicEntry(thanked.record))}, thanks: thanked.result});
  }
  if (input.action === 'sendThanks') {
    if (record.status !== 'approved') return reply({error: 'Approve the testimonial first'}, 409);
    const thanked = await thankCollector(env, record, {send: true, force: input.force === true, now});
    return reply({record: thanked.record, thanks: thanked.result}, thanked.result.error ? 409 : 200);
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
    await bucket.delete(recordKey(record.id));
    await rebuildIndex(env, now);
    return reply({deleted: true});
  }
  if (input.action === 'issueCode') {
    if (record.status !== 'approved') return reply({error: 'Approve the testimonial before issuing a code'}, 409);
    const thanked = await thankCollector(env, record, {send: false, now});
    return reply({record: thanked.record, thanks: thanked.result}, thanked.result.error ? 409 : 200);
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
async function thankCollector(env, start, {send, force = false, now}) {
  const bucket = env.COMMISSION_UPLOADS;
  let object = await bucket.get(recordKey(start.id));
  let record = object ? await object.json() : start;
  let etag = object?.etag;
  const result = {};
  if (!record.thanks?.code) {
    if (!env.CART_ORDERS) return {record, result: {error: 'Print codes are unavailable on this Worker'}};
    // Claim issuance first so two approvals can never issue two codes.
    if (record.thanks?.issuingAt && now - Date.parse(record.thanks.issuingAt) < 120000) return {record, result: {error: 'A code is being issued; reload in a moment'}};
    const claimed = await writeRecord(env, {...record, thanks: {...record.thanks, issuingAt: new Date(now).toISOString()}}, etag);
    if (!claimed) return {record, result: {error: 'Record changed; reload'}};
    const issued = await issueCollectorCode(env, {name: record.name, email: record.email, note: `Testimonial ${record.id}`});
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
  const first = (record.published?.name || record.name).split(/\s+/)[0];
  const painting = record.published?.painting || record.paintingTitle;
  const subject = 'Thank you, and a print code for you';
  const body = [
    `Hi ${first},`, '',
    `Thank you so much for sharing what ${painting ? `“${painting}”` : 'my painting'} means to you. It means a lot to me that it has a good home with you. Your testimonial is now on my site:`,
    `https://tjm.art/testimonials/#${record.id}`, '',
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
