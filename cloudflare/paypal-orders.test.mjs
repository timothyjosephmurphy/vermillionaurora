import test from 'node:test';
import assert from 'node:assert/strict';
import { checkout } from './paypal-orders.mjs';
import catalog from './checkout-catalog.mjs';

const slug = 'honeybadger-and-cub-with-genesis-block';
const item = catalog[slug];
const origin = 'https://vermillionaurora.com';
const orderId = 'ABC123456789';

test('one original is reserved for only one buyer, and a completed capture sells it', async t => {
  let held = null, sold = false, order = null, captured = false;
  const stub = {
    async reserve(id) { if (held || sold) return false; held = id; return true; },
    async initialize(s) { assert.equal(s,slug); },
    async bindOrder(id,value) { if (id !== held) return false; order = value; return true; },
    async status() { return sold ? 'sold' : held ? 'reserved' : 'available'; },
    async release(id) { if (id === held) held = null; },
    async beginCapture(id,secret) { if (id !== order || secret !== held) return 'invalid'; return 'ready'; },
    async complete(id,captureId) { assert.equal(id,order); assert.equal(captureId,'CAPTURE1'); sold=true; return true; }
  };
  const env = { PAYPAL_CHECKOUT_ENABLED:'true',PAYPAL_CLIENT_ID:'test',PAYPAL_CLIENT_SECRET:'test',PAYPAL_MERCHANT_ID:'MERCHANT1',GITHUB_TOKEN:'test',PAINTING_STOCK:{getByName:() => stub}, PAYPAL_MODE:'sandbox' };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url,options) => {
    if (url.endsWith('/v1/oauth2/token')) return Response.json({access_token:'fake'});
    if (url.endsWith('/v2/checkout/orders') && options.method === 'POST') {
      const body=JSON.parse(options.body);
      assert.equal(body.purchase_units[0].amount.value,item.amount);
      assert.equal(body.purchase_units[0].reference_id,slug);
      return Response.json({id:orderId,links:[{rel:'payer-action',href:`https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`}]});
    }
    if (url.endsWith(`/orders/${orderId}`)) return Response.json({status:captured?'COMPLETED':'APPROVED',purchase_units:[{
      reference_id:slug,custom_id:slug,amount:{currency_code:'USD',value:item.amount},payee:{merchant_id:'MERCHANT1'},
      ...(captured ? {payments:{captures:[{id:'CAPTURE1',status:'COMPLETED',amount:{currency_code:'USD',value:item.amount}}]}} : {})
    }]});
    if (url.endsWith(`/orders/${orderId}/capture`)) {
      captured=true;
      return Response.json({status:'COMPLETED',purchase_units:[{reference_id:slug,custom_id:slug,amount:{currency_code:'USD',value:item.amount},payee:{merchant_id:'MERCHANT1'},payments:{captures:[{id:'CAPTURE1',status:'COMPLETED',amount:{currency_code:'USD',value:item.amount}}]}}]});
    }
    throw new Error(`Unexpected PayPal call ${url}`);
  };
  t.after(() => { globalThis.fetch = originalFetch; });
  const request = (path,data) => new Request(`https://worker.example${path}`, {method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(data)});
  const first = await checkout(request('/checkout/create',{slug}),env);
  assert.equal(first.status,200);
  assert.match((await first.json()).url,/sandbox.paypal.com/);
  const second = await checkout(request('/checkout/create',{slug}),env);
  assert.equal(second.status,409);
  const capture = await checkout(request('/checkout/capture',{slug,orderId,holdId:held}),env);
  assert.deepEqual(await capture.json(),{status:'sold'});
  assert.equal((await checkout(request('/checkout/create',{slug}),env)).status,409);
});
