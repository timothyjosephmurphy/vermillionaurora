import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import config from '../catalog/prints.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {editionLayouts,EDITION_LAYOUT,EDITION_BORDER_IN} from '../catalog/edition-layout.mjs';
import {finerworksProductCode} from '../catalog/finerworks-products.mjs';
const prepareTJ=process.argv.includes('--prepare-tj'),prepare=process.argv.includes('--prepare')||prepareTJ,digest=b=>createHash('sha256').update(b).digest('hex'),run=promisify(execFile);
const root=new URL('../',import.meta.url),cache=new URL('.cache/edition-sources/',root),output=new URL('static/print-editions/',root);
await mkdir(cache,{recursive:true});await mkdir(output,{recursive:true});
const tjIds=prepareTJ?JSON.parse(await readFile(new URL('catalog/tj-print-masters.json',root),'utf8')).map(r=>r.id):[];
// --only=id,id limits a preparation run to replaced or new masters so other approved files stay untouched.
const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7).split(',');
const selected=products.filter(p=>prepareTJ?tjIds.includes(p.id):prepare?p.artist==='Paul Murphy':config.artworks[p.id]?.sizing==='image-proportional').filter(p=>!only||only.includes(p.id));
let cursor=0,count=0;
await Promise.all(Array.from({length:4},async()=>{
  while(cursor<selected.length){
    const product=selected[cursor++],old=config.artworks[product.id];
    const sourceUrl=old?.source?.url||product.image.src,u=new URL(sourceUrl);
    const localMaster=u.origin==='https://vermillionaurora.com'&&/^\/print-masters\/[a-f0-9]{64}\.jpg$/.test(u.pathname);
    if((!localMaster&&u.origin!=='https://media.vermillionaurora.com')||u.username||u.password||u.search||u.hash)throw Error('Use an approved edition source');
    let bytes=localMaster?await readFile(new URL('static'+u.pathname,root)):undefined;
    if(!bytes&&old?.source?.sha256)try{bytes=await readFile(new URL(`${old.source.sha256}.jpg`,cache));}catch{}
    if(!bytes)for(let attempt=0;attempt<3;attempt++){
      try {
        // A fresh process discards partial output; curl --retry can concatenate
        // incomplete responses when its destination is stdout.
        const result=await run('curl',['--fail','--silent','--show-error','--location','--connect-timeout','15','--max-time','180',sourceUrl],{encoding:'buffer',maxBuffer:30*1024*1024});bytes=result.stdout;break;
      }catch(error){if(attempt===2||![6,7,18,28,52,56].includes(error.code))throw Error(`Could not download approved print source: ${product.id} (curl ${error.code})`);}
    }
    const sha256=digest(bytes);
    if(old?.source?.sha256&&old.source.sha256!==sha256)throw Error(`Print source changed: ${product.id}`);
    await writeFile(new URL(`${sha256}.jpg`,cache),bytes);
    const {data:normalized,info}=await sharp(bytes).rotate().removeAlpha().raw().toBuffer({resolveWithObject:true});
    const source={url:sourceUrl,widthPx:info.width,heightPx:info.height,sha256};
    if(!prepare&&JSON.stringify(old.source)!==JSON.stringify(source))throw Error(`Source measurements changed: ${product.id}`);
    const art=old||{enabled:false,sizing:'image-proportional',sizingApproved:true,paper:config.defaultPaper,source,variants:{}};
    const stock=papers.find(p=>p.paper===(art.paper||config.defaultPaper));
    for(const choice of editionLayouts(source,product.dimensions,config.minimumDpi,art.layoutOptions)){
      const {layoutSpec,image,paper,key}=choice,c=layoutSpec.content;
      // Contain the complete source; fit:inside and no enlargement preserve every edge.
      const border=Math.ceil(EDITION_BORDER_IN*layoutSpec.dpi);
      const widthLimited=(layoutSpec.widthPx-2*border)/info.width<=(layoutSpec.heightPx-2*border)/info.height;
      const resized=await sharp(normalized,{raw:{width:info.width,height:info.height,channels:info.channels}}).resize({...widthLimited?{width:c.width}:{height:c.height},withoutEnlargement:true}).raw().toBuffer({resolveWithObject:true});
      if(resized.info.width!==c.width||resized.info.height!==c.height)throw Error(`Unexpected fitted dimensions: ${product.id}`);
      const data=await sharp({create:{width:layoutSpec.widthPx,height:layoutSpec.heightPx,channels:3,background:'#ffffff'}}).composite([{input:resized.data,raw:{width:c.width,height:c.height,channels:resized.info.channels},left:c.left,top:c.top}]).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();
      const hash=digest(data),sku=finerworksProductCode(stock.media,stock.style,paper);
      const asset={provider:'finerworks',url:`https://vermillionaurora.com/print-editions/${hash}.jpg`,sha256:hash,sourceSha256:sha256,productCode:sku,imageWidthIn:image.width,imageHeightIn:image.height,paperWidthIn:paper.width,paperHeightIn:paper.height,approved:true,layoutApproved:true,layout:EDITION_LAYOUT,layoutSpec};
      if(prepare)art.variants[key]={...art.variants[key],sku,asset};
      else if(JSON.stringify(art.variants[key]?.asset)!==JSON.stringify(asset))throw Error(`Edition file needs review: ${product.id}/${key}`);
      await writeFile(new URL(`${hash}.jpg`,output),data);count++;
    }
    if(prepare)config.artworks[product.id]=art;
    console.log(`Prepared ${product.id}`);
  }
}));
if(prepare){config.artworks=Object.fromEntries(Object.entries(config.artworks).sort(([a],[b])=>a.localeCompare(b)));await writeFile(new URL('catalog/prints.json',root),JSON.stringify(config,null,2)+'\n');}
console.log(`Verified ${count} full-image print files for ${selected.length} artworks; no source images cropped or enlarged.`);
