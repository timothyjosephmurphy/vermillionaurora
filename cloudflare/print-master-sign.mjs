// HMAC-SHA256 time limit for private print-master bytes and for the file URL sent to FinerWorks.
// The signed string is `v1\n<pathname>\n<exp>` so a signature for one path cannot be reused on another.
// Print masters are checked in the website Worker. Edition files stay on the static host, which ignores
// the query string, so an order placed before the secret existed can still be fetched.
export const PRINT_MASTER_BUCKET = 'tjm-print-masters';
export const PRINT_MASTER_BINDING = 'PRINT_MASTERS';
export const PRINT_MASTER_TTL_SECONDS = 48 * 60 * 60;
export const PRINT_MASTER_MAX_TTL_SECONDS = 72 * 60 * 60;
export const PRINT_MASTER_SKEW_SECONDS = 60;
export const PRINT_MASTER_ORIGIN = 'https://tjm.art';
const encoder = new TextEncoder();
const NAME = /^[a-f0-9]{64}\.(?:jpe?g|png|tif|tiff)$/;

export function printMasterFilename(pathname) {
  const api = /^\/api\/print-master\/([^/]+)$/.exec(pathname);
  const direct = /^\/print-masters\/([^/]+)$/.exec(pathname);
  const filename = (api || direct)?.[1]?.toLowerCase() || '';
  return NAME.test(filename) ? filename : '';
}

export function printMasterKey(filename) {
  return `print-masters/${filename}`;
}

export function printMasterCanonicalPath(filename) {
  return `/print-masters/${filename}`;
}

async function hmacHex(secret, text) {
  const key = await crypto.subtle.importKey('raw', encoder.encode(secret), {name: 'HMAC', hash: 'SHA-256'}, false, ['sign']);
  const sig = await crypto.subtle.sign('HMAC', key, encoder.encode(text));
  return [...new Uint8Array(sig)].map(b => b.toString(16).padStart(2, '0')).join('');
}

function safeEqual(a, b) {
  if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export async function signPath(secret, pathname, exp) {
  if (!secret || !pathname.startsWith('/')) throw Error('Print master signing is not configured');
  return hmacHex(secret, `v1\n${pathname}\n${exp}`);
}

export async function signFulfillmentUrl(secret, href, {ttl = PRINT_MASTER_TTL_SECONDS, now = Date.now()} = {}) {
  const url = new URL(href);
  url.search = '';
  url.hash = '';
  const exp = Math.floor(now / 1000) + ttl;
  if (ttl < 60 || ttl > PRINT_MASTER_MAX_TTL_SECONDS) throw Error('Print master signature lifetime must be between 1 minute and 72 hours');
  url.searchParams.set('exp', String(exp));
  url.searchParams.set('sig', await signPath(secret, url.pathname, exp));
  return url.href;
}

export async function fulfillmentImage(env, assetUrl, mode, signUrl = signFulfillmentUrl) {
  const {printAssetUrl, printThumbnailUrl} = await import('./print-asset-policy.mjs');
  const file = printAssetUrl(assetUrl, mode);
  const thumb = printThumbnailUrl(assetUrl, mode);
  const secret = env?.PRINT_MASTER_SIGNING_SECRET;
  if (!secret) return {product_url_file: file, product_url_thumbnail: thumb};
  return {product_url_file: await signUrl(secret, file), product_url_thumbnail: await signUrl(secret, thumb)};
}

// Returns null when the signature is valid for this print-master filename. Otherwise a 403 Response.
export async function rejectUnsignedPrintMaster(url, secret, now = Date.now()) {
  const filename = printMasterFilename(url.pathname);
  const deny = () => new Response('Forbidden', {status: 403, headers: {'Cache-Control': 'no-store', 'Content-Type': 'text/plain; charset=utf-8', 'X-Content-Type-Options': 'nosniff'}});
  if (!filename || !secret) return deny();
  const exp = Number(url.searchParams.get('exp'));
  const sig = (url.searchParams.get('sig') || '').toLowerCase();
  const nowSec = Math.floor(now / 1000);
  if (!Number.isSafeInteger(exp) || exp < nowSec - PRINT_MASTER_SKEW_SECONDS || exp > nowSec + PRINT_MASTER_MAX_TTL_SECONDS + PRINT_MASTER_SKEW_SECONDS) return deny();
  if (!/^[0-9a-f]{64}$/.test(sig)) return deny();
  const expected = await signPath(secret, printMasterCanonicalPath(filename), exp);
  if (!safeEqual(sig, expected)) return deny();
  return null;
}

export function printMasterContentType(filename) {
  const ext = filename.split('.').pop();
  return {jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', tif: 'image/tiff', tiff: 'image/tiff'}[ext] || 'application/octet-stream';
}
