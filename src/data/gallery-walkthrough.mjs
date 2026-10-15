import assets from '../../catalog/walkthrough-assets.json' with {type:'json'};
import {tjWall,WALL_UNIT} from './paintings-wall.mjs';
import {IMAGE_ORIGIN,R2_PREFIXES} from '../../scripts/lib/image-keys.mjs';
// Every work on The Painting Wall, hung at its true size (inches → metres; works without a measured size use their
// largest print, as on the wall). One square central hall and four outer galleries, grouped like the site's galleries.
const IN=.0254,unit=IN/WALL_UNIT;
const remote=src=>R2_PREFIXES.some(p=>src.startsWith(`/${p}/`))?IMAGE_ORIGIN+src:src;
const sources=list=>list.map(s=>({width:s.width,src:remote(s.src),fallback:s.src}));
const painting=a=>({
  id:a.id,kind:'painting',title:a.title,href:a.href,caption:a.sizeLabel,status:a.statusLabel,
  width:a.width*unit,height:a.height*unit,imageWidth:a.imageWidth*unit,imageHeight:a.imageHeight*unit,frameWidth:a.frameWidth*unit,
  sources:sources(a.sources)
});
const plaque=(id,title,lines,href)=>({id,kind:'plaque',title,lines:lines.filter(Boolean),href,width:.62,height:.82});
const works=re=>tjWall.artworks.filter(a=>!/^Mural/.test(a.description)&&re.test(a.description)).map(painting);
const exhibition=id=>{const ex=assets.exhibitions.find(e=>e.id===id),long=.75,f=.02;
  return [plaque(ex.id+'-plaque',ex.title,['Exhibition · '+ex.date,...ex.story],ex.href),
    ...ex.photos.map((p,i)=>{const r=p.width/p.height,w=r>=1?long:long*r,h=r>=1?long/r:long;
      return {id:`${ex.id}-photo-${i+1}`,kind:'photo',title:ex.title,caption:'Exhibition photograph',href:ex.href,exhibition:ex.id,
        width:w+2*f,height:h+2*f,imageWidth:w,imageHeight:h,frameWidth:f,sources:sources([p])};})];};
// The silhouetted cormorant over Puget Sound faces the entrance across the central hall.
export const ENTRY_MURAL_ID='cormorant-presiding-over-sunset-on-puget-sound';
const garden=tjWall.artworks.find(a=>a.id===ENTRY_MURAL_ID);
const lillooet=assets.murals[0];
const murals=[
  {...painting(garden),kind:'mural',focal:true,caption:'Garden mural, Seattle · '+garden.sizeLabel},
  {id:lillooet.id,kind:'mural',title:lillooet.title,href:lillooet.href,caption:`${lillooet.place} · ${lillooet.sizeLabel}`,
    width:lillooet.size.width*IN,height:lillooet.size.height*IN,imageWidth:lillooet.size.width*IN,imageHeight:lillooet.size.height*IN,frameWidth:0,sources:sources([lillooet.image])},
  plaque(lillooet.id+'-plaque',lillooet.title,[lillooet.place,lillooet.sizeLabel,...lillooet.story.map(c=>`${c.title}. ${c.text}`)],lillooet.href),
  plaque(garden.id+'-plaque',garden.title,['Garden mural, Seattle · '+garden.sizeLabel,...assets.gardenStory.map(c=>`${c.title}. ${c.text}`)],garden.href)
];
// position: centre, or the side of the central hall the gallery runs along.
export const walkthroughRooms=[
  {id:'central',position:'centre',kind:'hall',title:'Murals & Watercolor Pastels',galleries:['Murals','Watercolor Pastels'],items:[...murals,...works(/^Watercolor/)]},
  {id:'north',position:'north',kind:'gallery',title:'Travels & the Pacific Northwest',galleries:['Travels','Pacific Northwest','Exhibitions: Cape Town, El Salvador, Warsaw'],
    items:[...works(/^(Travels|Pacific Northwest)/),...exhibition('cape-town'),...exhibition('el-salvador'),...exhibition('bitcoin-film-festival-warsaw')]},
  {id:'east',position:'east',kind:'gallery',title:'Friends, Family & Bitcoiners',galleries:['Friends','Family','Bitcoiners','Self Portraits','Exhibitions: Living Room, Studio 601, Victrola, Paul Murphy'],
    items:[...works(/^(Friends|Family|Bitcoiners|Self Portraits)/),...exhibition('living-room'),...exhibition('studio-601'),...exhibition('victrola'),...exhibition('paul-murphy')]},
  {id:'south',position:'south',kind:'gallery',title:'Archived Paintings',galleries:['Archived Paintings'],items:works(/^Archived Paintings/)},
  {id:'west',position:'west',kind:'gallery',title:'Older Work',galleries:['Older Work'],items:works(/^Older Work/)}
];
const placed=new Set(walkthroughRooms.flatMap(r=>r.items.map(i=>i.id)));
export const walkthroughPaintingCount=tjWall.artworks.filter(a=>placed.has(a.id)).length;
const missing=tjWall.artworks.filter(a=>!placed.has(a.id));
if(missing.length)throw Error(`Walkthrough is missing Painting Wall works: ${missing.map(a=>a.id+' ('+a.description+')').join(', ')}`);
