import {env} from 'cloudflare:workers';
import {runInDurableObject} from 'cloudflare:test';
import {it, expect, afterEach, vi} from 'vitest';
import {cartItems, catalogVersion, keyHash} from '../cart-policy.mjs';
import {priceCart} from '../checkout-pricing.mjs';
import {books} from '../checkout-catalog.mjs';
import {isDor, dorReply} from './dor-mock.mjs';

const KEY = 'Basic dGVzdC1rZXk=';
const slug = 'watercolor-landscapes';
const address = {name:'Test Buyer', street1:'123 Main St', street2:'', city:'Seattle', state:'WA', zip:'98122', country:'US'};
const square = {
  RPI_API_KEY:KEY, QBO_SYNC_ENABLED:'false', CHECKOUT_MODE:'sandbox', CART_CHECKOUT_ENABLED:'true',
  SQUARE_CHECKOUT_ENABLED:'true', SQUARE_MODE:'sandbox', SQUARE_CHECKOUT_ALL:'true',
  SQUARE_ACCESS_TOKEN:'fake', SQUARE_APPLICATION_ID:'APP', SQUARE_LOCATION_ID:'LOCATION',
  SQUARE_WEBHOOK_SIGNATURE_KEY:'fake', SQUARE_WEBHOOK_URL:'https://worker/checkout/square/webhook'
};

afterEach(() => vi.unstubAllGlobals());

it('quotes each book at $40 plus RPI shipping and places one mocked order after payment', async () => {
  const calls = [];
  let created = false;
  vi.stubGlobal('fetch', vi.fn(async (input, init = {}) => {
    const url = new URL(input), body = typeof init.body === 'string' && init.body.startsWith('{') ? JSON.parse(init.body) : undefined;
    calls.push({host:url.hostname, path:url.pathname, method:init.method || 'GET'});
    if (url.hostname === 'open.api.rpiprint.com' && url.pathname === '/orders/shipping/estimate') {
      expect(init.headers.Authorization).toBe(KEY);
      return Response.json([{methodClassification:'standard', methodName:'Standard', price:6.99, currency:'USD'}]);
    }
    if (url.hostname === 'open.api.rpiprint.com' && url.pathname === '/orders/create') {
      expect(created).toBe(false);
      created = true;
      expect(body.customerOrderId).toMatch(/^[0-9a-f-]{36}$/);
      expect(body.orderItems).toEqual([{
        sku:books[slug].sku, quantity:1, retailPrice:'40.00', itemDescription:books[slug].title,
        product:{pageCount:books[slug].pageCount, coverUrl:books[slug].coverUrl, gutsUrl:books[slug].gutsUrl}
      }]);
      return Response.json({customerOrderId:body.customerOrderId, statusCode:201, statusDescription:'Order received'}, {status:201});
    }
    if (url.hostname === 'open.api.rpiprint.com' && url.pathname.startsWith('/orders/')) {
      if (!created) return Response.json({errorDescription:'Resource not found'}, {status:404});
      return Response.json({order:{customerOrderId:url.pathname.split('/').at(-1), status:'RECEIVED', orderPublicId:'ord_mock'}});
    }
    if (url.hostname === 'connect.squareupsandbox.com' && url.pathname === '/v2/payments') {
      return Response.json({payment:{id:'SQUAREPAY', status:'COMPLETED', location_id:body.location_id, reference_id:body.reference_id, amount_money:body.amount_money, created_at:'2026-11-11T00:00:00Z', updated_at:'2026-11-11T00:00:00Z'}});
    }
    if (isDor(url)) return dorReply();
    if (url.hostname === 'oauth2.googleapis.com') return Response.json({access_token:'FAKE'});
    if (url.hostname === 'gmail.googleapis.com') return Response.json({id:'EMAIL'});
    throw Error(`Unmocked external request ${url.origin}${url.pathname}`);
  }));

  for (const id of Object.keys(books)) {
    const priced = await priceCart({RPI_API_KEY:KEY}, cartItems([{id, quantity:1}]), address, 'buyer@example.test');
    expect(priced.base).toBe('40.00');
    expect(priced.shipping).toBe('6.99');
    expect(priced.bookQuote.classification).toBe('standard');
    expect(Number(priced.total)).toBeGreaterThan(40);
    expect(priced.items[0]).toMatchObject({id, type:'book', amount:'40.00', quantity:1, sku:books[id].sku});
  }
  expect(calls.filter(call => call.path === '/orders/create')).toHaveLength(0);
  expect(calls.filter(call => call.path === '/orders/shipping/estimate')).toHaveLength(3);

  const items = cartItems([{id:slug, quantity:1}]);
  const priced = await priceCart({RPI_API_KEY:KEY}, items, address, 'buyer@example.test');
  expect(priced.catalogVersion).toBe(catalogVersion);
  const id = crypto.randomUUID(), order = env.CART_ORDERS.getByName(id);
  await runInDurableObject(order, instance => { instance.env = {...instance.env, ...square}; });
  await order.createQuote(id, await keyHash('a'.repeat(64)), priced, ['square']);
  const started = await order.start('square', {sourceId:'cnon:test-card'});
  expect(started.status).toBe('paid');
  expect((await env.PAINTING_STOCK.getByName(slug).order())).toBeNull();
  await order.refresh();
  const saved = await runInDurableObject(order, instance => instance.read());
  expect(saved.bookJob.status).toBe('in-production');
  expect(saved.bookJob.customerOrderId).toBe(id);
  expect(saved.bookJob.providerOrderId).toBe('ord_mock');
  expect(calls.filter(call => call.path === '/orders/create')).toHaveLength(1);
  await order.refresh();
  expect(calls.filter(call => call.path === '/orders/create')).toHaveLength(1);
  expect(calls.some(call => String(call.path).includes(KEY))).toBe(false);
});
