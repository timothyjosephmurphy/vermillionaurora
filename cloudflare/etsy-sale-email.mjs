// Mark tjm.art originals sold from authenticated Etsy seller-sale emails.
// Prints are ignored. Reactivation stays owner-only.
import {EXISTING_PRINT_LISTINGS, PROTECTED_LISTING_IDS, ORIGINAL_WORKS, SYNC_WORKS, originalTitle, printTitle} from './etsy-sync-plan.mjs';
import {titleOf} from './etsy-listing-plan.mjs';
import {listingMap, byListingId, applyEtsyOriginalSale, alertOriginalSync, rememberRateLimit, loadOriginalSyncState, saveOriginalSyncState} from './etsy-original-sync.mjs';

export const DEFAULT_SALE_ADDRESS = 'etsy-sales@reply.tjm.art';
export const SALE_FORWARD = 'tj@vermillionaurora.com';
export const saleAddress = env => {
  const value = String(env?.ETSY_SALE_EMAIL || '').trim().toLowerCase();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? value : DEFAULT_SALE_ADDRESS;
};

const PRINT_MARK = /art print/i;
const SALE_SUBJECT = /you made a sale on etsy|congrats on your first sale|congratulations on your first sale|here are your order details/i;
const IGNORE_SUBJECT = /refund|cancell?ed|has been shipped|order shipped|payment of \$|terms of use|start the week|update on our terms/i;

const latin1 = bytes => {
  const b = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  let s = '';
  for (let i = 0; i < b.length; i += 0x8000) s += String.fromCharCode(...b.subarray(i, i + 0x8000));
  return s;
};
const qpDecode = text => {
  const cleaned = String(text || '').replace(/=\r?\n/g, '');
  const bytes = [];
  for (let i = 0; i < cleaned.length; i++) {
    if (cleaned[i] === '=' && /^[0-9A-Fa-f]{2}$/.test(cleaned.slice(i + 1, i + 3))) {
      bytes.push(parseInt(cleaned.slice(i + 1, i + 3), 16));
      i += 2;
    } else bytes.push(cleaned.charCodeAt(i) & 255);
  }
  return new Uint8Array(bytes);
};
const b64Bytes = text => {
  const clean = String(text || '').replace(/[^A-Za-z0-9+/=]/g, '');
  const bin = atob(clean);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};
function decodeBytes(bytes, charset) {
  const label = !charset || /utf-?8/i.test(charset) ? 'utf-8' : charset;
  try { return new TextDecoder(label).decode(bytes); } catch { return new TextDecoder('utf-8').decode(bytes); }
}
export function decodeWords(value) {
  return String(value || '').replace(/=\?([^?]+)\?([bqBQ])\?([^?]*)\?=/g, (_, charset, enc, data) => {
    const bytes = enc.toUpperCase() === 'B' ? b64Bytes(data) : qpDecode(data.replace(/_/g, ' '));
    return decodeBytes(bytes, charset);
  });
}

export function parseRfc822(raw) {
  const text = typeof raw === 'string' ? raw : decodeBytes(raw instanceof Uint8Array ? raw : new Uint8Array(raw));
  const splitAt = text.search(/\r?\n\r?\n/);
  const head = splitAt < 0 ? text : text.slice(0, splitAt);
  const rest = splitAt < 0 ? '' : text.slice(splitAt).replace(/^\r?\n\r?\n/, '');
  const unfolded = head.replace(/\r?\n[ \t]+/g, ' ');
  const headers = {};
  for (const line of unfolded.split(/\r?\n/)) {
    const i = line.indexOf(':');
    if (i < 1) continue;
    const name = line.slice(0, i).trim().toLowerCase();
    const value = line.slice(i + 1).trim();
    headers[name] = headers[name] ? headers[name] + '\n' + value : value;
  }
  if (headers.subject) headers.subject = decodeWords(headers.subject);
  return {headers, body: rest, rawText: text};
}

function headerList(headers, name) {
  const value = headers?.[name];
  return value ? String(value).split('\n') : [];
}

export function emailAddress(value) {
  const raw = decodeWords(String(value || '').replace(/\n/g, ' ')).trim();
  const angled = raw.match(/<([^>]+)>/);
  const email = (angled ? angled[1] : raw).trim().toLowerCase().replace(/^mailto:/i, '');
  return email.includes('@') ? email : '';
}

export function etsyDomain(email) {
  const domain = emailAddress(email).split('@')[1] || '';
  return domain === 'etsy.com' || domain.endsWith('.etsy.com');
}

function authHost(line) {
  const prefix = String(line || '').split(';')[0].trim();
  return prefix.replace(/^i=\d+\s+/i, '').trim().toLowerCase();
}

function trustedAuthLines(headers) {
  const lines = [];
  for (const line of headerList(headers, 'authentication-results')) {
    const host = authHost(line);
    if (/(^|\.)cloudflare\.net$/.test(host) || host === 'mx.cloudflare.net') lines.push({source: 'cf', line});
  }
  for (const line of headerList(headers, 'arc-authentication-results')) {
    const host = authHost(line);
    if (/(^|\.)cloudflare\.net$/.test(host) || host === 'mx.cloudflare.net') lines.push({source: 'arc-cf', line});
  }
  return lines;
}

function etsyProof(line) {
  const dkim = /dkim=pass\b/i.test(line) && /header\.i=@[\w.-]*etsy\.com\b/i.test(line);
  const dmarc = /dmarc=pass\b/i.test(line) && /header\.from=[\w.-]*etsy\.com\b/i.test(line);
  return dkim || dmarc;
}

// Only trust Authentication-Results added by Cloudflare Email Routing, not a header an attacker could insert.
export function etsyAuthenticated(headers) {
  const from = emailAddress(headers?.from);
  if (!etsyDomain(from)) return {ok: false, reason: 'sender'};
  const lines = trustedAuthLines(headers);
  if (!lines.length) return {ok: false, reason: 'no-trusted-auth'};
  if (lines.some(item => etsyProof(item.line))) return {ok: true, from};
  const cf = lines.find(item => item.source === 'cf');
  if (cf && /arc=pass\b/i.test(cf.line)) {
    const arc = headerList(headers, 'arc-authentication-results').some(etsyProof);
    if (arc) return {ok: true, from};
  }
  return {ok: false, reason: 'auth-failed'};
}

export function isEtsySaleRecipient(to, env) {
  const want = saleAddress(env);
  return String(to || '').toLowerCase().includes(want);
}

export function isForwardingConfirmation(headers) {
  const from = emailAddress(headers?.from);
  const subject = headers?.subject || '';
  return /google\.com$/.test(from.split('@')[1] || '') && /forwarding confirmation|confirm.*forward/i.test(subject);
}

export function classifySaleSubject(subject) {
  const text = String(subject || '');
  if (IGNORE_SUBJECT.test(text)) return 'ignore';
  if (SALE_SUBJECT.test(text)) return 'sale';
  return 'other';
}

function decodePart(raw, headers) {
  const encoding = (headers['content-transfer-encoding'] || '').toLowerCase();
  const type = headers['content-type'] || '';
  const charset = type.match(/charset="?([^";]+)/i)?.[1];
  let bytes;
  if (encoding.includes('base64')) bytes = b64Bytes(raw);
  else if (encoding.includes('quoted-printable')) bytes = qpDecode(raw);
  else bytes = new TextEncoder().encode(raw);
  return decodeBytes(bytes, charset);
}

function partsOf(body, contentType) {
  const boundary = contentType.match(/boundary="?([^";]+)"?/i)?.[1];
  if (!boundary) return [{headers: {'content-type': contentType}, body}];
  const token = '--' + boundary;
  const chunks = body.split(token).slice(1);
  const parts = [];
  for (const chunk of chunks) {
    if (chunk.startsWith('--')) break;
    const inner = parseRfc822(chunk.replace(/^\r?\n/, ''));
    const nestedType = inner.headers['content-type'] || 'text/plain';
    if (/multipart\//i.test(nestedType)) parts.push(...partsOf(inner.body, nestedType));
    else parts.push({headers: inner.headers, body: inner.body});
  }
  return parts;
}

export function extractBodies(parsed) {
  const type = parsed.headers['content-type'] || 'text/plain';
  const parts = partsOf(parsed.body, type);
  let plain = '', html = '';
  for (const part of parts) {
    const ctype = part.headers['content-type'] || '';
    const text = decodePart(part.body, part.headers);
    if (/text\/html/i.test(ctype)) html += text + '\n';
    else if (/text\/plain/i.test(ctype) || !ctype) plain += text + '\n';
  }
  if (!plain && !html && parsed.body) plain = parsed.body;
  return {plain, html};
}

function numbers(text, pattern) {
  return [...String(text || '').matchAll(pattern)].map(match => match[1]).filter(Boolean);
}

export function parseEtsySaleEmail(parsed) {
  const subject = parsed.headers.subject || '';
  const kind = classifySaleSubject(subject);
  const {plain, html} = extractBodies(parsed);
  const visible = plain + '\n' + html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ');
  const orderFromSubject = subject.match(/order\s*#\s*(\d+)/i)?.[1];
  const orderId = plain.match(/order number:\s*(\d+)/i)?.[1] || visible.match(/order number:\s*(\d+)/i)?.[1] || orderFromSubject || null;
  const listingIds = [...new Set(numbers(plain + '\n' + html, /etsy\.com\/listing\/(\d+)/gi))];
  const transactionIds = [...new Set([
    ...numbers(visible, /transaction id:\s*(\d+)/gi),
    ...numbers(plain + '\n' + html, /etsy\.com\/transaction\/(\d+)/gi)
  ])];
  const items = [];
  const itemBlocks = [...plain.matchAll(/Item:\s*(.+?)(?=\n\s*Item:|\n\s*Item total:|\n\s*-{5,}|\n\s*Buyer details|\n\s*Shipping:|\s*$)/gis)];
  const blocks = itemBlocks.length ? itemBlocks : (plain.match(/Item:\s*.+/i) ? [[plain, plain]] : []);
  for (const block of blocks) {
    const chunk = block[1] || block[0];
    const first = (chunk.match(/Item:\s*(.+)/i) || [])[1] || chunk.split(/\r?\n/)[0];
    const title = first.replace(/\s+/g, ' ').trim();
    const quantity = Number((chunk.match(/Quantity:\s*(\d+)/i) || [])[1] || 1);
    const transactionId = (chunk.match(/Transaction ID:\s*(\d+)/i) || [])[1] || null;
    const listingId = (chunk.match(/etsy\.com\/listing\/(\d+)/i) || [])[1] || null;
    if (title) items.push({title, quantity: Number.isFinite(quantity) && quantity > 0 ? quantity : 1, listingId, transactionId});
  }
  if (!items.length && listingIds.length) {
    for (const listingId of listingIds) items.push({title: '', quantity: 1, listingId, transactionId: transactionIds[0] || null});
  }
  if (items.length === 1 && !items[0].listingId && listingIds.length === 1) items[0].listingId = listingIds[0];
  if (items.length === 1 && !items[0].transactionId && transactionIds.length === 1) items[0].transactionId = transactionIds[0];
  return {kind, subject, orderId, listingIds, transactionIds, items};
}

function normalizeTitle(value) {
  return String(value || '').normalize('NFKC').toLowerCase().replace(/[—–−]/g, '-').replace(/·/g, ' ').replace(/[^a-z0-9x]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function printTitlesFor(work) {
  const titles = [];
  try { titles.push(printTitle(work)); } catch { /* missing print fields */ }
  try { titles.push(titleOf(work)); } catch { /* not a print work */ }
  return titles;
}

export function looksLikePrintTitle(title) {
  if (PRINT_MARK.test(title || '')) return true;
  const needle = normalizeTitle(title);
  if (!needle) return false;
  return SYNC_WORKS.some(work => printTitlesFor(work).some(item => normalizeTitle(item) === needle));
}

export function matchOriginalByTitle(title, record) {
  const needle = normalizeTitle(title);
  if (!needle || looksLikePrintTitle(title)) return null;
  const map = listingMap(record);
  const hits = [];
  for (const item of map) {
    const work = ORIGINAL_WORKS.find(entry => entry.id === item.productId);
    const titles = [work?.title, work ? (() => { try { return originalTitle(work); } catch { return ''; } })() : ''].filter(Boolean);
    if (titles.some(value => normalizeTitle(value) === needle || needle.startsWith(normalizeTitle(value) + ' original'))) hits.push(item);
  }
  const unique = [...new Map(hits.map(item => [item.productId, item])).values()];
  return unique.length === 1 ? unique[0] : null;
}

export function mapSaleItem(item, record) {
  const listingId = item.listingId ? Number(item.listingId) : 0;
  if (listingId && (PROTECTED_LISTING_IDS.has(listingId) || new Set(Object.values(EXISTING_PRINT_LISTINGS)).has(listingId))) {
    return {kind: 'print', listingId};
  }
  const map = listingMap(record);
  const byId = byListingId(map);
  if (listingId && byId.has(listingId)) return {kind: 'original', productId: byId.get(listingId), listingId};
  if (listingId) return {kind: 'unknown', listingId, title: item.title, reason: 'unmapped-listing'};
  if (looksLikePrintTitle(item.title)) return {kind: 'print', title: item.title};
  const matched = matchOriginalByTitle(item.title, record);
  if (matched) return {kind: 'original', productId: matched.productId, listingId: matched.listingId, title: item.title};
  return {kind: 'unknown', title: item.title, reason: item.title ? 'unmapped-title' : 'missing-title'};
}

async function alertParseFailure(env, issue, text, state, etag) {
  const key = 'Etsy sale email: ' + issue;
  await alertOriginalSync(env, key, text, state);
  try { await saveOriginalSyncState(env, state, etag); } catch { /* logged */ }
}

export async function processEtsySaleEmail(env, raw, {envelopeTo = '', now = Date.now()} = {}) {
  if (!isEtsySaleRecipient(envelopeTo, env)) return {ok: false, skipped: 'wrong-address'};
  const parsed = parseRfc822(raw);
  if (isForwardingConfirmation(parsed.headers)) return {ok: true, skipped: 'forward-confirm', forward: SALE_FORWARD};
  const auth = etsyAuthenticated(parsed.headers);
  if (!auth.ok) return {ok: false, skipped: 'unauthenticated', reason: auth.reason};
  const sale = parseEtsySaleEmail(parsed);
  if (sale.kind === 'ignore' || sale.kind === 'other') return {ok: true, skipped: sale.kind};
  if (!sale.orderId || !sale.items.length) {
    const loaded = await loadOriginalSyncState(env);
    await alertParseFailure(env, 'could not parse order ' + (sale.orderId || 'unknown'), 'An authenticated Etsy sale email could not be parsed.\n\nSubject: ' + (sale.subject || '(none)') + '\nThe site was not changed.', loaded.state, loaded.etag);
    return {ok: false, skipped: 'parse-failed', subject: sale.subject};
  }
  const {read} = await import('./etsy-connection.mjs');
  const stored = await read(env);
  const record = stored?.record || {};
  const results = [];
  const originals = [];
  let unknowns = 0;
  for (const item of sale.items) {
    const mapped = mapSaleItem(item, record);
    if (mapped.kind === 'print') { results.push({...mapped, skipped: 'print'}); continue; }
    if (mapped.kind !== 'original') { unknowns += 1; results.push(mapped); continue; }
    originals.push(mapped);
  }
  if (unknowns) {
    const started = await loadOriginalSyncState(env);
    await alertParseFailure(env, 'could not match items in order ' + sale.orderId, 'An Etsy sale email for order ' + sale.orderId + ' had ' + unknowns + ' item(s) that could not be matched to a tjm.art original or a known print. Those items were left unchanged.', started.state, started.etag);
  }
  if (!originals.length) return {ok: true, orderId: sale.orderId, results};
  const {connection} = await import('./etsy-listings.mjs');
  let loaded;
  try { loaded = await connection(env, now); }
  catch (error) {
    const started = await loadOriginalSyncState(env);
    if (rememberRateLimit(started.state, error, now)) {
      try { await saveOriginalSyncState(env, started.state, started.etag); } catch { /* logged */ }
    }
    await alertParseFailure(env, 'could not reach Etsy for order ' + sale.orderId, 'An Etsy sale email for order ' + sale.orderId + ' arrived, but Etsy could not be reached to update the listing.\n\n' + (error.message || 'Etsy could not be reached.'), started.state, started.etag);
    return {ok: false, skipped: 'etsy-unavailable', orderId: sale.orderId, results};
  }
  for (const mapped of originals) {
    const applied = await applyEtsyOriginalSale(env, loaded.token, loaded.record, {
      receiptId: sale.orderId, productId: mapped.productId, listingId: mapped.listingId, now,
      note: 'Etsy sale email, order ' + sale.orderId
    });
    results.push({...mapped, ...applied});
  }
  return {ok: true, orderId: sale.orderId, results};
}

export async function handleEtsySaleEmail(message, env, ctx) {
  let raw;
  try { raw = new Uint8Array(await new Response(message.raw).arrayBuffer()); }
  catch { try { await message.forward(SALE_FORWARD); } catch { /* already finished */ } return; }
  try {
    const result = await processEtsySaleEmail(env, raw, {envelopeTo: message.to, now: Date.now()});
    if (result.forward) await message.forward(result.forward);
  } catch (error) {
    console.error('Etsy sale email failed', error instanceof Error ? error.message : error);
    try { await message.forward(SALE_FORWARD); } catch { /* already finished */ }
  }
}
