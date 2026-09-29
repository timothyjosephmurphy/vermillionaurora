import test from 'node:test';
import assert from 'node:assert/strict';
import { checkoutReadiness } from './checkout-readiness.mjs';

test('production readiness requires authentication and only reads provider configuration',async t=>{
  const env={CHECKOUT_AUDIT_TOKEN:'audit-secret',PAYPAL_MODE:'live',PAYPAL_CHECKOUT_ENABLED:'false',PAYPAL_CLIENT_ID:'client',PAYPAL_CLIENT_SECRET:'paypal-secret',PAYPAL_WEBHOOK_ID:'hook',PAYPAL_MERCHANT_ID:'8DYAVLDCWDESE',STRIPE_SECRET_KEY:'sk_live_fake',SHIPPO_TOKEN:'shippo_live_fake',GITHUB_TOKEN:'github-secret',PAINTING_STOCK:{},SHIP_FROM_STREET:'123 private street'};
  let calls=0;
  t.mock.method(globalThis,'fetch',async(url,options)=>{
    calls++;
    if(url.endsWith('/oauth2/token'))return Response.json({access_token:'token'});
    assert.notEqual(options.method,'POST');
    if(url.includes('/notifications/webhooks/'))return Response.json({url:'https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/webhook',event_types:[{name:'PAYMENT.CAPTURE.COMPLETED'}]});
    if(url.endsWith('/tax/settings'))return Response.json({livemode:true,status:'active',head_office:{address:'private'}});
    if(url.includes('/tax/registrations'))return Response.json({data:[{country:'US',country_options:{us:{state:'WA'}}}]});
    if(url.includes('/carrier_accounts/'))return Response.json({results:[{active:true,carrier:'usps'}]});
    if(url.includes('api.github.com'))return Response.json({full_name:'timothyjosephmurphy/vermillionaurora',permissions:{push:true}});
    throw Error('Unexpected provider request');
  });
  assert.equal((await checkoutReadiness(new Request('https://worker/checkout/readiness',{method:'POST'}),env)).status,404);
  assert.equal(calls,0);
  const request=()=>new Request('https://worker/checkout/readiness',{method:'POST',headers:{Authorization:'Bearer audit-secret'}});
  const r=await checkoutReadiness(request(),env);assert.equal(r.status,200);
  const text=await r.text();assert.equal(JSON.parse(text).ready,true);
  for(const secret of ['audit-secret','paypal-secret','github-secret','123 private street','sk_live_fake','shippo_live_fake'])assert.ok(!text.includes(secret));
  const testKey=await checkoutReadiness(request(),{...env,STRIPE_SECRET_KEY:'sk_test_fake'});assert.equal(testKey.status,503);
});
