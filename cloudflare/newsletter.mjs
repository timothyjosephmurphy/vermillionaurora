// Email-list signup issues one collector at-cost print code and emails it.
// The site form posts here (same origin). This Worker adds the address in Buttondown, then uses the same
// issuer as testimonials (issueCollectorCode). Storage is the existing private R2 bucket COMMISSION_UPLOADS:
//   newsletter/codes/<hash>.json   one record per address (the code, so a repeat signup cannot issue another)
//   newsletter/rate/<day>/...      per-visitor and daily caps
// A testimonial code for the same address is a different record and is left alone.
//
// BUTTONDOWN_API_KEY (Buttondown → Settings → API, secret on vermillion-commissions) is required.
// Without it this refuses the signup and does not issue a code.
// Optional BUTTONDOWN_WEBHOOK_SECRET verifies X-Buttondown-Signature (HMAC-SHA256, hex) on
// POST /newsletter/buttondown-webhook for subscriber.created and subscriber.confirmed, so a signup that
// did not come through the site form still gets one code. Point that webhook at https://tjm.art/newsletter/buttondown-webhook.
import {issueCollectorCode} from './print-codes.mjs';
import {sellerMailToken, siteSender} from './shipping-email.mjs';
import {noteMime} from './testimonials.mjs';
import {isSiteOrigin} from './site-origins.mjs';

export const NEWSLETTER_SUBSCRIBE = '/newsletter/subscribe';
export const NEWSLETTER_WEBHOOK = '/newsletter/buttondown-webhook';
export const BUTTONDOWN_SUBSCRIBERS = 'https://api.buttondown.com/v1/subscribers';
export const PER_IP_LIMIT = 5;
export const DAILY_TOTAL_LIMIT = 40;
const RATE = 'newsletter/rate/';
const CODES = 'newsletter/codes/';
const ALREADY = new Set(['email_already_exists', 'subscriber_already_exists']);
const TERMINAL = new Set(['blocked', 'complained', 'undeliverable', 'removed', 'unsubscribed']);
const privateHeaders = {'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow'};
const jsonType = {httpMetadata: {contentType: 'application/json'}};
const day = (now = Date.now()) => new Date(now).toISOString().slice(0, 10);
const hex = buf => [...new Uint8Array(buf)].map(n => n.toString(16).padStart(2, '0')).join('');
const sha = async text => hex(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text)));
const validEmail = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) && v.length <= 254;
export const normalizeEmail = v => String(v || '').trim().toLowerCase();
const codeKey = hash => CODES + hash + '.json';
const escapeHtml = v => String(v).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'})[c]);
const reply = (body, status = 200) => Response.json(body, {status, headers: privateHeaders});
const wantsHtml = request => {
  const accept = request.headers.get('Accept') || '';
  return accept.includes('text/html') && !accept.includes('application/json');
};

// Hash both sides first so a length mismatch cannot short-circuit. Workers have timingSafeEqual; Node's test
// runner does not, so the XOR fallback covers that runtime and still compares the fixed-size digests.
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

function page(title, message, status = 200) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${escapeHtml(title)}</title><style>body{font:18px/1.55 Georgia,serif;background:#f6f1e7;color:#1d1a17;margin:0}main{max-width:36rem;margin:10vh auto;padding:24px}a{color:#8c2f1b}</style></head><body><main><h1>${escapeHtml(title)}</h1><p>${escapeHtml(message)}</p><p><a href="/">Back to the studio</a></p></main></body></html>`;
  return new Response(html, {status, headers: {...privateHeaders, 'Content-Type': 'text/html; charset=utf-8'}});
}

function respond(request, {status = 200, title, message, ...body}) {
  if (wantsHtml(request)) return page(title || (body.ok ? 'You’re on the list' : 'Couldn’t join the list'), message || '', status);
  return reply(body, status);
}

const MESSAGES = {
  sent: ['You’re on the list', 'I emailed a single-use code for one print at cost to that address. It comes from tj@tjm.art. Studio notes are a few times a year, and you can unsubscribe anytime.'],
  already: ['You’re already on the list', 'Your print code was emailed earlier. Check that inbox for a note from tj@tjm.art.'],
  emailFailed: ['You’re on the list', 'The print code email didn’t go out. Submit the form once more and I’ll send the same code.'],
  notConfigured: ['The list isn’t accepting signups just now', 'Email tj@tjm.art and I’ll add you. No print code was issued.'],
  rejected: ['The list didn’t accept that signup', 'Please try again in a little while. No print code was issued.'],
  rate: ['That’s enough signups from this network today', 'Email tj@tjm.art if you still need the list or a print code.'],
  badEmail: ['Check the email address', 'Enter a valid email address and try again.'],
  busy: ['One moment', 'A print code is already being prepared for that address. Try again in a minute.'],
  unavailable: ['Signup is temporarily unavailable', 'Please try again in a little while. No print code was issued.'],
};

export function newsletterCodeEmail({code}) {
  const subject = 'Your print code';
  const text = [
    'Hi,',
    '',
    'Thanks for joining the studio notes. Here is a single-use code for one print at cost:',
    '',
    code,
    '',
    'In your cart, open “Have a code?” and paste it into the code field before you calculate shipping and tax. You pay the print lab’s cost plus shipping. It works once, for prints only, not original paintings or commission deposits.',
    '',
    'Choose a print on any painting’s page (https://tjm.art/gallery/), then use the code in the cart.',
    '',
    'If you have a question, reply to this note. It comes straight to me.',
    '',
    'TJ',
    '',
  ].join('\n');
  const html = '<!DOCTYPE html>\n<html><head><meta charset="utf-8"></head><body>\n'
    + `<p>Hi,</p>\n<p>Thanks for joining the studio notes. Here is a single-use code for one print at cost:</p>\n<p>${escapeHtml(code)}</p>\n`
    + '<p>In your cart, open “Have a code?” and paste it into the code field before you calculate shipping and tax. You pay the print lab’s cost plus shipping. It works once, for prints only, not original paintings or commission deposits.</p>\n'
    + '<p>Choose a print on any painting’s page (<a href="https://tjm.art/gallery/">https://tjm.art/gallery/</a>), then use the code in the cart.</p>\n'
    + '<p>If you have a question, reply to this note. It comes straight to me.</p>\n<p>TJ</p>\n</body></html>\n';
  return {subject, text, html};
}

function errorCodes(data) {
  const found = [];
  const walk = node => {
    if (!node || typeof node !== 'object') return;
    if (typeof node.code === 'string') found.push(node.code);
    if (Array.isArray(node)) node.forEach(walk);
    else Object.values(node).forEach(walk);
  };
  walk(data);
  return found;
}

// Create or refresh a Buttondown subscriber. Collision behavior "add" treats an address that is already on the
// list as success (and resubscribes someone who had unsubscribed) without wiping their history.
export async function subscribeButtondown(env, {email, ip}, fetcher = fetch) {
  const key = String(env.BUTTONDOWN_API_KEY || '').trim();
  if (!key) return {ok: false, status: 503, reason: 'notConfigured'};
  let response;
  try {
    response = await fetcher(BUTTONDOWN_SUBSCRIBERS, {
      method: 'POST',
      signal: AbortSignal.timeout(15000),
      headers: {
        Authorization: `Token ${key}`,
        'Content-Type': 'application/json',
        'X-Buttondown-Collision-Behavior': 'add',
      },
      body: JSON.stringify({
        email_address: email,
        ...(ip ? {ip_address: ip} : {}),
        metadata: {source: 'tjm.art'},
      }),
    });
  } catch {
    return {ok: false, status: 502, reason: 'rejected'};
  }
  const data = await response.json().catch(() => ({}));
  if (response.status === 401 || response.status === 403) return {ok: false, status: 503, reason: 'notConfigured'};
  const codes = errorCodes(data);
  if (response.ok) {
    const type = String(data.type || 'unknown');
    if (TERMINAL.has(type)) return {ok: false, status: 400, reason: 'rejected'};
    return {ok: true, id: data.id || null, type, created: response.status === 201};
  }
  if (codes.some(c => ALREADY.has(c))) return {ok: true, id: data?.metadata?.subscriber_id || null, type: 'existing', created: false};
  return {ok: false, status: response.status === 429 ? 429 : 502, reason: 'rejected'};
}

async function subscriberEmail(env, id, fetcher = fetch) {
  const key = String(env.BUTTONDOWN_API_KEY || '').trim();
  if (!key || !id) return '';
  const response = await fetcher(`${BUTTONDOWN_SUBSCRIBERS}/${encodeURIComponent(id)}`, {
    headers: {Authorization: `Token ${key}`, Accept: 'application/json'},
    signal: AbortSignal.timeout(15000),
  });
  if (!response.ok) return '';
  const data = await response.json().catch(() => ({}));
  return normalizeEmail(data.email_address || data.email);
}

function clientIp(request) {
  const ip = request.headers.get('CF-Connecting-IP') || '';
  if (/^(?:\d{1,3}\.){3}\d{1,3}$/.test(ip) || (ip.includes(':') && ip.length <= 64)) return ip;
  return '';
}

async function overLimit(env, request, now, {webhook = false} = {}) {
  const bucket = env.COMMISSION_UPLOADS, today = day(now);
  const ip = clientIp(request) || 'unknown';
  const visitorKey = `${RATE}${today}/${(await sha(`newsletter-rate:${today}:${ip}:${env.COMMISSION_MANAGER_TOKEN || ''}`)).slice(0, 32)}`;
  const totalKey = `${RATE}${today}/_all`;
  const read = async key => { const o = await bucket.get(key); return o ? Number(await o.text()) || 0 : 0; };
  const [mine, all] = await Promise.all([read(visitorKey), read(totalKey)]);
  if (all >= DAILY_TOTAL_LIMIT || (!webhook && mine >= PER_IP_LIMIT)) return true;
  await Promise.all([
    webhook ? Promise.resolve() : bucket.put(visitorKey, String(mine + 1)),
    bucket.put(totalKey, String(all + 1)),
  ]);
  return false;
}

function base64url(v) {
  const bytes = new TextEncoder().encode(v);
  let s = '';
  for (let i = 0; i < bytes.length; i += 0x8000) s += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

async function sendCodeEmail(env, record) {
  const token = await sellerMailToken(env);
  const {subject, text, html} = newsletterCodeEmail(record);
  const raw = noteMime({
    from: siteSender(env), to: record.email, replyTo: 'tj@tjm.art', subject, text, html,
    messageId: `<newsletter-code-${record.hash}@tjm.art>`,
  });
  const response = await fetch('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', {
    method: 'POST', signal: AbortSignal.timeout(20000),
    headers: {Authorization: `Bearer ${token}`, 'Content-Type': 'application/json'},
    body: JSON.stringify({raw: base64url(raw)}),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.id) throw Error(`Gmail ${response.status}`);
  return data.id;
}

async function load(bucket, hash) {
  const object = await bucket.get(codeKey(hash));
  return {object, record: object ? await object.json() : null, etag: object?.etag};
}

// Issue at most one newsletter code for this address, then email it once. alreadySubscribed skips the
// Buttondown create (the webhook caller is already on the list).
async function ensureCode(env, request, email, {now, alreadySubscribed = false, webhook = false}) {
  const bucket = env.COMMISSION_UPLOADS;
  if (!bucket || !env.CART_ORDERS) return {status: 503, reason: 'unavailable'};
  const hash = await sha(`newsletter-code:${email}`);
  let {record, etag} = await load(bucket, hash);
  if (!record?.code && await overLimit(env, request, now, {webhook})) return {status: 429, reason: 'rate'};
  if (record?.code && record.emailedAt) {
    if (!alreadySubscribed) {
      const sub = await subscribeButtondown(env, {email, ip: clientIp(request)});
      if (!sub.ok && sub.reason === 'notConfigured') return {status: 503, reason: 'notConfigured'};
      if (!sub.ok) return {status: sub.status || 502, reason: 'rejected', already: true};
    }
    return {status: 200, ok: true, issued: false, emailed: true, already: true, reason: 'already'};
  }

  let buttondown = record?.buttondown?.ok ? record.buttondown : null;
  if (!buttondown && !alreadySubscribed) {
    const sub = await subscribeButtondown(env, {email, ip: clientIp(request)});
    if (!sub.ok) return {status: sub.status || 502, reason: sub.reason || 'rejected'};
    buttondown = {ok: true, id: sub.id, type: sub.type};
  }
  if (alreadySubscribed && !buttondown) buttondown = {ok: true, type: 'webhook'};

  let issuedNow = false;
  if (!record?.code) {
    if (record?.issuingAt && now - Date.parse(record.issuingAt) < 120000) return {status: 409, reason: 'busy'};
    const claim = {...(record || {}), email, hash, issuingAt: new Date(now).toISOString(), buttondown};
    const put = record
      ? await bucket.put(codeKey(hash), JSON.stringify(claim), {...jsonType, onlyIf: {etagMatches: etag}})
      : await bucket.put(codeKey(hash), JSON.stringify(claim), {...jsonType, onlyIf: {etagDoesNotMatch: '*'}});
    if (!put) {
      const again = await load(bucket, hash);
      if (again.record?.code) { record = again.record; etag = again.etag; }
      else return {status: 409, reason: 'busy'};
    } else {
      const note = `Newsletter signup ${day(now)}`;
      let issued;
      try {
        issued = await issueCollectorCode(env, {name: 'Newsletter subscriber', email, note});
      } catch {
        // Only replace our claim. A winner of the race may already have stored a code.
        await bucket.put(codeKey(hash), JSON.stringify({email, hash, buttondown, issueError: 'unavailable'}), {...jsonType, onlyIf: {etagMatches: put.etag}});
        const again = await load(bucket, hash);
        if (!again.record?.code) return {status: 503, reason: 'unavailable'};
        record = again.record;
        etag = again.etag;
        issued = null;
      }
      if (issued) {
        issuedNow = true;
        record = {email, hash, code: issued.code, issuedAt: issued.issuedAt, note, buttondown};
        // Unconditional: this request holds the claim and must not lose an issued code.
        const stored = await bucket.put(codeKey(hash), JSON.stringify(record), jsonType);
        etag = stored?.etag;
      }
    }
  }

  if (record.emailedAt) return {status: 200, ok: true, issued: false, emailed: true, already: true, reason: 'already'};
  const attempt = {...record, emailAttemptAt: new Date(now).toISOString()};
  const claimed = await bucket.put(codeKey(hash), JSON.stringify(attempt), {...jsonType, onlyIf: {etagMatches: etag}});
  if (!claimed) {
    const again = await load(bucket, hash);
    if (again.record?.emailedAt) return {status: 200, ok: true, issued: false, emailed: true, already: true, reason: 'already'};
    return {status: 409, reason: 'busy'};
  }
  try {
    const emailId = await sendCodeEmail(env, record);
    record = {...attempt, emailedAt: new Date(now).toISOString(), emailId, emailError: undefined};
    await bucket.put(codeKey(hash), JSON.stringify(record), {onlyIf: {etagMatches: claimed.etag}, ...jsonType});
    return {status: 200, ok: true, issued: issuedNow, emailed: true, already: false, reason: 'sent'};
  } catch (error) {
    record = {...record, emailAttemptAt: undefined, emailError: String(error?.message || 'Email failed').slice(0, 160)};
    await bucket.put(codeKey(hash), JSON.stringify(record), {onlyIf: {etagMatches: claimed.etag}, ...jsonType});
    return {status: 502, ok: false, issued: issuedNow, emailed: false, reason: 'emailFailed'};
  }
}

function outcome(request, result) {
  const reason = result.reason || 'unavailable';
  const [title, message] = MESSAGES[reason] || MESSAGES.unavailable;
  const status = result.status || (result.ok ? 200 : 502);
  return respond(request, {
    status, title, message, ok: Boolean(result.ok), issued: Boolean(result.issued), emailed: Boolean(result.emailed),
    already: Boolean(result.already), ...(result.ok ? {} : {error: message}),
  });
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

async function signup(request, env, now) {
  if (request.method !== 'POST') return reply({ok: false, error: 'Method not allowed'}, 405);
  const origin = request.headers.get('Origin');
  if (origin && !isSiteOrigin(origin)) return reply({ok: false, error: 'Origin not allowed'}, 403);
  let fields;
  try { fields = await readSignup(request); } catch { return outcome(request, {status: 400, reason: 'badEmail'}); }
  if (!fields) return outcome(request, {status: 400, reason: 'badEmail'});
  // Honeypot: bots fill every field. Pretend success and store nothing.
  if (String(fields.website || '').trim()) return outcome(request, {status: 200, ok: true, reason: 'sent'});
  const email = normalizeEmail(fields.email);
  if (!validEmail(email)) return outcome(request, {status: 400, reason: 'badEmail'});
  return outcome(request, await ensureCode(env, request, email, {now}));
}

async function hmacHex(secret, raw) {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  return hex(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(raw)));
}

function emailFromPayload(body) {
  const data = body?.data && typeof body.data === 'object' ? body.data : body;
  const sub = data?.subscriber ?? data;
  if (sub && typeof sub === 'object') return {email: normalizeEmail(sub.email_address || sub.email), id: typeof sub.id === 'string' ? sub.id : ''};
  if (typeof data?.email_address === 'string') return {email: normalizeEmail(data.email_address), id: ''};
  if (typeof sub === 'string') return {email: '', id: sub};
  return {email: '', id: ''};
}

async function webhook(request, env, now) {
  if (request.method !== 'POST') return reply({error: 'Not found'}, 404);
  const secret = String(env.BUTTONDOWN_WEBHOOK_SECRET || '').trim();
  if (!secret) return reply({error: 'Not found'}, 404);
  const raw = await request.text();
  if (raw.length > 100000) return reply({error: 'Payload too large'}, 413);
  const header = (request.headers.get('X-Buttondown-Signature') || '').trim().toLowerCase();
  const expected = `sha256=${await hmacHex(secret, raw)}`;
  if (!(await sameSecret(header, expected))) return reply({error: 'Not found'}, 404);
  let body;
  try { body = JSON.parse(raw); } catch { return reply({ok: true, ignored: true}); }
  const event = body.event_type || body.type || '';
  if (!['subscriber.created', 'subscriber.confirmed'].includes(event)) return reply({ok: true, ignored: true});
  let {email, id} = emailFromPayload(body);
  if (!validEmail(email) && id) {
    try { email = await subscriberEmail(env, id); } catch { email = ''; }
  }
  if (!validEmail(email)) {
    if (id && !String(env.BUTTONDOWN_API_KEY || '').trim()) return reply({ok: false, error: 'Newsletter signup is not configured'}, 503);
    return reply({ok: true, ignored: true});
  }
  const result = await ensureCode(env, request, email, {now, alreadySubscribed: true, webhook: true});
  if (!result.ok && result.reason !== 'already') return reply({ok: false, error: MESSAGES[result.reason]?.[1] || 'Unavailable'}, result.status || 502);
  return reply({ok: true, issued: Boolean(result.issued), emailed: Boolean(result.emailed), already: Boolean(result.already)});
}

export async function newsletterApi(request, env, now = Date.now()) {
  const path = new URL(request.url).pathname;
  if (path === NEWSLETTER_WEBHOOK) return webhook(request, env, now);
  if (path === NEWSLETTER_SUBSCRIBE) return signup(request, env, now);
  return reply({error: 'Not found'}, 404);
}
