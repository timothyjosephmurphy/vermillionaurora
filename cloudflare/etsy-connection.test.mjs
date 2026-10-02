import test from 'node:test';
import assert from 'node:assert/strict';
import { etsyConnection, ETSY_ORIGIN, ETSY_CALLBACK } from './etsy-connection.mjs';

const now = Date.parse('2026-10-02T01:00:00Z');
class Bucket {
  data = new Map(); sequence = 0;
  async get(key) {
    const item = this.data.get(key);
    return item ? { etag: item.etag, json: async () => JSON.parse(item.value) } : null;
  }
  async put(key, value, options) {
    const previous = this.data.get(key), condition = options.onlyIf;
    if (condition.etagMatches && previous?.etag !== condition.etagMatches) return null;
    if (condition.etagDoesNotMatch === '*' && previous) return null;
    const item = { value, etag: String(++this.sequence) };
    this.data.set(key, item); return item;
  }
}
const setup = () => ({ ETSY_KEYSTRING: 'test-keystring', ETSY_SHARED_SECRET: 'test-shared-secret', COMMISSION_MANAGER_TOKEN: 'test-manager', COMMISSION_UPLOADS: new Bucket() });
const post = (env, path = '/etsy/start', extra = {}, time = now) => etsyConnection(new Request(ETSY_ORIGIN + path, { method: 'POST', headers: { Origin: ETSY_ORIGIN, Authorization: 'Bearer test-manager', ...extra } }), env, time);
async function start(env) {
  const response = await post(env);
  assert.equal(response.status, 200);
  const url = new URL((await response.json()).url);
  return { url, state: url.searchParams.get('state'), cookie: response.headers.get('Set-Cookie').split(';')[0] };
}
const callback = (env, attempt, { state = attempt.state, cookie = attempt.cookie, time = now, query = 'code=test-code' } = {}) => etsyConnection(new Request(`${ETSY_CALLBACK}?state=${state}&${query}`, { headers: { Cookie: cookie } }), env, time);
const outcome = response => new URL(response.headers.get('Location'), ETSY_ORIGIN).searchParams.get('result');
const token = { access_token: '123.test-access-token', refresh_token: '123.test-refresh-token', expires_in: 3600, token_type: 'Bearer', scope: 'shops_r listings_r listings_w' };
function provider(t, shop = { shop_id: 42, user_id: 123, shop_name: 'VermillionAurora' }) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options) => {
    calls.push({ url: String(url), options });
    return Response.json(String(url).endsWith('/oauth/token') ? token : shop);
  });
  return calls;
}

test('owner token, exact origin and server credentials are required; sandbox fails closed', async () => {
  const env = setup();
  assert.equal((await post(env, '/etsy/start', { Authorization: 'Bearer wrong' })).status, 403);
  assert.equal((await post(env, '/etsy/start', { Origin: 'https://other.test' })).status, 403);
  assert.equal((await post(env, '/etsy/status', { Authorization: '' })).status, 403);
  assert.equal((await etsyConnection(new Request('https://sandbox.test/etsy/connect'), env)).status, 404);
  delete env.ETSY_SHARED_SECRET;
  assert.equal((await post(env)).status, 503);
  assert.equal(env.COMMISSION_UPLOADS.data.size, 0);
});

test('authorization uses PKCE, exact callback and limited scopes; tokens stay encrypted and server-side', async t => {
  const env = setup(), calls = provider(t), attempt = await start(env);
  assert.equal(attempt.url.searchParams.get('redirect_uri'), ETSY_CALLBACK);
  assert.equal(attempt.url.searchParams.get('scope'), token.scope);
  assert.equal(attempt.url.searchParams.get('code_challenge_method'), 'S256');
  const result = await callback(env, attempt);
  assert.equal(outcome(result), 'saved');
  assert.equal(result.headers.get('Cache-Control'), 'no-store');
  assert.match(result.headers.get('Set-Cookie'), /HttpOnly; SameSite=Lax; Max-Age=0/);
  const exchange = calls[0].options;
  assert.equal(exchange.body.get('code'), 'test-code');
  assert.equal(exchange.body.get('redirect_uri'), ETSY_CALLBACK);
  const challenge = Buffer.from(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(exchange.body.get('code_verifier')))).toString('base64url');
  assert.equal(challenge, attempt.url.searchParams.get('code_challenge'));
  assert.equal(calls[1].url, 'https://openapi.etsy.com/v3/application/users/123/shops');
  assert.equal(calls[1].options.headers['x-api-key'], 'test-keystring:test-shared-secret');
  const status = await post(env, '/etsy/status'), body = await status.text();
  assert.deepEqual(JSON.parse(body), { ready: true, connected: true, shopId: 42, shopName: 'VermillionAurora', scopes: token.scope.split(' '), authorizedAt: new Date(now).toISOString() });
  assert.doesNotMatch(body, /access_token|refresh_token|test-access|test-refresh|test-shared|verifier/);
  assert.doesNotMatch([...env.COMMISSION_UPLOADS.data.values()][0].value, /test-access|test-refresh|test-code|VermillionAurora/);
});

test('missing browser cookie, altered state and expired attempts do not call Etsy', async t => {
  const env = setup(), calls = provider(t), attempt = await start(env);
  assert.equal(outcome(await callback(env, attempt, { cookie: '' })), 'expired');
  assert.equal(outcome(await callback(env, attempt, { state: 'a'.repeat(43) })), 'expired');
  assert.equal(outcome(await callback(env, attempt, { time: now + 600001 })), 'expired');
  assert.equal(calls.length, 0);
});

test('parallel callbacks and later replay exchange a code only once', async t => {
  const env = setup(), calls = provider(t), attempt = await start(env);
  const responses = await Promise.all([callback(env, attempt), callback(env, attempt)]);
  assert.deepEqual(responses.map(outcome).sort(), ['expired', 'saved']);
  assert.equal(outcome(await callback(env, attempt)), 'expired');
  assert.equal(calls.filter(x => x.url.endsWith('/oauth/token')).length, 1);
});

test('starting again replaces stale attempts; wrong shop cannot overwrite a saved connection', async t => {
  const env = setup(), calls = provider(t), first = await start(env), second = await start(env);
  assert.equal(outcome(await callback(env, first)), 'expired');
  assert.equal(calls.length, 0);
  assert.equal(outcome(await callback(env, second)), 'saved');
  const saved = await (await post(env, '/etsy/status')).json();
  globalThis.fetch = async url => Response.json(String(url).endsWith('/oauth/token') ? token : { shop_id: 99, user_id: 123, shop_name: 'OtherShop' });
  assert.equal(outcome(await callback(env, await start(env))), 'wrong-shop');
  assert.deepEqual(await (await post(env, '/etsy/status')).json(), saved);
});

test('denial consumes state; provider failures never leak raw errors and never save tokens', async t => {
  const env = setup(), calls = provider(t), attempt = await start(env);
  assert.equal(outcome(await callback(env, attempt, { query: 'error=access_denied' })), 'denied');
  assert.equal(outcome(await callback(env, attempt)), 'expired');
  assert.equal(calls.length, 0);
  globalThis.fetch = async () => { throw Error('secret-provider-body'); };
  const failed = await callback(env, await start(env));
  assert.equal(outcome(failed), 'failed');
  assert.doesNotMatch(await failed.text(), /secret-provider/);
  assert.equal((await (await post(env, '/etsy/status')).json()).connected, false);
});

test('incomplete scopes, mismatched owner and storage failure cannot report a saved connection', async t => {
  const env = setup();
  t.mock.method(globalThis, 'fetch', async () => Response.json({ ...token, scope: 'shops_r' }));
  assert.equal(outcome(await callback(env, await start(env))), 'failed');
  globalThis.fetch = async url => Response.json(String(url).endsWith('/oauth/token') ? token : { shop_id: 42, user_id: 999, shop_name: 'VermillionAurora' });
  assert.equal(outcome(await callback(env, await start(env))), 'wrong-shop');
  env.COMMISSION_UPLOADS.get = async () => { throw Error('storage secret'); };
  const response = await post(env, '/etsy/status');
  assert.equal(response.status, 503);
  assert.doesNotMatch(await response.text(), /storage secret/);
});

test('connection page is uncacheable, blocks framing and has no reflected query HTML', async () => {
  const response = await etsyConnection(new Request(`${ETSY_ORIGIN}/etsy/connect?result=%3Cscript%3Eevil%3C/script%3E`), setup());
  assert.equal(response.status, 200);
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
  assert.match(response.headers.get('Content-Security-Policy'), /frame-ancestors 'none'/);
  assert.doesNotMatch(await response.text(), /<script>evil|test-manager|test-shared/);
});
