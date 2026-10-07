// Owner-only QuickBooks connection routes on the checkout Worker.
//   GET  /quickbooks/connect     owner page (Connect / Disconnect / status / logs)
//   POST /quickbooks/start       Bearer COMMISSION_MANAGER_TOKEN → Intuit authorization URL (+ state cookie)
//   GET  /quickbooks/callback    Intuit redirect URI (signed state + cookie + single-use nonce)
//   POST /quickbooks/status | /quickbooks/disconnect | /quickbooks/sync | /quickbooks/logs | /quickbooks/retry   (Bearer)
import { authorized } from './etsy-connection.mjs';
import { QBO_ORIGINS, environment, configured, DISCONNECTED_PAGE } from './quickbooks-core.mjs';
import { quickbooksFor } from './quickbooks-sync.mjs';
import { quickbooksConnectPage } from './quickbooks-connect-page.mjs';

const COOKIE = '__Host-qbo-state';
const headers = { 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff', 'X-Robots-Tag': 'noindex, nofollow' };
const json = (body, status = 200, extra = {}) => Response.json(body, { status, headers: { ...headers, ...extra } });
const cookie = (value, age = 600) => `${COOKIE}=${value}; Path=/; Secure; HttpOnly; SameSite=Lax; Max-Age=${age}`;
const toPage = result => new Response(null, { status: 303, headers: { ...headers, Location: `/quickbooks/connect?result=${encodeURIComponent(result)}`, 'Set-Cookie': cookie('', 0) } });

export async function quickbooksApi(request, env) {
  const url = new URL(request.url), path = url.pathname, origin = QBO_ORIGINS[environment(env)];
  if (url.origin !== origin || !env.QUICKBOOKS) return json({ error: 'Not found' }, 404);
  if (request.method === 'GET' && path === '/quickbooks/connect') return quickbooksConnectPage(headers, environment(env));
  if (request.method === 'GET' && path === '/quickbooks/callback') {
    if (!configured(env)) return toPage('unavailable');
    if (url.searchParams.has('error')) { await quickbooksFor(env).completeConnect({ state: '', code: '', realmId: '', cookieNonce: '' }).catch(() => {}); return toPage('denied'); }
    const cookieNonce = (request.headers.get('Cookie') || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${COOKIE}=`))?.slice(COOKIE.length + 1) || '';
    try {
      const { result } = await quickbooksFor(env).completeConnect({ state: url.searchParams.get('state'), code: url.searchParams.get('code'), realmId: url.searchParams.get('realmId'), cookieNonce });
      return toPage(result);
    } catch { return toPage('internal'); }
  }
  const routes = ['/quickbooks/start', '/quickbooks/status', '/quickbooks/disconnect', '/quickbooks/sync', '/quickbooks/logs', '/quickbooks/retry'];
  if (request.method !== 'POST' || !routes.includes(path)) return json({ error: 'Not found' }, 404);
  if (request.headers.get('Origin') !== origin || !await authorized(request, env)) return json({ error: 'Invalid management credential or origin.' }, 403);
  if (!configured(env)) return json({ error: 'QuickBooks credentials are missing from this Worker.' }, 503);
  const sync = quickbooksFor(env);
  try {
    if (path === '/quickbooks/start') { const { url: target, nonce } = await sync.beginConnect(); return json({ url: target }, 200, { 'Set-Cookie': cookie(nonce) }); }
    if (path === '/quickbooks/status') return json(await sync.status());
    if (path === '/quickbooks/disconnect') return json({ ...(await sync.disconnect('owner')), redirect: DISCONNECTED_PAGE });
    if (path === '/quickbooks/sync') return json(await sync.syncNow());
    if (path === '/quickbooks/retry') { const body = await request.json().catch(() => ({})); return json(await sync.retry(String(body.orderId || ''))); }
    const body = await request.json().catch(() => ({}));
    return json({ environment: environment(env), logs: await sync.logs(Number(body.limit) || 500), queue: await sync.queueRows() });
  } catch (error) {
    return json({ error: error.kind === 'config' ? error.message : 'QuickBooks request failed. See the log for the intuit_tid.' }, error.kind === 'config' ? 409 : 503);
  }
}
