import {it as test,expect,vi} from 'vitest';
import {squarePaymentBody,validateSquarePayment,squareRequest} from '../square-provider.mjs';
import {squareWebhook} from '../square-webhook.mjs';
import {squareTestPageEnabled} from '../square-test-page.mjs';

const id='9f928d6c-a40a-4c9d-980b-2096fe17c568';
const env={SQUARE_MODE:'sandbox',SQUARE_LOCATION_ID:'LOCATION',SQUARE_ACCESS_TOKEN:'test-token'};
const order={id,quote:{total:'81.25',email:'buyer@example.test',items:[{title:'Test painting'}],address:{name:'Taylor Buyer',street1:'10 Pine St',street2:'Unit 4',city:'Seattle',state:'WA',zip:'98122'}},squareMode:'sandbox',squareLocationId:'LOCATION',squareSourceId:'cnon:card-nonce'};

test('Square payment body uses the saved total, address, idempotency key, and location',()=>{
  const body=squarePaymentBody(env,order);
  expect(body.amount_money.amount).toBe(8125);
  expect(body.amount_money.currency).toBe('USD');
  expect(body.idempotency_key).toBe(id);
  expect(body.reference_id).toBe(id);
  expect(body.location_id).toBe('LOCATION');
  expect(body.shipping_address.address_line_2).toBe('Unit 4');
  expect(JSON.stringify(body)).not.toContain('test-token');
});

test('Square payment acceptance rejects amount, location, mode, reference, and status mismatches',()=>{
  const valid={id:'SQPAYMENT',status:'COMPLETED',location_id:'LOCATION',reference_id:id,amount_money:{amount:8125,currency:'USD'}};
  expect(validateSquarePayment(env,order,valid)).toBe('square:SQPAYMENT');
  for(const bad of [
    {...valid,amount_money:{amount:1,currency:'USD'}},
    {...valid,location_id:'OTHER'},
    {...valid,reference_id:'another-order'},
    {...valid,status:'APPROVED'},
  ])expect(()=>validateSquarePayment(env,order,bad)).toThrow();
  expect(()=>validateSquarePayment({...env,SQUARE_MODE:'live'},order,valid)).toThrow();
});

test('Square API requests use the sandbox endpoint and server token',async()=>{
  let request;
  vi.stubGlobal('fetch',async(url,options)=>{request={url,options};return Response.json({payment:{id:'P'}});});
  try {
    await squareRequest(env,'/v2/payments/P');
    expect(request.url).toBe('https://connect.squareupsandbox.com/v2/payments/P');
    expect(request.options.headers.Authorization).toBe('Bearer test-token');
    expect(request.options.headers['Square-Version']).toBe('2026-08-19');
  } finally {vi.unstubAllGlobals();}
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
  expect((await squareWebhook(validRequest(),webhookEnv)).status).toBe(200);
  expect(accepted).toEqual([{orderId:id,paymentId:'SQPAYMENT'}]);
  const invalid=new Request(url,{method:'POST',headers:{'x-square-hmacsha256-signature':'invalid'},body});
  expect((await squareWebhook(invalid,webhookEnv)).status).toBe(403);
  expect(accepted).toHaveLength(1);
});


test('Square sandbox test page requires enabled sandbox checkout and the no-fulfillment guard',()=>{
  const base={PAYPAL_MODE:'sandbox',SQUARE_MODE:'sandbox',SQUARE_CHECKOUT_ENABLED:'true',SQUARE_SANDBOX_NO_FULFILLMENT:'true'};
  expect(squareTestPageEnabled(base)).toBe(true);
  expect(squareTestPageEnabled({...base,PAYPAL_MODE:'live'})).toBe(false);
  expect(squareTestPageEnabled({...base,SQUARE_MODE:'live'})).toBe(false);
  expect(squareTestPageEnabled({...base,SQUARE_CHECKOUT_ENABLED:'false'})).toBe(false);
  expect(squareTestPageEnabled({...base,SQUARE_SANDBOX_NO_FULFILLMENT:'false'})).toBe(false);
});
