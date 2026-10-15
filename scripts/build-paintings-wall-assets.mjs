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

export const PREVIEW_WIDTHS=[320,960];
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
  const bytes=await load(p.image.src),meta=await sharp(bytes).rotate().metadata();
  const width=meta.autoOrient?.width??meta.width,height=meta.autoOrient?.height??meta.height;
  const sha=createHash('sha256').update(bytes).digest('hex').slice(0,10);
  const widths=PREVIEW_WIDTHS.filter(w=>w<width),sources=[];
  // A photo no wider than the smallest preview is encoded once at its own size.
  for(const w of widths.length?widths:[width]){
    const file=`${p.id}-${sha}-${w}.webp`;
    await sharp(bytes).rotate().resize({width:w,withoutEnlargement:true}).webp({quality:78,effort:5}).toFile(join(out,file));
    sources.push({width:w,src:`/wall-paintings/${file}`});
  }
  if(widths.length)sources.push({width,src:p.image.src});
  manifest[p.id]={sha256:sha,width,height,sources};
}
await writeFile(manifestPath,JSON.stringify(manifest,null,1)+'\n');
console.log(`Wrote ${Object.keys(manifest).length} paintings`);
