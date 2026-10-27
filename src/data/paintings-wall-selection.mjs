import {products} from '../../catalog/catalog.mjs';
import {readyPrints} from '../../catalog/prints.mjs';
import olderWork from '../../catalog/older-work.json' with {type:'json'};
import {canonicalArtwork} from './canonical-artworks.mjs';
// Every TJ Murphy work is drawn to scale: by the painting's measured size when known, otherwise by its
// largest available print (image area). Paul Murphy's wall stays measured-only. Commission packages and
// works with neither a size nor a print are only listed.
export const isPainting=p=>p.type==='painting'&&!p.bookGallery&&['TJ Murphy','Paul Murphy'].includes(p.artist);
const sized=p=>Number(p.dimensions?.width)>0&&Number(p.dimensions?.height)>0&&['in','cm'].includes(p.dimensions.unit);
const largestPrint=new Map();
for(const v of Object.values(readyPrints)){
  if(v.frame||v.testOnly||v.sampleOnly||!v.imageSize)continue;
  const o=largestPrint.get(v.productId);
  if(!o||v.imageSize.width*v.imageSize.height>o.imageSize.width*o.imageSize.height)largestPrint.set(v.productId,v);
}
const byId=new Map(products.map(p=>[p.id,p]));
// An Older Work set whose every painting has its own page is already on the wall painting by painting.
const coveredSet=p=>p.olderWork?.members?.length>1&&p.olderWork.members.every((_,i)=>byId.has(`${p.id}-original-${i+1}`));
// A book scan merged into a catalog painting is that painting; only the catalog page is drawn and linked.
const merged=p=>!!canonicalArtwork[p.id]&&byId.has(canonicalArtwork[p.id]);
// Off the scaled wall, and not listed under it, until a crop exists or a named page is the better photo.
// Product pages stay. Sunrise on Rainier is the uncropped studio shot (binder clips, paper edges, glare).
// archived-painting-19 is "The Temple, Daytime". archived-painting-20 ("The Temple, the Lighting #2")
// is the darker photo of Burning Man Temple 2022: Blue.
export const heldOffWall=new Set(['sunrise-on-rainier-from-denny-blaine','archived-painting-19','archived-painting-20']);
const tjWork=p=>p.artist==='TJ Murphy'&&(p.type==='painting'||p.bookGallery)&&!coveredSet(p)&&!merged(p)&&!p.strawberryGroup&&!heldOffWall.has(p.id);
// Strawberry Point stays off the scaled wall and /gallery/room/ until its wall assets are built (sizes recorded Oct 16 2026).
export const wallBasis=p=>p.series==='strawberry-point'?null:sized(p)&&(isPainting(p)||p.bookGallery)?'actual':largestPrint.has(p.id)?'print':null;
// Hang sets already encoded as Older Work groups, plus the four named temples (2×2 is the one grid).
// A set of three is always one row. A photographed stack of more than three stays a column.
// Forest reads left to right by index (302, 303, 304), not the photographed 303/302/304.
export function wallHangSets(){
  const sets=[];
  for(const g of olderWork.groups){
    if(g.members.length<2)continue;
    const members=g.members.map((m,i)=>({id:`${g.id}-original-${i+1}`,index:m.index})).filter(m=>byId.has(m.id));
    if(members.length<2)continue;
    const ordered=g.id==='older-work-forest-triptych'?[...members].sort((a,b)=>a.index-b.index):members;
    sets.push({id:g.id,members:ordered.map(m=>m.id),arrangement:ordered.length===3||g.layout!=='stack'?'row':'stack'});
  }
  sets.push({id:'burning-man-temple-2022',members:['burning-man-temple-2022-blue','burning-man-temple-2022-pink','burning-man-temple-2022-flame','burning-man-temple-2022-daytime'],arrangement:'grid'});
  return sets;
}
export const scaledPaintings=artist=>products.filter(p=>artist==='TJ Murphy'?tjWork(p)&&wallBasis(p):isPainting(p)&&p.artist===artist&&sized(p));
export const unscaledPaintings=()=>products.filter(p=>p.artist==='TJ Murphy'&&(p.type==='commission'||(tjWork(p)&&!wallBasis(p))));
export const inchesOf=p=>{
  if(wallBasis(p)==='print'){const s=largestPrint.get(p.id).imageSize,k=s.unit==='cm'?1/2.54:1;return {width:s.width*k,height:s.height*k};}
  const k=p.dimensions.unit==='cm'?1/2.54:1;return {width:p.dimensions.width*k,height:p.dimensions.height*k};
};
