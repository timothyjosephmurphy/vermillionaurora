// One-off generator for product-page media from TJ's original photos (run manually; outputs are committed).
// Usage: node scripts/make-product-media.mjs <source-dir> [set]   (set defaults to el-zonte; see SETS)
// - Main painting photos: sRGB JPEG, 2400 px on the long edge, in gallery-images/ (the catalog image.src).
//   Display WebP srcsets for them come from scripts/make-display-images.mjs as for every other painting.
// - Room shots and the video poster: AVIF + WebP at several widths plus a JPEG fallback in static/product-media/.
// - Print masters: the untouched full-resolution originals, stored by SHA-256 in static/print-masters/.
// Never crops or enlarges: every photo was checked to be full-bleed art (no non-art border to trim).
import sharp from 'sharp';
import {readFile,writeFile,mkdir} from 'node:fs/promises';
import {createHash} from 'node:crypto';
const dir=process.argv[2];if(!dir)throw Error('Pass the source directory');
// One entry per photo shoot: [master file, gallery-images target] pairs, the three room-shot files, and the
// static/product-media/<set>/ folder that holds the room shots and the video poster.
const SETS={
  'el-zonte':{mains:[
    ['sunrise-punta-el-zonte-hostel-master.jpg','gallery-images/sunrise-punta-el-zonte-hostel-2026.jpg'],
    ['el-zonte-at-dawn-master.jpg','gallery-images/el-zonte-at-dawn-2026.jpg'],
    ['new-painting-master.jpg','gallery-images/el-zonte-before-dawn.jpg'],
  ],rooms:['room-1.jpeg','room-2.jpeg','room-3.jpeg']},
  // Meditation at Denny Blaine, Sunrise in El Zonte (Large) and Moonrise Over the Cascades, photographed together.
  'kihei-hope':{mains:[
    ['sunset-at-kihei-on-maui-master.jpg','gallery-images/sunset-at-kihei-on-maui.jpg'],
    ['hope-the-vermillion-aurora-master.jpg','gallery-images/hope-the-vermillion-aurora.jpg'],
  ],rooms:['room-1.jpeg','room-2.jpeg']},
  'denny-blaine-el-zonte-cascades':{mains:[
    ['meditation-at-denny-blaine-master.jpg','gallery-images/meditation-at-denny-blaine.jpg'],
    ['sunrise-in-el-zonte-large-master.jpg','gallery-images/sunrise-in-el-zonte-large.jpg'],
    ['moonrise-over-the-cascades-master.jpg','gallery-images/moonrise-over-the-cascades.jpg'],
  ],rooms:['room-1.jpeg','room-2.jpeg','room-3.jpg']},
};
const setName=process.argv[3]||'el-zonte',SET=SETS[setName];if(!SET)throw Error(`Unknown set ${setName}`);
const sha=b=>createHash('sha256').update(b).digest('hex');
const srgb=img=>img.rotate().toColourspace('srgb').withIccProfile('srgb');
const MAINS=SET.mains;
const out={masters:{},mains:{},rooms:{},poster:null};
await mkdir('static/print-masters',{recursive:true});await mkdir(`static/product-media/${setName}`,{recursive:true});
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
for(const [i,file] of SET.rooms.entries())out.rooms[i+1]=await responsive(await readFile(`${dir}/${file}`),`/product-media/${setName}/room-${i+1}`,WIDTHS);
// Poster: a tone-mapped SDR frame exported from the video (web/poster-src.png).
out.poster=await responsive(await readFile(`${dir}/web/poster-src.png`),`/product-media/${setName}/video-poster`,[960,1920]);
await writeFile(`scripts/product-media/${setName}.json`,JSON.stringify(out,null,2)+'\n');
console.log(JSON.stringify(out,null,2));
