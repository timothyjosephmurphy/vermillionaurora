import assets from '../../catalog/walkthrough-assets.json' with {type:'json'};
import atlases from '../../catalog/walkthrough-atlases.json' with {type:'json'};
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
// Archived paintings stay in the archive room even once they carry a medium (studio-tracker #44).
const ARCHIVED=a=>/^Archived Paintings/.test(a.gallery||'');
const works=re=>tjWall.artworks.filter(a=>!/^Mural/.test(a.description)&&!ARCHIVED(a)&&re.test(a.description)).map(painting);
const archived=()=>tjWall.artworks.filter(a=>!/^Mural/.test(a.description)&&(ARCHIVED(a)||/^Archived Paintings/.test(a.description))).map(painting);
// Exhibitions are represented by their plaque only: the walkthrough hangs paintings with a product page and the two
// murals, never photographs.
const exhibition=id=>{const ex=assets.exhibitions.find(e=>e.id===id);return [{...plaque(ex.id+'-plaque',ex.title,['Exhibition · '+ex.date,...ex.story],ex.href),exhibition:ex.id}];};
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
// Related works sit together: a series (same title apart from its number), a set photographed together, or one
// exhibition. Only related works may share a column; everything else hangs in a single line, ordered by subject.
const seriesKey=i=>{
  if(i.exhibition)return 'exhibition:'+i.exhibition;
  const set=/\/products\/(older-work-.+)-original-\d+\//.exec(i.href||'');if(set)return 'set:'+set[1];
  const t=String(i.title).replace(/^TJ\s+/,'').replace(/:.*$/,'').replace(/\s*(—\s*study\s*)?(#\s*\d+|\((?:L|R)\)|\d+)\s*$/i,'').trim();
  return /^Painting$|^Untitled/i.test(t)?null:'title:'+t.toLowerCase();
};
const SUBJECTS=[['sea',/sunset|sunrise|beach|sea\b|ocean|shore|bay|island|coast|wave|zonte|tunco|atami|puget|kihei|water|dusk|dawn|moon/i],['land',/ridge|mountain|forest|lake|cascade|rainier|tree|garden|valley|trail|field/i],['people',/portrait|self|catherine|tulsi|keiser|saylor|rfk|paul|josie|elon|ben\b|dance|guitar|figure|girl|boy|man|woman|devo|brekkie/i],['temple',/temple|mayan|burning|bass coast/i]];
const subject=i=>{const k=SUBJECTS.findIndex(([,re])=>re.test(i.title));return k<0?SUBJECTS.length:k;};
export function arrange(items){
  const groups=new Map();for(const it of items){const k=seriesKey(it)||'solo:'+it.id;(groups.get(k)||groups.set(k,[]).get(k)).push(it);}
  const list=[...groups.entries()].map(([k,g])=>{g.sort((a,b)=>String(a.title).localeCompare(String(b.title),'en',{numeric:true}));if(g[0].kind==='photo'||g.some(x=>x.kind==='plaque'))g.sort((a,b)=>(a.kind==='plaque'?-1:0)-(b.kind==='plaque'?-1:0));return {k,g,s:Math.min(...g.map(subject)),ex:g.some(x=>x.exhibition)};});
  list.sort((a,b)=>(a.ex-b.ex)||a.s-b.s||a.g[0].title.localeCompare(b.g[0].title));
  return list.flatMap(({k,g})=>g.map(it=>({...it,series:k.startsWith('solo:')||g.length<2?null:k})));
}
// The rooms form one loop around a courtyard, mirror-symmetric about the north–south axis (no turns that pinwheel):
// central hall (south) → Friends, Family & Bitcoiners (west) → Travels & the Pacific Northwest (north) → Archived & Older Work (east) → hall.
// Archived works about people (friends, family, portraits, Bitcoin figures) hang with Friends, Family & Bitcoiners;
// a series moves whole because these titles are matched by their shared stem.
const PEOPLE_ARCHIVE=/^(Devo|Self Portrait|Ben & Kermit|Brekkie|Catherine|Elon|Flamenco Guitarist|Josie|Max Keiser|My Dad|RFK|Ron Paul|Tulsi Gabbard|Bounty of Satoshi|Dad Meditating)/;
const archivedWorks=archived(),archivedPeople=archivedWorks.filter(a=>PEOPLE_ARCHIVE.test(a.title)),archivedRest=archivedWorks.filter(a=>!PEOPLE_ARCHIVE.test(a.title));
export const walkthroughRooms=[
  {id:'central',ring:'S',kind:'hall',title:'Watercolor Pastels',galleries:['Cormorant garden mural','Watercolor Pastels'],items:[murals[0],murals[3],...arrange(works(/^Watercolor/))]},
  {id:'people',ring:'W',kind:'gallery',title:'Friends, Family & Bitcoiners',galleries:['Friends','Family','Bitcoiners','Self Portraits','Archived Paintings (portraits & people)','Exhibitions: Living Room, Studio 601, Victrola, Paul Murphy'],
    items:arrange([...works(/^(Friends|Family|Bitcoiners|Self Portraits)/),...archivedPeople,...exhibition('living-room'),...exhibition('studio-601'),...exhibition('victrola'),...exhibition('paul-murphy')])},
  {id:'archive',ring:'E',kind:'gallery',title:'Archived & Older Work',galleries:['Archived Paintings','Older Work'],items:[...arrange(archivedRest),...arrange(works(/^Older Work/))]},
  {id:'travels',ring:'N',kind:'gallery',title:'Travels & the Pacific Northwest',galleries:['Travels','Pacific Northwest','Friends Club mural (Lillooet)','Exhibitions: Cape Town, El Salvador, Warsaw'],
    items:[murals[1],murals[2],...arrange([...works(/^(Travels|Pacific Northwest)/),...exhibition('cape-town'),...exhibition('el-salvador'),...exhibition('bitcoin-film-festival-warsaw')])]}
];
for(const r of walkthroughRooms)r.items=r.items.filter(i=>i.kind==='mural'||i.kind==='plaque'||(i.kind==='painting'&&/^\/products\/[^/]+\/$/.test(i.href||'')));
// Each room's thumbnail atlas (scripts/build-walkthrough-atlases.mjs): one request fills a room's walls at once; the
// renderer then upgrades nearby works to ≤960 px previews (never the print masters).
export const walkthroughAtlases=Object.fromEntries(Object.entries(atlases).map(([id,a])=>[id,{src:remote(a.src),fallback:a.src,width:a.width,height:a.height}]));
for(const r of walkthroughRooms){const a=atlases[r.id];for(const i of r.items){if(i.sources)i.sources=i.sources.filter(s=>s.width<=960&&!/print-masters/.test(s.src));const q=a?.rects[i.id];if(q)i.thumb={atlas:r.id,rect:q};}}
// 3D gallery only: the Friends Club mural uses a 4x upscale (3528 px) so it stays sharp at 12 m wide; every other page keeps the original photo.
const friendsClubUpscaled={width:3528,src:'/walkthrough/friends-club-mural-upscaled-3528-3fd8d748ff.webp'};
for(const r of walkthroughRooms)for(const i of r.items)if(i.id==='friends-club-mural')i.sources=sources([friendsClubUpscaled]);
const placed=new Set(walkthroughRooms.flatMap(r=>r.items.map(i=>i.id)));
export const walkthroughPaintingCount=tjWall.artworks.filter(a=>placed.has(a.id)).length;
const missing=tjWall.artworks.filter(a=>!placed.has(a.id));
if(missing.length)throw Error(`Walkthrough is missing Painting Wall works: ${missing.map(a=>a.id+' ('+a.description+')').join(', ')}`);
