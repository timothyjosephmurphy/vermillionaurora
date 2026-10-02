import test from 'node:test';
import assert from 'node:assert/strict';
import { checkoutReadiness } from './checkout-readiness.mjs';

test('production readiness requires authentication and only reads provider configuration',async t=>{
  const env={CHECKOUT_AUDIT_TOKEN:'audit-secret',PAYPAL_MODE:'live',PAYPAL_CHECKOUT_ENABLED:'false',PAYPAL_CLIENT_ID:'client',PAYPAL_CLIENT_SECRET:'paypal-secret',PAYPAL_WEBHOOK_ID:'hook',PAYPAL_MERCHANT_ID:'8DYAVLDCWDESE',STRIPE_SECRET_KEY:'sk_live_fake',SHIPPO_TOKEN:'shippo_live_fake',GITHUB_TOKEN:'github-secret',PAINTING_STOCK:{},SALES_LEDGER:{},SALES_ARCHIVE:{},SHIP_FROM_STREET:'123 private street'};
  let calls=0,squareCardProcessing=true,squareWebhookEnabled=true;
  t.mock.method(globalThis,'fetch',async(url,options)=>{
    calls++;
    if(url.endsWith('/oauth2/token'))return Response.json({access_token:'token'});
    if(url==='https://oauth2.googleapis.com/token')return Response.json({access_token:'gmail-token'});
    if(url==='https://api.goshippo.com/shipments/')return Response.json({object_id:'SHIP1',extra:{insurance:{amount:'20.00',currency:'USD',content:'Original painting: Chase Toole'}},rates:[{object_id:'RATE1',shipment:'SHIP1',provider:'UPS',currency:'USD',amount:'6.50',included_insurance_price:'1.50'}]});
    if(url==='https://api.stripe.com/v1/tax/calculations')return Response.json({id:'taxcalc_live',currency:'usd',amount_total:2650});
    assert.notEqual(options.method,'POST');
    if(url==='https://connect.squareup.com/v2/locations/LOCATION')return Response.json({location:{id:'LOCATION',status:'ACTIVE',currency:'USD',capabilities:squareCardProcessing?['CREDIT_CARD_PROCESSING']:[]}});
    if(url==='https://connect.squareup.com/v2/webhooks/subscriptions?limit=100')return Response.json({subscriptions:[{enabled:squareWebhookEnabled,notification_url:'https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/square/webhook',event_types:['payment.updated']}]});
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
  const pilot={...env,CHECKOUT_PILOT_ENABLED:'true',SHIP_FROM_PHONE:'+12065550100',PAYPAL_CHECKOUT_SLUGS:'painting-portrait-in-green',SHIPPO_CARRIER_ALLOWLIST:'UPS',SHIPPO_AUTO_LABEL_ENABLED:'true',
    GOOGLE_CLIENT_ID:'client',GOOGLE_CLIENT_SECRET:'google-secret',GOOGLE_REFRESH_TOKEN:'refresh',PAINTING_STOCK:{getByName:()=>({status:async()=>'available'})}};
  const verified=await checkoutReadiness(request(),pilot);
  assert.equal(verified.status,200);
  const audit=await verified.json();
  assert.equal(audit.checks.sellerEmail,true);assert.equal(audit.checks.insuredQuote,true);
  assert.deepEqual(audit.checks.pilotQuote,{base:'20.00',shipping:'6.50',tax:'0.00',total:'26.50',carrier:'UPS',insurance:'20.00',insuranceFee:'1.50'});
  const cartPilot={...pilot,PAYPAL_CHECKOUT_SLUGS:'painting-portrait-in-green,painting-portrait-in-gold'};
  assert.equal((await checkoutReadiness(request(),cartPilot)).status,200);
  assert.equal((await checkoutReadiness(request(),{...cartPilot,PAYPAL_CHECKOUT_SLUGS:cartPilot.PAYPAL_CHECKOUT_SLUGS+',el-zonte-at-sunrise'})).status,503);
  const completed=await checkoutReadiness(request(),{...pilot,PAINTING_STOCK:{getByName:()=>({status:async()=>'sold'})}});
  assert.equal(completed.status,200);assert.equal((await completed.json()).checks.completedPilot,true);
  assert.equal((await checkoutReadiness(request(),{...pilot,PAYPAL_CHECKOUT_SLUGS:''})).status,503);
  assert.equal((await checkoutReadiness(request(),{...pilot,GOOGLE_REFRESH_TOKEN:''})).status,503);
  const square={...env,SQUARE_CHECKOUT_ENABLED:'true',SQUARE_CHECKOUT_ALL:'true',SQUARE_MODE:'live',
    SQUARE_ACCESS_TOKEN:'square-secret',SQUARE_APPLICATION_ID:'sq0idp-APP',SQUARE_LOCATION_ID:'LOCATION',SQUARE_WEBHOOK_SIGNATURE_KEY:'square-hook-secret',
    SQUARE_WEBHOOK_URL:'https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/square/webhook'};
  const squareResponse=await checkoutReadiness(request(),square);assert.equal(squareResponse.status,200);
  const squareText=await squareResponse.text(),squareAudit=JSON.parse(squareText);
  assert.equal(squareAudit.checks.squareLocation,true);assert.equal(squareAudit.checks.squareWebhook,true);
  for(const secret of ['square-secret','square-hook-secret'])assert.ok(!squareText.includes(secret));
  assert.equal((await checkoutReadiness(request(),{...square,SQUARE_ACCESS_TOKEN:''})).status,503);
  assert.equal((await checkoutReadiness(request(),{...square,SQUARE_MODE:'sandbox'})).status,503);
  assert.equal((await checkoutReadiness(request(),{...square,SQUARE_APPLICATION_ID:'sandbox-sq0idb-APP'})).status,503);
  squareCardProcessing=false;assert.equal((await checkoutReadiness(request(),square)).status,503);
  squareCardProcessing=true;squareWebhookEnabled=false;assert.equal((await checkoutReadiness(request(),square)).status,503);

});
