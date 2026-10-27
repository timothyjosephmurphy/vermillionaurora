// Reply-to-publish testimonials (studio-tracker #171). Email-first; SMS can reuse ingestRawBytes later.
//
// A collector replies to TJ's ask. The ask's Reply-To is stories@reply.tjm.art (a subdomain so Cloudflare
// Email Routing never replaces the Google Workspace MX on tjm.art). The Worker stores a pending testimonial.
// TJ approves it on /testimonial-manager/ before it appears on /testimonials/. There is no website form here.
//
// Consent: the ask includes EMAIL_REPLY_NOTICE. Replying to that address is the permission (same idea as
// submitting the form under its notice). The record stores the notice text and version. Nothing is public
// until Approve.
import products from '../catalog/products.json' with { type: 'json' };
import {cleanImage, sniffImageType} from './image-metadata.mjs';
import {geocodeCity, emailSenderLimited, storePendingBundle, photoStorageKey, newTestimonialId, MAX_PHOTOS, MAX_PHOTO_BYTES} from './testimonials.mjs';
import {ANONYMOUS_NAME} from './testimonial-notice.mjs';

export const DEFAULT_REPLY_ADDRESS = 'stories@reply.tjm.art';
export const REPLY_FORWARD = 'tj@vermillionaurora.com';
export const EMAIL_REPLY_NOTICE_VERSION = '2026-10-27';
// One sentence. The ask template must include this exact line. A reply is the consent.
export const EMAIL_REPLY_NOTICE = 'By replying, you’re OK with TJ showing your first name or initials, your words, and your photos on tjm.art after he’s read them.';
export const ASK_TEMPLATE = `Subject: A photo of your painting?

From: TJ Murphy <tj@tjm.art>
Reply-To: ${DEFAULT_REPLY_ADDRESS}

Hi,

If you have a moment, reply to this email with a photo of the painting in your home, a few words about what it means to you, or both. A photo by itself is perfect.

${EMAIL_REPLY_NOTICE}

If you want the page to name the painting or your city, add lines like these (a city only, never your street address):

Painting: Honeybadger and Cub with Genesis Block
City: Tacoma, WA

Thank you,
TJ
`;

export const replyAddress = env => {
  const value = String(env?.TESTIMONIAL_REPLY_ADDRESS || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : DEFAULT_REPLY_ADDRESS;
};

const PAINTINGS = products.filter(item => item?.type === 'painting' && item.slug && item.title).map(item => ({slug: item.slug, title: item.title}));
const DEDUP = 'testimonials/email-ids/';
const MAX_RAW_BYTES = 18 * 1024 * 1024;
const HONORIFIC = /^(mr|mrs|ms|mx|dr|prof|sir|dame)\.?$/i;

const latin1 = bytes => {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = '';
  for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode(...b.subarray(i, i + 0x8000));
  return s;
};
const hex = buf => [...new Uint8Array(buf)].map(n => n.toString(16).padStart(2, '0')).join('');
const digestBytes = async bytes => hex(await crypto.subtle.digest('SHA-256', bytes));
const b64 = text => {
  const clean = text.replace(/[^A-Za-z0-9+/=]/g, '');
  const bin = atob(clean);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};
const qpDecode = text => {
  const cleaned = text.replace(/=\r?\n/g, '');
  const bytes = [];
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '=' && /^[0-9A-Fa-f]{2}$/.test(cleaned.slice(i + 1, i + 3))) {
      bytes.push(parseInt(cleaned.slice(i + 1, i + 3), 16));
      i += 2;
    } else bytes.push(cleaned.charCodeAt(i) & 255);
  }
  return new Uint8Array(bytes);
};
function decodeBytes(bytes, charset) {
  const label = !charset || /utf-?8/i.test(charset) ? 'utf-8' : charset;
  try { return new TextDecoder(label).decode(bytes); } catch { return new TextDecoder('utf-8').decode(bytes); }
}
function decodeWords(value) {
  return String(value || '').replace(/=\?([^?]+)\?([BbQq])\?([^?]*)\?=/g, (_, charset, enc, data) => {
    const bytes = enc.toUpperCase() === 'B' ? b64(data) : qpDecode(data.replace(/_/g, ' '));
    return decodeBytes(bytes, charset);
  });
}
function parseHeaders(head) {
  const map = new Map();
  for (const line of head.replace(/\r?\n[ \t]+/g, ' ').split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 1) continue;
    const name = line.slice(0, i).trim().toLowerCase();
    const value = decodeWords(line.slice(i + 1).trim());
    if (!map.has(name)) map.set(name, []);
    map.get(name).push(value);
  }
  return map;
}
const header = (headers, name) => (headers.get(name) || [])[0] || '';
function contentTypeOf(headers) {
  const raw = header(headers, 'content-type') || 'text/plain; charset=utf-8';
  const [media, ...rest] = raw.split(';').map(s => s.trim());
  const params = {};
  for (const part of rest) {
    const eq = part.indexOf('=');
    if (eq < 1) continue;
    params[part.slice(0, eq).trim().toLowerCase()] = part.slice(eq + 1).trim().replace(/^"|"$/g, '');
  }
  return {media: media.toLowerCase(), params};
}
function filenameOf(type, disposition) {
  const star = /filename\*\s*=\s*(?:UTF-8|utf-8)?''([^;\r\n]+)/i.exec(disposition);
  if (star) { try { return decodeURIComponent(star[1]); } catch { return star[1]; } }
  const quoted = /(?:filename|name)\s*=\s*"([^"]+)"/i.exec(`${disposition}; ${type.params.name ? `name="${type.params.name}"` : ''}`)
    || /(?:filename|name)\s*=\s*([^;\s]+)/i.exec(disposition);
  return quoted ? quoted[1].replace(/^"|"$/g, '') : (type.params.name || '');
}
function splitHeadBody(raw) {
  const match = /\r?\n\r?\n/.exec(raw);
  if (!match) return {head: raw, body: ''};
  return {head: raw.slice(0, match.index), body: raw.slice(match.index + match[0].length)};
}
function splitMultipart(body, boundary) {
  const chunks = body.split(`--${boundary}`);
  const parts = [];
  for (let i = 1; i < chunks.length; i++) {
    if (chunks[i].startsWith('--')) break;
    const trimmed = chunks[i].replace(/^\r?\n/, '').replace(/\r?\n$/, '');
    if (trimmed) parts.push(trimmed);
  }
  return parts.slice(0, 40);
}
function decodeBody(body, encoding) {
  const enc = (encoding || '7bit').toLowerCase().trim();
  if (enc === 'base64') return b64(body);
  if (enc === 'quoted-printable') return qpDecode(body);
  const out = new Uint8Array(body.length);
  for (let i = 0; i < body.length; i++) out[i] = body.charCodeAt(i) & 255;
  return out;
}
function parseEntity(raw) {
  const {head, body} = splitHeadBody(raw);
  const headers = parseHeaders(head);
  const type = contentTypeOf(headers);
  const disposition = header(headers, 'content-disposition');
  if (type.media.startsWith('multipart/') && type.params.boundary) {
    const parts = splitMultipart(body, type.params.boundary).map(parseEntity);
    return {
      headers,
      text: parts.map(part => part.text).find(Boolean) || '',
      html: parts.map(part => part.html).find(Boolean) || '',
      attachments: parts.flatMap(part => part.attachments),
    };
  }
  const bytes = decodeBody(body, header(headers, 'content-transfer-encoding'));
  if (type.media === 'message/rfc822') {
    const inner = parseEntity(latin1(bytes));
    return {headers, text: '', html: '', attachments: inner.attachments};
  }
  const sniffed = sniffImageType(bytes);
  const filename = filenameOf(type, disposition);
  if (sniffed || type.media.startsWith('image/')) return {headers, text: '', html: '', attachments: [{type: sniffed || type.media, filename, bytes, disposition}]};
  if (/attachment/i.test(disposition)) return {headers, text: '', html: '', attachments: [{ignored: true, filename, bytes}]};
  if (type.media === 'text/html') return {headers, text: '', html: decodeBytes(bytes, type.params.charset), attachments: []};
  if (type.media === 'text/plain' || type.media.startsWith('text/')) return {headers, text: decodeBytes(bytes, type.params.charset), html: '', attachments: []};
  return {headers, text: '', html: '', attachments: bytes.length ? [{ignored: true, filename, bytes}] : []};
}

export function parseMime(input) {
  const entity = parseEntity(typeof input === 'string' ? input : latin1(input));
  return {
    subject: header(entity.headers, 'subject'),
    from: header(entity.headers, 'from'),
    to: header(entity.headers, 'to'),
    cc: header(entity.headers, 'cc'),
    messageId: header(entity.headers, 'message-id'),
    inReplyTo: header(entity.headers, 'in-reply-to'),
    references: header(entity.headers, 'references'),
    text: entity.text || '',
    html: entity.html || '',
    attachments: entity.attachments,
  };
}

export function htmlToText(html) {
  return String(html || '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<blockquote[\s\S]*?<\/blockquote>/gi, '')
    .replace(/<div[^>]*class="[^"]*gmail_quote[^"]*"[\s\S]*$/i, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&#(\d+);/g, (_, n) => { const c = Number(n); return c > 0 && c < 0x110000 ? String.fromCodePoint(c) : ''; })
    .replace(/[ \t]+\n/g, '\n');
}

// Drop the quoted ask, Outlook headers, and the signature. Keep the collector's own words.
export function stripReplyJunk(text) {
  const lines = String(text || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();
    if (/^on .{0,300}wrote:\s*$/i.test(trimmed)) break;
    if (/^-{2,}\s*original message\s*-{2,}\s*$/i.test(trimmed)) break;
    if (/^_{5,}\s*$/.test(trimmed) || /^begin forwarded message:?\s*$/i.test(trimmed)) break;
    if (/^sent from my (iphone|ipad|android|galaxy|samsung|pixel|mobile)/i.test(trimmed)) break;
    if (/^get outlook for /i.test(trimmed) || /^sent from (mail|outlook|yahoo)/i.test(trimmed)) break;
    if (/^from:\s/i.test(trimmed) && lines.slice(i, i + 6).some(line => /^(sent|date|subject|to):\s/i.test(line.trim()))) break;
    if (trimmed === '--' || trimmed === '-- ') break;
    if (/^>/.test(lines[i])) continue;
    out.push(lines[i]);
  }
  return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
}

const wordsOf = name => String(name || '').replace(/["<>]/g, ' ').split(/\s+/).map(w => w.trim()).filter(w => w && !w.includes('@'));
// First name when the From header has one. Otherwise initials (J.D.). Empty means “A collector”.
export function publicCollectorName(displayName, email) {
  const words = wordsOf(displayName).filter(w => !HONORIFIC.test(w));
  const first = words[0] || '';
  const given = first.replace(/^[^\p{L}]+/u, '').replace(/[^\p{L}'’-]+$/u, '');
  if (given.length >= 2 && !first.endsWith('.')) return given;
  const source = words.length ? words : String(email || '').split('@')[0].split(/[._+-]+/).filter(Boolean);
  return source.map(w => (w.match(/\p{L}/u) || [])[0]).filter(Boolean).slice(0, 3).map(c => c.toUpperCase() + '.').join('');
}

export function parseFrom(from) {
  const raw = decodeWords(from || '').trim();
  const wrapped = /^(.*)<([^<>]+)>$/.exec(raw);
  if (wrapped) return {name: wrapped[1].replace(/^"|"$/g, '').trim(), email: wrapped[2].trim()};
  if (raw.includes('@')) return {name: '', email: raw.replace(/^mailto:/i, '').trim()};
  return {name: raw, email: ''};
}
const usableEmail = value => {
  const email = String(value || '').trim().replace(/^mailto:/i, '');
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254 ? email : '';
};

function labeledLine(text, label) {
  const match = new RegExp(`(?:^|\\n)\\s*${label}\\s*:\\s*([^\\n]{1,200})`, 'i').exec(text);
  return match ? match[1].trim() : '';
}
function containsPhrase(text, title) {
  const esc = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|[^\\p{L}\\p{N}])${esc}(?=$|[^\\p{L}\\p{N}])`, 'iu').test(text);
}
export function matchPainting(subject, body, paintings = PAINTINGS) {
  const subjectClean = String(subject || '').replace(/^(?:\s*(?:re|fwd|fw|aw|sv)\s*:\s*)+/i, '').trim();
  const exact = value => {
    const v = String(value || '').trim().toLowerCase();
    if (!v) return null;
    const hits = paintings.filter(p => p.title.toLowerCase() === v || p.slug === v);
    return hits.length === 1 ? hits[0] : null;
  };
  const phrase = (text, min) => {
    const hits = paintings.filter(p => p.title.length >= min && containsPhrase(text, p.title));
    return hits.length === 1 ? hits[0] : null;
  };
  const labeled = labeledLine(body, 'painting');
  return exact(labeled) || phrase(labeled, 3) || exact(subjectClean) || phrase(`${subjectClean}\n${body}`, 8) || null;
}
export function explicitCity(text) {
  const city = labeledLine(text, 'city').replace(/\s+/g, ' ').slice(0, 100);
  if (city.length < 2) return '';
  if (/^\d/.test(city) || /#/.test(city) || /\b(street|st\.|avenue|ave\.|road|rd\.|boulevard|blvd\.|lane|ln\.|drive|dr\.|apt|suite|unit)\b/i.test(city)) return '';
  return city;
}
function withoutLabels(text) {
  return text.split('\n').filter(line => !/^\s*(city|painting)\s*:/i.test(line)).join('\n').replace(/\n{3,}/g, '\n\n').trim();
}
const normApostrophe = value => String(value || '').replace(/[’']/g, "'").toLowerCase();
const includesNotice = value => normApostrophe(value).includes(normApostrophe(EMAIL_REPLY_NOTICE));

function chooseImages(attachments) {
  const images = [], ignored = [];
  for (const part of attachments || []) {
    if (part.ignored || !sniffImageType(part.bytes)) { ignored.push(part); continue; }
    images.push(part);
  }
  // Signature logos (under 8 KB) are dropped when a larger photo is attached.
  // A reply that is only a small photo is still kept. Files under 400 bytes are tracking pixels.
  const big = images.filter(part => part.bytes.length >= 8 * 1024);
  const medium = images.filter(part => part.bytes.length >= 2 * 1024);
  const small = images.filter(part => part.bytes.length >= 400);
  const pool = (big.length ? big : medium.length ? medium : small).slice(0, MAX_PHOTOS);
  return {images: pool, skipped: ignored.length + (images.length - pool.length)};
}

// Long edge ≤ 2000px JPEG. The Images binding re-encodes (which drops EXIF, including GPS). Missing
// binding: the caller still runs cleanImage(), which strips location metadata without resizing.
async function resizeForWeb(env, bytes) {
  if (!env?.IMAGES?.input) return null;
  let info = null;
  if (env.IMAGES.info) {
    try { info = await env.IMAGES.info(new Blob([bytes]).stream()); } catch { info = null; }
  }
  const width = Number(info?.width) || 0, height = Number(info?.height) || 0;
  const format = String(info?.format || '').toLowerCase();
  const jpeg = format.includes('jpeg') || format === 'jpg';
  if (jpeg && width && height && width <= 2000 && height <= 2000) return null;
  const run = async transform => {
    const handle = env.IMAGES.input(new Blob([bytes]).stream());
    const chained = transform ? handle.transform(transform) : handle;
    const out = await chained.output({format: 'image/jpeg', quality: 82});
    const response = typeof out?.response === 'function' ? out.response() : out;
    const buf = new Uint8Array(await response.arrayBuffer());
    if (sniffImageType(buf) !== 'image/jpeg') return null;
    return buf;
  };
  try { return await run({width: 2000, height: 2000, fit: 'scale-down'}); }
  catch { try { return await run({width: 2000}); } catch { return null; } }
}

async function preparePhoto(env, part) {
  const raw = part.bytes;
  if (raw.byteLength > MAX_RAW_BYTES) return null;
  let source = raw, resized = false;
  if (raw.byteLength <= MAX_PHOTO_BYTES || env?.IMAGES?.input) {
    const smaller = await resizeForWeb(env, raw).catch(() => null);
    if (smaller) { source = smaller; resized = true; }
  }
  let cleaned;
  try { cleaned = cleanImage(source); }
  catch { if (!resized) return null; try { cleaned = cleanImage(raw); resized = false; } catch { return null; } }
  if (cleaned.bytes.byteLength > MAX_PHOTO_BYTES) return null;
  return {...cleaned, resized, originalName: String(part.filename || 'photo').slice(0, 120)};
}

function addressedTo(parsed, envelopeTo, address) {
  const envelope = String(envelopeTo || '').trim().toLowerCase();
  if (envelope === address) return true;
  return `${parsed.to} ${parsed.cc}`.toLowerCase().includes(address);
}

export async function ingestRawBytes(env, ctx, rawBytes, {envelopeFrom = '', envelopeTo = '', now = Date.now()} = {}) {
  const address = replyAddress(env);
  const bytes = rawBytes instanceof Uint8Array ? rawBytes : new Uint8Array(rawBytes || []);
  const finish = result => {
    console.log(JSON.stringify({event: 'testimonial_reply', outcome: result.outcome, photos: result.photos || 0, resized: result.resized || 0, hasText: Boolean(result.hasText), painting: Boolean(result.painting), noticeSeen: Boolean(result.noticeSeen)}));
    return result;
  };
  if (!bytes.byteLength || bytes.byteLength > MAX_RAW_BYTES) return finish({stored: false, outcome: 'unreadable'});
  let parsed;
  try { parsed = parseMime(bytes); } catch { return finish({stored: false, outcome: 'unreadable'}); }
  if (!addressedTo(parsed, envelopeTo, address)) return finish({stored: false, outcome: 'wrong-address'});
  const bucket = env.COMMISSION_UPLOADS;
  if (!bucket) return finish({stored: false, outcome: 'storage'});
  const messageKey = parsed.messageId ? `id:${parsed.messageId}` : `raw:${await digestBytes(bytes)}`;
  const dedupKey = `${DEDUP}${(await digestBytes(new TextEncoder().encode(messageKey))).slice(0, 40)}`;
  const existing = await bucket.get(dedupKey);
  if (existing) return finish({stored: false, duplicate: true, outcome: 'duplicate', id: (await existing.text()).slice(0, 40)});
  const from = parseFrom(parsed.from);
  const email = usableEmail(from.email) || usableEmail(envelopeFrom);
  if (await emailSenderLimited(env, email || messageKey, now)) return finish({stored: false, outcome: 'rate'});
  const plain = parsed.text || htmlToText(parsed.html);
  const stripped = stripReplyJunk(plain);
  const painting = matchPainting(parsed.subject, stripped);
  const city = explicitCity(stripped);
  let quote = withoutLabels(stripped).split(EMAIL_REPLY_NOTICE).join('').replace(/\n{3,}/g, '\n\n').trim();
  if (quote.length < 3) quote = '';
  quote = quote.slice(0, 2000);
  const chosen = chooseImages(parsed.attachments);
  const photos = [];
  for (const part of chosen.images) {
    const prepared = await preparePhoto(env, part);
    if (prepared) photos.push(prepared);
  }
  if (!quote && !photos.length) return finish({stored: false, outcome: 'empty', skipped: chosen.skipped});
  const id = newTestimonialId(now);
  const name = publicCollectorName(from.name, email);
  const geo = city ? await geocodeCity(city, env).catch(() => null) : null;
  const noticeSeen = includesNotice(`${plain}\n${parsed.html}`);
  const record = {
    id, status: 'pending', createdAt: new Date(now).toISOString(),
    source: 'email-reply', replyAddress: address,
    name, fromName: from.name.slice(0, 120), email, quote, city,
    paintingSlug: painting?.slug || '', paintingTitle: painting?.title || '',
    publishConsent: 'implied-by-reply',
    consent: {
      publish: true, basis: 'implied-by-reply', notice: EMAIL_REPLY_NOTICE, noticeVersion: EMAIL_REPLY_NOTICE_VERSION,
      noticeSeen, replyHeaders: Boolean(parsed.inReplyTo || parsed.references || /^(re|fwd|fw|aw|sv)\s*:/i.test(parsed.subject || '')),
      scope: 'first name or initials, words, and photos (location data removed; no street address)',
      at: new Date(now).toISOString(),
    },
    geo, emailMessageId: parsed.messageId.slice(0, 200),
    skippedAttachments: chosen.skipped + (chosen.images.length - photos.length),
    photos: photos.map((photo, n) => ({n, key: photoStorageKey(id, n, photo.type), type: photo.type, bytes: photo.bytes.byteLength, originalName: photo.originalName, publishable: photo.publishable, removed: photo.removed, resized: photo.resized})),
  };
  await bucket.put(dedupKey, id, {httpMetadata: {contentType: 'text/plain'}});
  const stored = await storePendingBundle(env, ctx, record, photos.map((photo, n) => ({key: photoStorageKey(id, n, photo.type), bytes: photo.bytes, type: photo.type})));
  if (!stored.ok) {
    await bucket.delete(dedupKey).catch(() => {});
    return finish({stored: false, outcome: 'storage'});
  }
  return finish({stored: true, outcome: 'pending', id, photos: photos.length, resized: photos.filter(photo => photo.resized).length, hasText: Boolean(quote), painting: Boolean(painting), noticeSeen, name: name || ANONYMOUS_NAME});
}

export async function handleTestimonialEmail(message, env, ctx) {
  const rescue = async reason => {
    console.log(JSON.stringify({event: 'testimonial_reply', outcome: 'forwarded', reason}));
    try { await message.forward(REPLY_FORWARD); }
    catch { try { message.setReject('Could not save this reply. Please write to tj@tjm.art.'); } catch { /* already finished */ } }
  };
  let raw;
  try { raw = new Uint8Array(await new Response(message.raw).arrayBuffer()); }
  catch { await rescue('unreadable'); return; }
  if (raw.byteLength > MAX_RAW_BYTES) { await rescue('too-large'); return; }
  try {
    const result = await ingestRawBytes(env, ctx, raw, {envelopeFrom: message.from, envelopeTo: message.to, now: Date.now()});
    if (!result.stored && result.outcome !== 'duplicate' && result.outcome !== 'rate' && result.outcome !== 'wrong-address') await rescue(result.outcome || 'not-stored');
    else if (result.outcome === 'wrong-address') await rescue('wrong-address');
  } catch {
    console.log(JSON.stringify({event: 'testimonial_reply', outcome: 'error'}));
    await rescue('error');
  }
}

export async function ingestOwnerReply(env, ctx, input, now) {
  const rawField = String(input?.raw || '');
  if (!rawField || rawField.length > 12_000_000) return {status: 400, body: {ok: false, error: 'Missing raw message'}};
  let bytes;
  try { bytes = b64(rawField); } catch { return {status: 400, body: {ok: false, error: 'Raw message must be base64'}}; }
  const result = await ingestRawBytes(env, ctx, bytes, {envelopeFrom: input.from || '', envelopeTo: input.to || replyAddress(env), now});
  const ok = Boolean(result.stored || result.duplicate);
  return {status: ok ? 200 : 400, body: {ok, id: result.id || null, duplicate: Boolean(result.duplicate), outcome: result.outcome, photos: result.photos || 0, name: result.name || null}};
}
