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
    return env.ASSETS.fetch(request);
  },
};
