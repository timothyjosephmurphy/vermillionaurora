import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import stickers from '../catalog/printful-stickers.json' with { type: 'json' };
import { stickerOffer } from '../catalog/printful-stickers.mjs';
import { printfulDraftBody, stickerCheckout, stickerFulfillment, PRINTFUL_ORDERS_URL } from './printful-stickers.mjs';

const products = JSON.parse(fs.readFileSync('catalog/products.json', 'utf8'));
const product = (id) => products.find((item) => item.id === id);
const orderBody = {
  productId: 'painting-shoreline-at-dusk',
  variantId: '3x3',
  quantity: 1,
  recipient: { name: 'A Collector', email: 'Collector@Example.com', address1: '123 Test St', city: 'Seattle', state: 'WA', zip: '98122', country: 'US' },
};
const post = (body, url = 'https://tjm.art/checkout/stickers/order') => new Request(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

test('starter paintings map to the Dawn title and public kiss-cut variants, with card-back only a stub', () => {
  assert.equal(product('painting-shoreline-at-dusk').title, 'El Zonte at Dawn');
  assert.equal(product('el-zonte-before-dawn').title, 'El Zonte Before Dawn');
  assert.equal(stickerOffer('el-zonte-before-dawn'), null);
  assert.equal(stickerOffer('card-back'), null);
  assert.equal(stickers.paintings['card-back'].stub, true);
  assert.equal(stickers.paintings['card-back'].enabled, false);
  assert.equal(stickers.product.catalogProductId, 358);
  assert.equal(stickers.product.printfulTemplateId, null);
  for (const id of ['painting-shoreline-at-dusk', 'honeybadger-and-cub-with-genesis-block', 'warszawska-syrenka']) {
    const painting = product(id);
    const offer = stickerOffer(id);
    assert.equal(offer.title, painting.title);
    assert.equal(offer.path, `/products/${painting.slug}/`);
    assert.equal(stickers.paintings[id].fileReady, false);
    assert.equal(stickers.paintings[id].printfulTemplateId, null);
    assert.deepEqual(offer.variants.map((variant) => variant.catalogVariantId), [10163, 10164, 10165]);
  }
  assert.equal(stickers.variants['15x3_75'].catalogVariantId, 16362);
  assert.equal(stickers.variants['15x3_75'].offered, false);
  assert.equal(stickers.paintings['painting-shoreline-at-dusk'].idNote.includes('el-zonte-before-dawn'), true);
});

test('missing token, live, and confirm flags never call Printful', async () => {
  const calls = [];
  const fetch = async () => { calls.push('printful'); return Response.json({}); };
  for (const env of [{}, { PRINTFUL_API_TOKEN: 'test-token' }, { PRINTFUL_API_TOKEN: 'test-token', PRINTFUL_STICKERS_MODE: 'live' }, { PRINTFUL_API_TOKEN: 'test-token', PRINTFUL_STICKERS_MODE: 'confirm' }, { PRINTFUL_STICKERS_MODE: 'draft' }]) {
    assert.equal(stickerFulfillment(env).mode, env.PRINTFUL_STICKERS_MODE === 'draft' && env.PRINTFUL_API_TOKEN ? 'draft' : 'mock');
    const response = await stickerCheckout(post(orderBody), env, { fetch });
    assert.equal(response.status, 200);
    const body = await response.json();
    assert.equal(body.mode, 'mock');
    assert.equal(body.charged, false);
    assert.equal(body.confirmed, false);
    assert.equal(body.ordersOpen, false);
    assert.match(body.previewId, /^tjm-sticker-/);
  }
  const blocked = await stickerCheckout(post({ ...orderBody, confirm: true }), { PRINTFUL_API_TOKEN: 'test-token', PRINTFUL_STICKERS_MODE: 'draft' }, { fetch });
  assert.equal(blocked.status, 400);
  const confirm = await stickerCheckout(new Request('https://tjm.art/checkout/stickers/order/confirm', { method: 'POST' }), { PRINTFUL_API_TOKEN: 'test-token', PRINTFUL_STICKERS_MODE: 'draft' }, { fetch });
  assert.equal(confirm.status, 404);
  assert.deepEqual(calls, []);
});

test('a draft flag still does not call Printful until the print file is approved', async () => {
  const fetch = async () => { throw new Error('Printful was called'); };
  const response = await stickerCheckout(post(orderBody), { PRINTFUL_API_TOKEN: 'test-token', PRINTFUL_STICKERS_MODE: 'draft' }, { fetch });
  assert.equal(response.status, 409);
  const body = await response.json();
  assert.equal(body.fileReady, false);
  assert.equal(body.charged, false);
  assert.equal(body.confirmed, false);
});

test('an approved file can build one unconfirmed US draft and no other Printful URL', async () => {
  const catalog = structuredClone(stickers);
  catalog.paintings['painting-shoreline-at-dusk'].fileReady = true;
  const calls = [];
  const fetch = async (url, init) => {
    calls.push({ url, init, body: JSON.parse(init.body) });
    return Response.json({ data: { id: 987, status: 'draft' } });
  };
  const response = await stickerCheckout(post(orderBody), { PRINTFUL_API_TOKEN: 'test-token', PRINTFUL_STICKERS_MODE: 'draft', PRINTFUL_STORE_ID: '4242' }, { fetch, catalog });
  assert.equal(response.status, 200);
  const body = await response.json();
  assert.equal(body.mode, 'draft');
  assert.equal(body.printfulOrderId, 987);
  assert.equal(body.printfulStatus, 'draft');
  assert.equal(body.charged, false);
  assert.equal(body.confirmed, false);
  assert.equal(JSON.stringify(body).includes('test-token'), false);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, PRINTFUL_ORDERS_URL);
  assert.equal(calls[0].init.method, 'POST');
  assert.equal(calls[0].init.headers.Authorization, 'Bearer test-token');
  assert.equal(calls[0].init.headers['X-PF-Store-Id'], '4242');
  assert.equal(calls[0].body.shipping, 'STANDARD');
  assert.equal(calls[0].body.recipient.country_code, 'US');
  assert.equal(calls[0].body.recipient.email, 'collector@example.com');
  assert.equal(calls[0].body.customization.packing_slip.store_name, 'TJ Murphy');
  assert.equal(calls[0].body.order_items.length, 1);
  assert.equal(calls[0].body.order_items[0].catalog_variant_id, 10163);
  assert.equal(calls[0].body.order_items[0].source, 'catalog');
  assert.equal(calls[0].body.order_items[0].placements[0].placement, 'default');
  assert.equal(calls[0].body.order_items[0].placements[0].technique, 'digital');
  assert.equal(calls[0].body.order_items[0].placements[0].layers[0].url, 'https://tjm.art/gallery-images/el-zonte-at-dawn-2026.jpg');
  assert.equal(calls[0].body.confirm, undefined);
  assert.equal(String(calls[0].url).includes('confirm'), false);
});

test('checkout rejects addresses outside the US sticker set', async () => {
  const fetch = async () => { throw new Error('Printful was called'); };
  for (const recipient of [
    { country: 'CA', state: 'WA' },
    { country: 'US', state: 'ON' },
    { country: 'US', state: 'WA', zip: 'ABCDE' },
  ]) {
    const response = await stickerCheckout(post({ ...orderBody, recipient: { ...orderBody.recipient, ...recipient } }), {}, { fetch });
    assert.equal(response.status, 400, JSON.stringify(recipient));
  }
  const other = await stickerCheckout(post({ ...orderBody, productId: 'el-zonte-before-dawn' }), {}, { fetch });
  assert.equal(other.status, 400);
  const card = await stickerCheckout(post({ ...orderBody, productId: 'card-back' }), {}, { fetch });
  assert.equal(card.status, 400);
});

test('public catalog lists the three starter paintings and no supplier prices or token', async () => {
  const response = await stickerCheckout(new Request('https://tjm.art/checkout/stickers/catalog'));
  const body = await response.json();
  assert.deepEqual(body.paintings.map((painting) => painting.id), ['painting-shoreline-at-dusk', 'honeybadger-and-cub-with-genesis-block', 'warszawska-syrenka']);
  assert.equal(body.ordersOpen, false);
  assert.equal(body.product.catalogProductId, 358);
  assert.equal(body.product.printfulTemplateId, null);
  assert.equal(JSON.stringify(body).includes('2.34'), false);
  assert.equal(JSON.stringify(body).includes('PRINTFUL_API_TOKEN'), false);
});

test('Worker config keeps the sticker flag in mock and does not store a Printful token', () => {
  for (const file of ['cloudflare/wrangler.jsonc', 'cloudflare/wrangler.sandbox.jsonc']) {
    const config = JSON.parse(fs.readFileSync(file, 'utf8'));
    assert.equal(config.vars.PRINTFUL_STICKERS_MODE, 'mock');
    assert.equal(Object.hasOwn(config.vars, 'PRINTFUL_API_TOKEN'), false);
    assert.equal(Object.hasOwn(config.vars, 'PRINTFUL_STORE_ID'), false);
  }
  const source = fs.readFileSync('cloudflare/printful-stickers.mjs', 'utf8') + fs.readFileSync('catalog/printful-stickers.json', 'utf8');
  assert.equal(/Bearer [A-Za-z0-9_-]{20,}/.test(source), false);
  const draft = printfulDraftBody({
    externalId: 'tjm-sticker-test',
    productId: 'warszawska-syrenka',
    painting: stickers.paintings['warszawska-syrenka'],
    variant: { id: '4x4', catalogVariantId: 10164 },
    quantity: 2,
    recipient: orderBody.recipient,
  });
  assert.equal(draft.order_items[0].catalog_variant_id, 10164);
  assert.equal(draft.order_items[0].quantity, 2);
});

test('the checkout Worker routes sticker orders to the mock-safe handler', () => {
  const source = fs.readFileSync('cloudflare/commission-worker.js', 'utf8');
  assert.match(source, /import \{stickerCheckout\} from '\.\/printful-stickers\.mjs'/);
  assert.match(source, /path\.startsWith\('\/checkout\/stickers\/'\)\) return stickerCheckout\(request,env\)/);
  assert.equal(source.includes('/v2/orders/') && source.includes('confirm'), false);
});
