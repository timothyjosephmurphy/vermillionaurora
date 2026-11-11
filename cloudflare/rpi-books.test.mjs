import test from 'node:test';
import assert from 'node:assert/strict';
import {books} from './checkout-catalog.mjs';
import {cartItems, paymentMethods} from './cart-policy.mjs';
import {quoteBookShipping, newRpiBookJob, fulfillRpiBooks, rpiDestination, selectBookShipping} from './rpi-books.mjs';

const KEY = 'Basic dGVzdC1rZXk=';
const address = {name:'Test Buyer', street1:'123 Main St', street2:'', city:'Seattle', state:'WA', zip:'98122', country:'US'};
const slugs = ['watercolor-landscapes', 'watercolor-portraits', 'reflections-on-time'];
const proof = {
  'watercolor-landscapes': {sku:'VA-LANDSCAPES-8511-HC', pageCount:76, coverUrl:'https://img.tjm.art/print-books/rpi-161/Watercolor-Landscapes-cover-wrap-dc2a2ade829d.pdf', gutsUrl:'https://img.tjm.art/print-books/rpi-161/Landscapes-interior-76pp-bleed-7b17e9f177d7.pdf'},
  'watercolor-portraits': {sku:'VA-PORTRAITS-8511-HC', pageCount:80, coverUrl:'https://img.tjm.art/print-books/rpi-161/Watercolor-Portraits-cover-wrap-76644f357941.pdf', gutsUrl:'https://img.tjm.art/print-books/rpi-161/Portraits-interior-80pp-bleed-76113b653d34.pdf'},
  'reflections-on-time': {sku:'VA-REFLECTIONS-6X9-SC', pageCount:36, coverUrl:'https://img.tjm.art/print-books/rpi-161/Reflections-on-Time-front-cover-15ee187ffed4.pdf', gutsUrl:'https://img.tjm.art/print-books/rpi-161/Reflections-on-Time-interior-36pp-bleed-8a80a27e52a6.pdf'}
};

test('the three approved books are $40 with the proof-order files', () => {
  assert.deepEqual(Object.keys(books).sort(), [...slugs].sort());
  for (const id of slugs) {
    assert.equal(books[id].amount, '40.00');
    assert.equal(books[id].sku, proof[id].sku);
    assert.equal(books[id].pageCount, proof[id].pageCount);
    assert.equal(books[id].coverUrl, proof[id].coverUrl);
    assert.equal(books[id].gutsUrl, proof[id].gutsUrl);
  }
});

test('book shipping prefers standard and never treats a zero price as free', () => {
  assert.deepEqual(selectBookShipping([
    {methodClassification:'expedited', price:36.99, methodName:'Expedited'},
    {methodClassification:'standard', price:6.99, methodName:'Standard'}
  ]), {classification:'standard', shipping:'6.99', service:'Standard', carrier:'RPI'});
  assert.equal(selectBookShipping([{methodClassification:'expedited', price:12.5}]).classification, 'expedited');
  assert.throws(() => selectBookShipping([{methodClassification:'standard', price:0}]), /cannot be shipped/);
});

test('US destinations send a region code and military mail is refused before any request', () => {
  const destination = rpiDestination(address, 'buyer@example.test');
  assert.equal(destination.regionCode, 'WA');
  assert.equal(destination.state, undefined);
  assert.equal(destination.address1, '123 Main St');
  assert.throws(() => rpiDestination({...address, state:'AE'}, 'buyer@example.test'), /military/);
  assert.throws(() => rpiDestination({...address, country:'FR', state:''}, 'buyer@example.test'), /United States and Canada/);
});

test('a shipping quote calls the estimate endpoint and not order create', async () => {
  const calls = [];
  const previous = globalThis.fetch;
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(input);
    calls.push({path:url.pathname, method:init.method, auth:init.headers.Authorization, body:JSON.parse(init.body)});
    assert.equal(url.origin, 'https://open.api.rpiprint.com');
    assert.equal(init.headers.Authorization, KEY);
    return Response.json([{methodClassification:'standard', methodName:'Standard', price:6.99, currency:'USD'}]);
  };
  try {
    const items = cartItems(slugs.map(id => ({id, quantity:id === 'watercolor-portraits' ? 2 : 1})));
    const quote = await quoteBookShipping({RPI_API_KEY:KEY}, items, address, 'buyer@example.test');
    assert.equal(quote.shipping, '6.99');
    assert.equal(quote.classification, 'standard');
    assert.deepEqual(calls.map(call => call.path), ['/orders/shipping/estimate']);
    assert.equal(calls[0].method, 'POST');
    assert.deepEqual(calls[0].body.orderItems.map(item => item.sku).sort(), Object.values(proof).map(item => item.sku).sort());
    assert.equal(calls[0].body.orderItems.find(item => item.sku === 'VA-PORTRAITS-8511-HC').quantity, 2);
  } finally { globalThis.fetch = previous; }
});

test('fulfillment uses the proof files once per site order id and does not repeat after a lost reply', async () => {
  const id = crypto.randomUUID();
  const items = cartItems([{id:'watercolor-landscapes', quantity:1}]);
  const order = {id, mode:'live', quote:{address, email:'buyer@example.test', bookQuote:{classification:'standard', shipping:'6.99'}}};
  const job = newRpiBookJob({RPI_API_KEY:KEY}, order, items);
  assert.equal(job.customerOrderId, id);
  assert.equal(job.request.customerOrderId, id);
  assert.deepEqual(job.request.orderItems[0].product, {pageCount:76, coverUrl:proof['watercolor-landscapes'].coverUrl, gutsUrl:proof['watercolor-landscapes'].gutsUrl});
  assert.equal(job.request.orderItems[0].retailPrice, '40.00');
  assert.equal(JSON.stringify(job).includes(KEY), false);

  let posts = 0, created = false, saved = job;
  const previous = globalThis.fetch;
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(input);
    assert.equal(init.headers.Authorization, KEY);
    assert.equal(url.origin, 'https://open.api.rpiprint.com');
    if (url.pathname === '/orders/create') {
      posts += 1;
      created = true;
      assert.equal(JSON.parse(init.body).customerOrderId, id);
      throw Error('socket timeout');
    }
    assert.equal(url.pathname, `/orders/${id}`);
    if (!created) return Response.json({errorCode:404, errorDescription:'Resource not found'}, {status:404});
    return Response.json({order:{customerOrderId:id, status:'RECEIVED', orderPublicId:'ord_test'}});
  };
  const logs = [];
  const error = console.error;
  console.error = (...args) => logs.push(args.join(' '));
  try {
    assert.equal(await fulfillRpiBooks({RPI_API_KEY:KEY}, saved, async next => { saved = next; }), false);
    assert.equal(posts, 1);
    assert.equal(saved.status, 'creating');
    assert.equal(await fulfillRpiBooks({RPI_API_KEY:KEY}, saved, async next => { saved = next; }), false);
    assert.equal(posts, 1);
    assert.equal(saved.status, 'in-production');
    assert.equal(saved.providerOrderId, 'ord_test');
    assert.equal(await fulfillRpiBooks({RPI_API_KEY:KEY}, {...saved, status:'complete'}, async () => { throw Error('should not persist a finished job'); }), true);
    assert.equal(logs.join(' ').includes(KEY), false);
  } finally { globalThis.fetch = previous; console.error = error; }
});

test('a duplicate customer order id is read back instead of creating another order', async () => {
  const id = crypto.randomUUID();
  const items = cartItems([{id:'reflections-on-time', quantity:1}]);
  let saved = newRpiBookJob({RPI_API_KEY:KEY}, {id, mode:'sandbox', quote:{address, email:'buyer@example.test', bookQuote:{classification:'standard', shipping:'6.99'}}}, items);
  let posts = 0, visible = false;
  const previous = globalThis.fetch;
  globalThis.fetch = async (input, init = {}) => {
    const url = new URL(input);
    if (url.pathname === '/orders/create') {
      posts += 1;
      visible = true;
      return Response.json({errorCode:400, errorDescription:'customerOrderId already used'}, {status:400});
    }
    if (!visible) return Response.json({errorDescription:'Resource not found'}, {status:404});
    return Response.json({order:{customerOrderId:id, status:'SHIPPED', orderPublicId:'ord_done'}});
  };
  try {
    assert.equal(await fulfillRpiBooks({RPI_API_KEY:KEY}, saved, async next => { saved = next; }), true);
    assert.equal(posts, 1);
    assert.equal(saved.status, 'complete');
    assert.equal(saved.stage, 'SHIPPED');
  } finally { globalThis.fetch = previous; }
});

test('an RPI rejection is recorded for review and the key is not logged', async () => {
  const id = crypto.randomUUID();
  const items = cartItems([{id:'watercolor-portraits', quantity:1}]);
  let saved = newRpiBookJob({RPI_API_KEY:KEY}, {id, mode:'live', quote:{address, email:'buyer@example.test', bookQuote:{classification:'standard', shipping:'6.99'}}}, items);
  const previous = globalThis.fetch;
  const logs = [];
  const error = console.error;
  console.error = (...args) => logs.push(args.join(' '));
  globalThis.fetch = async (input) => {
    const url = new URL(input);
    if (url.pathname === '/orders/create') return Response.json({errorDescription:`nope ${KEY}`}, {status:500});
    return Response.json({errorDescription:'Resource not found'}, {status:404});
  };
  try {
    assert.equal(await fulfillRpiBooks({RPI_API_KEY:KEY}, saved, async next => { saved = next; }), true);
    assert.equal(saved.status, 'review');
    assert.match(saved.reason, /500/);
    assert.equal(saved.reason.includes(KEY), false);
    assert.equal(logs.join(' ').includes(KEY), false);
  } finally { globalThis.fetch = previous; console.error = error; }
});

test('Bitcoin and card stay available for a book when checkout is configured', () => {
  const env = {
    CART_CHECKOUT_ENABLED:'true', CART_ORDERS:{}, PAINTING_STOCK:{}, SALES_LEDGER:{}, SALES_ARCHIVE:{},
    CHECKOUT_MODE:'live', RPI_API_KEY:KEY,
    BTCPAY_URL:'https://pay.tjm.art', BTCPAY_API_KEY:'k', BTCPAY_STORE_ID:'s', BTCPAY_WEBHOOK_SECRET:'w', BITCOIN_ORDERS:{},
    SHIPPO_TOKEN:'t', SHIP_FROM_STREET:'1 Main', BTCPAY_CHECKOUT_ENABLED:'true',
    SQUARE_CHECKOUT_ENABLED:'true', SQUARE_MODE:'live', SQUARE_CHECKOUT_ALL:'true', SQUARE_ACCESS_TOKEN:'t',
    SQUARE_APPLICATION_ID:'sq0idp-app', SQUARE_LOCATION_ID:'L', SQUARE_WEBHOOK_SIGNATURE_KEY:'k', SQUARE_WEBHOOK_URL:'https://example.test/hook'
  };
  for (const id of slugs) assert.deepEqual(paymentMethods(env, id), ['bitcoin', 'square']);
  assert.deepEqual(paymentMethods({...env, RPI_API_KEY:''}, slugs[0]), []);
});
