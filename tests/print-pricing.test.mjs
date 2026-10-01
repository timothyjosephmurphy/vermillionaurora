import test from 'node:test';
import assert from 'node:assert/strict';
import {PRINT_PRICING,printRetailPrice,reviewPrintPrice,publishedPrintPrice} from '../catalog/print-pricing.mjs';
import {printOptions} from '../catalog/print-sizing.mjs';
import config from '../catalog/legacy-print-samples.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
test('3.5x manufacturing cost, rounded UP to $5, minimum $25',()=>{
  for(const [cost,expected] of [['7.00','25.00'],['12.00','45.00'],['21.00','75.00'],['20.00','70.00'],['20.01','75.00'],['0.01','25.00'],['15.00','55.00']]) assert.equal(printRetailPrice(cost),expected);
});
test('rejects unknown, zero, negative, non-USD and malformed costs',()=>{
  for(const value of [null,undefined,0,7,'','0.00','-1.00','NaN','7','7.000','1e3','1000000000.00']) assert.throws(()=>printRetailPrice(value));
  assert.throws(()=>printRetailPrice('7.00','GBP'));
});
test('quote refresh flags changes without overwriting published prices',()=>{
  const q={ok:true,quantity:1,productionCost:'13.00',shippingIncluded:false,taxIncluded:false};
  assert.deepEqual(reviewPrintPrice(q,{amount:'45.00'}),{ruleId:PRINT_PRICING.id,currency:'USD',amount:'45.00',recommendedAmount:'50.00',needsReview:true,overridden:false});
  assert.throws(()=>reviewPrintPrice({...q,shippingIncluded:true}));
  assert.throws(()=>reviewPrintPrice({...q,quantity:2}));
});
test('explicit overrides survive refresh and require a reason and $25 floor',()=>{
  const q={ok:true,quantity:1,productionCost:'7.00',shippingIncluded:false,taxIncluded:false};
  assert.equal(reviewPrintPrice(q,{priceOverride:{amount:'35.00',reason:'Hand-finished edition'}}).needsReview,false);
  assert.throws(()=>reviewPrintPrice(q,{priceOverride:{amount:'24.00',reason:'Discount'}}));
  assert.throws(()=>reviewPrintPrice(q,{priceOverride:{amount:'35.00',reason:''}}));
  assert.equal(publishedPrintPrice({sku:'old',pricingRule:PRINT_PRICING.id,amount:'25.00',quotedAt:'2026-09-30'},'new'),null);
});
test('both pilot paintings use saved $75/$45/$25 FinerWorks prices, never legacy PDF approvals',()=>{
  for(const [id,art] of Object.entries(config.artworks).filter(([,a])=>a.sampleOnly)) {
    const product={id,type:'painting',dimensions:art.dimensions};
    const options=printOptions(product,config,papers);
    assert.deepEqual(options.map(o=>o.amount),['75.00','45.00','25.00']);
    assert.deepEqual(options.map(o=>o.scale),[1,.75,.5]);
    assert(options.every(o=>o.provider==='finerworks' && o.paper.sku.startsWith('5M144M8S') && o.ready && o.sampleOnly && !o.testOnly && o.asset.sampleOnly));
    assert(options.every(o=>o.image.width<=art.dimensions.width&&o.image.height<=art.dimensions.height));
  }
});
test('changing dimensions, oversized overrides, or test-only flags cannot open live sales',()=>{
  const id=Object.keys(config.artworks)[0], c=structuredClone(config), p={id,type:'painting',dimensions:{width:10,height:8,unit:'in'}};
  assert(printOptions(p,c,papers)[0].reasons.includes('Print dimensions exceed the recorded original'));
  c.artworks[id].scales={full:1.1};assert.throws(()=>printOptions(p,c,papers));
  assert.equal(printOptions({id:'unknown',type:'painting',dimensions:p.dimensions},config,papers)[0].amount,null);
});
test('low-resolution live samples require explicit sample approval and exact approved assets',()=>{
  const id=Object.keys(config.artworks)[0],p={id,type:'painting',dimensions:config.artworks[id].dimensions};
  for(const change of [a=>a.liveSampleApproved=false,a=>a.sampleOnly=false,a=>a.variants.small.asset.approved=false,a=>a.variants.small.asset.sourceSha256='0'.repeat(64),a=>a.variants.small.asset.url='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev/checkout/print-assets/'+a.variants.small.asset.sha256+'.jpg']){
    const c=structuredClone(config);change(c.artworks[id]);assert.equal(printOptions(p,c,papers).find(o=>o.key==='small').ready,false);
  }
});
