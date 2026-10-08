// Website Worker: serves the static build (dist/) and handles host-level redirects.
// - www.tjm.art always 301s to the same path on tjm.art.
// - When LEGACY_REDIRECT is "true", vermillionaurora.com and www.vermillionaurora.com 301 to the same
//   path and query on PRIMARY_HOST, except hash-bound print and catalog files that print fulfilment and
//   release verification fetch by exact URL; those keep serving 200 on the old domain. Renamed product
//   pages go straight to their new slug (worker/product-renames.mjs).
// Everything else (including static/_redirects rules and 404s) is handled by the assets binding.
import { APPLE_PAY_DOMAIN_ASSOCIATION } from './apple-pay-domain-association.mjs';
import { renamedProductPath } from './product-renames.mjs';

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

// Fingerprinted build assets never change under the same URL: Astro's /_astro/ bundles and the /display/ WebP
// derivatives (named by a hash; a replaced original gets a new name). Let browsers keep them for a year.
export const IMMUTABLE_PREFIXES = ['/_astro/', '/display/'];
export function withLongCache(response, pathname) {
  if (response.status !== 200 || !IMMUTABLE_PREFIXES.some((prefix) => pathname.startsWith(prefix))) return response;
  const headers = new Headers(response.headers);
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return new Response(response.body, { status: response.status, statusText: response.statusText, headers });
}

export default {
  async fetch(request, env) {
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
    if (url.pathname === APPLE_PAY_ASSOCIATION_PATH) return applePayAssociation();
    return withLongCache(await env.ASSETS.fetch(request), url.pathname);
  },
};
