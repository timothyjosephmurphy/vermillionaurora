import test from 'node:test';
import assert from 'node:assert/strict';
import {framedRetailPrice,reviewFramedPrice,FRAME_PRICING} from '../catalog/frame-pricing.mjs';
const quote={ok:true,quantity:1,currency:'USD',productionCost:'41.63',baseCost:'7.00',matCost:'6.63',secondMatCost:'0.00',frameCost:'21.00',glazingCost:'7.00',shippingIncluded:false,taxIncluded:false};
test('framing adds exact costs to the unframed artwork selling price without markup or rounding',()=>{
  assert.equal(framedRetailPrice(quote,'25.00'),'59.63');
  assert.equal(framedRetailPrice(quote,'40.00'),'74.63');
  assert.equal(framedRetailPrice({...quote,frameCost:'22.01',productionCost:'42.64'},'25.00'),'60.64');
});
test('rejects incomplete or inconsistent costs and a print cost increase that needs review',()=>{
  for(const change of [{productionCost:'41.64'},{baseCost:undefined},{quantity:2},{currency:'GBP'},{shippingIncluded:true},{taxIncluded:true},{frameCost:'0.00'},{baseCost:'8.00',productionCost:'42.63'}])assert.throws(()=>framedRetailPrice({...quote,...change},'25.00'));
});
test('quote refresh flags both higher and lower framing costs without changing the published amount',()=>{
  const saved={amount:'59.63',unframedAmount:'25.00',pricingRule:FRAME_PRICING};
  assert.equal(reviewFramedPrice(quote,'25.00',saved).needsReview,false);
  for(const frameCost of ['20.00','22.00']){
    const result=reviewFramedPrice({...quote,frameCost,productionCost:frameCost==='20.00'?'40.63':'42.63'},'25.00',saved);
    assert.equal(result.needsReview,true);assert.equal(result.amount,'59.63');
  }
  assert.equal(reviewFramedPrice(quote,'25.00',{...saved,pricingRule:'finerworks-3.5x-v1'}).needsReview,true);
});
