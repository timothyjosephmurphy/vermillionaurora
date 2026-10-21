import test from 'node:test';
import assert from 'node:assert/strict';
import { checkoutReadiness } from './checkout-readiness.mjs';

test('production readiness requires authentication and only reads provider configuration',async t=>{
  const env={CHECKOUT_AUDIT_TOKEN:'audit-secret',CHECKOUT_MODE:'live',SHIPPO_TOKEN:'shippo_live_fake',GITHUB_TOKEN:'github-secret',PAINTING_STOCK:{},SALES_LEDGER:{},SALES_ARCHIVE:{},SHIP_FROM_STREET:'123 private street'};
  const DOR='<?xml version="1.0" encoding="utf-8"?><response loccode="1726" localrate=".0405" rate=".1055" code="2" xmlns=""><addressline code="1726" state="WA" zip="98104" period="Q42026" /><rate name="SEATTLE" code="1726" staterate=".0650" localrate=".0405" /></response>';
  let dorReply=DOR,dorRequests=[];
  let applePayCalls=[],applePayAllowed=true,calls=0,squareCardProcessing=true,squareWebhookEnabled=true,bitcoinInvoiceAllowed=true;
  t.mock.method(globalThis,'fetch',async(url,options)=>{
    calls++;
    if(url.endsWith('/oauth2/token'))return Response.json({access_token:'token'});
    if(url==='https://oauth2.googleapis.com/token')return Response.json({access_token:'gmail-token'});
    if(url==='https://api.goshippo.com/shipments/')return Response.json({object_id:'SHIP1',extra:{insurance:{amount:'200.00',currency:'USD',content:'Original painting: Chase Toole'}},rates:[{object_id:'RATE1',shipment:'SHIP1',provider:'UPS',currency:'USD',amount:'6.50',included_insurance_price:'1.50'}]});
    if(url.startsWith('https://webgis.dor.wa.gov/webapi/AddressRates.aspx?')){dorRequests.push(new URL(url));assert.equal(options?.method,'GET');return new Response(dorReply);}
    if(url==='https://connect.squareup.com/v2/apple-pay/domains'){applePayCalls.push({body:JSON.parse(options.body),auth:options.headers.Authorization});return applePayAllowed?Response.json({status:'VERIFIED'}):Response.json({errors:[{category:'AUTHENTICATION_ERROR',code:'INSUFFICIENT_SCOPES',detail:'Missing scope'}]},{status:401});}
    assert.notEqual(options.method,'POST');
    if(url==='https://connect.squareup.com/v2/locations/LOCATION')return Response.json({location:{id:'LOCATION',status:'ACTIVE',currency:'USD',capabilities:squareCardProcessing?['CREDIT_CARD_PROCESSING']:[]}});
    if(url==='https://connect.squareup.com/v2/webhooks/subscriptions?limit=100')return Response.json({subscriptions:[{enabled:squareWebhookEnabled,notification_url:'https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/square/webhook',event_types:['payment.updated']}]});
    if(url.includes('btcpay.example.test/api/v1/stores/'))return bitcoinInvoiceAllowed?Response.json([]):new Response('Forbidden',{status:403});
    if(url.includes('/notifications/webhooks/'))return Response.json({url:'https://vermillion-commissions.timothyjosephmurphy.workers.dev/checkout/webhook',event_types:[{name:'PAYMENT.CAPTURE.COMPLETED'}]});
    if(url.includes('/carrier_accounts/'))return Response.json({results:[{active:true,carrier:'usps'}]});
    if(url.includes('api.github.com'))return Response.json({full_name:'timothyjosephmurphy/vermillionaurora',permissions:{push:true}});
    throw Error('Unexpected provider request');
  });
  assert.equal((await checkoutReadiness(new Request('https://worker/checkout/readiness',{method:'POST'}),env)).status,404);
  assert.equal(calls,0);
  const request=()=>new Request('https://worker/checkout/readiness',{method:'POST',headers:{Authorization:'Bearer audit-secret'}});
  const r=await checkoutReadiness(request(),env);assert.equal(r.status,200);
  const text=await r.text();assert.equal(JSON.parse(text).ready,true);
  for(const secret of ['audit-secret','github-secret','123 private street','shippo_live_fake'])assert.ok(!text.includes(secret));
  assert.deepEqual(JSON.parse(text).checks.waTaxRate,{rate:'0.1055',loccode:'1726',jurisdiction:'SEATTLE',period:'Q42026',basis:'address',resultCode:2});
  assert.equal(JSON.parse(text).checks.waTaxLookup,true);
  assert.deepEqual(Object.fromEntries(dorRequests.at(-1).searchParams),{output:'xml',addr:'600 4th Ave',city:'Seattle',zip:'98104'});
  const btcpay={...env,BTCPAY_CHECKOUT_ENABLED:'true',BTCPAY_URL:'https://btcpay.example.test',BTCPAY_STORE_ID:'store-1',BTCPAY_API_KEY:'btcpay-secret'};
  const bitcoinReady=await checkoutReadiness(request(),btcpay);assert.equal(bitcoinReady.status,200);assert.equal((await bitcoinReady.json()).checks.bitcoinInvoiceAccess,true);
  bitcoinInvoiceAllowed=false;
  const bitcoinDenied=await checkoutReadiness(request(),btcpay);assert.equal(bitcoinDenied.status,503);
  const deniedBody=await bitcoinDenied.text();assert.match(deniedBody,/BTCPay API 403/);assert.ok(!deniedBody.includes('btcpay-secret'));
  bitcoinInvoiceAllowed=true;
  // The DOR lookup only warns: a ZIP-only answer or an outage keeps the site ready (checkout uses the fallback rate).
  dorReply=DOR.replace('code="2"','code="5"');const dorZip=await checkoutReadiness(request(),env);assert.equal(dorZip.status,200);assert.match((await dorZip.json()).checks.waTaxWarning,/ZIP-level/);
  dorReply='<response loccode="-1" localrate="-1" rate="-1" code="9" />';const dorDown=await checkoutReadiness(request(),env);assert.equal(dorDown.status,200);
  const dorDownBody=await dorDown.json();assert.equal(dorDownBody.checks.waTaxLookup,false);assert.match(dorDownBody.checks.waTaxError,/Washington sales tax/);assert.match(dorDownBody.checks.waTaxWarning,/fallback/);
  dorReply=DOR;
  const pilot={...env,CHECKOUT_PILOT_ENABLED:'true',SHIP_FROM_PHONE:'+12065550100',CHECKOUT_PILOT_SLUGS:'painting-portrait-in-green',SHIPPO_CARRIER_ALLOWLIST:'UPS',SHIPPO_AUTO_LABEL_ENABLED:'true',
    GOOGLE_CLIENT_ID:'client',GOOGLE_CLIENT_SECRET:'google-secret',GOOGLE_REFRESH_TOKEN:'refresh',PAINTING_STOCK:{getByName:()=>({status:async()=>'available'})}};
  const verified=await checkoutReadiness(request(),pilot);
  assert.equal(verified.status,200);
  const audit=await verified.json();
  assert.equal(audit.checks.sellerEmail,true);assert.equal(audit.checks.insuredQuote,true);
  assert.deepEqual(audit.checks.pilotQuote,{base:'200.00',shipping:'6.50',tax:'21.79',total:'228.29',carrier:'UPS',insurance:'200.00',insuranceFee:'1.50'});
  const cartPilot={...pilot,CHECKOUT_PILOT_SLUGS:'painting-portrait-in-green,painting-portrait-in-gold'};
  assert.equal((await checkoutReadiness(request(),cartPilot)).status,200);
  assert.equal((await checkoutReadiness(request(),{...cartPilot,CHECKOUT_PILOT_SLUGS:cartPilot.CHECKOUT_PILOT_SLUGS+',el-zonte-at-sunrise'})).status,503);
  const completed=await checkoutReadiness(request(),{...pilot,PAINTING_STOCK:{getByName:()=>({status:async()=>'sold'})}});
  assert.equal(completed.status,200);assert.equal((await completed.json()).checks.completedPilot,true);
  assert.equal((await checkoutReadiness(request(),{...pilot,CHECKOUT_PILOT_SLUGS:''})).status,503);
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
  // Apple Pay domain registration: the storefront domain only, with the worker's token; never part of readiness.
  assert.deepEqual(squareAudit.checks.applePayDomain,{domain:'tjm.art',status:'VERIFIED'});
  assert.deepEqual(applePayCalls.at(-1),{body:{domain_name:'tjm.art'},auth:'Bearer square-secret'});
  assert.equal(audit.checks.applePayDomain,undefined);
  applePayAllowed=false;
  const applePayDenied=await checkoutReadiness(request(),square);assert.equal(applePayDenied.status,200);
  const deniedText=await applePayDenied.text();assert.ok(!deniedText.includes('square-secret'));
  assert.deepEqual(JSON.parse(deniedText).checks.applePayDomain,{domain:'tjm.art',error:'HTTP 401',codes:['AUTHENTICATION_ERROR:INSUFFICIENT_SCOPES'],detail:'Missing scope'});
  applePayAllowed=true;
  squareCardProcessing=false;assert.equal((await checkoutReadiness(request(),square)).status,503);
  squareCardProcessing=true;squareWebhookEnabled=false;assert.equal((await checkoutReadiness(request(),square)).status,503);

});
