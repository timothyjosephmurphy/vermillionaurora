import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFile} from 'node:child_process';
import {promisify} from 'node:util';
import config from '../catalog/prints.json' with {type:'json'};
import products from '../catalog/all-products.mjs';
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {editionLayouts,EDITION_LAYOUT,editionBorderIn} from '../catalog/edition-layout.mjs';
import {finerworksProductCode} from '../catalog/finerworks-products.mjs';
import bookPrints from '../catalog/book-prints.json' with {type:'json'};
import {borderedEdition} from './bordered-edition.mjs';
import {renderEditionSheet} from './render-edition-sheet.mjs';
import {reproduceFrozenPrints} from './reproduce-frozen-print-editions.mjs';
// --prepare-bordered records the unframed outer-border files without changing any padded edition.
// --prepare-one-inch rebuilds every edition at the 1 inch margin and withholds prices until quoted.
const prepareBordered=process.argv.includes('--prepare-bordered');
const prepareOneInch=process.argv.includes('--prepare-one-inch');
const prepareArchive=process.argv.includes('--prepare-archive'),prepareOlder=process.argv.includes('--prepare-older-work'),prepareTJ=process.argv.includes('--prepare-tj')||prepareArchive||prepareOlder,prepare=process.argv.includes('--prepare')||prepareTJ||prepareOneInch,digest=b=>createHash('sha256').update(b).digest('hex'),run=promisify(execFile);
const root=new URL('../',import.meta.url),cache=new URL('.cache/edition-sources/',root),output=new URL('static/print-editions/',root);
await mkdir(cache,{recursive:true});await mkdir(new URL('thumbs/',output),{recursive:true});
const tjIds=prepareTJ?JSON.parse(await readFile(new URL(prepareOlder?'catalog/older-work-print-masters.json':prepareArchive?'catalog/archive-print-masters.json':'catalog/tj-print-masters.json',root),'utf8')).map(r=>r.id):[];
// --only=id,id limits a preparation run to replaced or new masters so other approved files stay untouched.
const only=process.argv.find(a=>a.startsWith('--only='))?.slice(7).split(',');
const selected=products.filter(p=>prepareOneInch?config.artworks[p.id]?.sizing==='image-proportional':prepareTJ?tjIds.includes(p.id):prepare?p.artist==='Paul Murphy':config.artworks[p.id]?.sizing==='image-proportional').filter(p=>!only||only.includes(p.id));
let cursor=0,count=0;
await Promise.all(Array.from({length:4},async()=>{
  while(cursor<selected.length){
    const product=selected[cursor++],old=config.artworks[product.id];
    const sourceUrl=old?.source?.url||product.image.src,u=new URL(sourceUrl);
    const localMaster=u.origin==='https://vermillionaurora.com'&&/^\/print-masters\/[a-f0-9]{64}\.jpg$/.test(u.pathname);
    if((!localMaster&&u.origin!=='https://media.vermillionaurora.com')||u.username||u.password||u.search||u.hash)throw Error('Use an approved edition source');
    let bytes=localMaster?await readFile(new URL('static'+u.pathname,root)):undefined;
    if(!bytes&&old?.source?.sha256)try{bytes=await readFile(new URL(`${old.source.sha256}.jpg`,cache));}catch{}
    if(!bytes)bytes=await fetchBytes(sourceUrl,`Could not download approved print source: ${product.id}`);
    const sha256=digest(bytes);
    if(old?.source?.sha256&&old.source.sha256!==sha256)throw Error(`Print source changed: ${product.id}`);
    await writeFile(new URL(`${sha256}.jpg`,cache),bytes);
    const source={url:sourceUrl,widthPx:old?.source?.widthPx,heightPx:old?.source?.heightPx,sha256};
    if(!prepare){
      const meta=await sharp(bytes).rotate().metadata();
      source.widthPx=meta.width;source.heightPx=meta.height;
      if(JSON.stringify(old.source)!==JSON.stringify(source))throw Error(`Source measurements changed: ${product.id}`);
    } else if(old?.source) Object.assign(source,old.source,{sha256});
    const art=old||{enabled:false,sizing:'image-proportional',sizingApproved:true,paper:config.defaultPaper,source,variants:{}};
    const stock=papers.find(p=>p.paper===(art.paper||config.defaultPaper));
    const borderIn=editionBorderIn(art.layoutOptions);
    if(borderIn==null)throw Error(`Invalid edition margin: ${product.id}`);
    const choices=editionLayouts(source,product.dimensions,config.minimumDpi,art.layoutOptions);
    if(prepareOneInch){
      art.enabled=false;
      art.variants=Object.fromEntries(Object.entries(art.variants||{}).filter(([key])=>choices.some(c=>c.key===key)));
    }
    for(const choice of choices){
      const {layoutSpec,image,paper,key}=choice;
      let data;try{data=await renderEditionSheet(bytes,choice,borderIn,true);}catch(error){throw Error(`${product.id}/${key}: ${error.message}`);}
      const hash=digest(data),sku=finerworksProductCode(stock.media,stock.style,paper);
      const asset={provider:'finerworks',url:`https://vermillionaurora.com/print-editions/${hash}.jpg`,sha256:hash,sourceSha256:sha256,productCode:sku,imageWidthIn:image.width,imageHeightIn:image.height,paperWidthIn:paper.width,paperHeightIn:paper.height,approved:true,layoutApproved:true,layout:EDITION_LAYOUT,layoutSpec};
      if(prepareOneInch)art.variants[key]={sku,asset};
      else if(prepare)art.variants[key]={...art.variants[key],sku,asset};
      else if(JSON.stringify(art.variants[key]?.asset)!==JSON.stringify(asset))throw Error(`Edition file needs review: ${product.id}/${key}`);
      await writeFile(new URL(`${hash}.jpg`,output),data);count++;
      await writeFile(new URL(`thumbs/${hash}.jpg`,output),await sharp(data).resize({width:1000,height:1000,fit:'inside',withoutEnlargement:true}).jpeg({quality:80}).toBuffer());
      // Style 9's half-inch lab border would crop a 1 inch white margin off the sheet.
      if(borderIn>=1){if(art.variants[key]?.bordered){if(!prepareOneInch)throw Error(`Style 9 file is not sold with a 1 inch margin: ${product.id}/${key}`);delete art.variants[key].bordered;}}
      else if(await writeBordered(data,choice,asset,stock,art.variants,key,prepare||prepareBordered))count++;
    }
    if(prepare)config.artworks[product.id]=art;
    console.log(`Prepared ${product.id}`);
  }
}));
// Book editions are rendered from the book master. The 1 inch sheet is a site file.
// Older R2 sheets stay in place for orders that already paid for them.
const books=Object.entries(bookPrints);
let bookCursor=0;
await Promise.all(Array.from({length:4},async()=>{
  while(bookCursor<books.length){
    const [id,art]=books[bookCursor++];
    const sourceUrl=art.source?.url;
    if(!sourceUrl)throw Error(`Missing book print source: ${id}`);
    let bytes;try{bytes=await readFile(new URL(`${art.source.sha256}.jpg`,cache));}catch{}
    if(!bytes)bytes=await fetchBytes(sourceUrl,`Could not download book print source: ${id}`);
    if(digest(bytes)!==art.source.sha256)throw Error(`Book print source changed: ${id}`);
    await writeFile(new URL(`${art.source.sha256}.jpg`,cache),bytes);
    const stock=papers.find(p=>p.paper===(art.paper||config.defaultPaper));
    const borderIn=editionBorderIn(art.layoutOptions);
    if(borderIn==null)throw Error(`Invalid book margin: ${id}`);
    const choices=editionLayouts(art.source,null,config.minimumDpi,art.layoutOptions);
    if(prepareOneInch){
      art.enabled=false;
      art.variants=Object.fromEntries(Object.entries(art.variants||{}).filter(([key])=>choices.some(c=>c.key===key)));
    }
    for(const choice of choices){
      const {layoutSpec,image,paper,key}=choice;
      let data;try{data=await renderEditionSheet(bytes,choice,borderIn,true);}catch(error){throw Error(`${id}/${key}: ${error.message}`);}
      const hash=digest(data),sku=finerworksProductCode(stock.media,stock.style,paper);
      const asset={provider:'finerworks',url:`https://vermillionaurora.com/print-editions/${hash}.jpg`,sha256:hash,sourceSha256:art.source.sha256,productCode:sku,imageWidthIn:image.width,imageHeightIn:image.height,paperWidthIn:paper.width,paperHeightIn:paper.height,approved:true,layoutApproved:true,layout:EDITION_LAYOUT,layoutSpec};
      const saved=art.variants[key];
      if(prepareOneInch)art.variants[key]={sku,asset};
      else if(!saved||JSON.stringify(saved.asset)!==JSON.stringify(asset)||saved.sku!==sku)throw Error(`Book edition file needs review: ${id}/${key}`);
      await writeFile(new URL(`${hash}.jpg`,output),data);count++;
      await writeFile(new URL(`thumbs/${hash}.jpg`,output),await sharp(data).resize({width:1000,height:1000,fit:'inside',withoutEnlargement:true}).jpeg({quality:80}).toBuffer());
      if(borderIn<1&&await writeBordered(data,choice,asset,stock,art.variants,key,prepareBordered))count++;
    }
    console.log(`Prepared book ${id}`);
  }
}));
async function fetchBytes(url,label){
  for(let attempt=0;attempt<3;attempt++){
    try{return (await run('curl',['--fail','--silent','--show-error','--location','--connect-timeout','15','--max-time','180',url],{encoding:'buffer',maxBuffer:60*1024*1024})).stdout;}
    catch(error){if(attempt===2||![6,7,18,28,52,56].includes(error.code))throw Error(`${label} (curl ${error.code})`);}
  }
}
async function writeBordered(padded,choice,asset,stock,variants,key,record){
  const bordered=await borderedEdition(padded,choice,asset,stock);
  if(!bordered)return false;
  const v=variants[key]||{};
  if(record)variants[key]={...v,bordered:{...v.bordered,sku:bordered.sku,asset:bordered.asset}};
  else if(JSON.stringify(v.bordered?.asset)!==JSON.stringify(bordered.asset)||v.bordered?.sku!==bordered.sku)throw Error(`Bordered edition file needs review: ${asset.sha256} (${key})`);
  await writeFile(new URL(`${bordered.asset.sha256}.jpg`,output),bordered.data);
  await writeFile(new URL(`thumbs/${bordered.asset.sha256}.jpg`,output),await sharp(bordered.data).resize({width:1000,height:1000,fit:'inside',withoutEnlargement:true}).jpeg({quality:80}).toBuffer());
  return true;
}
if(prepareOneInch){
  config.saleHold='1 inch white margin (full-image-white-border-v2) on FinerWorks style 8. Prices and frames are withheld until a live FinerWorks quote is approved.';
  config.artworks=Object.fromEntries(Object.entries(config.artworks).sort(([a],[b])=>a.localeCompare(b)));
  await writeFile(new URL('catalog/prints.json',root),JSON.stringify(config,null,2)+'\n');
  const sortedBooks=Object.fromEntries(Object.entries(bookPrints).sort(([a],[b])=>a.localeCompare(b)));
  await writeFile(new URL('catalog/book-prints.json',root),JSON.stringify(sortedBooks,null,2)+'\n');
}else if(prepareBordered)await writeFile(new URL('catalog/book-prints.json',root),JSON.stringify(bookPrints,null,2)+'\n');
if(prepare&&!prepareOneInch){config.artworks=Object.fromEntries(Object.entries(config.artworks).sort(([a],[b])=>a.localeCompare(b)));await writeFile(new URL('catalog/prints.json',root),JSON.stringify(config,null,2)+'\n');}
await reproduceFrozenPrints(root);
console.log(`Verified ${count} one-inch print files for ${selected.length} artworks and ${books.length} book editions; no source images cropped or enlarged.`);
