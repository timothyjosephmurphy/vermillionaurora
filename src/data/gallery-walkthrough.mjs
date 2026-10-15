import assets from '../../catalog/walkthrough-assets.json' with {type:'json'};
import {tjWall,WALL_UNIT} from './paintings-wall.mjs';
import {IMAGE_ORIGIN,R2_PREFIXES} from '../../scripts/lib/image-keys.mjs';
// Every work on The Painting Wall, hung at its true size (inches → metres), grouped into themed rooms.
const IN=.0254,unit=IN/WALL_UNIT,MAX_PER_ROOM=24;
const remote=src=>R2_PREFIXES.some(p=>src.startsWith(`/${p}/`))?IMAGE_ORIGIN+src:src;
const sources=list=>list.map(s=>({width:s.width,src:remote(s.src),fallback:s.src}));
export const THEMES=[
  ['travels','Travels & the Pacific Northwest',d=>/^(Travels|Pacific Northwest)/.test(d)],
  ['people','Friends, Family & Bitcoiners',d=>/^(Friends|Family|Bitcoiners|Self Portraits)/.test(d)],
  ['pastels','Watercolor Pastels',d=>/^Watercolor/.test(d)],
  ['archive','Archived Paintings',d=>/^Archived Paintings/.test(d)],
  ['older','Older Work',d=>/^Older Work/.test(d)]
];
const painting=a=>({
  id:a.id,kind:'painting',title:a.title,href:a.href,caption:a.sizeLabel,status:a.statusLabel,
  width:a.width*unit,height:a.height*unit,imageWidth:a.imageWidth*unit,imageHeight:a.imageHeight*unit,frameWidth:a.frameWidth*unit,
  sources:sources(a.sources)
});
const roman=['I','II','III','IV','V'];
function chunk(list,size){const n=Math.ceil(list.length/size),per=Math.ceil(list.length/n);return Array.from({length:n},(_,i)=>list.slice(i*per,(i+1)*per));}
const used=new Set(),rooms=[];
for(const [id,title,match] of THEMES){
  const works=tjWall.artworks.filter(a=>!used.has(a.id)&&!/^Mural/.test(a.description)&&match(a.description));
  works.forEach(a=>used.add(a.id));
  const parts=chunk(works,MAX_PER_ROOM);
  parts.forEach((part,i)=>rooms.push({id:parts.length>1?`${id}-${i+1}`:id,kind:'theme',title:parts.length>1?`${title} ${roman[i]}`:title,items:part.map(painting)}));
}
const garden=tjWall.artworks.find(a=>/^Mural/.test(a.description));
const mural=assets.murals[0];
const plaque=(id,title,lines,href)=>({id,kind:'plaque',title,lines:lines.filter(Boolean),href,width:.62,height:.82});
rooms.push({id:'murals',kind:'murals',title:'Murals',items:[
  {id:mural.id,kind:'mural',title:mural.title,href:mural.href,caption:`${mural.place} · ${mural.sizeLabel}`,
    width:mural.size.width*IN,height:mural.size.height*IN,imageWidth:mural.size.width*IN,imageHeight:mural.size.height*IN,frameWidth:0,
    sources:sources([mural.image])},
  plaque(mural.id+'-plaque',mural.title,[mural.place,mural.sizeLabel,...mural.story.map(c=>`${c.title}. ${c.text}`)],mural.href),
  ...(garden?[{...painting(garden),kind:'mural',caption:'Garden mural · 60 × 40 in'},
    plaque(garden.id+'-plaque',garden.title,['Garden mural · 60 × 40 in',...assets.gardenStory.map(c=>`${c.title}. ${c.text}`)],garden.href)]:[])
]});
for(const ex of assets.exhibitions){
  const long=.75;
  rooms.push({id:'exhibition-'+ex.id,kind:'exhibition',title:ex.title,href:ex.href,items:[
    plaque(ex.id+'-plaque',ex.title,[ex.date,...ex.story],ex.href),
    ...ex.photos.map((p,i)=>{const r=p.width/p.height,w=r>=1?long:long*r,h=r>=1?long/r:long,f=.02;
      return {id:`${ex.id}-photo-${i+1}`,kind:'photo',title:ex.title,caption:'Exhibition photograph',href:ex.href,
        width:w+2*f,height:h+2*f,imageWidth:w,imageHeight:h,frameWidth:f,sources:sources([p])};})
  ]});
}
export const walkthroughRooms=rooms;
export const walkthroughPaintingCount=rooms.flatMap(r=>r.items).filter(i=>i.kind==='painting'||i.id===garden?.id).length;
if(walkthroughPaintingCount!==tjWall.artworks.length)throw Error(`Walkthrough is missing Painting Wall works: ${walkthroughPaintingCount} of ${tjWall.artworks.length}`);
