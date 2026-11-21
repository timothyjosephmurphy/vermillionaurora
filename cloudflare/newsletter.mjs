// Email-list signup, kept entirely in TJ's own storage. No third-party newsletter service.
//
//   POST /newsletter/subscribe      site form (email, honeypot "website"). Stores the subscriber in the private
//                                   R2 bucket COMMISSION_UPLOADS at newsletter/subscribers/<hash>.json, issues one
//                                   at-cost print code per address and shows it on the confirmation page, and emails
//                                   TJ a short "new subscriber" note through the site's Gmail identity.
//   GET|POST /newsletter/unsubscribe?e=<email>&t=<token>
//                                   per-subscriber link for newsletter emails. GET shows a confirm button (so mail
//                                   scanners cannot unsubscribe anyone); POST marks the record unsubscribed.
//   GET /newsletter/export.csv      the whole list as CSV. Authorization: Bearer <NEWSLETTER_EXPORT_TOKEN or
//                                   COMMISSION_MANAGER_TOKEN>. The private repo timothyjosephmurphy/newsletter-list pulls
//                                   this on a schedule and is the list TJ sends from.
//
// Signups made before Nov 20 2026 (through the earlier hosted list) live at newsletter/codes/<hash>.json with their code. They are
// read as subscribers too, so nobody gets a second code and the export includes them.
import {issueCollectorCode} from './print-codes.mjs';
import {sellerMailToken, siteSender} from './shipping-email.mjs';
import {noteMime} from './testimonials.mjs';
import {isSiteOrigin} from './site-origins.mjs';

export const NEWSLETTER_SUBSCRIBE = '/newsletter/subscribe';
export const NEWSLETTER_UNSUBSCRIBE = '/newsletter/unsubscribe';
export const NEWSLETTER_EXPORT = '/newsletter/export.csv';
export const NEWSLETTER_NOTIFY_TO = 'tj@vermillionaurora.com';
export const PER_IP_LIMIT = 5;
export const DAILY_TOTAL_LIMIT = 40;
const RATE = 'newsletter/rate/';
const SUBS = 'newsletter/subscribers/';
const LEGACY = 'newsletter/codes/';
const privateHeaders = {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow'};
const jsonType = {httpMetadata: {contentType: 'application/json'}};
const day = (now = Date.now()) => new Date(now).toISOString().slice(0, 10);
const hex = buf => [...new Uint8Array(buf)].map(n => n.toString(16).padStart(2, '0')).join('');
const sha = async text => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
const validEmail = v => /^[^\s@,;"<>]+@[^\s@,;"<>]+\.[^\s@,;"<>]+$/.test(v) && v.length <= 254;
export const normalizeEmail = v => String(v || '').trim().toLowerCase();
export const emailHash = email => sha(`newsletter-code:${email}`);
// example.com is reserved (RFC 2606): used for tests, never a real subscriber, so no real print code is issued.
const isTestAddress = email => /@example\.(com|org|net)$/.test(email);
const escapeHtml = v => String(v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
const reply = (body, status = 200) => Response.json(body, {status, headers: privateHeaders});
const wantsHtml = request => {
  const accept = request.headers.get('Accept') || '';
  return accept.includes('text/html') && !accept.includes('application/json');
};

async function hmacHex(secret, raw) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(raw)));
}
async function sameSecret(provided, expected) {
  const encoder = new TextEncoder();
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(String(provided))),
    crypto.subtle.digest('SHA-256', encoder.encode(String(expected))),
  ]);
  if (typeof crypto.subtle.timingSafeEqual === 'function') return crypto.subtle.timingSafeEqual(a, b);
  const x = new Uint8Array(a), y = new Uint8Array(b);
  let diff = 0;
  for (let i = 0; i < x.length; i++) diff |= x[i] ^ y[i];
  return diff === 0;
}
const unsubscribeToken = async (env, email) => (await hmacHex(`newsletter-unsubscribe:${env.COMMISSION_MANAGER_TOKEN || ''}`, email)).slice(0, 32);
export async function unsubscribeUrl(env, email) {
  return `https://tjm.art${NEWSLETTER_UNSUBSCRIBE}?e=${encodeURIComponent(email)}&t=${await unsubscribeToken(env, email)}`;
}

function page(title, body, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title><style>body{font:18px/1.55 Georgia,serif;background:#f6f1e7;color:#1d1a17;margin:0}main{max-width:36rem;margin:10vh auto;padding:24px}a{color:#8c2f1b}.code{font:600 1.5rem/1.3 ui-monospace,Menlo,monospace;letter-spacing:.08em;background:#fffcf6;border:1px dashed #8c2f1b;border-radius:8px;padding:14px 18px;display:inline-block;margin:6px 0 4px;user-select:all}button{font:inherit;padding:10px 18px;border-radius:6px;border:1px solid #8c2f1b;background:#8c2f1b;color:#fff;cursor:pointer}</style></head><body><main><h1>${escapeHtml(title)}</h1>${body}<p><a href="https://tjm.art/">Back to tjm.art</a></p></main></body></html>`;
  return new Response(html, {status, headers: {...privateHeaders, 'Content-Type': 'text/html; charset=utf-8'}});
}

const CODE_HELP = 'Save this code. It works once, for one print at cost (the print lab’s price plus shipping), not for original paintings or commission deposits. Choose a print on any painting’s page, then in the cart open “Have a code?” and paste it before you calculate shipping and tax.';
const MESSAGES = {
  joined: ['You’re on the list', 'Thanks for joining. I send studio notes from my own email, tj@tjm.art, a few times a year. Every note has a one-click unsubscribe link.'],
  already: ['You’re already on the list', 'That address is already subscribed. Your print code was shown when you first joined. If you lost it, email tj@tjm.art.'],
  rate: ['That’s enough signups from this network today', 'Email tj@tjm.art and I’ll add you by hand.'],
  badEmail: ['Check the email address', 'Enter a valid email address and try again.'],
  unavailable: ['Signup is temporarily unavailable', 'Please try again in a little while, or email tj@tjm.art and I’ll add you.'],
};

function outcome(request, result) {
  const [title, message] = MESSAGES[result.reason] || MESSAGES.unavailable;
  const status = result.status || 200, ok = Boolean(result.ok);
  if (wantsHtml(request)) {
    let body = `<p>${escapeHtml(message)}</p>`;
    if (result.code) body += `<p>Here is your code for one print at cost:</p><p class="code">${escapeHtml(result.code)}</p><p>${escapeHtml(CODE_HELP)}</p><p><a href="https://tjm.art/gallery/">Browse paintings and prints</a></p>`;
    return page(title, body, status);
  }
  return reply({ok, already: Boolean(result.already), ...(result.code ? {code: result.code, codeHelp: CODE_HELP} : {}), ...(ok ? {message} : {error: message})}, status);
}

function clientIp(request) {
  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip) || (ip.includes(':') && ip.length <= 64)) return ip;
  return '';
}
const ipHash = async (env, request, today) => (await sha(`newsletter-rate:${today}:${clientIp(request) || 'unknown'}:${env.COMMISSION_MANAGER_TOKEN || ''}`)).slice(0, 32);

async function overLimit(env, request, now) {
  const bucket = env.COMMISSION_UPLOADS, today = day(now);
  const visitorKey = `${RATE}${today}/${await ipHash(env, request, today)}`;
  const totalKey = `${RATE}${today}/_all`;
  const read = async key => { const o = await bucket.get(key); return o ? Number(await o.text()) || 0 : 0; };
  const [mine, all] = await Promise.all([read(visitorKey), read(totalKey)]);
  if (all >= DAILY_TOTAL_LIMIT || mine >= PER_IP_LIMIT) return true;
  await Promise.all([bucket.put(visitorKey, String(mine + 1)), bucket.put(totalKey, String(all + 1))]);
  return false;
}

function sourcePage(request) {
  try {
    const ref = new URL(request.headers.get('Referer') || '');
    if (isSiteOrigin(ref.origin)) return ref.pathname.slice(0, 200);
  } catch {}
  return '';
}

function base64url(v) {
  const bytes = new TextEncoder().encode(v);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

export function signupNotice(record) {
  const subject = `${isTestAddress(record.email) ? '[test] ' : ''}New studio notes subscriber: ${record.email}`;
  const text = [
    `${record.email} joined the studio notes list on tjm.art.`,
    '',
    `When: ${record.subscribedAt}`,
    `Page: ${record.source || '(unknown)'}`,
    `Print code issued: ${record.code ? 'yes' : 'no'}`,
    '',
    'The full list is in the private GitHub repo timothyjosephmurphy/newsletter-list (subscribers.csv).',
    '',
  ].join('\n');
  const html = `<!DOCTYPE html>\n<html><head><meta charset="utf-8"></head><body>\n<p>${escapeHtml(record.email)} joined the studio notes list on tjm.art.</p>\n<p>When: ${escapeHtml(record.subscribedAt)}<br>Page: ${escapeHtml(record.source || '(unknown)')}<br>Print code issued: ${record.code ? 'yes' : 'no'}</p>\n<p>The full list is in the private GitHub repo timothyjosephmurphy/newsletter-list (subscribers.csv).</p>\n</body></html>\n`;
  return {subject, text, html};
}

async function notifyOwner(env, record) {
  const token = await sellerMailToken(env);
  const {subject, text, html} = signupNotice(record);
  const raw = noteMime({from: siteSender(env), to: env.NEWSLETTER_NOTIFY_TO || NEWSLETTER_NOTIFY_TO, subject, text, html,
    messageId: `<newsletter-signup-${record.hash}-${Date.parse(record.subscribedAt) || 0}@tjm.art>`});
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST', signal: AbortSignal.timeout(20000),
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({raw: base64url(raw)}),
  });
  if (!response.ok) throw Error(`Gmail ${response.status}`);
}

async function readRecord(bucket, hash) {
  const current = await bucket.get(SUBS + hash + '.json');
  if (current) return {record: await current.json(), etag: current.etag};
  const legacy = await bucket.get(LEGACY + hash + '.json');
  if (legacy) {
    const old = await legacy.json();
    return {record: old?.email ? {email: old.email, hash, status: 'subscribed', subscribedAt: old.issuedAt || '', source: 'before-nov-2026', code: old.code || ''} : null, etag: null};
  }
  return {record: null, etag: null};
}

async function readSignup(request) {
  const type = request.headers.get('Content-Type') || '';
  if (type.includes('application/json')) {
    const body = await request.json();
    return {email: body?.email, website: body?.website};
  }
  if (type.includes('application/x-www-form-urlencoded') || type.includes('multipart/form-data')) {
    const form = await request.formData();
    return {email: form.get('email'), website: form.get('website')};
  }
  return null;
}

async function signup(request, env, now, ctx) {
  if (request.method !== 'POST') return reply({ok: false, error: 'Method not allowed'}, 405);
  const origin = request.headers.get('Origin');
  if (origin && !isSiteOrigin(origin)) return reply({ok: false, error: 'Origin not allowed'}, 403);
  let fields;
  try { fields = await readSignup(request); } catch { return outcome(request, {status: 400, reason: 'badEmail'}); }
  if (!fields) return outcome(request, {status: 400, reason: 'badEmail'});
  // Honeypot: bots fill every field. Pretend success and store nothing.
  if (String(fields.website || '').trim()) return outcome(request, {status: 200, ok: true, reason: 'joined'});
  const email = normalizeEmail(fields.email);
  if (!validEmail(email)) return outcome(request, {status: 400, reason: 'badEmail'});
  const bucket = env.COMMISSION_UPLOADS;
  if (!bucket) return outcome(request, {status: 503, reason: 'unavailable'});
  const hash = await emailHash(email);
  const {record: existing} = await readRecord(bucket, hash);
  if (existing && existing.status !== 'unsubscribed') return outcome(request, {status: 200, ok: true, already: true, reason: 'already'});
  if (await overLimit(env, request, now)) return outcome(request, {status: 429, reason: 'rate'});
  const stamp = new Date(now).toISOString();
  const record = {
    email, hash, status: 'subscribed', subscribedAt: stamp, unsubscribedAt: '',
    source: sourcePage(request), ipHash: await ipHash(env, request, day(now)),
    code: existing?.code || '', codeIssuedAt: existing?.codeIssuedAt || '',
    ...(existing ? {firstSubscribedAt: existing.firstSubscribedAt || existing.subscribedAt} : {}),
  };
  let newCode = '';
  if (!record.code && !isTestAddress(email) && env.CART_ORDERS) {
    try {
      const issued = await issueCollectorCode(env, {name: 'Newsletter subscriber', email, note: `Newsletter signup ${day(now)}`});
      record.code = newCode = issued.code;
      record.codeIssuedAt = issued.issuedAt;
    } catch (error) {
      console.error('Newsletter print code issue failed', error?.message);
    }
  }
  if (isTestAddress(email)) record.test = true;
  await bucket.put(SUBS + hash + '.json', JSON.stringify(record), jsonType);
  const notice = notifyOwner(env, record).catch(error => console.error('Newsletter signup notice failed', error?.message));
  if (ctx?.waitUntil) ctx.waitUntil(notice); else await notice;
  return outcome(request, {status: 200, ok: true, reason: 'joined', code: newCode || (isTestAddress(email) ? 'TEST-NOT-A-REAL-CODE' : '')});
}

async function unsubscribe(request, env, now) {
  const url = new URL(request.url);
  let email = normalizeEmail(url.searchParams.get('e')), token = url.searchParams.get('t') || '';
  if (request.method === 'POST' && (!email || !token)) {
    try { const form = await request.formData(); email = normalizeEmail(form.get('e')); token = String(form.get('t') || ''); } catch {}
  }
  const bad = () => page('That unsubscribe link didn’t work', '<p>Email tj@tjm.art and I’ll take you off the list.</p>', 400);
  if (!validEmail(email) || !token || !env.COMMISSION_MANAGER_TOKEN || !(await sameSecret(token, await unsubscribeToken(env, email)))) return bad();
  if (request.method === 'GET') {
    return page('Unsubscribe from studio notes?', `<p>${escapeHtml(email)} will stop getting studio notes from TJ Murphy.</p><form method="post"><input type="hidden" name="e" value="${escapeHtml(email)}"><input type="hidden" name="t" value="${escapeHtml(token)}"><button type="submit">Unsubscribe</button></form>`);
  }
  if (request.method !== 'POST') return reply({error: 'Method not allowed'}, 405);
  const bucket = env.COMMISSION_UPLOADS, hash = await emailHash(email);
  const {record} = await readRecord(bucket, hash);
  const stamp = new Date(now).toISOString();
  const next = {...(record || {email, hash, subscribedAt: '', source: '', code: ''}), status: 'unsubscribed', unsubscribedAt: stamp};
  await bucket.put(SUBS + hash + '.json', JSON.stringify(next), jsonType);
  return page('You’re unsubscribed', `<p>${escapeHtml(email)} won’t get any more studio notes. If that was a mistake, sign up again on tjm.art.</p>`);
}

const csvCell = v => { const s = String(v ?? ''); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
async function listAll(bucket, prefix) {
  const out = []; let cursor;
  do {
    const page = await bucket.list({prefix, cursor, limit: 1000});
    out.push(...page.objects.map(o => o.key));
    cursor = page.truncated ? page.cursor : undefined;
  } while (cursor);
  return out;
}

export async function exportCsv(env) {
  const bucket = env.COMMISSION_UPLOADS, rows = new Map();
  for (const key of await listAll(bucket, LEGACY)) {
    const hash = key.slice(LEGACY.length, -5);
    const {record} = await readRecord(bucket, hash);
    if (record?.email) rows.set(hash, record);
  }
  for (const key of await listAll(bucket, SUBS)) {
    const object = await bucket.get(key);
    const record = object ? await object.json() : null;
    if (record?.email) rows.set(record.hash || key.slice(SUBS.length, -5), record);
  }
  const header = ['email', 'status', 'subscribed_at', 'unsubscribed_at', 'source', 'print_code', 'unsubscribe_url'];
  const lines = [header.join(',')];
  const sorted = [...rows.values()].filter(r => !r.test).sort((a, b) => String(a.subscribedAt).localeCompare(String(b.subscribedAt)) || a.email.localeCompare(b.email));
  for (const r of sorted) lines.push([r.email, r.status || 'subscribed', r.subscribedAt, r.unsubscribedAt, r.source, r.code, await unsubscribeUrl(env, r.email)].map(csvCell).join(','));
  return lines.join('\n') + '\n';
}

async function exportList(request, env) {
  if (request.method !== 'GET') return reply({error: 'Not found'}, 404);
  const auth = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
  const tokens = [env.NEWSLETTER_EXPORT_TOKEN, env.COMMISSION_MANAGER_TOKEN].filter(Boolean);
  let allowed = false;
  for (const t of tokens) if (auth && await sameSecret(auth, t)) allowed = true;
  if (!allowed) return reply({error: 'Not found'}, 404);
  return new Response(await exportCsv(env), {headers: {...privateHeaders, 'Content-Type': 'text/csv; charset=utf-8', 'Content-Disposition': 'attachment; filename="subscribers.csv"'}});
}

export async function newsletterApi(request, env, now = Date.now(), ctx) {
  const path = new URL(request.url).pathname;
  if (path === NEWSLETTER_SUBSCRIBE) return signup(request, env, now, ctx);
  if (path === NEWSLETTER_UNSUBSCRIBE) return unsubscribe(request, env, now);
  if (path === NEWSLETTER_EXPORT) return exportList(request, env);
  return reply({error: 'Not found'}, 404);
}
