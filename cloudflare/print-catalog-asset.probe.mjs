// Isolated module graph for the asset loader. npm test spawns this so it does
// not clear the shared catalog other unit tests import.
import assert from 'node:assert/strict';
import { prints, clearPrintCatalog, installPrintCatalog, printCatalogInstalledVersion } from './print-catalog-store.mjs';
import { printVersion } from './print-catalog-version.mjs';
import { ensurePrintCatalog, revalidatePrintCatalog, resetPrintCatalogAssetCache, printCatalogAssetUrl, printCatalogCache } from './print-catalog-asset.mjs';

clearPrintCatalog();
resetPrintCatalogAssetCache();
assert.equal(printCatalogInstalledVersion(), '');

const version = printVersion;
let fetches = 0;
let body = { printVersion: version, prints: { 'print-probe': { id: 'print-probe', type: 'print', amount: '1.00', sku: 'SKU' } } };
const etag = '"probe-v1"';
const seen = [];
const env = {
  ASSETS: {
    async fetch(request) {
      fetches += 1;
      seen.push(String(request.url));
      const match = request.headers.get('If-None-Match');
      if (match === etag) return new Response(null, { status: 304, headers: { ETag: etag } });
      return Response.json(body, { headers: { ETag: etag } });
    },
  },
};

await ensurePrintCatalog(env);
assert.equal(fetches, 1);
assert.equal(seen[0], printCatalogAssetUrl());
assert.ok(seen[0].includes(encodeURIComponent(version)));
assert.equal(prints['print-probe'].amount, '1.00');
assert.equal(prints['print-probe'].sku, 'SKU');
assert.equal(printCatalogInstalledVersion(), version);
assert.equal(printCatalogCache().version, version);
assert.equal(printCatalogCache().etag, etag);
await ensurePrintCatalog(env);
assert.equal(fetches, 1, 'second call uses the in-isolate cache');

await revalidatePrintCatalog(env);
assert.equal(fetches, 2);
assert.equal(prints['print-probe'].sku, 'SKU', '304 keeps the cached catalog');

body = { printVersion: version, prints: { 'print-probe': { id: 'print-probe', type: 'print', amount: '2.00', sku: 'NEXT' } } };
const replaced = '"probe-v2"';
const refresh = {
  ASSETS: {
    async fetch(request) {
      assert.equal(request.headers.get('If-None-Match'), etag);
      return Response.json(body, { headers: { ETag: replaced } });
    },
  },
};
await revalidatePrintCatalog(refresh);
assert.equal(prints['print-probe'].sku, 'NEXT');
assert.equal(prints['print-probe'].amount, '2.00');
assert.equal(printCatalogCache().etag, replaced);

const bad = {
  ASSETS: {
    async fetch() {
      return Response.json({ printVersion: 'not-this-worker', prints: { other: { id: 'other' } } });
    },
  },
};
await assert.rejects(() => revalidatePrintCatalog(bad), /version/);
assert.equal(prints['print-probe'].sku, 'NEXT');
assert.equal(prints.other, undefined);

clearPrintCatalog();
resetPrintCatalogAssetCache();
await assert.rejects(() => ensurePrintCatalog({}), /binding/);
assert.equal(printCatalogInstalledVersion(), '');

installPrintCatalog({ 'print-probe': { id: 'print-probe', amount: '9.00' } }, 'stale');
resetPrintCatalogAssetCache();
await assert.rejects(() => ensurePrintCatalog(bad), /version/);
assert.equal(prints['print-probe'].amount, '9.00', 'a rejected asset does not replace the catalog');
assert.equal(prints.other, undefined);

console.log('print-catalog-asset.probe ok');
