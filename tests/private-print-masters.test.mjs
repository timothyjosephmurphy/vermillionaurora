import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import worker from '../worker/site.mjs';
import {fulfillmentImage, signFulfillmentUrl, signPath, PRINT_MASTER_TTL_SECONDS} from '../cloudflare/print-master-sign.mjs';
import {newFinerWorksJob} from '../cloudflare/finerworks-fulfillment.mjs';
import {publicCartItem} from '../cloudflare/cart-policy.mjs';
import {manifestCoversSource, printMasterManifest, printMasterRecord} from '../scripts/lib/print-master-file.mjs';
import config from '../catalog/prints.json' with {type: 'json'};
import prints from '../cloudflare/print-catalog.mjs';
import tj from '../catalog/tj-print-masters.json' with {type: 'json'};
import archive from '../catalog/archive-print-masters.json' with {type: 'json'};
import older from '../catalog/older-work-print-masters.json' with {type: 'json'};

const secret = 'test-print-master-secret';
const filename = 'a'.repeat(64) + '.jpg';
const bytes = Buffer.from('print-master-bytes');

function bucket() {
  const store = new Map([[`print-masters/${filename}`, bytes]]);
  const object = (body) => body ? {size: body.length, httpMetadata: {contentType: 'image/jpeg'}, body} : null;
  return {get: async key => object(store.get(key)), head: async key => object(store.get(key))};
}

async function fetchMaster(path, {sig, exp, method = 'GET', now = 1_700_000_000_000} = {}) {
  const url = new URL(path, 'https://tjm.art');
  if (exp != null) url.searchParams.set('exp', String(exp));
  if (sig != null) url.searchParams.set('sig', sig);
  const env = {PRIMARY_HOST: 'tjm.art', LEGACY_REDIRECT: 'false', PRINT_MASTER_SIGNING_SECRET: secret, PRINT_MASTERS: bucket(), ASSETS: {fetch: () => { throw Error('assets must not serve print masters'); }}};
  return worker.fetch(new Request(url, {method}), env);
}

test('unsigned and tampered print-master requests never return the file', async () => {
  for (const method of ['GET', 'HEAD']) {
    for (const path of [`/print-masters/${filename}`, `/api/print-master/${filename}`, '/print-masters/not-a-master.jpg']) {
      const open = await fetchMaster(path, {method});
      assert.equal(open.status, 403, method + ' ' + path);
      assert.equal(open.headers.get('cache-control'), 'no-store');
      assert.equal(open.status === 200, false);
    }
  }
  const exp = Math.floor(Date.now() / 1000) + 3600;
  const sig = await signPath(secret, `/print-masters/${filename}`, exp);
  const expired = await fetchMaster(`/print-masters/${filename}`, {exp: exp - PRINT_MASTER_TTL_SECONDS - 10, sig});
  assert.equal(expired.status, 403);
  const tampered = await fetchMaster(`/api/print-master/${filename}`, {exp, sig: sig.replace(/^./, sig[0] === '0' ? '1' : '0')});
  assert.equal(tampered.status, 403);
  const other = await fetchMaster(`/print-masters/${'b'.repeat(64)}.jpg`, {exp, sig});
  assert.equal(other.status, 403);
});

test('a valid signature streams the R2 object and does not cache it', async () => {
  const now = Date.now();
  const exp = Math.floor(now / 1000) + 3600;
  const sig = await signPath(secret, `/print-masters/${filename}`, exp);
  for (const path of [`/print-masters/${filename}`, `/api/print-master/${filename}`]) {
    const response = await fetchMaster(path + `?unused=1`, {exp, sig, now});
    assert.equal(response.status, 200, path);
    assert.equal(response.headers.get('content-type'), 'image/jpeg');
    assert.equal(response.headers.get('content-length'), String(bytes.length));
    assert.equal(response.headers.get('cache-control'), 'private, no-store');
    assert.equal(Buffer.from(await response.arrayBuffer()).equals(bytes), true);
    const head = await fetchMaster(path, {exp, sig, method: 'HEAD', now});
    assert.equal(head.status, 200);
    assert.equal(await head.text(), '');
    assert.equal(head.headers.get('content-length'), String(bytes.length));
    assert.equal(head.headers.get('cache-control'), 'private, no-store');
  }
  const missing = await fetchMaster(`/api/print-master/${'c'.repeat(64)}.jpg`, {exp, sig: await signPath(secret, `/print-masters/${'c'.repeat(64)}.jpg`, exp), now});
  assert.equal(missing.status, 404);
  assert.match(missing.headers.get('cache-control'), /no-store/);
});

test('FinerWorks order payload uses a signed fulfillment URL only when signing is configured', async () => {
  const assetUrl = 'https://vermillionaurora.com/print-editions/' + 'd'.repeat(64) + '.jpg';
  const plain = await fulfillmentImage({CHECKOUT_MODE: 'live'}, assetUrl, 'live');
  assert.equal(plain.product_url_file, assetUrl);
  assert.equal(new URL(plain.product_url_file).search, '');
  const signed = await fulfillmentImage({PRINT_MASTER_SIGNING_SECRET: secret, CHECKOUT_MODE: 'live'}, assetUrl, 'live');
  const url = new URL(signed.product_url_file);
  assert.equal(url.origin + url.pathname, assetUrl);
  assert.match(url.searchParams.get('sig'), /^[a-f0-9]{64}$/);
  assert.equal(url.searchParams.get('sig'), await signPath(secret, url.pathname, Number(url.searchParams.get('exp'))));
  const thumb = new URL(signed.product_url_thumbnail);
  assert.match(thumb.pathname, /^\/print-editions\/thumbs\/[a-f0-9]{64}\.jpg$/);
  assert.notEqual(thumb.searchParams.get('sig'), url.searchParams.get('sig'));
  const direct = await signFulfillmentUrl(secret, `https://tjm.art/api/print-master/${filename}`, {now: 1_700_000_000_000});
  assert.match(direct, new RegExp(`^https://tjm.art/api/print-master/${filename}\\?exp=\\d+&sig=[a-f0-9]{64}$`));

  const print = Object.values(prints).find(item => item.provider === 'finerworks' && item.layoutApproved && !item.frame && !item.mat && item.assetUrl.startsWith('https://vermillionaurora.com/print-editions/'));
  const id = 'aaaaaaaa-aaaa-4aaa-aaaa-aaaaaaaaaaaa';
  const address = {name: 'Test Buyer', street1: '1 Main St', street2: '', city: 'Seattle', state: 'WA', zip: '98122', country: 'US'};
  const quote = {provider: 'finerworks', mode: 'sandbox', shippingMethod: '42', maximumProviderCost: '10.00', productionCost: '8.00', shipping: '2.00'};
  const env = {CHECKOUT_MODE: 'sandbox', PRINT_PROVIDER: 'finerworks', FINERWORKS_ORDER_ENABLED: 'true', FINERWORKS_WEB_API_KEY: 'web', FINERWORKS_APP_KEY: 'app', PRINT_MASTER_SIGNING_SECRET: secret};
  const job = await newFinerWorksJob(env, {id, mode: 'sandbox', quote: {address, printQuote: quote}}, [{...print, quantity: 1}]);
  const file = job.request.orders[0].order_items[0].product_image.product_url_file;
  assert.match(file, /^https:\/\/vermillionaurora.com\/print-editions\/[a-f0-9]{64}\.jpg\?exp=\d+&sig=[a-f0-9]{64}$/);
  assert.equal(file.split('?')[0], print.assetUrl);
  const unsigned = await newFinerWorksJob({...env, PRINT_MASTER_SIGNING_SECRET: ''}, {id, mode: 'sandbox', quote: {address, printQuote: quote}}, [{...print, quantity: 1}]);
  assert.equal(unsigned.request.orders[0].order_items[0].product_image.product_url_file, print.assetUrl);
});

test('public cart previews do not expose print-master URLs', () => {
  const preview = {src: 'https://vermillionaurora.com/print-masters/' + 'e'.repeat(64) + '.jpg', fullSrc: '/display/older-work-example-1600.webp', alt: 'Example'};
  const item = publicCartItem({id: 'print-example', type: 'print', title: 'Example', amount: '40.00', quantity: 1, productId: 'example', imageSize: {width: 8, height: 10}, paperSize: {width: 10, height: 12}, paper: 'Watercolor', preview, assetUrl: preview.src});
  assert.equal(item.assetUrl, undefined);
  assert.equal(item.preview.src, preview.fullSrc);
  assert.doesNotMatch(JSON.stringify(item), /print-masters/);
});

test('the print-master manifest covers every catalog master', () => {
  const manifest = printMasterManifest();
  assert.equal(manifest.bucket, 'tjm-print-masters');
  assert.equal(manifest.binding, 'PRINT_MASTERS');
  assert.equal(new Set(manifest.files.map(file => file.filename)).size, manifest.files.length);
  let bytes = 0;
  for (const file of manifest.files) {
    assert.equal(file.sha256, file.filename.replace(/\.[a-z0-9]+$/i, ''));
    assert.equal(file.r2Key, `print-masters/${file.filename}`);
    assert.equal(file.bytes > 0 && file.widthPx > 0 && file.heightPx > 0, true, file.filename);
    bytes += file.bytes;
  }
  assert.equal(bytes > 500_000_000, true);
  const sources = Object.values(config.artworks).map(art => art.source).filter(source => /\/print-masters\//.test(source?.url || ''));
  assert.equal(sources.length > 0, true);
  for (const source of sources) assert.equal(manifestCoversSource(source)?.sha256, source.sha256, source.url);
  for (const recipe of [...tj, ...archive, ...older]) {
    if (!recipe.sha256 || !/print-masters/.test(recipe.local || recipe.url || '')) continue;
    assert.equal(printMasterRecord(recipe.sha256)?.sha256, recipe.sha256, recipe.id);
  }
  for (const print of Object.values(prints)) {
    if (!/\/print-masters\//.test(print.assetUrl || '') && !/\/print-masters\//.test(print.preview?.src || '')) continue;
    assert.equal(printMasterRecord(print.sourceSha256)?.sha256, print.sourceSha256, print.id);
  }
  if (fs.existsSync('dist')) {
    assert.equal(fs.existsSync('dist/print-masters'), false, 'the public build must not contain print masters');
  }
});
