// Builds the small WebP previews for the all-paintings walls (/gallery/wall/all/ and /gallery/wall/paul/).
// Paintings that already sit on the print wall reuse its /gallery-wall previews; every other painting
// is measured here, previews are written to static/wall-paintings/, and the result is recorded in
// catalog/paintings-wall-images.json. The full photo is never upscaled and stays the last source.
// Run: node scripts/build-paintings-wall-assets.mjs   (Paul's photos are fetched from the media host.)
import {mkdir,readFile,writeFile,access} from 'node:fs/promises';
import {createHash} from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {resolve,join} from 'node:path';
import sharp from 'sharp';
import {scaledPaintings} from '../src/data/paintings-wall-selection.mjs';
import {wallArtworks} from '../src/data/gallery-wall.mjs';

export const PREVIEW_WIDTHS=[320,960,1920];
// Deepest zoom level: the sharpest photo we have, re-encoded no wider than this (print masters are never linked).
export const MAX_WALL_WIDTH=2880;
const readJson=f=>readFile(resolve(f),'utf8').then(JSON.parse);
const bookPrints=await readJson('catalog/book-prints.json');
const masters=new Map([...(await readJson('catalog/tj-print-masters.json')),...(await readJson('catalog/archive-print-masters.json'))].map(m=>[m.id,m.local?'/'+m.local.replace(/^static\//,''):m.url]));
// Candidate photos for one painting, best first after measuring: the page photo, its full-size file, the book scan, the print master.
const candidates=p=>[...new Set([p.image.src,p.image.fullSrc,bookPrints[p.id]?.source?.url,masters.get(p.id)].filter(Boolean))];
const out=resolve('static/wall-paintings'),manifestPath=resolve('catalog/paintings-wall-images.json');
const onPrintWall=new Set(wallArtworks.map(a=>a.id));
const exists=f=>access(f).then(()=>true,()=>false);
async function load(src){
  if(src.startsWith('https://tjm.art/')&&await exists(resolve('static',src.slice(16))))return readFile(resolve('static',src.slice(16)));
  if(/^https?:/.test(src))return execFileSync('curl',['-sfL','-A','Mozilla/5.0',src],{maxBuffer:1<<28});
  for(const base of ['.','static','public'])if(await exists(resolve(base,src.slice(1))))return readFile(resolve(base,src.slice(1)));
  throw Error(`Cannot find ${src}`);
}
await mkdir(out,{recursive:true});
const manifest={};
for(const p of [...scaledPaintings('TJ Murphy'),...scaledPaintings('Paul Murphy')]){
  if(onPrintWall.has(p.id))continue;
  let best=null;
  for(const src of candidates(p)){
    let bytes;try{bytes=await load(src);}catch{continue;}
    const meta=await sharp(bytes).rotate().metadata(),w=meta.autoOrient?.width??meta.width,h=meta.autoOrient?.height??meta.height;
    // only a photo of the same painting (same shape) can stand in for the page photo
    if(best&&Math.abs(w/h-best.width/best.height)>.03)continue;
    if(!best||w>best.width)best={bytes,src,width:w,height:h};
  }
  const {bytes}=best,width=best.width,height=best.height;
  const sha=createHash('sha256').update(bytes).digest('hex').slice(0,10);
  const master=/print-masters\//.test(best.src);
  const widths=[...PREVIEW_WIDTHS.filter(w=>w<width),...(width>MAX_WALL_WIDTH?[MAX_WALL_WIDTH]:master&&width>PREVIEW_WIDTHS[0]?[width]:[])],sources=[];
  // A photo no wider than the smallest preview is encoded once at its own size.
  for(const w of widths.length?widths:[width]){
    const file=`${p.id}-${sha}-${w}.webp`;
    await sharp(bytes).rotate().resize({width:w,withoutEnlargement:true}).webp({quality:w>=1920?68:78,effort:5}).toFile(join(out,file));
    sources.push({width:w,src:`/wall-paintings/${file}`});
  }
  // a photo up to MAX_WALL_WIDTH wide is used as is for the deepest zoom; larger ones end at the MAX_WALL_WIDTH preview
  if(widths.length&&width<=MAX_WALL_WIDTH&&!master)sources.push({width,src:best.src});
  manifest[p.id]={sha256:sha,width,height,sources};
}
await writeFile(manifestPath,JSON.stringify(manifest,null,1)+'\n');
console.log(`Wrote ${Object.keys(manifest).length} paintings`);
