import test from 'node:test';
import assert from 'node:assert/strict';
import {displayedStatus, etsyOriginalPrice, ETSY_ORIGINAL_UPLIFT, nextManualRow, nextEtsySale, stockStatus} from './original-availability.mjs';
import {originalsInReceipt, reconcileAction, listingMap, reconcileOriginals, pollEtsyReceipts, deactivateOriginal} from './etsy-original-sync.mjs';
import {originalStatusApi} from './original-status.mjs';
import {ETSY_ORIGIN, write} from './etsy-connection.mjs';
import {EXISTING_PRINT_LISTINGS, PROTECTED_LISTING_IDS} from './etsy-sync-plan.mjs';

const now = Date.parse('2026-10-08T22:30:00Z');
class Bucket {
  data = new Map(); sequence = 0;
  async get(key) { const item = this.data.get(key); return item ? {etag: item.etag, json: async () => JSON.parse(item.value)} : null; }
  async put(key, value, options = {}) {
    const prev = this.data.get(key), condition = options.onlyIf || {};
    if (condition.etagMatches && prev?.etag !== condition.etagMatches) return null;
    if (condition.etagDoesNotMatch === '*' && prev) return null;
    const item = {value, etag: String(++this.sequence)}; this.data.set(key, item); return item;
  }
}
function stock() {
  const rows = new Map();
  return {getByName(id) {
    if (!rows.has(id)) rows.set(id, null);
    return {
      summary: async () => rows.get(id),
      async setManual(status, note, at) {
        const next = nextManualRow(rows.get(id), status, now);
        if (next.error) return {ok: false, error: next.error};
        rows.set(id, {...next, note, at});
        return {ok: true, status: stockStatus(rows.get(id), now)};
      },
      async recordEtsySale(receiptId, at) {
        const next = nextEtsySale(rows.get(id), receiptId, now);
        if (next.duplicate) return {ok: true, duplicate: true, status: 'sold'};
        if (next.conflict) return {ok: false, conflict: true, status: stockStatus(rows.get(id), now)};
        rows.set(id, {...next, note: 'Etsy receipt ' + receiptId, at});
        return {ok: true, status: 'sold', replacedHold: !!next.replacedHold};
      }
    };
  }, rows};
}

test('original uplift is one config and prints are not priced by it', () => {
  assert.equal(ETSY_ORIGINAL_UPLIFT, 1.1);
  assert.equal(etsyOriginalPrice('1000.00'), '1100.00');
  assert.equal(etsyOriginalPrice(1000), '1100.00');
});

test('manual status overrides the catalog and a checkout hold blocks it', () => {
  assert.equal(displayedStatus('sold', {manual: 'available', state: 'open'}, now), 'available');
  assert.equal(displayedStatus('available', {manual: 'unavailable', state: 'unavailable'}, now), 'unavailable');
  assert.equal(displayedStatus('available', {state: 'sold', capture_id: 'etsy:9'}, now), 'sold');
  const held = {state: 'held', expires_at: now + 1000};
  assert.equal(stockStatus(held, now), 'reserved');
  assert.match(nextManualRow(held, 'sold', now).error, /checkout/);
  assert.equal(nextEtsySale({state: 'sold', capture_id: 'etsy:9'}, '9', now).duplicate, true);
  assert.equal(nextEtsySale({state: 'sold', capture_id: 'etsy:9'}, '10', now).conflict, true);
});

test('receipts update only mapped originals and reconcile never reactivates', () => {
  const map = listingMap({});
  const lookup = new Map(map.map(item => [item.listingId, item.productId]));
  const printId = EXISTING_PRINT_LISTINGS['painting-shoreline-at-dusk'];
  const hits = originalsInReceipt({receipt_id: 50, is_paid: true, transactions: [{listing_id: printId}, {listing_id: 4591466297}, {listing_id: [...PROTECTED_LISTING_IDS][0]}]}, lookup);
  assert.deepEqual(hits.map(hit => hit.productId), ['el-zonte-before-dawn']);
  assert.equal(reconcileAction('sold', 'active'), 'deactivate');
  assert.equal(reconcileAction('unavailable', 'active'), 'deactivate');
  assert.equal(reconcileAction('available', 'inactive'), 'none');
  assert.equal(reconcileAction('sold', 'inactive'), 'none');
});

test('owner status API rejects a bad credential, logs a change, and leaves prints alone', async t => {
  const bucket = new Bucket();
  const books = stock();
  const env = {INVENTORY_ADMIN_TOKEN: 'inventory-token', PAINTING_STOCK: books, COMMISSION_UPLOADS: bucket};
  const call = (body, token = 'inventory-token') => originalStatusApi(new Request('https://vermillion-commissions.timothyjosephmurphy.workers.dev/inventory/originals', {
    method: 'POST', headers: {Origin: 'https://tjm.art', Authorization: 'Bearer ' + token, 'Content-Type': 'application/json'}, body: JSON.stringify(body)
  }), env, now);
  assert.equal((await call({action: 'list'}, 'nope')).status, 403);
  const held = {state: 'capturing'};
  books.rows.set('el-zonte-before-dawn', held);
  assert.equal((await call({action: 'set', id: 'el-zonte-before-dawn', status: 'sold', note: 'gallery'})).status, 409);
  books.rows.set('el-zonte-before-dawn', null);
  const sold = await call({action: 'set', id: 'el-zonte-before-dawn', status: 'sold', note: 'Sold at the studio, cash'});
  assert.equal(sold.status, 200, await sold.clone().text());
  const body = await sold.json();
  assert.equal(body.status, 'sold');
  assert.equal(body.etsy.skipped, 'unmapped');
  const again = await (await call({action: 'log', id: 'el-zonte-before-dawn'})).json();
  assert.equal(again.log.length, 1);
  assert.equal(again.log[0].note, 'Sold at the studio, cash');
  assert.equal(again.log[0].source, 'manual');
  const listed = await (await call({action: 'list', ids: ['el-zonte-before-dawn']})).json();
  assert.equal(listed.originals[0].status, 'sold');
  t.assert.equal([...books.rows.keys()].includes('4587311664'), false);
});

test('a paid Etsy receipt marks the original sold once and does not touch print listings', async t => {
  const bucket = new Bucket();
  const env = {ETSY_KEYSTRING: 'test-key', ETSY_SHARED_SECRET: 'test-secret', COMMISSION_MANAGER_TOKEN: 'manager', COMMISSION_UPLOADS: bucket, PAINTING_STOCK: stock(), GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 'secret', GOOGLE_REFRESH_TOKEN: 'refresh'};
  await write(env, {connection: {shopId: 42, shopName: 'VermillionAurora', userId: '123', accessToken: '123.access', refreshToken: '123.refresh', expiresAt: now + 3600000, scopes: ['listings_w', 'transactions_r']}}, null);
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options = {}) => {
    const target = String(url); calls.push({url: target, method: options.method || 'GET'});
    if (target.includes('/receipts?')) return Response.json({results: [{receipt_id: 77, is_paid: true, transactions: [{listing_id: 4587311664}, {listing_id: 4591466297}]}]});
    const listing = target.match(/\/listings\/(\d+)$/);
    if (listing && (!options.method || options.method === 'GET')) {
      const id = Number(listing[1]);
      if (id === 4587311664 || id === 4587311534) throw Error('print or protected listing was read');
      return Response.json({listing_id: id, state: 'active', quantity: 1, price: {amount: 110000, divisor: 100}, url: 'https://www.etsy.com/listing/' + id + '/x'});
    }
    if (options.method === 'PATCH') {
      if (!target.endsWith('/listings/4591466297')) throw Error('patched the wrong listing ' + target);
      return Response.json({listing_id: 4591466297, state: 'inactive'});
    }
    if (target.includes('oauth2.googleapis.com')) return Response.json({access_token: 'mail'});
    if (target.includes('gmail.googleapis.com')) return Response.json({id: 'mail'});
    throw Error('unexpected ' + target);
  });
  const {connection} = await import('./etsy-listings.mjs');
  const loaded = await connection(env, now);
  const first = await pollEtsyReceipts(env, loaded.token, loaded.record, {now});
  assert.equal(first.ok, true);
  assert.equal(first.results.filter(item => item.productId === 'el-zonte-before-dawn' && item.status === 'sold').length, 1);
  assert.equal(calls.some(call => call.url.includes('4587311664') && call.method === 'PATCH'), false);
  assert.equal(calls.some(call => call.url.includes('/listings/4591466297') && call.method === 'PATCH'), true);
  const second = await pollEtsyReceipts(env, loaded.token, loaded.record, {now: now + 1000});
  assert.equal(second.results.some(item => item.duplicate), true);
  const dry = await reconcileOriginals(env, loaded.token, {etsyListingSync: {listings: {'el-zonte-before-dawn': {original: 4591466297}}}}, {dryRun: true, siteStatusFor: () => 'available'});
  assert.equal(dry.drift, false);
  assert.equal(dry.results[0].action, 'none');
  const sold = await reconcileOriginals(env, loaded.token, {etsyListingSync: {listings: {'painting-shoreline-at-dusk': {original: 4591478382}}}}, {dryRun: true, siteStatusFor: () => 'sold'});
  assert.equal(sold.results[0].drift, true);
  assert.equal(sold.results[0].action, 'deactivate');
  await assert.rejects(() => deactivateOriginal(env, loaded.token, 4587311664), /print or protected/);
});

test('a failed Etsy deactivate emails TJ and does not reactivate', async t => {
  const bucket = new Bucket();
  const env = {ETSY_KEYSTRING: 'test-key', ETSY_SHARED_SECRET: 'test-secret', COMMISSION_MANAGER_TOKEN: 'manager', COMMISSION_UPLOADS: bucket, PAINTING_STOCK: stock(), INVENTORY_ADMIN_TOKEN: 'inventory-token', GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 'secret', GOOGLE_REFRESH_TOKEN: 'refresh'};
  await write(env, {connection: {shopId: 42, shopName: 'VermillionAurora', userId: '123', accessToken: '123.access', refreshToken: '123.refresh', expiresAt: now + 3600000}}, null);
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options = {}) => {
    const target = String(url); calls.push(target);
    if (target.endsWith('/listings/4591466297') && (!options.method || options.method === 'GET')) return Response.json({listing_id: 4591466297, state: 'active', quantity: 1});
    if (options.method === 'PATCH') return new Response('no', {status: 403});
    if (target.includes('oauth2.googleapis.com')) return Response.json({access_token: 'mail'});
    if (target.includes('gmail.googleapis.com')) return Response.json({id: 'm'});
    throw Error('unexpected ' + target);
  });
  const response = await originalStatusApi(new Request(ETSY_ORIGIN + '/inventory/originals', {
    method: 'POST', headers: {Origin: 'https://tjm.art', Authorization: 'Bearer inventory-token', 'Content-Type': 'application/json'},
    body: JSON.stringify({action: 'set', id: 'el-zonte-before-dawn', status: 'unavailable', note: 'Gallery 110'})
  }), env, now);
  assert.equal(response.status, 200, await response.clone().text());
  const body = await response.json();
  assert.equal(body.status, 'unavailable');
  assert.equal(body.etsy.ok, false);
  assert.equal(calls.some(url => url.includes('gmail.googleapis.com')), true);
  assert.equal(calls.some(url => url.includes('state=active')), false);
});
