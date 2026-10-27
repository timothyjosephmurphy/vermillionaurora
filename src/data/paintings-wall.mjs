import images from '../../catalog/paintings-wall-images.json' with {type:'json'};
import {urlFor,statusLabel,dimensionLabel} from '../../catalog/catalog.mjs';
import {wallArtworks,WALL_UNIT} from './gallery-wall.mjs';
import {scaledPaintings,unscaledPaintings,inchesOf,wallBasis,wallHangSets} from './paintings-wall-selection.mjs';
import {packWall,WALL_GAP,WALL_MARGIN} from './paintings-wall-layout.mjs';

export {WALL_UNIT,WALL_GAP,WALL_MARGIN};
// A plain thin black frame at true scale, measured in inches.
export const FRAME_INCHES=.6;
// Stated size and photo shape disagree when their aspect ratios differ by more than this.
export const SHAPE_TOLERANCE=.1;
const printWall=new Map(wallArtworks.map(a=>[a.id,a]));
const commissionAnchors={'single-portrait':'portrait','double-portrait':'portrait','small-landscape':'landscape'};

function photoFor(p){
  const wall=printWall.get(p.id);
  if(wall)return {width:wall.sourceWidth,height:wall.sourceHeight,sources:wall.sources};
  const entry=images[p.id];
  if(!entry)throw Error(`Run scripts/build-paintings-wall-assets.mjs: no wall image for ${p.id}`);
  return {width:entry.width,height:entry.height,sources:entry.sources};
}
export function buyHref(p){return p.inquiryHref||`/commissions/?product=${encodeURIComponent(p.slug)}#form`;}

function shapeFor(p){
  const stated=inchesOf(p),photo=photoFor(p),ratio=photo.width/photo.height;
  const mismatch=Math.abs(Math.log(ratio/(stated.width/stated.height)))>Math.log(1+SHAPE_TOLERANCE);
  // The photo's shape is always what is drawn; the stated area is kept so the scale stays honest.
  const area=stated.width*stated.height,height=Math.sqrt(area/ratio),width=height*ratio;
  return {stated,photo,mismatch,paint:{width,height}};
}

export function buildWall(artist){
  const painted=scaledPaintings(artist).map(p=>({p,...shapeFor(p)}));
  const packed=packWall(painted.map(({p,paint})=>({id:p.id,width:paint.width+2*FRAME_INCHES,height:paint.height+2*FRAME_INCHES})),{sets:artist==='TJ Murphy'?wallHangSets():[]});
  const place=new Map(packed.items.map(i=>[i.id,i]));
  const artworks=painted.map(({p,paint,photo,stated,mismatch})=>{
    const slot=place.get(p.id),status=p.listing?.status||'';
    return {
      id:p.id,title:p.title,href:urlFor(p),status,statusLabel:statusLabel(p),
      artist:p.artist,description:[p.medium||p.eyebrow,p.year].filter(Boolean).join(' · '),gallery:p.eyebrow||'',
      sizeLabel:wallBasis(p)==='print'?`Shown at its largest print size, ${+stated.width.toFixed(1)} × ${+stated.height.toFixed(1)} in`:dimensionLabel(p),scaleBasis:wallBasis(p),buy:status==='available',buyHref:buyHref(p),
      frameWidth:FRAME_INCHES*WALL_UNIT,
      x:slot.x*WALL_UNIT,y:slot.y*WALL_UNIT,width:slot.width*WALL_UNIT,height:slot.height*WALL_UNIT,
      imageWidth:paint.width*WALL_UNIT,imageHeight:paint.height*WALL_UNIT,
      sourceWidth:photo.width,sourceHeight:photo.height,sources:photo.sources,
      alt:p.image.alt||p.title,
      mismatch:mismatch?{title:p.title,stated:dimensionLabel(p),statedInches:stated,photoRatio:photo.width/photo.height,photo:`${photo.width} × ${photo.height} px`}:null
    };
  }).sort((a,b)=>a.y-b.y||a.x-b.x);
  return {artist,artworks,world:{width:packed.width*WALL_UNIT,height:packed.height*WALL_UNIT},inches:{width:packed.width,height:packed.height}};
}
export const tjWall=buildWall('TJ Murphy');
export const paulWall=buildWall('Paul Murphy');
export const notToScale=unscaledPaintings().map(p=>({id:p.id,title:p.title,href:commissionAnchors[p.slug]?`/commissions/#${commissionAnchors[p.slug]}`:urlFor(p),kind:p.type==='commission'?'Commission package':p.archive?'Archived painting':p.olderWork?'Older Work':p.series==='strawberry-point'?'Strawberry Point Backpacking Trip':'Art-book page'}));
export const statusOrder=[['all','All'],['available','Available'],['sold','Sold'],['not-for-sale','Not for sale']];
