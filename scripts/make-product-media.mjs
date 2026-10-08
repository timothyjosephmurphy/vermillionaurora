// One-off generator for product-page media from TJ's original photos (run manually; outputs are committed).
// Usage: node scripts/make-product-media.mjs <source-dir>
// - Main painting photos: sRGB JPEG, 2400 px on the long edge, in gallery-images/ (the catalog image.src).
//   Display WebP srcsets for them come from scripts/make-display-images.mjs as for every other painting.
// - Room shots and the video poster: AVIF + WebP at several widths plus a JPEG fallback in static/product-media/.
// - Print masters: the untouched full-resolution originals, stored by SHA-256 in static/print-masters/.
// Never crops or enlarges: every photo was checked to be full-bleed art (no non-art border to trim).
import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass the source directory');
const sha=b=>createHash('sha256').update(b).digest('hex');
const srgb=img=>img.rotate().toColourspace('srgb').withIccProfile('srgb');
const MAINS=[
  ['sunrise-punta-el-zonte-hostel-master.jpg','gallery-images/sunrise-punta-el-zonte-hostel-2026.jpg'],
  ['el-zonte-at-dawn-master.jpg','gallery-images/el-zonte-at-dawn-2026.jpg'],
  ['new-painting-master.jpg','gallery-images/el-zonte-before-dawn.jpg'],
];
const out={masters:{},mains:{},rooms:{},poster:null};
await mkdir('static/print-masters',{recursive:true});await mkdir('static/product-media/el-zonte',{recursive:true});
for(const [file,target] of MAINS){
  const bytes=await readFile(`${dir}/${file}`),digest=sha(bytes),meta=await sharp(bytes).metadata();
  await writeFile(`static/print-masters/${digest}.jpg`,bytes);
  out.masters[file]={url:`https://vermillionaurora.com/print-masters/${digest}.jpg`,widthPx:meta.width,heightPx:meta.height,sha256:digest};
  const {data,info}=await srgb(sharp(bytes)).resize({width:2400,height:2400,fit:'inside',withoutEnlargement:true}).jpeg({quality:86,mozjpeg:true}).toBuffer({resolveWithObject:true});
  await writeFile(target,data);out.mains[file]={src:'/'+target,width:info.width,height:info.height,bytes:data.length};
}
const WIDTHS=[480,960,1600,2400];
async function responsive(bytes,base,widths){
  const variants=[];let size;
  for(const w of widths){
    const img=()=>srgb(sharp(bytes)).resize({width:w,withoutEnlargement:true});
    const avif=await img().avif({quality:50,effort:6}).toBuffer({resolveWithObject:true});
    const webp=await img().webp({quality:78,effort:6}).toBuffer();
    await writeFile(`static${base}-${w}.avif`,avif.data);await writeFile(`static${base}-${w}.webp`,webp);
    size={width:avif.info.width,height:avif.info.height};variants.push({w,avif:avif.data.length,webp:webp.length});
  }
  const fallback=widths.includes(1600)?1600:widths.at(-1);
  const jpg=await srgb(sharp(bytes)).resize({width:fallback,withoutEnlargement:true}).jpeg({quality:82,mozjpeg:true}).toBuffer({resolveWithObject:true});
  await writeFile(`static${base}-${fallback}.jpg`,jpg.data);
  return {base,widths,width:size.width,height:size.height,fallback:`${base}-${fallback}.jpg`,variants};
}
for(const n of [1,2,3])out.rooms[n]=await responsive(await readFile(`${dir}/room-${n}.jpeg`),`/product-media/el-zonte/room-${n}`,WIDTHS);
// Poster: a tone-mapped SDR frame exported from the video (web/poster-src.png).
out.poster=await responsive(await readFile(`${dir}/web/poster-src.png`),'/product-media/el-zonte/video-poster',[960,1920]);
await writeFile('scripts/product-media/el-zonte.json',JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out,null,2));
