// Deterministic print-sheet layout; preserve the supplied artwork without cropping
// or stretching. These low-resolution files are for the owner's sandbox pilots.
import sharp from 'sharp';
import {readFile,writeFile} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import config from '../catalog/prints.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
const digest=b=>createHash('sha256').update(b).digest('hex'),assets={};
for(const id of ['painting-portrait-in-green','painting-portrait-in-gold']) {
  const art=config.artworks[id],product=products.find(p=>p.id===id);
  if(!art?.testOnly||art.dimensions.width!==15||art.dimensions.height!==12)throw Error('Pilot layout requires review after dimensions change');
  const source=await readFile(new URL('../'+product.image.src.slice(1),import.meta.url));
  if(digest(source)!==art.source.sha256)throw Error('Pilot source changed; review the layout');
  // 2.5% clear space at every edge protects the complete image from trimming.
  // Enlargement changes pixel dimensions only; source detail remains low resolution.
  const w=1250,h=1000,pad=32;
  const fitted=await sharp(source).rotate().resize(w-2*pad,h-2*pad,{fit:'inside'}).toBuffer({resolveWithObject:true});
  const data=await sharp({create:{width:w,height:h,channels:3,background:'#ffffff'}}).composite([{input:fitted.data,left:Math.floor((w-fitted.info.width)/2),top:Math.floor((h-fitted.info.height)/2)}]).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();
  const sha256=digest(data),path=`/checkout/print-assets/${sha256}.jpg`;
  assets[path]={base64:data.toString('base64'),sha256};
  for(const [key,scale] of [['full',1],['medium',.75],['small',.5]]) {
    const width=15*scale,height=12*scale,asset={provider:'finerworks',url:`https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev${path}`,sha256,sourceSha256:art.source.sha256,
      productCode:art.variants[key].sku,imageWidthIn:width,imageHeightIn:height,paperWidthIn:width,paperHeightIn:height,
      approved:true,layoutApproved:true,sandboxOnly:true,layout:'contain-with-clear-trim-margin',widthPx:w,heightPx:h};
    if(process.argv.includes('--write-config')){art.variants[key].asset=asset;art.enabled=true;art.sandboxQualityTestApproved=true;}
    else if(JSON.stringify(art.variants[key].asset)!==JSON.stringify(asset))throw Error('Pilot file configuration changed; regenerate and review');
  }
}
await writeFile(new URL('../cloudflare/print-test-assets.generated.mjs',import.meta.url),'// Generated test sheets; never use in live fulfillment.\nexport default '+JSON.stringify(assets)+';\n');
if(process.argv.includes('--write-config'))await writeFile(new URL('../catalog/prints.json',import.meta.url),JSON.stringify(config,null,2)+'\n');
console.log('Built two preservation-first sandbox print sheets.');
