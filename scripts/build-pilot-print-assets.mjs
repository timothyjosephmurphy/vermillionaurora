// Portrait sample sheets fill the paper without added white margins or stretching.
// Keep the older content-addressed files available for already-placed orders.
import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import config from '../catalog/legacy-print-samples.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
import {portraitSampleCrop} from '../catalog/sample-layout.mjs';
const digest=b=>createHash('sha256').update(b).digest('hex'),assets={};
for(const id of ['painting-portrait-in-green','painting-portrait-in-gold']) {
  const art=config.artworks[id],product=products.find(p=>p.id===id);
  const liveSample=art?.sampleOnly===true&&art.liveSampleApproved===true&&!art.testOnly;
  if(!(art?.testOnly||liveSample)||art.dimensions.width!==12||art.dimensions.height!==15)throw Error('Pilot layout requires review after dimensions change');
  const source=await readFile(new URL('../'+product.image.src.slice(1),import.meta.url));
  if(digest(source)!==art.source.sha256)throw Error('Pilot source changed; review the layout');
  // Reproduce the previous sheets byte-for-byte. Their URLs must remain immutable.
  const fitted=await sharp(source).rotate().resize(1186,936,{fit:'inside'}).toBuffer({resolveWithObject:true});
  const legacy=await sharp({create:{width:1250,height:1000,channels:3,background:'#ffffff'}}).composite([{input:fitted.data,left:Math.floor((1250-fitted.info.width)/2),top:Math.floor((1000-fitted.info.height)/2)}]).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();
  const legacyHash=digest(legacy);
  assets[`/checkout/print-assets/${legacyHash}.jpg`]={base64:legacy.toString('base64'),sha256:legacyHash};
  if(liveSample){await mkdir(new URL('../static/print-samples/',import.meta.url),{recursive:true});await writeFile(new URL(`../static/print-samples/${legacyHash}.jpg`,import.meta.url),legacy);}
  // Enlargement changes pixel dimensions only; source detail remains low resolution.
  const w=1000,h=1250,crop=portraitSampleCrop(art.source);
  const data=await sharp(source).rotate().extract(crop).resize(w,h,{fit:'fill'}).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();
  const sha256=digest(data),path=`/checkout/print-assets/${sha256}.jpg`;
  assets[path]={base64:data.toString('base64'),sha256};
  if(liveSample){await mkdir(new URL('../static/print-samples/',import.meta.url),{recursive:true});await writeFile(new URL(`../static/print-samples/${sha256}.jpg`,import.meta.url),data);}
  for(const [key,scale] of [['full',1],['medium',.75],['small',.5]]) {
    const width=12*scale,height=15*scale,asset={provider:'finerworks',url:liveSample?`https://vermillionaurora.com/print-samples/${sha256}.jpg`:`https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev${path}`,sha256,sourceSha256:art.source.sha256,
      productCode:art.variants[key].sku,imageWidthIn:width,imageHeightIn:height,paperWidthIn:width,paperHeightIn:height,
      approved:true,layoutApproved:true,...(liveSample?{sampleOnly:true}:{sandboxOnly:true}),layout:'borderless-center-crop',crop,widthPx:w,heightPx:h};
    if(process.argv.includes('--write-config')){art.variants[key].asset=asset;art.enabled=true;if(!liveSample)art.sandboxQualityTestApproved=true;}
    else if(JSON.stringify(art.variants[key].asset)!==JSON.stringify(asset))throw Error('Pilot file configuration changed; regenerate and review');
  }
}
await writeFile(new URL('../cloudflare/print-test-assets.generated.mjs',import.meta.url),'// Generated sample sheets.\nexport default '+JSON.stringify(assets)+';\n');
if(process.argv.includes('--write-config'))await writeFile(new URL('../catalog/legacy-print-samples.json',import.meta.url),JSON.stringify(config,null,2)+'\n');
console.log('Built two borderless portrait sample sheets and retained both legacy order files.');
