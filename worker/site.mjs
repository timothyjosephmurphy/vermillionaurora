// Website Worker. wrangler.jsonc sets assets.run_worker_first to an explicit route list, so static files, pages,
// static/_redirects and 404s are served by the Cloudflare assets layer WITHOUT invoking this Worker
// (and without counting toward the Workers request limit). Only the routes listed there reach this code: the
// QuickBooks API, the testimonials API, the original-inventory API (all forwarded to the checkout Worker) and the
// Apple Pay merchant-id file. Keep run_worker_first in sync with the routes below (tests/site-worker.test.mjs checks it).
//
// Host-level redirects now live at the Cloudflare edge (zone Redirect Rules, see docs/static-bypass-zone-rules.md):
// www.tjm.art -> tjm.art, http://tjm.art -> https, and vermillionaurora.com (and www) -> tjm.art with the
// KEEP_ON_LEGACY exceptions. hostRedirect below is kept as a harmless second line of defence for requests that do
// reach the Worker (for example if a zone rule were disabled), with the same behaviour as before.
// The one-year immutable Cache-Control on 200 responses under /_astro/ and /display/ is a zone Response Header Transform Rule
// (a static/_headers rule would also stamp it on 404s for those paths).
import { APPLE_PAY_DOMAIN_ASSOCIATION } from './apple-pay-domain-association.mjs';
import { renamedProductPath } from './product-renames.mjs';
import { catalogResponse, CATALOG_PATHS } from './catalog-pages.mjs';
import { catalogAdmin } from './catalog-admin.mjs';
// Catalog pages and the catalog admin run the Worker first (see worker/catalog-pages.mjs).
export const CATALOG_WORKER_FIRST = ['/', '/products/*', '/gallery', '/gallery/*', '/catalog/products.json', '/catalog-admin', '/catalog-admin/*'];

export const LEGACY_HOSTS = new Set(['vermillionaurora.com', 'www.vermillionaurora.com']);
export const KEEP_ON_LEGACY = ['/print-editions/', '/print-samples/', '/print-masters/', '/print-test/', '/prints/', '/catalog/'];

const moved = (location) => new Response(null, { status: 301, headers: { Location: location, 'Cache-Control': 'public, max-age=3600' } });

export function hostRedirect(request, env = {}) {
  const url = new URL(request.url);
  const primary = env.PRIMARY_HOST || 'tjm.art';
  if (url.hostname === `www.${primary}`) return moved(`https://${primary}${url.pathname}${url.search}`);
  // Plain http on the primary host upgrades to https (same path and query).
  if (url.protocol === 'http:' && url.hostname === primary) return moved(`https://${primary}${url.pathname}${url.search}`);
  if (env.LEGACY_REDIRECT !== 'true' || !LEGACY_HOSTS.has(url.hostname)) return null;
  if (KEEP_ON_LEGACY.some((prefix) => url.pathname.startsWith(prefix))) return null;
  return moved(`https://${primary}${renamedProductPath(url.pathname)}${url.search}`);
}

// QuickBooks owner page, OAuth callback and owner API live in the checkout Worker (vermillion-commissions);
// they are forwarded through the CHECKOUT service binding so the Intuit redirect URI can be https://tjm.art/quickbooks/callback.
// The public pages /quickbooks/ and /quickbooks/disconnected/ stay static.
export const QUICKBOOKS_API = new Set(['/quickbooks/connect', '/quickbooks/callback', '/quickbooks/start', '/quickbooks/status', '/quickbooks/preflight', '/quickbooks/disconnect', '/quickbooks/sync', '/quickbooks/logs', '/quickbooks/retry', '/quickbooks/costs/preview', '/quickbooks/costs/backfill']);

// Testimonial submission, the approved list, approved photos and the owner moderation API also live in the checkout
// Worker (private R2 storage); forwarding keeps them same-origin with /testimonials/ and /testimonial-manager/.
export const TESTIMONIALS_API = '/testimonials/api/';

// Owner original-status page posts here; the checkout Worker holds stock and the Etsy token.
export const ORIGINALS_API = '/inventory/originals';

// Cart checkout API, same-origin on tjm.art (no workers.dev round trip). The public catalog GET is edge-cached for
// 60 s; holds, quotes and payments always reach the checkout Worker, which re-validates price and stock.
export const CART_API = '/checkout/cart/';
const CART_CATALOG = '/checkout/cart/catalog';
export async function cartApi(request, env, ctx) {
  if (!env.CHECKOUT) return Response.json({ error: 'Checkout is temporarily unavailable.' }, { status: 503 });
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.pathname !== CART_CATALOG) return env.CHECKOUT.fetch(request);
  const cache = globalThis.caches?.default, key = new Request(`${url.origin}${CART_CATALOG}`);
  let cached = cache ? await cache.match(key).catch(() => null) : null;
  if (!cached) {
    const origin = await env.CHECKOUT.fetch(new Request(key.url, { headers: { Accept: 'application/json' } }));
    if (!origin.ok) return origin;
    const body = await origin.text();
    cached = new Response(body, { headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'public, max-age=60, s-maxage=60' } });
    if (cache) ctx?.waitUntil?.(cache.put(key, cached.clone()).catch(() => {}));
  }
  const headers = new Headers(cached.headers);
  headers.set('Cache-Control', 'public, max-age=60');
  headers.delete('Set-Cookie');
  return new Response(cached.body, { status: 200, headers });
}

// Common shop URLs buyers type.
export const SHOP_REDIRECTS = { '/shop': '/gallery/available/', '/shop/': '/gallery/available/', '/store': '/gallery/available/', '/store/': '/gallery/available/', '/checkout': '/cart/', '/checkout/': '/cart/' };

// Apple Pay on the Web (Square Web Payments SDK): Apple fetches this file to verify tjm.art. Serve Square's
// current copy (Square asks sellers to keep it in sync and avoid long caches), falling back to the committed snapshot.
export const APPLE_PAY_ASSOCIATION_PATH = '/.well-known/apple-developer-merchantid-domain-association';
const SQUARE_ASSOCIATION_URL = 'https://app.squareup.com/digital-wallets/apple-pay/apple-developer-merchantid-domain-association';
export async function applePayAssociation(fetcher = fetch) {
  let body = APPLE_PAY_DOMAIN_ASSOCIATION;
  try {
    const r = await fetcher(SQUARE_ASSOCIATION_URL, { cf: { cacheTtl: 3600, cacheEverything: true }, signal: AbortSignal.timeout(5000) });
    const text = r.ok ? (await r.text()).trim() : '';
    if (/^[0-9A-Fa-f]{1000,}$/.test(text)) body = text;
  } catch {}
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}

// NIP-05 (Nostr) identity: tj@tjm.art and _@tjm.art. Served by the Worker so it gets JSON + CORS headers
// without a static/_headers file and is never caught by trailing-slash handling.
export const NOSTR_JSON_PATH = '/.well-known/nostr.json';
export const NOSTR_PUBKEY = '7edfc4a9556797f26adab9d1fd5adbe5f66f174546f8ddeee09502cd532f88cb';
export function nostrJson() {
  return new Response(JSON.stringify({ names: { tj: NOSTR_PUBKEY, _: NOSTR_PUBKEY } }), {
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=3600' },
  });
}

// Lightning address tj@tjm.art, backed by TJ's BTCPay Server (Store > Lightning > Lightning Address 'tj').
// BTCPay's payRequest JSON is passed through unchanged; its callback issues the invoices.
export const LNURLP_PREFIX = '/.well-known/lnurlp/';
export const LNURLP_NAMES = { tj: 'https://pay.tjm.art/.well-known/lnurlp/tj' };
const LNURLP_HEADERS = { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' };
export async function lnurlp(name, fetcher = fetch) {
  const json = (obj, status) => new Response(JSON.stringify(obj), { status, headers: { ...LNURLP_HEADERS, 'Cache-Control': 'no-store' } });
  const upstream = Object.hasOwn(LNURLP_NAMES, name) ? LNURLP_NAMES[name] : null;
  if (!upstream) return json({ status: 'ERROR', reason: 'Unknown Lightning address' }, 404);
  try {
    const r = await fetcher(upstream, { headers: { Accept: 'application/json' }, cf: { cacheTtl: 300, cacheEverything: true }, signal: AbortSignal.timeout(5000) });
    const body = r.ok ? await r.text() : '';
    const data = body ? JSON.parse(body) : null;
    if (data?.tag !== 'payRequest' || !data.callback) throw Error('bad upstream');
    return new Response(body, { headers: LNURLP_HEADERS });
  } catch {
    return json({ status: 'ERROR', reason: 'Lightning address temporarily unavailable' }, 502);
  }
}

export default {
  async fetch(request, env, ctx) {
    const redirect = hostRedirect(request, env);
    if (redirect) return redirect;
    const url = new URL(request.url);
    if (QUICKBOOKS_API.has(url.pathname) && url.hostname === (env.PRIMARY_HOST || 'tjm.art')) {
      return env.CHECKOUT ? env.CHECKOUT.fetch(request) : new Response('QuickBooks connection unavailable', { status: 503 });
    }
    if (url.pathname.startsWith(TESTIMONIALS_API) && url.hostname === (env.PRIMARY_HOST || 'tjm.art')) {
      return env.CHECKOUT ? env.CHECKOUT.fetch(request) : Response.json({ success: false, error: 'Testimonials are temporarily unavailable.' }, { status: 503 });
    }
    if (url.pathname === ORIGINALS_API && url.hostname === (env.PRIMARY_HOST || 'tjm.art')) {
      return env.CHECKOUT ? env.CHECKOUT.fetch(request) : Response.json({ error: 'Original inventory is temporarily unavailable.' }, { status: 503 });
    }
    if (url.pathname.startsWith(CART_API) && url.hostname === (env.PRIMARY_HOST || 'tjm.art')) return cartApi(request, env, ctx);
    if (SHOP_REDIRECTS[url.pathname]) return moved(new URL(SHOP_REDIRECTS[url.pathname] + url.search, url).href);
    if (url.pathname === APPLE_PAY_ASSOCIATION_PATH) return applePayAssociation();
    if (url.pathname === NOSTR_JSON_PATH) return nostrJson();
    if (url.pathname.startsWith(LNURLP_PREFIX)) return lnurlp(url.pathname.slice(LNURLP_PREFIX.length));
    // One painting wall: the older framed print wall moved to the all-paintings wall.
    // The old 3D gallery room is retired; the play gallery replaces it (studio-tracker #154).
    if (/^\/gallery\/room\/?$/.test(url.pathname)) return Response.redirect(new URL('/play/' + url.search, url).href, 301);
    if (/^\/gallery\/wall\/?$/.test(url.pathname)) return Response.redirect(new URL('/gallery/wall/all/' + url.search, url).href, 301);
    // Live catalog (tjm-catalog D1): owner admin, and catalog pages patched at request time (built page on any D1 error).
    if (/^\/catalog-admin(?:\/|$)/.test(url.pathname)) return catalogAdmin(request, env, ctx);
    if (CATALOG_PATHS(url.pathname) && url.hostname === (env.PRIMARY_HOST || 'tjm.art')) {
      try { return await catalogResponse(request, env, ctx); } catch { return env.ASSETS.fetch(request); }
    }
    return env.ASSETS.fetch(request);
  },
};
