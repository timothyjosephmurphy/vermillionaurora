import test from 'node:test';
import assert from 'node:assert/strict';
import { handlePaypalIpn } from './paypal-inventory.mjs';
import { legacyLinks } from './checkout-catalog.mjs';
const slug='test-original';
const request=(overrides={})=>new Request('https://worker/paypal-ipn',{method:'POST',body:new URLSearchParams({payment_status:'Completed',receiver_id:'MERCHANT',txn_id:'TX-123',item_name:'Test painting',mc_currency:'USD',mc_gross:'20.00',quantity:'1',...overrides})});
test('verified legacy notifications update durable inventory without repository access',async t=>{
 legacyLinks[slug]={title:'Test painting',paypalTitle:'Test painting',amount:'20.00',currency:'USD',autoInventory:true};
 t.after(()=>delete legacyLinks[slug]);
 const recorded=[],sales=[],calls=[];
 const env={PAYPAL_IPN_ENABLED:'true',PAYPAL_MERCHANT_ID:'MERCHANT',SALES_LEDGER:{getByName:()=>({record:async r=>recorded.push(r)})},PAINTING_STOCK:{getByName:id=>{assert.equal(id,slug);return{initialize:async()=>{},recordExternalSale:async id=>{sales.push(id);return true;}};}}};
 t.mock.method(globalThis,'fetch',async url=>{calls.push(url);assert.equal(url,'https://ipnpb.paypal.com/cgi-bin/webscr');return new Response('VERIFIED');});
 assert.equal((await handlePaypalIpn(request(),env)).status,200);
 assert.equal((await handlePaypalIpn(request(),env)).status,200);
 assert.deepEqual(sales,['TX-123','TX-123']);assert.equal(recorded.length,2);
 assert.equal((await handlePaypalIpn(request({mc_gross:'19.99'}),env)).status,400);
 assert.equal((await handlePaypalIpn(request({receiver_id:'OTHER'}),env)).status,400);
 assert.equal((await handlePaypalIpn(request({payment_status:'Pending'}),env)).status,200);
 assert.equal(sales.length,2);assert.equal(calls.length,5);
});
test('unverified notifications and failed ledger writes cannot sell stock',async t=>{
 let verify='INVALID';
 t.mock.method(globalThis,'fetch',async()=>new Response(verify));
 const env={PAYPAL_IPN_ENABLED:'true',PAYPAL_MERCHANT_ID:'MERCHANT',SALES_LEDGER:{getByName:()=>({record:async()=>{throw Error('Offline');}})}};
 assert.equal((await handlePaypalIpn(request(),env)).status,400);
 verify='VERIFIED';assert.equal((await handlePaypalIpn(request(),env)).status,503);
 assert.equal((await handlePaypalIpn(request(),{...env,PAYPAL_IPN_ENABLED:'false'})).status,503);
});
