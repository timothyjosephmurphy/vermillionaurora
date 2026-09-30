import test from 'node:test';
import assert from 'node:assert/strict';
import {scaledDimensions,fitSheet,resolutionFor,printOptions} from '../catalog/print-sizing.mjs';
const p={id:'example',type:'painting',dimensions:{width:24,height:48,unit:'in'}};
test('scales both dimensions, preserves proportions and converts centimetres',()=>{
  assert.deepEqual([1,.75,.5].map(s=>scaledDimensions(p.dimensions,s)),[{width:24,height:48,unit:'in'},{width:18,height:36,unit:'in'},{width:12,height:24,unit:'in'}]);
  assert.deepEqual(scaledDimensions({width:25.4,height:50.8,unit:'cm'},.5),{width:5,height:10,unit:'in'});
  assert.throws(()=>scaledDimensions(p.dimensions,1.1));
});
test('fits the complete image into the smallest paper without rounding down or cropping',()=>{
  const papers=[{sku:'SMALL',width:10,height:20},{sku:'FIT',width:16,height:24},{sku:'LARGE',width:24,height:36}];
  assert.equal(fitSheet({width:12,height:24},papers).sku,'FIT');
  const rotated=fitSheet({width:24,height:12},papers);assert.equal(rotated.rotated,true);assert.equal(rotated.marginY,2);
  assert.equal(fitSheet({width:25,height:37},papers),null);
});
test('detects inadequate resolution and mismatched source proportions',()=>{
  assert.equal(resolutionFor({widthPx:7200,heightPx:14400},p.dimensions).dpi,300);
  assert(resolutionFor({widthPx:1000,heightPx:1000},p.dimensions).aspectError>0.5);
});
test('purchase eligibility requires verified dimensions, paper, source, price and exact approved layout',()=>{
  const config={defaultPaper:'ema',minimumDpi:300,papers:{ema:{label:'EMA'}},artworks:{example:{enabled:true,dimensionsVerified:true,source:{widthPx:7200,heightPx:14400,sha256:'a'.repeat(64)},variants:{full:{amount:'100.00',asset:{url:'https://media.vermillionaurora.com/prints/full.pdf',approved:true,sourceSha256:'a'.repeat(64),sha256:'b'.repeat(64),imageWidthIn:24,imageHeightIn:48,paperWidthIn:24,paperHeightIn:48}}}}}};
  const papers=[{paper:'ema',sku:'GLOBAL-FAP-24X48',width:24,height:48,verifiedUS:true}];
  assert.equal(printOptions(p,config,papers)[0].ready,true);
  assert.equal(printOptions(p,config,papers)[1].ready,false);
  config.artworks.example.source.widthPx=600;assert.equal(printOptions(p,config,papers)[0].ready,false);
  config.artworks.example.source.widthPx=7200;config.artworks.example.variants.full.asset.paperWidthIn=26;assert.equal(printOptions(p,config,papers)[0].ready,false);
});
test('sandbox test artwork may bypass print quality gates without becoming a production-ready variant',()=>{
  const config={defaultPaper:'ema',minimumDpi:300,papers:{ema:{label:'EMA'}},artworks:{example:{enabled:true,testOnly:true,dimensionsVerified:true,source:{widthPx:1000,heightPx:1000,sha256:'a'.repeat(64)},variants:{full:{amount:'1.00',asset:{url:'https://vermillionaurora.com/prints/test.pdf',approved:true,sourceSha256:'a'.repeat(64),sha256:'b'.repeat(64),imageWidthIn:24,imageHeightIn:48,paperWidthIn:24,paperHeightIn:48}}}}}};
  const papers=[{paper:'ema',sku:'GLOBAL-FAP-24X48',width:24,height:48,verifiedUS:false}];
  const option=printOptions(p,config,papers)[0];
  assert.equal(option.ready,true);assert.equal(option.testOnly,true);
});
