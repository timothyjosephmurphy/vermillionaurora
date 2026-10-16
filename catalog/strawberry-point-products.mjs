import manifest from './strawberry-point.json' with {type:'json'};
// Strawberry Point Hiking Trip (fall 2026): one page per painting ("Strawberry Point Hiking Trip #n", numbered across the
// photos in order, left to right and top to bottom), plus one page for each photo that shows several paintings.
// Titles, sizes and medium are not recorded yet, so there are no prints. Originals #4–14 are for sale (TJ, Oct 16 2026);
// with no measured size they follow the unmeasured-original rule: priced, Buy goes to inquiry, no invented parcel. #1–3 stay by inquiry.
export const STRAWBERRY_GALLERY='/gallery/strawberry-point/';
export const strawberryPaintings=manifest.paintings;
export const strawberryGroups=manifest.groups;
export const strawberryId=p=>`strawberry-point-${p.index}`;
export const strawberryTitle=p=>`Strawberry Point Hiking Trip #${p.index}`;
// Original prices (TJ, Oct 16 2026). #8–10 default $100; sizes unknown.
export const STRAWBERRY_PRICES={4:75,5:75,6:75,7:75,8:100,9:100,10:100,11:75,12:75,13:75,14:75};
const priceOf=p=>STRAWBERRY_PRICES[p.index]?{amount:STRAWBERRY_PRICES[p.index].toFixed(2),currency:'USD'}:null;
const MISSING='Title, size and medium not yet recorded';
const groupOf=p=>strawberryGroups.find(g=>g.members.includes(p.index));
export const strawberryGroupTitle=g=>`Strawberry Point Hiking Trip #${g.members[0]}–${g.members.at(-1)}`;
const image=(d,alt,caption)=>({src:`https://tjm.art${d.base}-1600.webp`,fullSrc:`${d.base}-1600.webp`,alt,width:d.sourceWidth,height:d.sourceHeight,caption});
const common={type:'painting',artist:'TJ Murphy',eyebrow:'Strawberry Point Hiking Trip',listing:{status:'inquiry',price:null},
  year:2026,dimensions:null,medium:null,surface:null,dimensionOrder:'width-height',checkout:{mode:'inquiry'},series:'strawberry-point'};
const paintings=strawberryPaintings.map(p=>{const g=groupOf(p),title=strawberryTitle(p),price=priceOf(p);return {...common,
  ...(price?{listing:{status:'available',price}}:{}),
  id:strawberryId(p),slug:strawberryId(p),title,
  description:`${title}, a painting by TJ Murphy from his Strawberry Point hiking trip on the Pacific coast of the Olympic Peninsula.`,
  facts:[{label:'Series',value:'Strawberry Point Hiking Trip, painted fall 2026'},{label:'Index',value:`#${p.index}`},{label:'Details',value:MISSING},{label:'Original',value:price?`Available · $${Number(price.amount)}`:'Not yet for sale · inquire'},...(p.master?[{label:"Print master",value:`On file (${p.master.widthPx} × ${p.master.heightPx} px); prints need the painting size`}]:[]),
    ...(g?[{label:'Photographed with',value:`${strawberryGroupTitle(g)} (position ${p.position})`}]:[])],
  story:[],image:image(p.display,`${title}, a painting by TJ Murphy`,title),
  inquiry:{label:'Inquire about this painting',note:''},
  back:g?{href:`/products/${g.id}/`,label:`← Back to ${strawberryGroupTitle(g)}`}:{href:STRAWBERRY_GALLERY,label:'← Back to Strawberry Point Hiking Trip'}};});
const groups=strawberryGroups.map(g=>{const title=strawberryGroupTitle(g);return {...common,
  id:g.id,slug:g.id,title,
  description:`${title}: ${g.members.length} paintings by TJ Murphy from his Strawberry Point hiking trip, photographed together.`,
  facts:[{label:'Paintings',value:`${g.members.length}, shown as photographed`},...g.members.map((n,i)=>({label:String(i+1),value:`Strawberry Point Hiking Trip #${n}`,href:`/products/strawberry-point-${n}/`})),{label:'Details',value:MISSING}],
  story:['Each painting in this photograph has its own page, linked above.'],
  image:image(g.display,`${g.members.length} paintings by TJ Murphy from Strawberry Point, photographed together`,title),
  gallery:g.members.map(n=>{const p=strawberryPaintings.find(x=>x.index===n);return {...p.display,alt:`${strawberryTitle(p)}, a painting by TJ Murphy`,caption:strawberryTitle(p),href:`/products/strawberry-point-${n}/`};}),
  inquiry:{label:'Ask about these paintings',note:''},back:{href:STRAWBERRY_GALLERY,label:'← Back to Strawberry Point Hiking Trip'},
  strawberryGroup:{members:g.members}};});
export default [...paintings,...groups];
