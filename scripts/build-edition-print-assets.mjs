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
const prepare=process.argv.includes('--prepare'),digest=b=>createHash('sha256').update(b).digest('hex'),run=promisify(execFile);
const root=new URL('../',import.meta.url),cache=new URL('.cache/edition-sources/',root),output=new URL('static/print-editions/',root);
await mkdir(cache,{recursive:true});await mkdir(output,{recursive:true});
const selected=products.filter(p=>prepare?p.artist==='Paul Murphy':config.artworks[p.id]?.sizing==='image-proportional');
let cursor=0,count=0;
await Promise.all(Array.from({length:4},async()=>{
  while(cursor<selected.length){
    const product=selected[cursor++],old=config.artworks[product.id];
    const sourceUrl=old?.source?.url||product.image.src,u=new URL(sourceUrl);
    if(u.origin!=='https://media.vermillionaurora.com'||u.username||u.password||u.search||u.hash)throw Error('Edition sources must be hosted on the artwork media domain');
    let bytes;
    if(old?.source?.sha256)try{bytes=await readFile(new URL(`${old.source.sha256}.jpg`,cache));}catch{}
    if(!bytes){const result=await run('curl',['--fail','--silent','--show-error','--location','--max-time','60','--retry','2',sourceUrl],{encoding:'buffer',maxBuffer:30*1024*1024});bytes=result.stdout;}
    const sha256=digest(bytes);
    if(old?.source?.sha256&&old.source.sha256!==sha256)throw Error(`Print source changed: ${product.id}`);
    await writeFile(new URL(`${sha256}.jpg`,cache),bytes);
    const {data:normalized,info}=await sharp(bytes).rotate().toBuffer({resolveWithObject:true});
    const source={url:sourceUrl,widthPx:info.width,heightPx:info.height,sha256};
    if(!prepare&&JSON.stringify(old.source)!==JSON.stringify(source))throw Error(`Source measurements changed: ${product.id}`);
    const art=old||{enabled:false,sizing:'image-proportional',sizingApproved:true,paper:config.defaultPaper,source,variants:{}};
    const stock=papers.find(p=>p.paper===(art.paper||config.defaultPaper));
    for(const choice of editionLayouts(source,product.dimensions,config.minimumDpi)){
      const {layoutSpec,image,paper,key}=choice,c=layoutSpec.content;
      // Contain the complete source; fit:inside and no enlargement preserve every edge.
      const border=Math.ceil(EDITION_BORDER_IN*layoutSpec.dpi);
      const widthLimited=(layoutSpec.widthPx-2*border)/info.width<=(layoutSpec.heightPx-2*border)/info.height;
      const resized=await sharp(normalized).resize({...widthLimited?{width:c.width}:{height:c.height},withoutEnlargement:true}).toBuffer({resolveWithObject:true});
      if(resized.info.width!==c.width||resized.info.height!==c.height)throw Error(`Unexpected fitted dimensions: ${product.id}`);
      const data=await sharp({create:{width:layoutSpec.widthPx,height:layoutSpec.heightPx,channels:3,background:'#ffffff'}}).composite([{input:resized.data,left:c.left,top:c.top}]).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();
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
