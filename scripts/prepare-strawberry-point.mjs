// Builds display images for the Strawberry Point Hiking Trip gallery from TJ's photos.
// Usage: STRAWBERRY_SRC=<folder with IMG_17xx.jpg from R2 images/Strawberry Point Series/> node scripts/prepare-strawberry-point.mjs
// Each painting is cropped (crop only, no padding) to its painted edge using the boxes in
// catalog/strawberry-point.json; each group photo is kept whole. Outputs go to static/display/ (R2 / img.tjm.art).
import sharp from 'sharp';
import {readFile,writeFile} from 'node:fs/promises';
const manifestPath='catalog/strawberry-point.json',m=JSON.parse(await readFile(manifestPath,'utf8'));
const src=process.env.STRAWBERRY_SRC||'/workspace/strawberry',WIDTHS=[480,960,1600];
async function emit(input,base){
  const meta=await input.clone().metadata();
  for(const w of WIDTHS){const r=input.clone().resize({width:Math.min(w,meta.width)});await r.clone().webp({quality:82}).toFile(`static${base}-${w}.webp`);await r.clone().avif({quality:55}).toFile(`static${base}-${w}.avif`);}
  await input.clone().resize({width:Math.min(1600,meta.width)}).jpeg({quality:86,mozjpeg:true}).toFile(`static${base}.jpg`);
  const r=Math.min(1,960/meta.width);return {base,widths:WIDTHS,width:Math.round(meta.width*r),height:Math.round(meta.height*r),fallback:`${base}.jpg`,sourceWidth:meta.width,sourceHeight:meta.height};
}
const rotated=async f=>sharp(await sharp(await readFile(`${src}/${f}`)).rotate().toBuffer());
for(const p of m.paintings){
  const [x0,y0,x1,y1]=p.crop,img=(await rotated(p.photo)).extract({left:x0,top:y0,width:x1-x0,height:y1-y0});
  p.display=await emit(sharp(await img.toBuffer()),`/display/strawberry-point-${p.index}`);
}
for(const g of m.groups)g.display=await emit(await rotated(g.photo),`/display/${g.id}`);
await writeFile(manifestPath,JSON.stringify(m,null,1)+'\n');
console.log(`${m.paintings.length} paintings, ${m.groups.length} group photos`);
