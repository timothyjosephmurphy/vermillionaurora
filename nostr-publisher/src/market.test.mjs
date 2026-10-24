import test from 'node:test';
import assert from 'node:assert/strict';
import { generateSecretKey, getPublicKey, verifyEvent } from 'nostr-tools/pure';
import {
  MARKET_HOLD_TTL_MS, MARKET_POLL_INTERVAL_MS, MARKET_PUBKEY, MARKET_SHIPPING, MARKET_PROFILE, MARKET_PROFILE_BIO_APPROVED, INTERNATIONAL_COUNTRIES
} from './market-config.mjs';
import { makeShippoQuoter, marketCost } from './market-shipping.mjs';
import {
  buildProfileTemplate, contentHash, ineligibleReason, mapListing, mapShippingOptions, marketPrice, shippingMode, stockFor
} from './market-listing.mjs';
import { makeSigner, marketSettings, planMarket, runMarket, runProfile } from './market-run.mjs';

const NOW = 1_792_800_000;
// Small fixture in the catalog's shape (the real catalog validates files relative to the repo root, not this package).
const base = {
  type: 'painting', artist: 'TJ Murphy', medium: 'Watercolor pastel', surface: 'Arches Coldpress Paper', year: 2026, framing: 'Unframed',
  dimensions: { width: 100, height: 70, unit: 'cm' },
  checkout: { mode: 'integrated', shipping: { length: 28, width: 4, height: 4, weight: 1.8125, packaging: 'tube', packageOverride: true } }
};
export const products = [
  { ...base, id: 'warszawska-syrenka', slug: 'warszawska-syrenka', title: 'Warszawska Syrenka',
    listing: { status: 'available', price: { amount: '1200.00', currency: 'USD' } },
    image: { src: '/gallery-images/warszawska-syrenka-2026.jpg', alt: 'Warszawska Syrenka' },
    story: ['I made this poster for the Bitcoin Film Festival in Warsaw, Poland. It depicts the Syrenka.', 'The hussar wings represent Polish valor.'] },
  { ...base, id: 'painting-clouds-over-water', slug: 'painting-clouds-over-water', title: 'Clouds over Water', framing: null,
    dimensions: { width: 8, height: 16, unit: 'in' },
    listing: { status: 'sold', price: { amount: '200.00', currency: 'USD' } }, image: { src: '/gallery-images/clouds.jpg', alt: 'c' }, story: [] },
  { ...base, id: 'paul-landscape', slug: 'paul-landscape', title: 'Paul landscape', artist: 'Paul Murphy',
    listing: { status: 'available', price: { amount: '300.00', currency: 'USD' } }, image: { src: '/gallery-images/p.jpg', alt: 'p' }, story: [] },
  { ...base, id: 'private-study', slug: 'private-study', title: 'Private study',
    listing: { status: 'not-for-sale' }, image: { src: '/gallery-images/s.jpg', alt: 's' }, story: [] },
  { id: 'a-book', slug: 'a-book', type: 'book', artist: 'TJ Murphy', title: 'A book', story: [] },
  { id: 'a-commission', slug: 'a-commission', type: 'commission', artist: 'TJ Murphy', title: 'Commission', listing: { status: 'inquiry' }, story: [] }
];
const byId = (id) => products.find((p) => p.id === id);
const syrenka = byId('warszawska-syrenka');
const tag = (event, name) => event.tags.filter((t) => t[0] === name);
const one = (event, name) => tag(event, name)[0];

// An in-memory stand-in for Durable Object storage and a fake relay.
function memoryStore() {
  const data = new Map();
  return {
    data,
    async get(key) { return data.get(key); },
    async put(key, value) { data.set(key, value); },
    async delete(key) { data.delete(key); },
    async transaction(fn) { return fn(this); }
  };
}
function fakeRelay() {
  const events = [];
  const publish = async (event) => { events.push(event); return 'wss://fake.relay'; };
  return { events, publish };
}
// Ephemeral key: its pubkey is the "expected" one for live tests only. Never a real key.
function ephemeral() {
  const key = generateSecretKey();
  let reads = 0;
  return { key, pubkey: getPublicKey(key), reads: () => reads, getKey: async () => { reads += 1; return key; } };
}
const liveEnv = (ids) => ({ MARKET_PUBLISH_ENABLED: 'true', MARKET_MODE: 'publish', MARKET_APPROVED_IDS: ids.join(',') });
// Shippo is always mocked: no live calls in tests. US quotes $38.41, Sydney $91.07 (cheapest of the returned rates wins).
const SHIPPO_ENV = { SHIPPO_TOKEN: 'shippo_live_fake_for_tests', SHIP_FROM_STREET: '1 Test St', SHIP_FROM_PHONE: '+12065550100' };
function mockShippo({ fail } = {}) {
  const calls = [];
  const fetch = async (url, init) => {
    const body = JSON.parse(init.body);
    calls.push({ url, body });
    if (fail?.(body)) return new Response(JSON.stringify({ detail: 'down' }), { status: 503 });
    const intl = body.address_to.country !== 'US';
    const rate = (id, amount) => ({ object_id: id, provider: 'USPS', currency: 'USD', amount, servicelevel: { name: intl ? 'Priority Mail International' : 'Ground Advantage' } });
    return new Response(JSON.stringify({ object_id: 'shp_test', rates: intl ? [rate('r3', '120.00'), rate('r4', '91.07')] : [rate('r1', '38.41'), rate('r2', '52.00')] }), { status: 200 });
  };
  return { calls, fetch };
}
const RATES = { us: { cost: '39.00' }, international: { cost: '92.00' } };
const shippoDeps = (extra = {}) => ({ fetch: mockShippo().fetch, ...extra });
const liveEnvShippo = (ids) => ({ ...liveEnv(ids), ...SHIPPO_ENV });

test('constants: 2 h hold, 5 min poll, publisher pubkey, Shippo shipping, bio approved', () => {
  assert.equal(MARKET_HOLD_TTL_MS, 2 * 60 * 60 * 1000);
  assert.equal(MARKET_POLL_INTERVAL_MS, 5 * 60 * 1000);
  assert.match(MARKET_PUBKEY, /^[0-9a-f]{64}$/);
  assert.equal(MARKET_SHIPPING.source, 'shippo');
  assert.equal('placeholder' in MARKET_SHIPPING, false);
  assert.equal(MARKET_SHIPPING.shopstrTier, 'international');
  assert.equal(MARKET_PROFILE_BIO_APPROVED, true);
  assert.ok(!INTERNATIONAL_COUNTRIES.includes('US') && !INTERNATIONAL_COUNTRIES.includes('RU') && INTERNATIONAL_COUNTRIES.includes('CA'));
});

test('mapper: one original carries both Shopstr and Plebeian tags', () => {
  const listing = mapListing(syrenka, { now: NOW, categories: ['Warsaw'], rates: RATES });
  assert.equal(listing.kind, 30402);
  assert.equal(listing.created_at, NOW);
  assert.deepEqual(one(listing, 'd'), ['d', 'tjm-warszawska-syrenka']);
  assert.deepEqual(one(listing, 'price'), ['price', '1200.00', 'USD']);      // site price, no uplift
  assert.deepEqual(one(listing, 'quantity'), ['quantity', '1']);               // Shopstr
  assert.deepEqual(one(listing, 'stock'), ['stock', '1']);                     // Plebeian / Gamma
  assert.deepEqual(one(listing, 'status'), ['status', 'active']);
  assert.deepEqual(one(listing, 'visibility'), ['visibility', 'on-sale']);
  assert.deepEqual(one(listing, 'type'), ['type', 'simple', 'physical']);
  assert.deepEqual(one(listing, 'image'), ['image', 'https://tjm.art/gallery-images/warszawska-syrenka-2026.jpg']);
  assert.deepEqual(one(listing, 'shipping'), ['shipping', 'Added Cost', '92.00', 'USD']);   // Shopstr: worldwide-safe
  assert.deepEqual(tag(listing, 'shipping_option').map((t) => t[1]), [         // Plebeian, per painting
    `30406:${MARKET_PUBKEY}:tjm-ship-us-warszawska-syrenka`, `30406:${MARKET_PUBKEY}:tjm-ship-intl-warszawska-syrenka`
  ]);
  assert.match(listing.content, /\$39\.00 within the United States, \$92\.00 worldwide/);
  assert.ok(tag(listing, 't').some((t) => t[1] === 'shopstr') && tag(listing, 't').some((t) => t[1] === 'warsaw'));
  assert.match(listing.content, /tjm\.art\/products\/warszawska-syrenka\//);
  assert.doesNotMatch(JSON.stringify(listing), /nsec|secret/i);
});

test('mapper: only TJ originals; Paul Murphy works, prints, books, commissions and not-for-sale are not listed', () => {
  const paul = products.find((p) => p.id === 'paul-landscape');
  assert.equal(ineligibleReason(paul), 'not-by-tj');
  assert.equal(mapListing(paul), null);
  assert.equal(ineligibleReason(products.find((p) => p.type === 'book')), 'not-an-original-painting');
  assert.equal(ineligibleReason(products.find((p) => p.type === 'commission')), 'not-an-original-painting');
  assert.equal(ineligibleReason(products.find((p) => p.id === 'private-study')), 'not-for-sale');
  assert.equal(ineligibleReason({ ...syrenka, editions: [] , listing: { status: 'inquiry' } }), 'not-for-sale');
});

test('mapper: price equals the site price in USD, uplift only if configured', () => {
  assert.equal(marketPrice(syrenka), '1200.00');
  assert.equal(marketPrice(syrenka, 1.1), '1320.00');
  assert.equal(marketPrice({ listing: { price: { amount: '10.00', currency: 'EUR' } } }), null);
});

test('mapper: stock states (available, hold, sold stays visible, unavailable hidden)', () => {
  assert.deepEqual(stockFor(syrenka), { quantity: 1, status: 'active', visibility: 'on-sale' });
  assert.deepEqual(stockFor(syrenka, 'reserved'), { quantity: 0, status: 'active', visibility: 'on-sale' });
  assert.deepEqual(stockFor(syrenka, 'sold'), { quantity: 0, status: 'sold', visibility: 'on-sale' });
  assert.equal(stockFor(syrenka, 'unavailable').visibility, 'hidden');
  const sold = mapListing(syrenka, { now: NOW, live: 'sold' });
  assert.deepEqual(one(sold, 'quantity'), ['quantity', '0']);
  assert.deepEqual(one(sold, 'stock'), ['stock', '0']);
  assert.deepEqual(one(sold, 'status'), ['status', 'sold']);
  assert.deepEqual(one(sold, 'visibility'), ['visibility', 'on-sale']);
});

test('shipping: quote-only is only a fallback when Shippo cannot quote or there is no parcel profile', () => {
  assert.deepEqual(shippingMode(syrenka, RATES), { quote: false, us: '39.00', international: '92.00' });
  // Framed and oversize works are no longer automatically quote-only: they get Shippo costs too.
  assert.equal(shippingMode({ ...syrenka, framing: 'Black frame', dimensions: { width: 60, height: 30, unit: 'in' } }, RATES).quote, false);
  assert.equal(shippingMode({ ...syrenka, checkout: undefined }, RATES).reason, 'no-parcel-profile');
  assert.equal(shippingMode(syrenka, { unavailable: 'shippo-no-rate' }).reason, 'shippo-no-rate');
  assert.equal(shippingMode(syrenka, undefined).reason, 'shippo-not-quoted');
  assert.equal(shippingMode(syrenka, { us: { cost: '39.00' } }).quote, true);   // no worldwide quote -> never underpay
  const quote = mapListing(syrenka, { now: NOW, rates: { unavailable: 'shippo-no-rate' } });
  assert.equal(tag(quote, 'shipping').length, 0);
  assert.equal(tag(quote, 'shipping_option').length, 0);
  assert.deepEqual(one(quote, 'shipping-note'), ['shipping-note', 'Contact for a shipping quote']);
  assert.match(quote.content, /contact me for a quote/i);
  assert.deepEqual(mapShippingOptions(syrenka, { now: NOW }), []);
});

test('shipping options: per-painting kind 30406 US and worldwide with the Shippo costs', () => {
  const [us, intl] = mapShippingOptions(syrenka, { now: NOW, rates: RATES });
  assert.equal(us.kind, 30406);
  assert.deepEqual(one(us, 'd'), ['d', 'tjm-ship-us-warszawska-syrenka']);
  assert.deepEqual(one(us, 'country'), ['country', 'US']);
  assert.deepEqual(one(us, 'price'), ['price', '39.00', 'USD']);
  assert.deepEqual(one(intl, 'd'), ['d', 'tjm-ship-intl-warszawska-syrenka']);
  assert.deepEqual(one(intl, 'price'), ['price', '92.00', 'USD']);
  assert.ok(one(intl, 'country').length > 150 && !one(intl, 'country').includes('US') && !one(intl, 'country').includes('KP'));
  assert.deepEqual(one(us, 'service'), ['service', 'standard']);
  assert.doesNotMatch(us.content + intl.content, /placeholder|flat rate/i);
});

test('Shippo quoter: checkout parcel profile, Miami + Sydney, cheapest rate rounded up, cached, never a label', async () => {
  assert.equal(marketCost('38.41'), '39.00');
  assert.equal(marketCost('39.00'), '39.00');
  assert.equal(marketCost('0'), null);
  const shippo = mockShippo();
  const store = memoryStore();
  const quote = makeShippoQuoter({ env: SHIPPO_ENV, store, now: NOW * 1000, fetchImpl: shippo.fetch });
  const rates = await quote(syrenka);
  assert.deepEqual([rates.us.cost, rates.international.cost], ['39.00', '92.00']);
  assert.deepEqual([rates.us.quoted, rates.international.quoted], ['38.41', '91.07']);
  assert.equal(shippo.calls.length, 2);
  assert.ok(shippo.calls.every((c) => c.url === 'https://api.goshippo.com/shipments/'));   // rate quotes only
  assert.ok(!shippo.calls.some((c) => /transactions/.test(c.url)));
  assert.deepEqual(shippo.calls.map((c) => c.body.address_to.zip), ['33131', '2000']);
  assert.deepEqual(shippo.calls[0].body.parcels[0], { length: '28', width: '4', height: '4', weight: '1.8125', distance_unit: 'in', mass_unit: 'lb' });
  assert.equal(shippo.calls[0].body.customs_declaration, undefined);
  assert.equal(shippo.calls[1].body.customs_declaration.items[0].tariff_number, '9701.91');
  // Cached: a second sync within the TTL makes no Shippo call; a price change re-quotes.
  await quote(syrenka);
  assert.equal(shippo.calls.length, 2);
  await quote({ ...syrenka, listing: { ...syrenka.listing, price: { amount: '1300.00', currency: 'USD' } } });
  assert.equal(shippo.calls.length, 4);
  const later = makeShippoQuoter({ env: SHIPPO_ENV, store, now: NOW * 1000 + MARKET_SHIPPING.cacheTtlMs + 1, fetchImpl: shippo.fetch });
  await later(syrenka);
  assert.equal(shippo.calls.length, 6);
});

test('Shippo quoter: falls back to quote-only when Shippo cannot quote', async () => {
  const noConfig = makeShippoQuoter({ env: {}, fetchImpl: () => assert.fail('no call without config') });
  assert.deepEqual(await noConfig(syrenka), { unavailable: 'shippo-not-configured' });
  assert.deepEqual(await noConfig({ ...syrenka, checkout: undefined }), { unavailable: 'no-parcel-profile' });
  const testToken = makeShippoQuoter({ env: { ...SHIPPO_ENV, SHIPPO_TOKEN: 'shippo_test_x' }, requireLiveToken: true, fetchImpl: () => assert.fail('no call') });
  assert.deepEqual(await testToken(syrenka), { unavailable: 'shippo-test-token' });
  const store = memoryStore();
  const down = makeShippoQuoter({ env: SHIPPO_ENV, store, fetchImpl: mockShippo({ fail: (b) => b.address_to.country !== 'US' }).fetch });
  assert.deepEqual(await down(syrenka), { unavailable: 'shippo-no-rate', tier: 'international' });
  assert.equal(store.data.size, 0);   // failures are not cached
  // Originals over $2,500 cannot ship internationally through checkout (AES filing), so they stay quote-only.
  const pricey = { ...syrenka, listing: { ...syrenka.listing, price: { amount: '3000.00', currency: 'USD' } } };
  assert.equal((await makeShippoQuoter({ env: SHIPPO_ENV, fetchImpl: mockShippo().fetch })(pricey)).unavailable, 'shippo-no-rate');
});

test('idempotency: fixed d tag, hash ignores timestamps, created_at is monotonic, published_at kept', async () => {
  const a = mapListing(syrenka, { now: NOW, rates: RATES });
  const b = mapListing(syrenka, { now: NOW + 500, publishedAt: NOW, rates: RATES });
  assert.deepEqual(one(a, 'd'), one(b, 'd'));
  assert.equal(await contentHash(a), await contentHash(b));
  assert.deepEqual(one(b, 'published_at'), ['published_at', String(NOW)]);
  const sold = mapListing(syrenka, { now: NOW, live: 'sold', rates: RATES });
  assert.notEqual(await contentHash(a), await contentHash(sold));
  // Clock stalls or goes backwards: the replacement still wins.
  assert.equal(mapListing(syrenka, { now: NOW - 100, prevCreatedAt: NOW }).created_at, NOW + 1);
  assert.equal(mapListing(syrenka, { now: NOW + 10, prevCreatedAt: NOW }).created_at, NOW + 10);
});

test('approved flag: default none approved, so nothing is planned or published', async () => {
  const settings = marketSettings({ MARKET_PUBLISH_ENABLED: 'true', MARKET_MODE: 'publish' });
  assert.equal(settings.approved.size, 0);
  const plan = await planMarket({ settings, products, now: NOW * 1000 });
  assert.deepEqual(plan.items, []);
  assert.deepEqual(plan.shipping, []);
  const signer = ephemeral();
  const relay = fakeRelay();
  const result = await runMarket({
    env: { MARKET_PUBLISH_ENABLED: 'true', MARKET_MODE: 'publish', ...SHIPPO_ENV }, products, now: NOW * 1000,
    deps: shippoDeps({ store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish })
  });
  assert.equal(result.published, 0);
  assert.equal(relay.events.length, 0);
  assert.equal(signer.reads(), 0);
});

test('approved flag: only the approved ids publish; ineligible approved ids are skipped', async () => {
  const signer = ephemeral();
  const relay = fakeRelay();
  const paul = products.find((p) => p.id === 'paul-landscape');
  const result = await runMarket({
    env: liveEnvShippo(['warszawska-syrenka', paul.id]), products, now: NOW * 1000,
    deps: shippoDeps({ store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish })
  });
  assert.equal(result.published, 3);                      // 2 shipping options + 1 listing
  assert.deepEqual(relay.events.map((e) => e.kind), [30406, 30406, 30402]);
  assert.ok(relay.events.every((e) => verifyEvent(e) && e.pubkey === signer.pubkey));
  assert.equal(result.plan.items.find((i) => i.productId === paul.id).action, 'skip-ineligible');
  assert.deepEqual(one(relay.events[2], 'd'), ['d', 'tjm-warszawska-syrenka']);
  assert.deepEqual(one(relay.events[0], 'price'), ['price', '39.00', 'USD']);
  assert.deepEqual(one(relay.events[2], 'shipping'), ['shipping', 'Added Cost', '92.00', 'USD']);
});

test('kill switch: master switch off or mode not publish means dry-run, key never read, nothing sent', async () => {
  for (const env of [
    { MARKET_MODE: 'publish', MARKET_APPROVED_IDS: 'warszawska-syrenka' },
    { MARKET_PUBLISH_ENABLED: 'false', MARKET_MODE: 'publish', MARKET_APPROVED_IDS: 'warszawska-syrenka' },
    { MARKET_PUBLISH_ENABLED: 'true', MARKET_APPROVED_IDS: 'warszawska-syrenka' },
    { MARKET_PUBLISH_ENABLED: 'true', MARKET_MODE: 'dry-run', MARKET_APPROVED_IDS: 'warszawska-syrenka' },
    {}
  ]) {
    const signer = ephemeral();
    const relay = fakeRelay();
    const store = memoryStore();
    const result = await runMarket({
      env: { ...env, ...SHIPPO_ENV }, products, now: NOW * 1000,
      deps: shippoDeps({ store, signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish })
    });
    assert.equal(result.mode, 'dry-run');
    assert.equal(relay.events.length, 0);
    assert.equal(signer.reads(), 0);
    assert.equal(store.data.size, 0);
  }
});

test('no Shippo config: live publishing still works but every listing is quote-only (no costs, no 30406)', async () => {
  const signer = ephemeral();
  const relay = fakeRelay();
  const result = await runMarket({
    env: liveEnv(['warszawska-syrenka']), products, now: NOW * 1000,
    deps: { store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish, fetch: () => assert.fail('no Shippo call') }
  });
  assert.equal(result.blocked, undefined);
  assert.deepEqual(relay.events.map((e) => e.kind), [30402]);
  assert.equal(tag(relay.events[0], 'shipping').length, 0);
  assert.deepEqual(result.plan.items[0].shippingCosts, { quoteOnly: 'shippo-not-configured' });
});

test('dry-run prints unsigned events and never touches the key', async () => {
  let reads = 0;
  const getKey = async () => { reads += 1; throw new Error('key must not be read in dry-run'); };
  const result = await runMarket({
    env: { ...SHIPPO_ENV }, products, now: NOW * 1000, previewIds: ['warszawska-syrenka'],
    deps: shippoDeps({ signTemplate: makeSigner({ getKey }) })
  });
  assert.equal(reads, 0);
  assert.equal(result.mode, 'dry-run');
  assert.deepEqual(result.unsigned.map((e) => e.kind), [30406, 30406, 30402]);
  assert.ok(result.unsigned.every((e) => !('id' in e) && !('sig' in e) && !('pubkey' in e)));
  assert.ok(result.plan.items.every((i) => i.action === 'preview-only'));
  const profile = await runProfile({ env: {}, allowBlank: true, now: NOW * 1000, deps: { signTemplate: makeSigner({ getKey }) } });
  assert.equal(profile.status, 'dry-run');
  assert.equal(reads, 0);
});

test('live run is idempotent: a second run with unchanged content sends nothing; a change replaces', async () => {
  const signer = ephemeral();
  const relay = fakeRelay();
  const store = memoryStore();
  const deps = shippoDeps({ store, signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish });
  const env = liveEnvShippo(['warszawska-syrenka']);
  await runMarket({ env, products, now: NOW * 1000, deps });
  assert.equal(relay.events.length, 3);
  const second = await runMarket({ env, products, now: (NOW + 600) * 1000, deps });
  assert.equal(second.published, 0);
  assert.equal(relay.events.length, 3);
  // Sale detected: the same d tag is replaced by a newer event, published_at preserved.
  const third = await runMarket({ env, products, live: { 'warszawska-syrenka': 'sold' }, now: (NOW + 1200) * 1000, deps });
  assert.equal(third.published, 1);
  const [first, replacement] = relay.events.filter((e) => e.kind === 30402);
  assert.deepEqual(one(replacement, 'd'), one(first, 'd'));
  assert.ok(replacement.created_at > first.created_at);
  assert.deepEqual(one(replacement, 'status'), ['status', 'sold']);
  assert.deepEqual(one(replacement, 'published_at'), one(first, 'published_at'));
});

test('retry reuses the persisted signed event (same id) after a relay failure', async () => {
  const signer = ephemeral();
  let fail = true;
  const sent = [];
  const publish = async (event) => { if (fail) throw new Error('all relays down'); sent.push(event); return 'wss://fake.relay'; };
  const store = memoryStore();
  const deps = shippoDeps({ store, signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish });
  const env = liveEnvShippo(['warszawska-syrenka']);
  await runMarket({ env, products, now: NOW * 1000, deps });
  assert.equal(sent.length, 0);
  const pending = store.data.get('market:pending:warszawska-syrenka') || store.data.get('market:pending:tjm-ship-us-warszawska-syrenka');
  assert.ok(pending, 'signed event persisted before network I/O');
  fail = false;
  await runMarket({ env, products, now: (NOW + 300) * 1000, deps });
  const listing = sent.find((e) => e.kind === 30402);
  assert.equal(listing.created_at, NOW);
  assert.equal(sent.length, 3);
});

test('signer: kind allow-list, pubkey check, profile needs approval', async () => {
  const signer = ephemeral();
  const sign = makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey });
  await assert.rejects(sign({ kind: 1, created_at: NOW, tags: [], content: 'x' }), /not allowed/);
  await assert.rejects(sign({ kind: 5, created_at: NOW, tags: [], content: '' }), /not allowed/);
  await assert.rejects(sign({ kind: 0, created_at: NOW, tags: [], content: '{}' }), /not allowed/);
  assert.equal(signer.reads(), 0);
  const wrong = makeSigner({ getKey: signer.getKey, expectedPubkey: MARKET_PUBKEY });
  await assert.rejects(wrong(mapShippingOptions(syrenka, { now: NOW, rates: RATES })[0]), /does not match/);
  const withProfile = makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey, profileApproved: true });
  assert.equal((await withProfile(buildProfileTemplate({ current: {}, now: NOW }))).kind, 0);
});

test('profile: merges into the current profile, lud16 tj@tjm.art, no prices or LLC', () => {
  const current = { name: 'old', picture: 'https://example.com/p.png', banner: 'https://example.com/b.png', lud16: 'old@example.com', custom: 1 };
  const template = buildProfileTemplate({ current, now: NOW, prevCreatedAt: NOW + 5 });
  assert.equal(template.kind, 0);
  assert.equal(template.created_at, NOW + 6);
  assert.deepEqual(template.tags, []);
  const content = JSON.parse(template.content);
  assert.equal(content.lud16, 'tj@tjm.art');
  assert.equal(content.name, 'TJ Murphy');
  assert.equal(content.picture, current.picture);       // unmanaged fields survive
  assert.equal(content.banner, current.banner);
  assert.equal(content.custom, 1);
  assert.match(content.about, /Vermillion Aurora Productions/);
  assert.doesNotMatch(MARKET_PROFILE.about, /LLC|\$|\d{3}/);
  assert.equal(buildProfileTemplate({ now: NOW }), null);   // never overwrite blind
});

test('profile: signs only with master switch, publish mode and MARKET_PROFILE_APPROVED', async () => {
  const current = { picture: 'https://example.com/p.png' };
  for (const [env, status] of [
    [{ MARKET_PUBLISH_ENABLED: 'true', MARKET_MODE: 'publish' }, 'profile-not-approved'],
    [{ MARKET_PROFILE_APPROVED: 'true' }, 'dry-run']
  ]) {
    const signer = ephemeral();
    const relay = fakeRelay();
    const result = await runProfile({ env, current, now: NOW * 1000, deps: { store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey, profileApproved: true }), publish: relay.publish } });
    assert.equal(result.status, status);
    assert.equal(relay.events.length, 0);
    assert.equal(signer.reads(), 0);
  }
  const signer = ephemeral();
  const relay = fakeRelay();
  const deps = { store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey, profileApproved: true }), publish: relay.publish };
  const env = { MARKET_PUBLISH_ENABLED: 'true', MARKET_MODE: 'publish', MARKET_PROFILE_APPROVED: 'true' };
  assert.equal((await runProfile({ env, current, now: NOW * 1000, deps })).status, 'published');
  assert.equal((await runProfile({ env, current, now: (NOW + 60) * 1000, deps })).status, 'unchanged');
  assert.equal(relay.events.length, 1);
  assert.equal(JSON.parse(relay.events[0].content).lud16, 'tj@tjm.art');
});
