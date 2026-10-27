import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {newsletterApi, newsletterCodeEmail, PER_IP_LIMIT} from './newsletter.mjs';
import {Bucket} from '../tests/r2-memory-bucket.mjs';

const now = Date.parse('2026-10-27T18:04:00Z');
const issued = [];
const subscribers = [];
let mails = [];
let failNextMail = false;

const setup = (extra = {}) => ({
  COMMISSION_UPLOADS: new Bucket(),
  COMMISSION_MANAGER_TOKEN: 'owner-token',
  GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 's', GOOGLE_REFRESH_TOKEN: 'r',
  BUTTONDOWN_API_KEY: 'bd-test-key',
  CHECKOUT_MODE: 'live',
  CART_ORDERS: {getByName: name => ({codeIssue: async (hash, record) => { issued.push({name, hash, record}); }})},
  ...extra,
});

test.beforeEach(() => {
  issued.length = 0; subscribers.length = 0; mails = []; failNextMail = false;
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    if (u.hostname === 'oauth2.googleapis.com') return Response.json({access_token: 'T'});
    if (u.hostname === 'gmail.googleapis.com') {
      if (failNextMail) { failNextMail = false; return Response.json({error: 'no'}, {status: 500}); }
      mails.push(JSON.parse(init.body));
      return Response.json({id: 'm' + mails.length});
    }
    if (u.hostname === 'api.buttondown.com' && u.pathname === '/v1/subscribers' && init.method === 'POST') {
      const body = JSON.parse(init.body);
      const headers = Object.fromEntries(new Headers(init.headers));
      subscribers.push({headers, body});
      if (body.email_address === 'exists@example.test') return Response.json({code: 'subscriber_already_exists', detail: 'exists'}, {status: 400});
      if (body.email_address === 'nope@example.test') return Response.json({code: 'email_invalid'}, {status: 400});
      if (body.email_address === 'down@example.test') return new Response('nope', {status: 500});
      if (body.email_address === 'blocked@example.test') return Response.json({id: 'sub-b', email_address: body.email_address, type: 'blocked'});
      if (body.email_address === 'unauth@example.test') return Response.json({code: 'authentication_missing'}, {status: 401});
      return Response.json({id: 'sub-1', email_address: body.email_address, type: 'regular'}, {status: 201});
    }
    if (u.hostname === 'api.buttondown.com' && u.pathname.startsWith('/v1/subscribers/')) {
      return Response.json({id: u.pathname.split('/').pop(), email_address: 'hook@example.test', type: 'regular'});
    }
    throw Error('unexpected fetch ' + url);
  };
});

const signup = (env, email, extra = {}) => {
  const headers = {Origin: 'https://tjm.art', Accept: 'application/json', 'Content-Type': 'application/json', 'CF-Connecting-IP': '203.0.113.8', ...extra.headers};
  const body = extra.body !== undefined ? extra.body : JSON.stringify({email});
  return newsletterApi(new Request('https://tjm.art/newsletter/subscribe', {method: extra.method || 'POST', headers, body}), env, extra.now || now);
};
const rawMime = m => new TextDecoder().decode(Uint8Array.from(atob(m.raw.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)));
const mimePart = (mime, type) => {
  const part = mime.split(/\r\n--tjm-[0-9a-f]+/).find(p => p.includes('Content-Type: ' + type));
  return new TextDecoder().decode(Uint8Array.from(atob(part.split('\r\n\r\n')[1].replace(/\s+/g, '')), c => c.charCodeAt(0)));
};
const hmac = async (secret, raw) => {
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  const sig = [...new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(raw)))].map(b => b.toString(16).padStart(2, '0')).join('');
  return `sha256=${sig}`;
};

test('signup copy mentions one print at cost and posts to the site', () => {
  const component = fs.readFileSync('src/components/EmailSignup.astro', 'utf8');
  assert.match(component, /One print at cost when you join/);
  assert.match(component, /action=\{newsletterAction\}/);
  assert.doesNotMatch(component, /embed-subscribe/);
  assert.doesNotMatch(component, /target="_blank"/);
  assert.match(fs.readFileSync('src/data/newsletter.mjs', 'utf8'), /\/newsletter\/subscribe/);
  for (const file of ['src/pages/index.astro', 'src/pages/film.astro', 'src/pages/products/[slug]/index.astro']) {
    const html = fs.readFileSync(file, 'utf8');
    assert.match(html, /One print at cost when you join/, file);
    assert.doesNotMatch(html, /embed-subscribe/, file);
  }
  const about = fs.readFileSync('src/pages/about/index.astro', 'utf8');
  assert.match(about, /EmailSignup/);
  assert.doesNotMatch(about, /embed-subscribe/);
  const blogs = fs.readdirSync('static/blog').filter(name => fs.existsSync(`static/blog/${name}/index.html`));
  assert.ok(blogs.length > 0);
  for (const name of blogs) {
    const html = fs.readFileSync(`static/blog/${name}/index.html`, 'utf8');
    if (!html.includes('email-signup')) continue;
    assert.match(html, /action="\/newsletter\/subscribe"/, name);
    assert.match(html, /One print at cost when you join/, name);
    assert.doesNotMatch(html, /embed-subscribe/, name);
  }
  const note = newsletterCodeEmail({code: 'VA-ABCD-EFGH-JKLM'});
  assert.match(note.text, /Have a code\?/);
  assert.match(note.text, /code field/);
  assert.match(note.text, /plus shipping/);
  assert.match(note.text, /prints only/);
  assert.match(note.text, /not original/);
  assert.doesNotMatch(note.text, /discount|offer|deal/i);
});

test('missing Buttondown API key does not subscribe or issue a code', async () => {
  const env = setup({BUTTONDOWN_API_KEY: ''});
  const r = await signup(env, 'jane@example.test');
  assert.equal(r.status, 503);
  const body = await r.json();
  assert.equal(body.ok, false);
  assert.match(body.error, /No print code was issued/);
  assert.equal(issued.length, 0);
  assert.equal(mails.length, 0);
  assert.equal(subscribers.length, 0);
});

test('a new signup subscribes, issues one collector code, and emails the how-to', async () => {
  const env = setup();
  const r = await signup(env, 'Jane@Example.test');
  assert.equal(r.status, 200);
  const body = await r.json();
  assert.deepEqual({ok: body.ok, issued: body.issued, emailed: body.emailed, already: body.already}, {ok: true, issued: true, emailed: true, already: false});
  assert.equal(JSON.stringify(body).includes('VA-'), false);
  assert.equal(issued.length, 1);
  assert.equal(issued[0].record.email, 'jane@example.test');
  assert.equal(issued[0].record.name, 'Newsletter subscriber');
  assert.equal(issued[0].record.note, 'Newsletter signup 2026-10-27');
  assert.equal(subscribers.length, 1);
  assert.equal(subscribers[0].headers.authorization, 'Token bd-test-key');
  assert.equal(subscribers[0].headers['x-buttondown-collision-behavior'], 'add');
  assert.equal(subscribers[0].body.email_address, 'jane@example.test');
  assert.equal(subscribers[0].body.ip_address, '203.0.113.8');
  assert.equal(subscribers[0].body.metadata.source, 'tjm.art');
  const mime = rawMime(mails[0]);
  const text = mimePart(mime, 'text/plain');
  assert.match(mime, /From: TJ Murphy <tj@tjm\.art>/);
  assert.match(mime, /To: jane@example\.test/);
  assert.match(mime, /Reply-To: tj@tjm\.art/);
  assert.match(text, /VA-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}/);
  assert.match(text, /Have a code\?/);
  assert.match(text, /code field/);
  assert.match(text, /plus shipping/);
  assert.match(text, /prints only, not original/);
  const stored = [...env.COMMISSION_UPLOADS.data.keys()].filter(k => k.startsWith('newsletter/codes/'));
  assert.equal(stored.length, 1);
  assert.equal(JSON.parse(env.COMMISSION_UPLOADS.data.get(stored[0]).value).code, text.match(/VA-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}/)[0]);
});

test('the same address does not get a second newsletter code, even if a testimonial code exists', async () => {
  const env = setup();
  await env.COMMISSION_UPLOADS.put('testimonials/records/t-20261027-abcdefabcdef.json', JSON.stringify({email: 'jane@example.test', thanks: {code: 'VA-TEST-TEST-TEST'}}));
  assert.equal((await signup(env, 'jane@example.test')).status, 200);
  const again = await signup(env, 'JANE@example.test');
  assert.equal(again.status, 200);
  const body = await again.json();
  assert.equal(body.already, true);
  assert.equal(body.issued, false);
  assert.equal(issued.length, 1);
  assert.equal(mails.length, 1);
  assert.equal(JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/t-20261027-abcdefabcdef.json').value).thanks.code, 'VA-TEST-TEST-TEST');
});

test('an address already on the list still gets one code; a rejected signup gets none', async () => {
  assert.equal((await signup(setup(), 'exists@example.test')).status, 200);
  assert.equal(issued.length, 1);
  issued.length = 0;
  for (const email of ['nope@example.test', 'down@example.test', 'blocked@example.test', 'unauth@example.test', 'not-an-email']) {
    const r = await signup(setup(), email);
    assert.notEqual(r.status, 200, email);
    assert.equal(issued.length, 0, email);
  }
});

test('a failed code email retries the same code and does not issue another', async () => {
  failNextMail = true;
  const env = setup();
  const first = await signup(env, 'retry@example.test');
  assert.equal(first.status, 502);
  assert.equal((await first.json()).issued, true);
  assert.equal(issued.length, 1);
  assert.equal(mails.length, 0);
  const second = await signup(env, 'retry@example.test');
  const body = await second.json();
  assert.equal(second.status, 200);
  assert.equal(body.issued, false);
  assert.equal(body.emailed, true);
  assert.equal(issued.length, 1);
  assert.equal(mails.length, 1);
});

test('honeypot and a foreign origin do not subscribe or issue', async () => {
  const env = setup();
  const bot = await signup(env, 'bot@example.test', {body: JSON.stringify({email: 'bot@example.test', website: 'https://spam.test'})});
  assert.equal(bot.status, 200);
  assert.equal((await bot.json()).ok, true);
  assert.equal((await signup(env, 'a@b.co', {headers: {Origin: 'https://evil.test'}})).status, 403);
  assert.equal(issued.length, 0);
  assert.equal(subscribers.length, 0);
  assert.equal(mails.length, 0);
});

test('an HTML form post confirms without revealing the code', async () => {
  const env = setup();
  const r = await signup(env, null, {headers: {Accept: 'text/html', 'Content-Type': 'application/x-www-form-urlencoded'}, body: 'email=form%40example.test'});
  assert.equal(r.status, 200);
  assert.match(r.headers.get('Content-Type'), /text\/html/);
  const html = await r.text();
  assert.match(html, /You’re on the list/);
  assert.match(html, /one print at cost/);
  assert.doesNotMatch(html, /VA-/);
  assert.equal(issued.length, 1);
  assert.equal(issued[0].record.email, 'form@example.test');
});

test('per-address issuance stays inside the per-network daily cap', async () => {
  const env = setup();
  for (let i = 0; i < PER_IP_LIMIT; i++) assert.equal((await signup(env, `p${i}@example.test`)).status, 200);
  assert.equal((await signup(env, 'overflow@example.test')).status, 429);
  assert.equal(issued.length, PER_IP_LIMIT);
});

test('two signups at once still issue one code', async () => {
  const env = setup();
  const [a, b] = await Promise.all([signup(env, 'race@example.test'), signup(env, 'race@example.test')]);
  const statuses = [a.status, b.status].sort();
  assert.deepEqual(statuses, [200, 409]);
  assert.equal(issued.length, 1);
  assert.equal(mails.length, 1);
});

test('webhook requires the signing secret and issues one code for subscriber.created', async () => {
  const open = await newsletterApi(new Request('https://tjm.art/newsletter/buttondown-webhook', {method: 'POST', body: '{}'}), setup(), now);
  assert.equal(open.status, 404);
  const env = setup({BUTTONDOWN_WEBHOOK_SECRET: 'hook-secret'});
  const raw = JSON.stringify({event_type: 'subscriber.created', data: {subscriber: {email_address: 'hooked@example.test'}}});
  const bad = await newsletterApi(new Request('https://tjm.art/newsletter/buttondown-webhook', {method: 'POST', headers: {'X-Buttondown-Signature': 'sha256=00'}, body: raw}), env, now);
  assert.equal(bad.status, 404);
  assert.equal(issued.length, 0);
  const good = await newsletterApi(new Request('https://tjm.art/newsletter/buttondown-webhook', {method: 'POST', headers: {'X-Buttondown-Signature': await hmac('hook-secret', raw)}, body: raw}), env, now);
  assert.equal(good.status, 200);
  assert.equal((await good.json()).issued, true);
  assert.equal(issued.length, 1);
  assert.equal(subscribers.length, 0);
  const again = await signup(env, 'hooked@example.test');
  assert.equal((await again.json()).already, true);
  assert.equal(issued.length, 1);
  assert.equal(mails.length, 1);
});

test('a webhook that only carries a subscriber id loads the address and does not need a second code', async () => {
  const env = setup({BUTTONDOWN_WEBHOOK_SECRET: 'hook-secret'});
  const raw = JSON.stringify({event_type: 'subscriber.confirmed', data: {subscriber: 'sub-99'}});
  const r = await newsletterApi(new Request('https://tjm.art/newsletter/buttondown-webhook', {method: 'POST', headers: {'X-Buttondown-Signature': await hmac('hook-secret', raw)}, body: raw}), env, now);
  assert.equal(r.status, 200);
  assert.equal(issued.length, 1);
  assert.equal(issued[0].record.email, 'hook@example.test');
  assert.equal(issued[0].record.note, 'Newsletter signup 2026-10-27');
});

test('the checkout worker routes signup to newsletterApi ahead of the commission form', () => {
  const source = fs.readFileSync(new URL('./commission-worker.js', import.meta.url), 'utf8');
  const route = source.indexOf("path === '/newsletter/subscribe' || path === '/newsletter/buttondown-webhook') return newsletterApi");
  const form = source.indexOf('return commissionForm(request,env)');
  assert.ok(route > 0 && form > route);
});
