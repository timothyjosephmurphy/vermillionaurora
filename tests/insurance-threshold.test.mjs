// Quote-only: no network, no Shippo purchase. Shippo is mocked.
import test from 'node:test';
import assert from 'node:assert/strict';
import checkout from '../cloudflare/checkout-catalog.mjs';
import {products} from '../catalog/catalog.mjs';
import {INSURANCE_THRESHOLD_USD,insuranceRequiredFor} from '../catalog/shipping.mjs';
import {priceShipment} from '../cloudflare/checkout-pricing.mjs';

test('threshold helper: at or above the constant is insured, below is not unless explicit (#128)',()=>{
  assert.equal(INSURANCE_THRESHOLD_USD,300);
  assert.equal(insuranceRequiredFor('299.99'),false);
  assert.equal(insuranceRequiredFor('300.00'),true);
  assert.equal(insuranceRequiredFor('3000.00'),true);
  assert.equal(insuranceRequiredFor('75.00',true),true);
  assert.equal(insuranceRequiredFor('75.00',false),false);
});
test('generated checkout catalog requests insurance for every original at or above the threshold',()=>{
  const flagged=Object.entries(checkout).filter(([,i])=>i.insuranceRequested);
  const expected=products.filter(p=>p.checkout?.mode==='integrated'&&(Number(p.listing.price.amount)>=INSURANCE_THRESHOLD_USD||p.checkout.shipping.insuranceRequested===true)).map(p=>p.id);
  assert.deepEqual(flagged.map(([id])=>id).sort(),expected.sort());
  assert.ok(flagged.length>=40,'dozens of originals are now insured');
  for(const [id,i] of Object.entries(checkout))if(Number(i.amount)<INSURANCE_THRESHOLD_USD&&!i.insuranceRequested)assert.equal(i.insuranceRequested,undefined,id);
});
const env={SHIPPO_TOKEN:'test',SHIP_FROM_STREET:'1 Test St',SHIP_FROM_PHONE:'+12065550100'};
const address={name:'Buyer',street1:'123 Main St',city:'Seattle',state:'WA',zip:'98122',country:'US'};
async function quote(slug){
  const real=globalThis.fetch,bodies=[];
  globalThis.fetch=async(url,init)=>{
    const body=JSON.parse(init.body);bodies.push(body);
    return new Response(JSON.stringify({object_id:'SHIP1',extra:{insurance:body.extra?.insurance},rates:[{object_id:'RATE1',shipment:'SHIP1',currency:'USD',amount:'12.50',included_insurance_price:body.extra?.insurance?'4.50':undefined,provider:'UPS',servicelevel:{name:'Ground'}}]}),{status:200});
  };
  try{const q=await priceShipment(env,slug,address);return {q,bodies};}finally{globalThis.fetch=real;}
}
test('an uninsured-before original at the threshold is quoted with insurance for its full price (mocked Shippo)',async()=>{
  const slug=Object.entries(checkout).find(([,i])=>Number(i.amount)>=300&&Number(i.amount)<1000)[0];
  const {q,bodies}=await quote(slug);
  assert.deepEqual(bodies[0].extra.insurance,{amount:Number(checkout[slug].amount).toFixed(2),currency:'USD',content:`Original painting: ${checkout[slug].title}`});
  assert.equal(q.insurance.fee,'4.50');assert.equal(q.shipping,'12.50');
});
test('an original below the threshold is still quoted without insurance (mocked Shippo)',async()=>{
  const slug=Object.entries(checkout).find(([,i])=>Number(i.amount)<300&&!i.insuranceRequested)[0];
  const {q,bodies}=await quote(slug);
  assert.equal(bodies[0].extra,undefined);assert.equal(q.insurance,undefined);
});
