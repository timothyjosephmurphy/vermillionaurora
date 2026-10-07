// Website Worker: serves the static build (dist/) and handles host-level redirects.
// - www.tjm.art always 301s to the same path on tjm.art.
// - When LEGACY_REDIRECT is "true", vermillionaurora.com and www.vermillionaurora.com 301 to the same
//   path and query on PRIMARY_HOST, except hash-bound print and catalog files that print fulfilment and
//   release verification fetch by exact URL; those keep serving 200 on the old domain.
// Everything else (including static/_redirects rules and 404s) is handled by the assets binding.
export const LEGACY_HOSTS = new Set(['vermillionaurora.com', 'www.vermillionaurora.com']);
export const KEEP_ON_LEGACY = ['/print-editions/', '/print-samples/', '/print-masters/', '/print-test/', '/prints/', '/catalog/'];

const moved = (location) => new Response(null, { status: 301, headers: { Location: location, 'Cache-Control': 'public, max-age=3600' } });

export function hostRedirect(request, env = {}) {
  const url = new URL(request.url);
  const primary = env.PRIMARY_HOST || 'tjm.art';
  if (url.hostname === `www.${primary}`) return moved(`https://${primary}${url.pathname}${url.search}`);
  if (env.LEGACY_REDIRECT !== 'true' || !LEGACY_HOSTS.has(url.hostname)) return null;
  if (KEEP_ON_LEGACY.some((prefix) => url.pathname.startsWith(prefix))) return null;
  return moved(`https://${primary}${url.pathname}${url.search}`);
}

// QuickBooks owner page, OAuth callback and owner API live in the checkout Worker (vermillion-commissions);
// they are forwarded through the CHECKOUT service binding so the Intuit redirect URI can be https://tjm.art/quickbooks/callback.
// The public pages /quickbooks/ and /quickbooks/disconnected/ stay static.
export const QUICKBOOKS_API = new Set(['/quickbooks/connect', '/quickbooks/callback', '/quickbooks/start', '/quickbooks/status', '/quickbooks/disconnect', '/quickbooks/sync', '/quickbooks/logs', '/quickbooks/retry']);

export default {
  async fetch(request, env) {
    const redirect = hostRedirect(request, env);
    if (redirect) return redirect;
    const url = new URL(request.url);
    if (QUICKBOOKS_API.has(url.pathname) && url.hostname === (env.PRIMARY_HOST || 'tjm.art')) {
      return env.CHECKOUT ? env.CHECKOUT.fetch(request) : new Response('QuickBooks connection unavailable', { status: 503 });
    }
    return env.ASSETS.fetch(request);
  },
};
