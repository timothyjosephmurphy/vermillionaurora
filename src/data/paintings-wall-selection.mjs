import {products} from '../../catalog/catalog.mjs';
import {readyPrints} from '../../catalog/prints.mjs';
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
const tjWork=p=>p.artist==='TJ Murphy'&&(p.type==='painting'||p.bookGallery)&&!coveredSet(p);
export const wallBasis=p=>sized(p)&&(isPainting(p)||p.bookGallery)?'actual':largestPrint.has(p.id)?'print':null;
export const scaledPaintings=artist=>products.filter(p=>artist==='TJ Murphy'?tjWork(p)&&wallBasis(p):isPainting(p)&&p.artist===artist&&sized(p));
export const unscaledPaintings=()=>products.filter(p=>p.artist==='TJ Murphy'&&(p.type==='commission'||(tjWork(p)&&!wallBasis(p))));
export const inchesOf=p=>{
  if(wallBasis(p)==='print'){const s=largestPrint.get(p.id).imageSize,k=s.unit==='cm'?1/2.54:1;return {width:s.width*k,height:s.height*k};}
  const k=p.dimensions.unit==='cm'?1/2.54:1;return {width:p.dimensions.width*k,height:p.dimensions.height*k};
};
