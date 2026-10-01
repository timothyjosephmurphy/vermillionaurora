import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import config from '../catalog/prints.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {editionLayouts,EDITION_LAYOUT} from '../catalog/edition-layout.mjs';
import {printOptions} from '../catalog/print-sizing.mjs';
import {groupPrintProducts} from '../cloudflare/finerworks-quotes.mjs';
const paintings=products.filter(p=>p.artist==='Paul Murphy');
test('all 39 paintings have 115 image-proportional, uncropped, 300-DPI layouts',()=>{
  assert.equal(paintings.length,39);let count=0;
  for(const p of paintings){
    const art=config.artworks[p.id];assert.equal(art.sizing,'image-proportional');assert.equal(art.sizingApproved,true);
    const options=printOptions(p,config,papers);assert(options.length);
    for(const o of options){
      count++;assert.equal(o.testOnly,false);assert.equal(o.sampleOnly,false);assert.equal(o.asset.layout,EDITION_LAYOUT);
      assert(o.resolution.dpi>=300);assert(o.paper.width>=4&&o.paper.height>=4);
      const c=o.layoutSpec.content,s=art.source;
      assert(c.width<=s.widthPx&&c.height<=s.heightPx);assert(c.left>=38&&c.top>=38);
      // Only sub-pixel resampling rounding; no forced aspect-ratio stretch.
      assert(Math.abs(c.width-c.height*s.widthPx/s.heightPx)<1.5);
      assert(o.image.width<o.paper.width&&o.image.height<o.paper.height);
      assert.equal(o.frameOptions.length,3);
      for(const framed of o.frameOptions){
        assert(framed.ready,`${framed.id}: ${framed.reasons.join(', ')}`);
        assert.equal(framed.asset.url,o.asset.url);assert.equal(framed.asset.sha256,o.asset.sha256);
        assert.equal(framed.mat.window.width,o.paper.width);assert.equal(framed.mat.window.height,o.paper.height);
        assert(framed.mat.outer.width>=o.paper.width+2&&framed.mat.outer.height>=o.paper.height+2);
        assert.equal(framed.unframedAmount,o.amount);assert(Number(framed.amount)>Number(o.amount));
      }
      if(art.enabled)assert(o.ready,`${p.id}/${o.key}: ${o.reasons.join(', ')}`);
    }
  }
  assert.equal(count,115);
});
test('#55 has one resolution-limited size without inventing original dimensions',()=>{
  const p=paintings.find(p=>p.id.endsWith('-55'));assert.equal(p.dimensions,null);
  const options=printOptions(p,config,papers);assert.equal(options.length,1);
  assert.deepEqual(options[0].paper,{width:4.76,height:4.52,unit:'in',provider:'finerworks',paper:'watercolor-bright-white',sku:'5M144M8S4.76X4.52'});
  assert(Math.abs(options[0].image.width-4.5)<.02);assert(Math.abs(options[0].image.height-4.27)<.02);
});
test('orientation does not alter original data, invalid metadata fails closed',()=>{
  const source={widthPx:3600,heightPx:4500},original={width:15,height:12,unit:'in'},copy=structuredClone(original);
  assert.equal(editionLayouts(source,original).length,3);assert.deepEqual(original,copy);
  assert.deepEqual(editionLayouts({widthPx:0,heightPx:4500},original),[]);
  assert.deepEqual(editionLayouts(source,original,72),[]);
  assert.deepEqual(editionLayouts(source,{width:12,height:15,unit:'unknown'}),[]);
});
test('unapproved, changed and sample-exemption assets cannot become editions',()=>{
  const p=paintings[0];
  for(const mutate of [a=>a.sizingApproved=false,a=>a.variants.full.asset.approved=false,a=>a.variants.full.asset.layoutApproved=false,a=>a.variants.full.asset.sourceSha256='0'.repeat(64),a=>a.variants.full.asset.layoutSpec.content.left++,a=>a.variants.full.asset.sampleOnly=true,a=>a.variants.full.asset.url='https://vermillionaurora.com/other.jpg']){
    const c=structuredClone(config);c.artworks[p.id].enabled=true;mutate(c.artworks[p.id]);
    assert.equal(printOptions(p,c,papers).find(o=>o.key==='full').ready,false);
  }
});
test('approved inset layout uses exact paper SKU; other dimension mismatches stay blocked',()=>{
  const item={id:'print-test',quantity:1,provider:'finerworks',sku:'5M144M8S4.76X4.52',paperSize:{width:4.76,height:4.52},imageSize:{width:4.5,height:4.26},layout:EDITION_LAYOUT,sizeBasis:'image-proportional',layoutApproved:true};
  assert.equal(groupPrintProducts([item],'test')[0].product_sku,item.sku);
  for(const alter of [i=>i.layoutApproved=false,i=>delete i.layout,i=>i.imageSize.width=5,i=>i.imageSize.height=NaN,i=>i.paperSize.width=4.75]){const changed=structuredClone(item);alter(changed);assert.throws(()=>groupPrintProducts([changed],'test'));}
});
test('every generated print file matches its approved hash, paper dimensions and white safety edge',async()=>{
  for(const p of paintings)for(const {asset} of Object.values(config.artworks[p.id].variants)){
    const bytes=await readFile(new URL('../static/print-editions/'+asset.sha256+'.jpg',import.meta.url));
    assert.equal(createHash('sha256').update(bytes).digest('hex'),asset.sha256);
    const metadata=await sharp(bytes).metadata();assert.equal(metadata.width,asset.layoutSpec.widthPx);assert.equal(metadata.height,asset.layoutSpec.heightPx);
    const edge=await sharp(bytes).extract({left:0,top:0,width:metadata.width,height:4}).raw().toBuffer();assert(edge.every(v=>v>=250));
  }
});
