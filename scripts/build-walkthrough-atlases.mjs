// One thumbnail atlas per 3D-gallery room: every painting/mural in the room as a ≤256 px tile in a single WebP, so a
// room's walls fill in with one request. Tiles come from the 320 px wall previews in static/. Output:
// static/walkthrough/atlas-<room>-<hash10>.webp (synced to R2 / img.tjm.art) and catalog/walkthrough-atlases.json.
import sharp from 'sharp';
import {createHash} from 'node:crypto';
import {writeFile,readFile,unlink,readdir} from 'node:fs/promises';
import {walkthroughRooms} from '../src/data/gallery-walkthrough.mjs';
const TILE=256,PAD=4,SHEET=2048,out={};
for(const room of walkthroughRooms){
  const arts=room.items.filter(i=>i.sources?.length);const tiles=[];
  for(const a of arts){const src='static'+a.sources[0].fallback;const img=sharp(await readFile(src)).resize(TILE,TILE,{fit:'inside'});
    const {data,info}=await img.toBuffer({resolveWithObject:true});tiles.push({id:a.id,buf:await sharp(data).extend({top:PAD,bottom:PAD,left:PAD,right:PAD,extendWith:'copy'}).toBuffer(),w:info.width,h:info.height});}
  let x=0,y=0,row=0;const rects={},comp=[];
  for(const t of tiles){const W=t.w+2*PAD,H=t.h+2*PAD;if(x+W>SHEET){x=0;y+=row;row=0;}comp.push({input:t.buf,left:x,top:y});rects[t.id]=[x+PAD,y+PAD,t.w,t.h];x+=W;row=Math.max(row,H);}
  const height=y+row;if(height>4096)throw Error(room.id+': atlas too tall');
  const webp=await sharp({create:{width:SHEET,height,channels:3,background:'#d9d1c3'}}).composite(comp).webp({quality:78,effort:6}).toBuffer();
  const hash=createHash('sha256').update(webp).digest('hex').slice(0,10),name=`walkthrough/atlas-${room.id}-${hash}.webp`;
  await writeFile('static/'+name,webp);out[room.id]={src:'/'+name,width:SHEET,height,rects};
  console.log(room.id,tiles.length,'tiles',SHEET+'x'+height,(webp.length/1024).toFixed(0)+' KB');
}
const keep=new Set(Object.values(out).map(o=>o.src.split('/').pop()));
for(const f of await readdir('static/walkthrough'))if(f.startsWith('atlas-')&&!keep.has(f))await unlink('static/walkthrough/'+f);
await writeFile('catalog/walkthrough-atlases.json',JSON.stringify(out)+'\n');
