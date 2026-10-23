import test from 'node:test';
import assert from 'node:assert/strict';
import { generateSecretKey, getPublicKey, verifyEvent } from 'nostr-tools/pure';
import {
  MARKET_HOLD_TTL_MS, MARKET_POLL_INTERVAL_MS, MARKET_PUBKEY, MARKET_SHIPPING, MARKET_PROFILE, INTERNATIONAL_COUNTRIES
} from './market-config.mjs';
import {
  buildProfileTemplate, contentHash, ineligibleReason, mapListing, mapShippingOptions, marketPrice, shippingMode, stockFor
} from './market-listing.mjs';
import { makeSigner, marketSettings, planMarket, runMarket, runProfile } from './market-run.mjs';

const NOW = 1_792_800_000;
// Small fixture in the catalog's shape (the real catalog validates files relative to the repo root, not this package).
const base = {
  type: 'painting', artist: 'TJ Murphy', medium: 'Watercolor pastel', surface: 'Arches Coldpress Paper', year: 2026, framing: 'Unframed',
  dimensions: { width: 100, height: 70, unit: 'cm' },
  checkout: { mode: 'integrated', shipping: { length: 28, width: 4, height: 4, weight: 1.8125, packaging: 'tube' } }
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
const realRates = { ...MARKET_SHIPPING, placeholder: false };

test('constants: 2 h hold, 5 min poll, publisher pubkey, placeholder shipping flagged', () => {
  assert.equal(MARKET_HOLD_TTL_MS, 2 * 60 * 60 * 1000);
  assert.equal(MARKET_POLL_INTERVAL_MS, 5 * 60 * 1000);
  assert.match(MARKET_PUBKEY, /^[0-9a-f]{64}$/);
  assert.equal(MARKET_SHIPPING.placeholder, true);
  assert.ok(!INTERNATIONAL_COUNTRIES.includes('US') && !INTERNATIONAL_COUNTRIES.includes('RU') && INTERNATIONAL_COUNTRIES.includes('CA'));
});

test('mapper: one original carries both Shopstr and Plebeian tags', () => {
  const listing = mapListing(syrenka, { now: NOW, categories: ['Warsaw'] });
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
  assert.equal(one(listing, 'shipping')[1], 'Added Cost');                     // Shopstr
  assert.deepEqual(tag(listing, 'shipping_option').map((t) => t[1]), [         // Plebeian
    `30406:${MARKET_PUBKEY}:tjm-ship-us`, `30406:${MARKET_PUBKEY}:tjm-ship-intl`
  ]);
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

test('mapper: framed or oversize works get contact-for-quote instead of a cost', () => {
  assert.equal(shippingMode(syrenka).quote, false);
  assert.deepEqual(shippingMode({ ...syrenka, framing: 'Black frame' }), { quote: true, reason: 'framed' });
  assert.deepEqual(shippingMode({ ...syrenka, dimensions: { width: 60, height: 30, unit: 'in' } }), { quote: true, reason: 'oversize' });
  assert.equal(shippingMode({ ...syrenka, checkout: undefined }).reason, 'no-parcel-profile');
  const quote = mapListing({ ...syrenka, framing: 'Black frame' }, { now: NOW });
  assert.equal(tag(quote, 'shipping').length, 0);
  assert.equal(tag(quote, 'shipping_option').length, 0);
  assert.deepEqual(one(quote, 'shipping-note'), ['shipping-note', 'Contact for a shipping quote']);
  assert.match(quote.content, /contact me for a quote/i);
});

test('shipping options: kind 30406 US and worldwide, buyer pays, placeholder costs', () => {
  const [us, intl] = mapShippingOptions({ now: NOW });
  assert.equal(us.kind, 30406);
  assert.deepEqual(one(us, 'd'), ['d', 'tjm-ship-us']);
  assert.deepEqual(one(us, 'country'), ['country', 'US']);
  assert.deepEqual(one(us, 'price'), ['price', MARKET_SHIPPING.us.cost, 'USD']);
  assert.deepEqual(one(intl, 'd'), ['d', 'tjm-ship-intl']);
  assert.ok(one(intl, 'country').length > 150 && !one(intl, 'country').includes('US') && !one(intl, 'country').includes('KP'));
  assert.deepEqual(one(us, 'service'), ['service', 'standard']);
});

test('idempotency: fixed d tag, hash ignores timestamps, created_at is monotonic, published_at kept', async () => {
  const a = mapListing(syrenka, { now: NOW });
  const b = mapListing(syrenka, { now: NOW + 500, publishedAt: NOW });
  assert.deepEqual(one(a, 'd'), one(b, 'd'));
  assert.equal(await contentHash(a), await contentHash(b));
  assert.deepEqual(one(b, 'published_at'), ['published_at', String(NOW)]);
  const sold = mapListing(syrenka, { now: NOW, live: 'sold' });
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
    env: { MARKET_PUBLISH_ENABLED: 'true', MARKET_MODE: 'publish' }, products, now: NOW * 1000,
    deps: { store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish },
    shippingConfig: realRates
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
    env: liveEnv(['warszawska-syrenka', paul.id]), products, now: NOW * 1000, shippingConfig: realRates,
    deps: { store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish }
  });
  assert.equal(result.published, 3);                      // 2 shipping options + 1 listing
  assert.deepEqual(relay.events.map((e) => e.kind), [30406, 30406, 30402]);
  assert.ok(relay.events.every((e) => verifyEvent(e) && e.pubkey === signer.pubkey));
  assert.equal(result.plan.items.find((i) => i.productId === paul.id).action, 'skip-ineligible');
  assert.deepEqual(one(relay.events[2], 'd'), ['d', 'tjm-warszawska-syrenka']);
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
      env, products, now: NOW * 1000, shippingConfig: realRates,
      deps: { store, signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish }
    });
    assert.equal(result.mode, 'dry-run');
    assert.equal(relay.events.length, 0);
    assert.equal(signer.reads(), 0);
    assert.equal(store.data.size, 0);
  }
});

test('placeholder shipping blocks live publishing even with every switch on', async () => {
  const signer = ephemeral();
  const relay = fakeRelay();
  const result = await runMarket({
    env: liveEnv(['warszawska-syrenka']), products, now: NOW * 1000,
    deps: { store: memoryStore(), signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish }
  });
  assert.equal(result.blocked, 'placeholder-shipping');
  assert.equal(relay.events.length, 0);
  assert.equal(signer.reads(), 0);
});

test('dry-run prints unsigned events and never touches the key', async () => {
  let reads = 0;
  const getKey = async () => { reads += 1; throw new Error('key must not be read in dry-run'); };
  const result = await runMarket({
    env: {}, products, now: NOW * 1000, previewIds: ['warszawska-syrenka'],
    deps: { signTemplate: makeSigner({ getKey }) }
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
  const deps = { store, signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish: relay.publish };
  const env = liveEnv(['warszawska-syrenka']);
  await runMarket({ env, products, now: NOW * 1000, shippingConfig: realRates, deps });
  assert.equal(relay.events.length, 3);
  const second = await runMarket({ env, products, now: (NOW + 600) * 1000, shippingConfig: realRates, deps });
  assert.equal(second.published, 0);
  assert.equal(relay.events.length, 3);
  // Sale detected: the same d tag is replaced by a newer event, published_at preserved.
  const third = await runMarket({ env, products, live: { 'warszawska-syrenka': 'sold' }, now: (NOW + 1200) * 1000, shippingConfig: realRates, deps });
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
  const deps = { store, signTemplate: makeSigner({ getKey: signer.getKey, expectedPubkey: signer.pubkey }), publish };
  const env = liveEnv(['warszawska-syrenka']);
  await runMarket({ env, products, now: NOW * 1000, shippingConfig: realRates, deps });
  assert.equal(sent.length, 0);
  const pending = store.data.get('market:pending:warszawska-syrenka') || store.data.get('market:pending:tjm-ship-us');
  assert.ok(pending, 'signed event persisted before network I/O');
  fail = false;
  await runMarket({ env, products, now: (NOW + 300) * 1000, shippingConfig: realRates, deps });
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
  await assert.rejects(wrong(mapShippingOptions({ now: NOW })[0]), /does not match/);
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
