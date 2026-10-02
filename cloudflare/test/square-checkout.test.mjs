import {test} from 'node:test';
import assert from 'node:assert/strict';
import {squarePaymentBody,validateSquarePayment,squareRequest} from '../square-provider.mjs';
import {squareWebhook} from '../square-webhook.mjs';

const id='9f928d6c-a40a-4c9d-980b-2096fe17c568';
const env={SQUARE_MODE:'sandbox',SQUARE_LOCATION_ID:'LOCATION',SQUARE_ACCESS_TOKEN:'test-token'};
const order={id,quote:{total:'81.25',email:'buyer@example.test',items:[{title:'Test painting'}],address:{name:'Taylor Buyer',street1:'10 Pine St',street2:'Unit 4',city:'Seattle',state:'WA',zip:'98122'}},squareMode:'sandbox',squareLocationId:'LOCATION',squareSourceId:'cnon:card-nonce'};

test('Square payment body uses the saved total, address, idempotency key, and location',()=>{
  const body=squarePaymentBody(env,order);
  assert.equal(body.amount_money.amount,8125);
  assert.equal(body.amount_money.currency,'USD');
  assert.equal(body.idempotency_key,id);
  assert.equal(body.reference_id,id);
  assert.equal(body.location_id,'LOCATION');
  assert.equal(body.shipping_address.address_line_2,'Unit 4');
  assert.equal(JSON.stringify(body).includes('test-token'),false);
});

test('Square payment acceptance rejects amount, location, mode, reference, and status mismatches',()=>{
  const valid={id:'SQPAYMENT',status:'COMPLETED',location_id:'LOCATION',reference_id:id,amount_money:{amount:8125,currency:'USD'}};
  assert.equal(validateSquarePayment(env,order,valid),'square:SQPAYMENT');
  for(const bad of [
    {...valid,amount_money:{amount:1,currency:'USD'}},
    {...valid,location_id:'OTHER'},
    {...valid,reference_id:'another-order'},
    {...valid,status:'APPROVED'},
  ])assert.throws(()=>validateSquarePayment(env,order,bad));
  assert.throws(()=>validateSquarePayment({...env,SQUARE_MODE:'live'},order,valid));
});

test('Square API requests use the sandbox endpoint and server token',async()=>{
  const oldFetch=globalThis.fetch;let request;
  globalThis.fetch=async(url,options)=>{request={url,options};return Response.json({payment:{id:'P'}});};
  try {
    await squareRequest(env,'/v2/payments/P');
    assert.equal(request.url,'https://connect.squareupsandbox.com/v2/payments/P');
    assert.equal(request.options.headers.Authorization,'Bearer test-token');
    assert.equal(request.options.headers['Square-Version'],'2026-08-19');
  } finally {globalThis.fetch=oldFetch;}
});

test('Square webhook validates the configured URL and HMAC before touching an order',async()=>{
  const url='https://checkout.example.test/checkout/square/webhook',signatureKey='test-webhook-key';
  const body=JSON.stringify({type:'payment.updated',data:{object:{payment:{id:'SQPAYMENT',reference_id:id,status:'COMPLETED'}}}});
  const key=await crypto.subtle.importKey('raw',new TextEncoder().encode(signatureKey),{name:'HMAC',hash:'SHA-256'},false,['sign']);
  const digest=new Uint8Array(await crypto.subtle.sign('HMAC',key,new TextEncoder().encode(url+body)));
  const signature=btoa(String.fromCharCode(...digest));let accepted=[];
  const webhookEnv={SQUARE_CHECKOUT_ENABLED:'true',SQUARE_WEBHOOK_URL:url,SQUARE_WEBHOOK_SIGNATURE_KEY:signatureKey,
    CART_ORDERS:{getByName:orderId=>({acceptSquare:async paymentId=>accepted.push({orderId,paymentId})})}};
  const validRequest=()=>new Request(url,{method:'POST',headers:{'x-square-hmacsha256-signature':signature},body});
  assert.equal((await squareWebhook(validRequest(),webhookEnv)).status,200);
  assert.deepEqual(accepted,[{orderId:id,paymentId:'SQPAYMENT'}]);
  const invalid=new Request(url,{method:'POST',headers:{'x-square-hmacsha256-signature':'invalid'},body});
  assert.equal((await squareWebhook(invalid,webhookEnv)).status,403);
  assert.equal(accepted.length,1);
});
