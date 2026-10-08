import test from 'node:test';
import assert from 'node:assert/strict';
import {etsyListings} from './etsy-listings.mjs';
import {ETSY_ORIGIN, write} from './etsy-connection.mjs';
import {PROTECTED_LISTING_IDS, printTitle, originalTitle, SYNC_WORKS} from './etsy-sync-plan.mjs';

const now = Date.parse('2026-10-08T21:00:00Z');
class Bucket {
  data = new Map(); sequence = 0;
  async get(key) { const item = this.data.get(key); return item ? {etag: item.etag, json: async () => JSON.parse(item.value)} : null; }
  async put(key, value, options) {
    const prev = this.data.get(key), condition = options.onlyIf;
    if (condition.etagMatches && prev?.etag !== condition.etagMatches) return null;
    if (condition.etagDoesNotMatch === '*' && prev) return null;
    const item = {value, etag: String(++this.sequence)}; this.data.set(key, item); return item;
  }
}
const envOf = () => ({ETSY_KEYSTRING: 'test-key', ETSY_SHARED_SECRET: 'test-secret', COMMISSION_MANAGER_TOKEN: 'manager', COMMISSION_UPLOADS: new Bucket()});
async function connected(env) {
  await write(env, {connection: {shopId: 42, shopName: 'VermillionAurora', userId: '123', accessToken: '123.access', refreshToken: '123.refresh', expiresAt: now + 3600000, scopes: ['shops_r', 'listings_r', 'listings_w']}, etsyDraftBatch: {status: 'complete', skuMap: {OLD: {printId: 'keep'}}, items: {}}}, null);
}
function req(env, path, body) {
  return etsyListings(new Request(ETSY_ORIGIN + path, {method: 'POST', headers: {Origin: ETSY_ORIGIN, Authorization: 'Bearer manager', 'Content-Type': 'application/json'}, body: JSON.stringify(body)}), env, now);
}
function taxonomy() {
  return [{id: 1, name: 'Art & Collectibles', children: [
    {id: 2, name: 'Prints', children: [{id: 2078, name: 'Digital Prints', children: []}]},
    {id: 3, name: 'Painting', children: [{id: 88, name: 'Watercolor', children: []}]}
  ]}];
}
function mock(t, {listings = {}} = {}) {
  const calls = [];
  t.mock.method(globalThis, 'fetch', async (url, options = {}) => {
    const target = String(url); calls.push({url: target, options});
    if (PROTECTED_LISTING_IDS.has(Number(target.match(/listings\/(\d+)/)?.[1]))) throw Error('protected listing was called');
    if (target.endsWith('/shipping-profiles')) return Response.json({results: [
      {shipping_profile_id: 501, title: 'Prints Shipping', profile_type: 'calculated'},
      {shipping_profile_id: 502, title: 'Originals Shipping', profile_type: 'calculated'}
    ]});
    if (target.includes('/readiness-state-definitions')) return Response.json({results: [{readiness_state_id: 22, readiness_state: 'made_to_order', min_processing_days: 3, max_processing_days: 5}]});
    if (target.endsWith('/production-partners')) return Response.json({results: [{production_partner_id: 33, partner_name: 'A printing and framing shop'}]});
    if (target.endsWith('/seller-taxonomy/nodes')) return Response.json(taxonomy());
    if (target.endsWith('/policies/return')) return Response.json({results: [{return_policy_id: 77, accepts_returns: true, accepts_exchanges: true, return_deadline: 30}]});
    if (target.endsWith('/shops/42')) return Response.json({shop_id: 42, currency_code: 'USD'});
    if (target.includes('/listings?state=')) return Response.json({count: 0, results: []});
    const listing = target.match(/\/application\/listings\/(\d+)$/);
    if (listing && (!options.method || options.method === 'GET')) {
      const id = Number(listing[1]); const saved = listings[id] || {state: 'draft', title: 'saved', taxonomy_id: 2078};
      return Response.json({listing_id: id, state: saved.state, title: saved.title, taxonomy_id: saved.taxonomy_id, price: {amount: 4500, divisor: 100}, quantity: saved.quantity || 100, url: 'https://www.etsy.com/listing/' + id});
    }
    if (target.includes('/inventory')) return Response.json({products: [{offerings: [{price: 45}, {price: 243}]}]});
    if (target.endsWith('/images') && (!options.method || options.method === 'GET')) return Response.json({results: [{listing_image_id: 1, rank: 1}, {listing_image_id: 9, rank: 5}]});
    if (target.includes('/images/') && options.method === 'DELETE') return Response.json({listing_image_id: 9});
    if (target.endsWith('/images') && options.method === 'POST') return Response.json({listing_image_id: 2, rank: 1});
    if (target.endsWith('/videos') && (!options.method || options.method === 'GET')) return Response.json({results: []});
    if (target.endsWith('/videos') && options.method === 'POST') return Response.json({video_id: 3, video_state: 'active'});
    if (options.method === 'PATCH') {
      const form = new URLSearchParams(options.body);
      const id = Number(target.split('/').at(-1));
      if (form.get('state') === 'active') listings[id] = {...listings[id], state: 'active'};
      return Response.json({listing_id: id, state: form.get('state') || 'draft'});
    }
    if (options.method === 'POST' && target.includes('/listings?legacy=false')) {
      const form = new URLSearchParams(options.body);
      assert.equal(form.has('state'), false);
      return Response.json({listing_id: 777, state: 'draft'});
    }
    throw Error('Unexpected mocked Etsy URL ' + target + ' ' + options.method);
  });
  return calls;
}

test('plans use the catalog titles, Punta spelling, and separate print and original copy', () => {
  assert.equal(printTitle({title: 'El Zonte at Dawn'}), 'El Zonte at Dawn Art Print · Framed or Unframed');
  assert.equal(originalTitle({title: 'Sunrise from Punta El Zonte Hostel', dimensions: {width: 24, height: 48, unit: 'in'}}), 'Sunrise from Punta El Zonte Hostel, Original Watercolor Pastel, 24 x 48 in');
  assert.equal(originalTitle({title: 'El Zonte Before Dawn', dimensions: {width: 48, height: 24, unit: 'in'}}), 'El Zonte Before Dawn, Original Watercolor Pastel, 48 x 24 in');
});

test('updates the two existing print drafts and creates only the missing one', async t => {
  const env = envOf(); await connected(env); const calls = mock(t);
  const res = await req(env, '/etsy/listings/sync', {kind: 'print', productIds: ['painting-shoreline-at-dusk', 'el-zonte-at-sunrise', 'el-zonte-before-dawn']});
  assert.equal(res.status, 200, await res.clone().text());
  const data = await res.json();
  assert.deepEqual(data.results.map(item => item.listingId), [4587311664, 4587305955, 777]);
  assert.deepEqual(data.results.map(item => item.created), [false, false, true]);
  const creates = calls.filter(call => call.url.includes('/listings?legacy=false'));
  assert.equal(creates.length, 1);
  assert.equal(new URLSearchParams(creates[0].options.body).get('title'), 'El Zonte Before Dawn Art Print · Framed or Unframed');
  assert.equal(new URLSearchParams(creates[0].options.body).get('price'), String(Math.min(...SYNC_WORKS.find(work => work.id === 'el-zonte-before-dawn').variants.map(variant => Number(variant.price)))));
  assert.equal(calls.filter(call => call.url.includes('/inventory')).length, 3);
  assert.equal(calls.some(call => call.url.includes('4587311534')), false);
});

test('creates original drafts at the site price plus the Etsy uplift and can publish them explicitly', async t => {
  const env = envOf(); await connected(env); const calls = mock(t);
  const res = await req(env, '/etsy/listings/sync', {kind: 'original', productIds: ['el-zonte-before-dawn']});
  assert.equal(res.status, 200, await res.clone().text());
  const form = new URLSearchParams(calls.find(call => call.url.includes('/listings?legacy=false')).options.body);
  assert.equal(form.get('title'), 'El Zonte Before Dawn, Original Watercolor Pastel, 48 x 24 in');
  assert.equal(form.get('price'), '1100.00');
  const priced = calls.find(call => call.url.includes('/inventory') && call.options.method === 'PUT');
  assert.equal(JSON.parse(priced.options.body).products[0].offerings[0].price, 1100);
  assert.equal(JSON.parse(priced.options.body).products[0].offerings[0].quantity, 1);
  assert.equal(form.get('quantity'), '1');
  assert.equal(form.get('who_made'), 'i_did');
  assert.equal(form.get('when_made'), '2020_2026');
  assert.equal(form.get('shipping_profile_id'), '502');
  assert.equal(form.has('production_partner_ids'), false);
  const activate = await req(env, '/etsy/listings/activate', {kind: 'original', productIds: ['el-zonte-before-dawn']});
  assert.equal(activate.status, 200, await activate.clone().text());
  const published = calls.filter(call => call.options.method === 'PATCH');
  assert.equal(published.length, 1);
  assert.equal(new URLSearchParams(published[0].options.body).get('state'), 'active');
  assert.equal(new URLSearchParams(published[0].options.body).get('quantity'), '1');
  assert.equal(published[0].url.includes('/listings/777'), true);
});

test('publishes only the requested print listings', async t => {
  const env = envOf(); await connected(env); const calls = mock(t);
  const res = await req(env, '/etsy/listings/activate', {kind: 'print', productIds: ['el-zonte-at-sunrise']});
  assert.equal(res.status, 200, await res.clone().text());
  const data = await res.json();
  assert.equal(data.results[0].state, 'active');
  assert.equal(data.results[0].listingId, 4587305955);
  const patches = calls.filter(call => call.options.method === 'PATCH');
  assert.equal(patches.length, 1);
  assert.equal(new URLSearchParams(patches[0].options.body).get('state'), 'active');
});

test('rejects paintings outside the El Zonte set', async t => {
  const env = envOf(); await connected(env); mock(t);
  const res = await req(env, '/etsy/listings/sync', {kind: 'print', productIds: ['warszawska-syrenka']});
  assert.equal(res.status, 502);
  assert.match((await res.json()).error, /El Zonte/);
});
