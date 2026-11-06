// Single source for website Worker routes. worker/site.mjs matches these constants.
// wrangler.jsonc assets.run_worker_first is copied from WORKER_FIRST_PATTERNS by
// scripts/sync-worker-routes.mjs. tests/worker-routes.test.mjs fails if they drift.
//
// Glob patterns (the wrangler list) and the runtime prefixes differ by a trailing
// star: "/checkout/cart/*" is the asset rule, "/checkout/cart/" is the startsWith
// check. Keep each pair derived from the same string.
export const COMMISSION_PATHS = ['/api/commission', '/commission-privacy', '/inventory/status'];

export const QUICKBOOKS_PATHS = ['/quickbooks/connect', '/quickbooks/callback', '/quickbooks/start', '/quickbooks/status', '/quickbooks/preflight', '/quickbooks/disconnect', '/quickbooks/sync', '/quickbooks/logs', '/quickbooks/retry', '/quickbooks/costs/preview', '/quickbooks/costs/backfill'];

export const TESTIMONIALS_API = '/testimonials/api/';
export const TESTIMONIALS_API_PATTERN = `${TESTIMONIALS_API}*`;
export const TESTIMONIALS_PAGE = ['/testimonials', '/testimonials/'];

export const NEWSLETTER_PATHS = ['/newsletter/subscribe', '/newsletter/buttondown-webhook'];

export const ORIGINALS_API = '/inventory/originals';

export const CART_API = '/checkout/cart/';
export const CART_API_PATTERN = `${CART_API}*`;
export const STICKERS_API = '/checkout/stickers/';
export const STICKERS_API_PATTERN = `${STICKERS_API}*`;

export const SHOP_REDIRECTS = {
  '/shop': '/gallery/available/',
  '/shop/': '/gallery/available/',
  '/store': '/gallery/available/',
  '/store/': '/gallery/available/',
  '/checkout': '/cart/',
  '/checkout/': '/cart/',
};

export const APPLE_PAY_ASSOCIATION_PATH = '/.well-known/apple-developer-merchantid-domain-association';
export const NOSTR_JSON_PATH = '/.well-known/nostr.json';
export const LNURLP_PREFIX = '/.well-known/lnurlp/';
export const LNURLP_PATTERN = `${LNURLP_PREFIX}*`;

export const CATALOG_WORKER_FIRST = ['/', '/products/*', '/gallery', '/gallery/*', '/catalog/products.json', '/catalog-admin', '/catalog-admin/*'];
export const PLAY_WORKER_FIRST = ['/play', '/play/*'];

export const PRINT_MASTER_WORKER_FIRST = ['/print-masters/*', '/api/print-master/*'];

export const WORKER_FIRST_PATTERNS = [
  ...COMMISSION_PATHS,
  ...QUICKBOOKS_PATHS,
  TESTIMONIALS_API_PATTERN,
  ...TESTIMONIALS_PAGE,
  ...NEWSLETTER_PATHS,
  ORIGINALS_API,
  CART_API_PATTERN,
  STICKERS_API_PATTERN,
  ...Object.keys(SHOP_REDIRECTS),
  APPLE_PAY_ASSOCIATION_PATH,
  NOSTR_JSON_PATH,
  LNURLP_PATTERN,
  ...CATALOG_WORKER_FIRST,
  ...PLAY_WORKER_FIRST,
  ...PRINT_MASTER_WORKER_FIRST,
];
