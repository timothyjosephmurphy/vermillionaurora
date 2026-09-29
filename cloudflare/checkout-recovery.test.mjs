import test from 'node:test';
import assert from 'node:assert/strict';
import { checkout, checkoutWebhook } from './paypal-orders.mjs';
import catalog from './checkout-catalog.mjs';

test('verified webhook settles a paused checkout, replay is safe, and invalid events are rejected', async t => {
  const slug='honeybadger-and-cub-with-genesis-block', orderId='ORDER123',captureId='CAPTURE123';
  const expected={orderId,total:'1221.00',shipping:'12.00',tax:'9.00',destination:{zip:'98122',state:'WA'}};
  let merchant='MERCHANT',signature='SUCCESS',amount='1221.00',eventCapture=captureId,completed=0,receipts=0;
  const stub={order:async()=>expected,complete:async(id,capture)=>{assert.equal(id,orderId);assert.equal(capture,captureId);completed++;return true},recordWebhook:async()=>{receipts++}};
  const env={PAYPAL_MODE:'sandbox',PAYPAL_CHECKOUT_ENABLED:'false',PAYPAL_CLIENT_ID:'test',PAYPAL_CLIENT_SECRET:'test',PAYPAL_MERCHANT_ID:'MERCHANT',PAYPAL_WEBHOOK_ID:'WEBHOOK',SANDBOX_RETURN_ORIGIN:'https://sandbox.example',PAINTING_STOCK:{getByName:()=>stub},SHIPPO_TOKEN:'test',STRIPE_SECRET_KEY:'test',SHIP_FROM_STREET:'test'};
  t.mock.method(globalThis,'fetch',async(url,options)=>{
    if(url.endsWith('/oauth2/token'))return Response.json({access_token:'test'});
    if(url.endsWith('/verify-webhook-signature')){
      assert.equal(JSON.parse(options.body).webhook_id,'WEBHOOK');
      return Response.json({verification_status:signature});
    }
    if(url.endsWith('/orders/'+orderId))return Response.json({status:'COMPLETED',purchase_units:[{reference_id:slug,custom_id:slug,payee:{merchant_id:merchant},amount:{currency_code:'USD',value:amount,breakdown:{item_total:{value:'1200.00'},shipping:{value:'12.00'},tax_total:{value:'9.00'}}},shipping:{address:{country_code:'US',postal_code:'98122',admin_area_1:'WA'}},payments:{captures:[{id:captureId,status:'COMPLETED',amount:{currency_code:'USD',value:amount}}]}}]});
    throw Error('Unexpected request');
  });
  const event=()=>new Request('https://sandbox.example/checkout/webhook',{method:'POST',body:JSON.stringify({event_type:'PAYMENT.CAPTURE.COMPLETED',resource:{id:eventCapture,supplementary_data:{related_ids:{order_id:orderId}}}})});
  assert.equal((await checkout(new Request('https://sandbox.example/checkout/status?slug='+slug),env)).status,503);
  assert.equal((await checkoutWebhook(event(),env)).status,200);
  assert.equal((await checkoutWebhook(event(),env)).status,200);
  assert.equal(receipts,2);
  signature='FAILURE';assert.equal((await checkoutWebhook(event(),env)).status,400);
  signature='SUCCESS';merchant='OTHER';assert.equal((await checkoutWebhook(event(),env)).status,400);
  merchant='MERCHANT';amount='1.00';assert.equal((await checkoutWebhook(event(),env)).status,400);
  amount='1221.00';eventCapture='OTHER';assert.equal((await checkoutWebhook(event(),env)).status,400);
  assert.equal(completed,2);
});
