// The generated print catalog is a Workers Static Asset, not part of the checkout
// Worker script. The first request in an isolate fetches it, checks the embedded
// version key, and keeps the parsed object in memory. A later revalidate sends
// the asset ETag; 304 keeps the cached object.
import { prints, installPrintCatalog, printCatalogInstalledVersion } from './print-catalog-store.mjs';
import { printVersion } from './print-catalog-version.mjs';

export const PRINT_CATALOG_ASSET = '/print-catalog.json';

let cache = { version: '', etag: '' };
let pending = null;

export function printCatalogAssetUrl() {
  return `https://assets.local${PRINT_CATALOG_ASSET}?v=${encodeURIComponent(printVersion)}`;
}

export function resetPrintCatalogAssetCache() {
  cache = { version: '', etag: '' };
  pending = null;
}

export function printCatalogCache() {
  return { version: cache.version, etag: cache.etag };
}

function rememberModuleInstall() {
  cache = { version: printVersion, etag: cache.etag || 'module' };
  return prints;
}

export async function ensurePrintCatalog(env) {
  if (cache.version === printVersion) return prints;
  if (printCatalogInstalledVersion() === printVersion) return rememberModuleInstall();
  if (!pending) {
    pending = loadPrintCatalog(env).then(loaded => {
      cache = loaded;
      pending = null;
      return prints;
    }).catch(error => {
      pending = null;
      throw error;
    });
  }
  return pending;
}

async function loadPrintCatalog(env) {
  if (!env?.ASSETS?.fetch) throw Error('Print catalog asset binding is missing');
  const response = await env.ASSETS.fetch(new Request(printCatalogAssetUrl()));
  if (!response.ok) throw Error(`Print catalog asset unavailable (${response.status})`);
  const data = await response.json();
  if (data?.printVersion !== printVersion || !data.prints || typeof data.prints !== 'object' || Array.isArray(data.prints)) {
    throw Error('Print catalog asset version does not match this Worker');
  }
  installPrintCatalog(data.prints, data.printVersion);
  return { version: printVersion, etag: response.headers.get('etag') || printVersion };
}

// Same isolate, same version: If-None-Match against the stored ETag. A 304
// leaves the in-memory catalog in place. A new body must still carry this
// Worker's printVersion or it is refused.
export async function revalidatePrintCatalog(env) {
  if (cache.version !== printVersion || !cache.etag || cache.etag === 'module') return ensurePrintCatalog(env);
  if (!env?.ASSETS?.fetch) throw Error('Print catalog asset binding is missing');
  const response = await env.ASSETS.fetch(new Request(printCatalogAssetUrl(), { headers: { 'If-None-Match': cache.etag } }));
  if (response.status === 304) return prints;
  if (!response.ok) throw Error(`Print catalog asset unavailable (${response.status})`);
  const data = await response.json();
  if (data?.printVersion !== printVersion || !data.prints || typeof data.prints !== 'object' || Array.isArray(data.prints)) {
    throw Error('Print catalog asset version does not match this Worker');
  }
  installPrintCatalog(data.prints, data.printVersion);
  cache = { version: printVersion, etag: response.headers.get('etag') || printVersion };
  return prints;
}
