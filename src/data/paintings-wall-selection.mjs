import {products} from '../../catalog/catalog.mjs';
// Every catalog painting that has real measurements can be drawn to scale; the rest are only listed.
// Book scans (bookGallery) and commission packages never have a painting size.
export const isPainting=p=>p.type==='painting'&&!p.bookGallery&&['TJ Murphy','Paul Murphy'].includes(p.artist);
const sized=p=>Number(p.dimensions?.width)>0&&Number(p.dimensions?.height)>0&&['in','cm'].includes(p.dimensions.unit);
export const scaledPaintings=artist=>products.filter(p=>isPainting(p)&&p.artist===artist&&sized(p));
export const unscaledPaintings=()=>products.filter(p=>p.artist==='TJ Murphy'&&(p.type==='commission'||p.bookGallery||(isPainting(p)&&!sized(p))));
export const inchesOf=p=>{const k=p.dimensions.unit==='cm'?1/2.54:1;return {width:p.dimensions.width*k,height:p.dimensions.height*k};};
