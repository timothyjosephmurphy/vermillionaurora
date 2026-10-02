// Owner-only Etsy authorization. Listing publication and order handling are separate work.
import { etsyConnectPage } from './etsy-connect-page.mjs';

export const ETSY_ORIGIN = 'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
export const ETSY_CALLBACK = `${ETSY_ORIGIN}/etsy/callback`;
const SCOPES = 'shops_r listings_r listings_w transactions_r';
const SHOP = 'VermillionAurora';
const KEY = 'etsy/connection.json';
const COOKIE = '__Host-etsy-state';
const TTL = 10 * 60 * 1000;
const encoder = new TextEncoder();
const headers = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow' };
export const json = (body, status = 200, extra = {}) => Response.json(body, { status, headers: { ...headers, ...extra } });
const base64 = bytes => btoa(String.fromCharCode(...new Uint8Array(bytes)));
const unbase64 = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
const base64url = bytes => base64(bytes).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const random = () => base64url(crypto.getRandomValues(new Uint8Array(32)));
const digest = value => crypto.subtle.digest('SHA-256', encoder.encode(value));
const cookie = (value, age = 600) => `${COOKIE}=${value}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${age}`;
const redirect = result => new Response(null, { status: 303, headers: { ...headers, Location: `/etsy/connect?result=${result}`, 'Set-Cookie': cookie('', 0) } });

export async function authorized(request, env) {
  if (!env.COMMISSION_MANAGER_TOKEN) return false;
  const actual = new Uint8Array(await digest(request.headers.get('Authorization') || ''));
  const expected = new Uint8Array(await digest(`Bearer ${env.COMMISSION_MANAGER_TOKEN}`));
  let difference = 0;
  for (let i = 0; i < actual.length; i++) difference |= actual[i] ^ expected[i];
  return difference === 0;
}

// Use existing private R2 storage, with application encryption as an extra boundary.
// Changing the Etsy shared secret requires a new authorization (see docs/etsy-connection.md).
async function encryptionKey(env) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(env.ETSY_SHARED_SECRET), 'HKDF', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'HKDF', hash: 'SHA-256', salt: encoder.encode(env.ETSY_KEYSTRING), info: encoder.encode('vermillion-etsy-connection-v1') }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
export async function read(env) {
  const object = await env.COMMISSION_UPLOADS.get(KEY);
  if (!object) return { record: {}, etag: null };
  const sealed = await object.json();
  const clear = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unbase64(sealed.iv), additionalData: encoder.encode(KEY) }, await encryptionKey(env), unbase64(sealed.data));
  return { record: JSON.parse(new TextDecoder().decode(clear)), etag: object.etag };
}
export async function write(env, record, etag) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: encoder.encode(KEY) }, await encryptionKey(env), encoder.encode(JSON.stringify(record)));
  return env.COMMISSION_UPLOADS.put(KEY, JSON.stringify({ version: 1, iv: base64(iv), data: base64(data) }), {
    onlyIf: etag ? { etagMatches: etag } : { etagDoesNotMatch: '*' },
    httpMetadata: { contentType: 'application/json', cacheControl: 'no-store' }
  });
}

async function start(env, now) {
  const { record, etag } = await read(env);
  const state = random(), verifier = random();
  const pending = { state, verifier, expiresAt: now + TTL };
  if (!await write(env, { ...record, pending }, etag)) return json({ error: 'Another connection attempt started. Please try again.' }, 409);
  const url = new URL('https://www.etsy.com/oauth/connect');
  url.search = new URLSearchParams({ response_type: 'code', client_id: env.ETSY_KEYSTRING, redirect_uri: ETSY_CALLBACK, scope: SCOPES, state, code_challenge: base64url(await digest(verifier)), code_challenge_method: 'S256' });
  return json({ url: url.href }, 200, { 'Set-Cookie': cookie(state) });
}

async function callback(request, env, now) {
  const url = new URL(request.url), state = url.searchParams.get('state');
  const browserState = (request.headers.get('Cookie') || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1);
  if (!state || !/^[A-Za-z0-9_-]{43}$/.test(state) || state !== browserState) return redirect('expired');
  let record, etag;
  try { ({ record, etag } = await read(env)); } catch { return redirect('storage-read'); }
  const pending = record.pending;
  if (!pending || pending.state !== state || pending.expiresAt <= now) return redirect('expired');
  // Consume the attempt atomically before any network call. Concurrent callbacks cannot exchange twice.
  let consumed;
  try { consumed = await write(env, { ...record, pending: null }, etag); } catch { return redirect('storage-pending-save'); }
  if (!consumed) return redirect('expired');
  if (url.searchParams.has('error')) return redirect('denied');
  const code = url.searchParams.get('code');
  if (!code || code.length > 4096) return redirect('failed');
  const apiKey = `${env.ETSY_KEYSTRING}:${env.ETSY_SHARED_SECRET}`;
  let tokenResponse;
  try {
    tokenResponse = await fetch('https://api.etsy.com/v3/public/oauth/token', {
      // Do not follow redirects: OAuth codes and app credentials must stay on Etsy's token endpoint.
      // Etsy has intermittently redirected this endpoint; classify that separately from network failure.
      method: 'POST', redirect: 'manual', signal: AbortSignal.timeout(15000),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'x-api-key': apiKey },
      body: new URLSearchParams({ grant_type: 'authorization_code', client_id: env.ETSY_KEYSTRING, redirect_uri: ETSY_CALLBACK, code, code_verifier: pending.verifier })
    });
  } catch { return redirect('token-network'); }
  if (tokenResponse.status >= 300 && tokenResponse.status < 400) return redirect('token-redirect');
  if (!tokenResponse.ok) return redirect(`token-http-${tokenResponse.status}`);
  let tokens;
  try { tokens = await tokenResponse.json(); } catch { return redirect('token-response'); }
  const userId = typeof tokens.access_token === 'string' && /^(\d+)\./.exec(tokens.access_token)?.[1];
  const scopes = typeof tokens.scope === 'string' ? tokens.scope.split(/\s+/) : SCOPES.split(' ');
  if (!userId || tokens.token_type?.toLowerCase() !== 'bearer' || typeof tokens.refresh_token !== 'string' || !tokens.refresh_token || !Number.isFinite(tokens.expires_in) || tokens.expires_in <= 0) return redirect('token-response');
  if (!SCOPES.split(' ').every(s => scopes.includes(s))) return redirect('token-scopes');
  let shopResponse;
  try {
    shopResponse = await fetch(`https://api.etsy.com/v3/application/users/${userId}/shops`, {
      // Keep the OAuth token on Etsy's shop endpoint; do not forward it through redirects.
      method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(15000), headers: { 'x-api-key': apiKey, Authorization: `Bearer ${tokens.access_token}` }
    });
  } catch { return redirect('shop-network'); }
  if (shopResponse.status >= 300 && shopResponse.status < 400) return redirect('shop-redirect');
  if (!shopResponse.ok) return redirect(`shop-http-${shopResponse.status}`);
  let shop;
  try { shop = await shopResponse.json(); } catch { return redirect('shop-response'); }
  if (!Number.isSafeInteger(shop.shop_id) || shop.shop_id <= 0 || String(shop.user_id) !== userId || shop.shop_name?.toLowerCase() !== SHOP.toLowerCase()) return redirect('wrong-shop');
  const connection = {
    shopId: shop.shop_id, shopName: shop.shop_name, userId, scopes,
    authorizedAt: new Date(now).toISOString(), expiresAt: now + tokens.expires_in * 1000,
    accessToken: tokens.access_token, refreshToken: tokens.refresh_token
  };
  let saved;
  try { saved = await write(env, { ...record, pending: null, connection }, consumed.etag); } catch { return redirect('storage-save'); }
  if (!saved) return redirect('storage-conflict');
  return redirect('saved');
}

export async function etsyConnection(request, env, now = Date.now()) {
  const url = new URL(request.url), path = url.pathname;
  // Do not enable production credentials on preview or sandbox hostnames.
  if (url.origin !== ETSY_ORIGIN) return json({ error: 'Not found' }, 404);
  if (request.method === 'GET' && path === '/etsy/connect') return etsyConnectPage(headers);
  const isCallback = request.method === 'GET' && path === '/etsy/callback';
  if (!isCallback && !(request.method === 'POST' && ['/etsy/start', '/etsy/status'].includes(path))) return json({ error: 'Not found' }, 404);
  if (!isCallback && (request.headers.get('Origin') !== ETSY_ORIGIN || !await authorized(request, env))) return json({ error: 'Invalid management credential or origin.' }, 403);
  const ready = Boolean(env.ETSY_KEYSTRING && env.ETSY_SHARED_SECRET && env.COMMISSION_UPLOADS && env.COMMISSION_MANAGER_TOKEN);
  if (!ready) return isCallback ? redirect('unavailable') : json({ error: 'Etsy secrets or private storage are missing from this Worker.' }, 503);
  try {
    if (isCallback) return await callback(request, env, now);
    if (path === '/etsy/start') return await start(env, now);
    const { record } = await read(env), connection = record.connection;
    // Explicit allowlist: never serialize the stored tokens or pending authorization.
    return json({ ready: true, connected: Boolean(connection), ...(connection ? {
      shopId: connection.shopId, shopName: connection.shopName, scopes: connection.scopes, authorizedAt: connection.authorizedAt
    } : {}) });
  } catch {
    // Provider bodies and exceptions can contain credentials. Never log or return them.
    return isCallback ? redirect('connection-internal') : json({ error: 'Connection storage is unavailable. Please try again.' }, 503);
  }
}
