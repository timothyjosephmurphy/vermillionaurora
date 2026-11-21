import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import {newsletterApi, unsubscribeUrl, emailHash, PER_IP_LIMIT, NEWSLETTER_NOTIFY_TO} from './newsletter.mjs';
import {Bucket} from '../tests/r2-memory-bucket.mjs';

const now = Date.parse('2026-11-20T18:04:00Z');
const issued = [];
let mails = [];
let fetched = [];

const setup = (extra = {}) => ({
  COMMISSION_UPLOADS: new Bucket(),
  COMMISSION_MANAGER_TOKEN: 'owner-token',
  NEWSLETTER_EXPORT_TOKEN: 'export-token',
  GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 's', GOOGLE_REFRESH_TOKEN: 'r',
  CHECKOUT_MODE: 'live',
  CART_ORDERS: {getByName: name => ({codeIssue: async (hash, record) => { issued.push({name, hash, record}); }})},
  ...extra,
});

test.beforeEach(() => {
  issued.length = 0; mails = []; fetched = [];
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    fetched.push(u.hostname);
    if (u.hostname === 'oauth2.googleapis.com') return Response.json({access_token: 'T'});
    if (u.hostname === 'gmail.googleapis.com') { mails.push(JSON.parse(init.body)); return Response.json({id: 'm' + mails.length}); }
    throw Error('unexpected fetch ' + url);
  };
});

const signup = (env, email, extra = {}) => {
  const headers = {Origin: 'https://tjm.art', Referer: 'https://tjm.art/about/', Accept: 'application/json', 'Content-Type': 'application/json', 'CF-Connecting-IP': extra.ip || '203.0.113.8', ...extra.headers};
  const body = extra.body !== undefined ? extra.body : JSON.stringify({email, website: extra.website || ''});
  return newsletterApi(new Request('https://tjm.art/newsletter/subscribe', {method: 'POST', headers, body}), env, extra.now || now);
};
const rawMime = m => new TextDecoder().decode(Uint8Array.from(atob(m.raw.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0)));
const mimePart = (mime, type) => {
  const part = mime.split(/\r\n--tjm-[0-9a-f]+/).find(p => p.includes('Content-Type: ' + type));
  return new TextDecoder().decode(Uint8Array.from(atob(part.split('\r\n\r\n')[1].replace(/\s+/g, '')), c => c.charCodeAt(0)));
};
const exportCsv = (env, token = 'export-token') => newsletterApi(new Request('https://tjm.art/newsletter/export.csv', {headers: {Authorization: `Bearer ${token}`}}), env, now);

test('signup forms post to the site and no longer mention Buttondown', () => {
  const component = fs.readFileSync('src/components/EmailSignup.astro', 'utf8');
  assert.match(component, /action=\{newsletterAction\}/);
  assert.match(fs.readFileSync('src/data/newsletter.mjs', 'utf8'), /\/newsletter\/subscribe/);
  for (const file of ['src/data/newsletter.mjs', 'src/pages/privacy/index.astro', 'cloudflare/newsletter.mjs', 'worker/routes-config.mjs'])
    assert.doesNotMatch(fs.readFileSync(file, 'utf8'), /buttondown/i, file);
});

test('a new signup is stored, gets one print code shown in the response, and TJ is emailed', async () => {
  const env = setup();
  const res = await signup(env, 'Reader@Example.test');
  assert.equal(res.status, 200);
  const body = await res.json();
  assert.equal(body.ok, true);
  assert.match(body.code, /\S{6,}/);
  assert.equal(issued.length, 1);
  const stored = await (await env.COMMISSION_UPLOADS.get(`newsletter/subscribers/${await emailHash('reader@example.test')}.json`)).json();
  assert.equal(stored.email, 'reader@example.test');
  assert.equal(stored.status, 'subscribed');
  assert.equal(stored.source, '/about/');
  assert.match(stored.ipHash, /^[0-9a-f]{32}$/);
  assert.equal(stored.code, body.code);
  assert.equal(mails.length, 1);
  const mime = rawMime(mails[0]);
  assert.match(mime, new RegExp(`To: ${NEWSLETTER_NOTIFY_TO}`));
  assert.match(mimePart(mime, 'text/plain'), /reader@example\.test joined the studio notes list/);
  assert.ok(!fetched.some(h => !/googleapis\.com$/.test(h)), 'no third-party calls besides the site Gmail identity');
});

test('HTML responses show the code on the page', async () => {
  const env = setup();
  const res = await signup(env, 'page@example.test', {headers: {Accept: 'text/html'}});
  const html = await res.text();
  assert.match(html, /You’re on the list/);
  assert.match(html, /class="code"/);
  assert.match(html, /one print at cost/);
});

test('duplicates are not stored twice and get no second code', async () => {
  const env = setup();
  await signup(env, 'dup@example.test');
  const again = await (await signup(env, 'DUP@example.test ')).json();
  assert.equal(again.already, true);
  assert.equal(again.code, undefined);
  assert.equal(issued.length, 1);
  assert.equal(mails.length, 1);
});

test('legacy (pre-Nov 20) code records count as subscribers', async () => {
  const env = setup();
  const hash = await emailHash('old@example.test');
  await env.COMMISSION_UPLOADS.put(`newsletter/codes/${hash}.json`, JSON.stringify({email: 'old@example.test', hash, code: 'TJM-OLD1', issuedAt: '2026-10-28T00:00:00Z', emailedAt: '2026-10-28T00:00:01Z'}));
  const again = await (await signup(env, 'old@example.test')).json();
  assert.equal(again.already, true);
  assert.equal(issued.length, 0);
  const csv = await (await exportCsv(env)).text();
  assert.match(csv, /^old@example\.test,subscribed,2026-10-28T00:00:00Z,,before-nov-2026,TJM-OLD1,https:\/\/tjm\.art\/newsletter\/unsubscribe\?e=old%40example\.test&t=[0-9a-f]{32}$/m);
});

test('bad emails, honeypot and rate limit', async () => {
  const env = setup();
  assert.equal((await signup(env, 'not-an-email')).status, 400);
  const bot = await signup(env, 'bot@example.test', {website: 'http://spam'});
  assert.equal(bot.status, 200);
  assert.equal((await env.COMMISSION_UPLOADS.list({prefix: 'newsletter/subscribers/'})).objects.length, 0);
  for (let i = 0; i < PER_IP_LIMIT; i++) assert.equal((await signup(env, `r${i}@example.test`)).status, 200);
  assert.equal((await signup(env, 'over@example.test')).status, 429);
  assert.equal((await signup(env, 'other@example.test', {ip: '198.51.100.4'})).status, 200);
});

test('example.com test addresses get no real print code', async () => {
  const env = setup();
  const body = await (await signup(env, 'newsletter-test@example.com')).json();
  assert.equal(body.code, 'TEST-NOT-A-REAL-CODE');
  assert.equal(issued.length, 0);
  assert.match(mimePart(rawMime(mails[0]), 'text/plain'), /newsletter-test@example\.com joined/);
  assert.doesNotMatch(await (await exportCsv(env)).text(), /newsletter-test@example\.com/);
});

test('unsubscribe link: GET confirms, POST unsubscribes, bad tokens fail, export reflects it', async () => {
  const env = setup();
  await signup(env, 'leave@example.test');
  const link = await unsubscribeUrl(env, 'leave@example.test');
  const get = await newsletterApi(new Request(link), env, now);
  assert.equal(get.status, 200);
  assert.match(await get.text(), /<form method="post">/);
  const bad = await newsletterApi(new Request(link.replace(/t=[0-9a-f]+/, 't=deadbeef')), env, now);
  assert.equal(bad.status, 400);
  const post = await newsletterApi(new Request(link, {method: 'POST'}), env, now + 1000);
  assert.match(await post.text(), /You’re unsubscribed/);
  const csv = await (await exportCsv(env)).text();
  assert.match(csv, /^leave@example\.test,unsubscribed,/m);
  const back = await (await signup(env, 'leave@example.test', {ip: '198.51.100.9'})).json();
  assert.equal(back.ok, true);
  assert.equal(back.code, undefined, 'resubscribing does not issue a second code');
});

test('export needs the owner token', async () => {
  const env = setup();
  assert.equal((await exportCsv(env, 'wrong')).status, 404);
  assert.equal((await newsletterApi(new Request('https://tjm.art/newsletter/export.csv'), env, now)).status, 404);
  const ok = await exportCsv(env, 'owner-token');
  assert.equal(ok.status, 200);
  assert.equal((await ok.text()).split('\n')[0], 'email,status,subscribed_at,unsubscribed_at,source,print_code,unsubscribe_url');
});
