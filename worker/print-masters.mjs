// Private full-resolution print masters. Unsigned requests never reach R2.
// A valid signature streams the object from the PRINT_MASTERS binding (tjm-print-masters),
// which is not the public img.tjm.art bucket.
import {printMasterContentType, printMasterFilename, printMasterKey, rejectUnsignedPrintMaster} from '../cloudflare/print-master-sign.mjs';

export const PRINT_MASTER_WORKER_FIRST = ['/print-masters/*', '/api/print-master/*'];
const PRIVATE = {'Cache-Control': 'private, no-store', 'X-Content-Type-Options': 'nosniff'};

export function isPrintMasterRequest(pathname) {
  return pathname === '/print-masters' || pathname.startsWith('/print-masters/') || pathname.startsWith('/api/print-master/');
}

export async function servePrintMaster(request, env, now = Date.now()) {
  const url = new URL(request.url);
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    return new Response('Method not allowed', {status: 405, headers: {...PRIVATE, Allow: 'GET, HEAD', 'Content-Type': 'text/plain; charset=utf-8'}});
  }
  const denied = await rejectUnsignedPrintMaster(url, env.PRINT_MASTER_SIGNING_SECRET, now);
  if (denied) return denied;
  const filename = printMasterFilename(url.pathname);
  if (!env.PRINT_MASTERS) return new Response('Print masters are unavailable', {status: 503, headers: {...PRIVATE, 'Content-Type': 'text/plain; charset=utf-8'}});
  const object = request.method === 'HEAD' && env.PRINT_MASTERS.head
    ? await env.PRINT_MASTERS.head(printMasterKey(filename))
    : await env.PRINT_MASTERS.get(printMasterKey(filename));
  if (!object) return new Response('Not found', {status: 404, headers: {...PRIVATE, 'Content-Type': 'text/plain; charset=utf-8'}});
  const headers = {
    ...PRIVATE,
    'Content-Type': object.httpMetadata?.contentType || printMasterContentType(filename),
    'Content-Length': String(object.size),
  };
  if (request.method === 'HEAD') return new Response(null, {status: 200, headers});
  return new Response(object.body, {status: 200, headers});
}
