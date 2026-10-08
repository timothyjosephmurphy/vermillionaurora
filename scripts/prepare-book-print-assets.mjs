import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import path from 'node:path';
import manifest from '../catalog/book-galleries.json' with {type:'json'};
import config from '../catalog/prints.json' with {type:'json'};
import papers from '../catalog/finerworks-papers.json' with {type:'json'};
import {editionLayouts,EDITION_LAYOUT} from '../catalog/edition-layout.mjs';
import {finerworksProductCode} from '../catalog/finerworks-products.mjs';
const work=process.argv[2],digest=b=>createHash('sha256').update(b).digest('hex'),artworks={},uploads=[];
await mkdir(path.join(work,'prints'),{recursive:true});
const stock=papers.find(p=>p.paper===config.defaultPaper);
for(const e of manifest.artworks){
 const file=path.join(work,'media',e.key+'.jpg'),bytes=await readFile(file);
 if(digest(bytes)!==e.masterSha256)throw Error('Extraction mismatch: '+e.id);
 for(const ext of ['jpg','webp']){const filename=e.key+'.'+ext,data=await readFile(path.join(work,'media',filename));uploads.push({file:path.join('media',filename),key:'images/book-galleries/v1/'+filename,sha256:digest(data),size:data.length,contentType:ext==='jpg'?'image/jpeg':'image/webp'});}
 // Corrected display photos are uploaded by upload-book-photo-corrections.yml; print sheets would need their own corrected source.
 if(e.photoCorrection&&e.printCandidate)throw Error('Corrected display photo has no print source: '+e.id);
 if(!e.printCandidate)continue;
 const source={url:e.masterUrl,widthPx:e.widthPx,heightPx:e.heightPx,sha256:e.masterSha256};
 const variants={};
 for(const c of editionLayouts(source,null,300)){
  const spec=c.layoutSpec,p=spec.content;
  const pic=await sharp(bytes).resize(p.width,p.height,{fit:'fill',withoutEnlargement:true}).toBuffer();
  const data=await sharp({create:{width:spec.widthPx,height:spec.heightPx,channels:3,background:'#ffffff'}}).composite([{input:pic,left:p.left,top:p.top}]).jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();
  const sha=digest(data),sku=finerworksProductCode(stock.media,stock.style,c.paper),filename=sha+'.jpg';
  await writeFile(path.join(work,'prints',filename),data);
  uploads.push({file:path.join('prints',filename),key:'images/book-galleries/v1/prints/'+filename,sha256:sha,size:data.length,contentType:'image/jpeg'});
  variants[c.key]={sku,asset:{provider:'finerworks',url:'https://media.vermillionaurora.com/images/book-galleries/v1/prints/'+filename,sha256:sha,sourceSha256:source.sha256,productCode:sku,imageWidthIn:c.image.width,imageHeightIn:c.image.height,paperWidthIn:c.paper.width,paperHeightIn:c.paper.height,approved:true,layoutApproved:true,layout:EDITION_LAYOUT,layoutSpec:spec}};
 }
 if(Object.keys(variants).length)artworks[e.id]={enabled:false,sizing:'image-proportional',sizingApproved:true,paper:config.defaultPaper,source,variants};
}
const unique=[...new Map(uploads.map(u=>[u.key,u])).values()];
await writeFile('catalog/book-prints.json',JSON.stringify(artworks,null,2)+'\n');
await writeFile(path.join(work,'uploads.json'),JSON.stringify(unique,null,2)+'\n');
console.log(`Prepared ${unique.length} R2 objects; ${Object.keys(artworks).length} print artworks, ${Object.values(artworks).reduce((n,a)=>n+Object.keys(a.variants).length,0)} sizes.`);
