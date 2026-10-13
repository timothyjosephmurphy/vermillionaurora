import {writeFile} from 'node:fs/promises';
import {byId,collections} from '../catalog/catalog.mjs';
import {readyPrints} from '../catalog/prints.mjs';
const ids=new Set(collections.gallery.map(p=>p.product)),largest=new Map(),gap=2.6,targetWidth=300;
for(const p of Object.values(readyPrints)){
  if(p.testOnly||p.sampleOnly||p.frame?.key!=='black'||byId[p.productId]?.artist!=='TJ Murphy'||!ids.has(p.productId))continue;
  const previous=largest.get(p.productId);
  if(!previous||p.frame.size.width*p.frame.size.height>previous.frame.size.width*previous.frame.size.height)largest.set(p.productId,p);
}
const round=n=>Math.round(n*10000)/10000;
const rectangles=[...largest.values()].map(p=>({id:p.productId,width:round(p.frame.size.width+2*p.frame.mouldingWidth),height:round(p.frame.size.height+2*p.frame.mouldingWidth)})).sort((a,b)=>b.height-a.height||b.width-a.width||a.id.localeCompare(b.id));
const rows=[];let row=[],used=0;
for(const art of rectangles){
  if(row.length&&used+gap+art.width>targetWidth){rows.push(row);row=[];used=0;}
  used+=(row.length?gap:0)+art.width;row.push(art);
}
if(row.length)rows.push(row);
if(rows.at(-1)?.length===1&&rows.length>1)rows.at(-1).unshift(rows.at(-2).pop());
const width=round(Math.max(...rows.map(r=>r.reduce((n,a)=>n+a.width,0)+gap*(r.length-1))));
const heights=rows.map(r=>Math.max(...r.map(a=>a.height)));
const height=round(heights.reduce((a,b)=>a+b,0)+gap*(rows.length-1));
const artworks=[];let y=0;
for(const [i,items] of rows.entries()){
  const spacing=items.length>1?(width-items.reduce((n,a)=>n+a.width,0))/(items.length-1):0;let x=0;
  for(const art of items){artworks.push({...art,x:round(x),y:round(i===rows.length-1?y+heights[i]-art.height:y)});x+=art.width+spacing;}
  y+=heights[i]+gap;
}
await writeFile(new URL('../catalog/gallery-wall-layout.json',import.meta.url),JSON.stringify({unit:'in',width,height,gap,artworks},null,2)+'\n');
console.log(`Laid out ${artworks.length} largest framed editions at their measured physical sizes.`);
