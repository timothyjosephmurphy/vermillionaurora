import test from 'node:test';
import assert from 'node:assert/strict';
import { checkout } from './paypal-orders.mjs';
import catalog from './checkout-catalog.mjs';

const slug = 'honeybadger-and-cub-with-genesis-block';
const item = catalog[slug];
const origin = 'https://vermillionaurora.com';
const orderId = 'ABC123456789';

test('catalog builds packages from physical painting sizes', () => {
  assert.deepEqual(catalog['paul-murphy-painting-1'].parcel,{length:14,width:11,height:2,weight:2});
  assert.equal(catalog['paul-murphy-painting-1'].packaging,'flat');
  assert.deepEqual(catalog['painting-portrait-with-hat'].parcel,{length:22,width:4,height:4,weight:2});
  assert.equal(catalog['painting-portrait-with-hat'].packaging,'tube');
});

test('one original is reserved for only one buyer, and a completed capture sells it', async t => {
  let held = null, sold = false, order = null, captured = false;
  let savedQuote;
  const address={name:'Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122'};
  const total=(Number(item.amount)+12+9).toFixed(2);
  const purchaseUnit=()=>({reference_id:slug,custom_id:slug,
    amount:{currency_code:'USD',value:total,breakdown:{item_total:{value:item.amount},shipping:{value:'12.00'},tax_total:{value:'9.00'}}},
    shipping:{address:{country_code:'US',postal_code:'98122',admin_area_1:'WA'}},payee:{merchant_id:'MERCHANT1'},
    ...(captured ? {payments:{captures:[{id:'CAPTURE1',status:'COMPLETED',amount:{currency_code:'USD',value:total}}]}} : {})});
  const stub = {
    async reserve(id) { if (held || sold) return false; held = id; return true; },
    async initialize(s) { assert.equal(s,slug); },
    async bindOrder(id,value,quote) { if (id !== held) return false; order = value; savedQuote=quote; return true; },
    async order() { return {orderId:order,total:savedQuote.total,shipping:savedQuote.shipping,tax:savedQuote.tax,destination:savedQuote.address}; },
    async status() { return sold ? 'sold' : held ? 'reserved' : 'available'; },
    async release(id) { if (id === held) held = null; },
    async beginCapture(id,secret) { if (id !== order || secret !== held) return 'invalid'; return 'ready'; },
    async complete(id,captureId) { assert.equal(id,order); assert.equal(captureId,'CAPTURE1'); sold=true; return true; }
  };
  const env = { PAYPAL_CHECKOUT_ENABLED:'true',PAYPAL_CLIENT_ID:'test',PAYPAL_CLIENT_SECRET:'test',PAYPAL_MERCHANT_ID:'MERCHANT1',GITHUB_TOKEN:'test',PAINTING_STOCK:{getByName:() => stub}, PAYPAL_MODE:'sandbox',SHIPPO_TOKEN:'test',STRIPE_SECRET_KEY:'test',SHIP_FROM_STREET:'123 Origin',PAYPAL_WEBHOOK_ID:'webhook' };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (url,options) => {
    if (url.includes('goshippo.com/shipments')) {
      const body=JSON.parse(options.body);
      assert.equal(body.address_from.zip,'98122');
      assert.equal(body.parcels[0].length,String(item.parcel.length));
      return Response.json({rates:[{currency:'USD',amount:'12.00',provider:'USPS',servicelevel:{name:'Ground'}}]});
    }
    if (url.includes('api.stripe.com/v1/tax/calculations')) return Response.json({currency:'usd',amount_total:Math.round(Number(total)*100),id:'taxcalc_FAKE'});
    if (url.endsWith('/v1/oauth2/token')) return Response.json({access_token:'fake'});
    if (url.endsWith('/v2/checkout/orders') && options.method === 'POST') {
      const body=JSON.parse(options.body);
      assert.equal(body.purchase_units[0].amount.value,total);
      assert.equal(body.purchase_units[0].reference_id,slug);
      return Response.json({id:orderId,links:[{rel:'payer-action',href:`https://www.sandbox.paypal.com/checkoutnow?token=${orderId}`}]});
    }
    if (url.endsWith(`/orders/${orderId}`)) return Response.json({status:captured?'COMPLETED':'APPROVED',purchase_units:[purchaseUnit()]});
    if (url.endsWith(`/orders/${orderId}/capture`)) {
      captured=true;
      return Response.json({status:'COMPLETED',purchase_units:[purchaseUnit()]});
    }
    throw new Error(`Unexpected PayPal call ${url}`);
  };
  t.after(() => { globalThis.fetch = originalFetch; });
  const request = (path,data) => new Request(`https://worker.example${path}`, {method:'POST',headers:{Origin:origin,'Content-Type':'application/json'},body:JSON.stringify(data)});
  const quote = await checkout(request('/checkout/quote',{slug,address}),env);
  assert.equal((await quote.json()).total,total);
  const first = await checkout(request('/checkout/create',{slug,address,expectedTotal:total}),env);
  assert.equal(first.status,200);
  assert.match((await first.json()).url,/sandbox.paypal.com/);
  const second = await checkout(request('/checkout/create',{slug}),env);
  assert.equal(second.status,409);
  const capture = await checkout(request('/checkout/capture',{slug,orderId,holdId:held}),env);
  assert.deepEqual(await capture.json(),{status:'sold'});
  assert.equal((await checkout(request('/checkout/create',{slug}),env)).status,409);
});
