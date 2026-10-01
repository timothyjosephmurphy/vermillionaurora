import test from 'node:test';
import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
import config from '../catalog/legacy-print-samples.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
import {portraitSampleCrop,reviewedPortraitSample} from '../catalog/sample-layout.mjs';

test('portrait originals, print sheets and crops agree without added paper margins',async()=>{
  for(const id of ['painting-portrait-in-gold','painting-portrait-in-green']) {
    const art=config.artworks[id],product=products.find(p=>p.id===id),asset=art.variants.small.asset;
    assert.deepEqual(product.dimensions,{width:12,height:15,unit:'in'});assert.deepEqual(art.dimensions,product.dimensions);
    assert.equal(reviewedPortraitSample(asset,art.source,{width:6,height:7.5}),true);
    assert.equal(asset.crop.width/asset.crop.height,.8);
    const data=await readFile(new URL('../static/print-samples/'+asset.sha256+'.jpg',import.meta.url));
    assert.equal(createHash('sha256').update(data).digest('hex'),asset.sha256);
    const {data:pixels,info}=await sharp(data).removeAlpha().raw().toBuffer({resolveWithObject:true});
    assert.equal(info.width,1000);assert.equal(info.height,1250);
    // Each sheet edge contains artwork, rather than a baked-in white paper band.
    const edges=[[],[],[],[]];
    for(let x=0;x<info.width;x++){edges[0].push(pixels[x*3]);edges[1].push(pixels[((info.height-1)*info.width+x)*3]);}
    for(let y=0;y<info.height;y++){edges[2].push(pixels[y*info.width*3]);edges[3].push(pixels[(y*info.width+info.width-1)*3]);}
    assert(edges.every(edge=>edge.some(value=>value<220)));
    const changed=structuredClone(asset);changed.crop.left++;assert.equal(reviewedPortraitSample(changed,art.source,{width:6,height:7.5}),false);
  }
  assert.throws(()=>portraitSampleCrop({widthPx:0,heightPx:390}));
});
test('the files referenced by existing paid orders remain byte-for-byte unchanged',async()=>{
  for(const sha of ['1b2ecbeb6d8c7ce0f1ab3ea91b0da547efc6d31fb5de30aa2eba858f0138b514','787d8ece2ad8e68971a89d559bd910cbca4049e2ff1afc3e1bda567b11173765']){
    const data=await readFile(new URL('../static/print-samples/'+sha+'.jpg',import.meta.url));
    assert.equal(createHash('sha256').update(data).digest('hex'),sha);
  }
});
