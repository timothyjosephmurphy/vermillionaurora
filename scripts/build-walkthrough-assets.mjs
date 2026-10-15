// Run by hand when exhibitions change: node scripts/build-walkthrough-assets.mjs
// Makes compact texture copies (webp, longest side 1280 px; murals larger) of each exhibition's
// photographs and the two final murals for the 3D walkthrough, plus catalog/walkthrough-assets.json.
// The originals stay where they are; static/walkthrough/ is uploaded to R2 (img.tjm.art) at deploy.
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
import sharp from 'sharp';
const exhibitions=JSON.parse(await fs.readFile('exhibitions/catalog.json','utf8'));
const out='static/walkthrough',PHOTOS=9;
const clean=s=>s.replace(/<[^>]+>/g,'').replace(/&amp;/g,'&').replace(/&#39;|&rsquo;/g,'’').replace(/\s+/g,' ').trim();
async function story(slug){
  for(const f of [`exhibitions/${slug}/index.html`,`src/pages/exhibitions/${slug}/index.astro`]){
    try{const html=await fs.readFile(f,'utf8');
      return [...html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/g)].map(m=>clean(m[1])).filter(t=>t.length>25&&!/photographs|Select a|video recordings|VERMILLION AURORA PRODUCTIONS/i.test(t)).slice(0,3);
    }catch{}
  }
  return [];
}
async function texture(input,name,max){
  const buf=Buffer.isBuffer(input)?input:input.startsWith('/')?await fs.readFile('.'+input):Buffer.from(await (await fetch(input,{signal:AbortSignal.timeout(60000)})).arrayBuffer());
  const img=sharp(buf).rotate().resize({width:max,height:max,fit:'inside',withoutEnlargement:true}).webp({quality:74});
  const data=await img.toBuffer(),meta=await sharp(data).metadata(),hash=createHash('sha256').update(data).digest('hex').slice(0,10);
  const file=`${name}-${hash}.webp`;await fs.writeFile(`${out}/${file}`,data);
  return {src:`/walkthrough/${file}`,width:meta.width,height:meta.height};
}
const rooms=[];
for(const e of exhibitions){
  const files=e.files.filter(f=>!f.video&&/\.(jpe?g|png|webp)$/i.test(f.url));
  const picks=files.length<=PHOTOS?files:Array.from({length:PHOTOS},(_,i)=>files[Math.round(i*(files.length-1)/(PHOTOS-1))]);
  const photos=[];for(const [i,f] of picks.entries()){try{photos.push(await texture(f.url,`${e.slug}-${i+1}`,1280));}catch(err){console.warn('skip',f.url,err.message);}}
  rooms.push({id:e.slug,title:e.name,date:e.date||null,href:`/exhibitions/${e.slug}/`,story:await story(e.slug),photos});
  console.log(e.slug,photos.length,'photos');
}
// Murals: the final images at full physical scale (dimensions from the mural notes and the catalog).
const muralHtml=await fs.readFile('murals/index.html','utf8');
const chapters=[...muralHtml.matchAll(/"title": "([^"]+)", "photos": \[[^\]]*\], "text": \["((?:[^"\\]|\\.){40,}?)"/g)].map(m=>({title:m[1],text:clean(m[2])}));
const murals=[
  {id:'friends-club-mural',title:'Friends Club',place:'Lillooet, British Columbia · 2026',size:{width:480,height:108,unit:'in'},sizeLabel:'40 × 9 ft shipping-container mural',href:'/murals/#friends-story',image:await texture(await fs.readFile('murals/images/3886996e.jpg'),'friends-club-mural',4096),
    story:chapters.filter(c=>/invitation|design concept|Day one|Day two|festival|Trusting/i.test(c.title)).slice(0,3)},
];
await fs.writeFile('catalog/walkthrough-assets.json',JSON.stringify({exhibitions:rooms,murals,gardenStory:chapters.filter(c=>/favorite view|prototype|garden becomes|brass plaque/i.test(c.title)).slice(0,3)},null,2)+'\n');
console.log('wrote catalog/walkthrough-assets.json');
