import manifest from './strawberry-point.json' with {type:'json'};
import {estimatePaperParcelWeightLb} from './shipping-estimates.mjs';
// Strawberry Point Backpacking Trip (fall 2026): one page per painting ("Strawberry Point Backpacking Trip #n", numbered across the
// photos in order, left to right and top to bottom), plus one page for each photo that shows several paintings.
// Medium is watercolor pastel (TJ, Oct 16 2026); titles are not recorded and there are no prints yet. Originals #4–14 are for sale (TJ, Oct 16 2026);
// with no measured size they follow the unmeasured-original rule: priced, Buy goes to inquiry, no invented parcel. #1–3 stay by inquiry.
export const STRAWBERRY_GALLERY='/gallery/strawberry-point/';
export const strawberryPaintings=manifest.paintings;
export const strawberryGroups=manifest.groups;
export const strawberryId=p=>`strawberry-point-${p.index}`;
export const strawberryTitle=p=>`Strawberry Point Backpacking Trip #${p.index}`;
// Original prices (TJ, Oct 16 2026). #8–10 default $100; sizes unknown.
export const STRAWBERRY_PRICES={4:75,5:75,6:75,7:75,8:100,9:100,10:100,11:75,12:75,13:75,14:75,15:100};
// Measured sizes (TJ, Oct 16 2026): #4–7 are 5 × 5 in (13 × 13 cm); #8–10 and #15 are 7.5 × 7.5 in (19 × 19 cm); #11–14 are 9.75 × 9.75 in (24 × 24 cm). Measured + priced originals get integrated checkout.
export const STRAWBERRY_SIZES={15:[7.5,7.5,19],4:[5,5,13],5:[5,5,13],6:[5,5,13],7:[5,5,13],8:[7.5,7.5,19],9:[7.5,7.5,19],10:[7.5,7.5,19],11:[9.75,9.75,24],12:[9.75,9.75,24],13:[9.75,9.75,24],14:[9.75,9.75,24]};
const sizeOf=p=>{const d=STRAWBERRY_SIZES[p.index];return d?{width:d[0],height:d[1],unit:'in'}:null;};
const cmOf=p=>{const d=STRAWBERRY_SIZES[p.index];return d?`${d[2]} × ${d[2]} cm`:'';};
const shippingFor=d=>{const weight=estimatePaperParcelWeightLb({dimensions:d,checkout:{shipping:{height:2}}});
  return {length:Math.max(d.width,d.height)+2,width:Math.min(d.width,d.height)+2,height:2,weight,packaging:'flat',insuranceRequested:false,verification:'estimated',notes:'Estimated with the shared paper-parcel rule (catalog/shipping-estimates.mjs). Confirm packed weight before buying a label.'};};
const priceOf=p=>STRAWBERRY_PRICES[p.index]?{amount:STRAWBERRY_PRICES[p.index].toFixed(2),currency:'USD'}:null;
const MISSING='Title and size not yet recorded';
const groupOf=p=>strawberryGroups.find(g=>g.members.includes(p.index));
export const strawberryGroupTitle=g=>`Strawberry Point Backpacking Trip #${g.members[0]}–${g.members.at(-1)}`;
const image=(d,alt,caption)=>({src:`https://tjm.art${d.base}-1600.webp`,fullSrc:`${d.base}-1600.webp`,alt,width:d.sourceWidth,height:d.sourceHeight,caption});
const common={type:'painting',artist:'TJ Murphy',eyebrow:'Strawberry Point Backpacking Trip',listing:{status:'inquiry',price:null},
  year:2026,dimensions:null,medium:'Watercolor pastel',surface:null,dimensionOrder:'width-height',checkout:{mode:'inquiry'},series:'strawberry-point'};
const paintings=strawberryPaintings.map(p=>{const g=groupOf(p),title=strawberryTitle(p),price=priceOf(p),dims=sizeOf(p);return {...common,
  ...(price?{listing:{status:'available',price}}:{}),
  ...(dims?{dimensions:dims,...(price?{checkout:{mode:'integrated',shipping:shippingFor(dims)}}:{})}:{}),
  id:strawberryId(p),slug:strawberryId(p),title,
  description:`${title}, a painting by TJ Murphy from his Strawberry Point backpacking trip on the Pacific coast of the Olympic Peninsula.`,
  facts:[{label:'Series',value:'Strawberry Point Backpacking Trip, painted fall 2026'},{label:'Index',value:`#${p.index}`},...(dims?[{label:'Size',value:`${dims.width} × ${dims.height} in (${cmOf(p)})`},{label:'Details',value:'Title not yet recorded'}]:[{label:'Details',value:MISSING}]),{label:'Original',value:price?`Available · $${Number(price.amount)}`:'Not yet for sale · inquire'},...(p.master?[{label:"Print master",value:`On file (${p.master.widthPx} × ${p.master.heightPx} px); ${p.master.widthPx<2000?'too small for prints, original only':'prints need the painting size'}`}]:[]),
    ...(g?[{label:'Photographed with',value:`${strawberryGroupTitle(g)} (position ${p.position})`}]:[])],
  story:[],image:image(p.display,`${title}, a painting by TJ Murphy`,title),
  inquiry:{label:'Inquire about this painting',note:''},
  back:g?{href:`/products/${g.id}/`,label:`← Back to ${strawberryGroupTitle(g)}`}:{href:STRAWBERRY_GALLERY,label:'← Back to Strawberry Point Backpacking Trip'}};});
const groups=strawberryGroups.map(g=>{const title=strawberryGroupTitle(g);return {...common,
  id:g.id,slug:g.id,title,
  description:`${title}: ${g.members.length} paintings by TJ Murphy from his Strawberry Point backpacking trip, photographed together.`,
  facts:[{label:'Paintings',value:`${g.members.length}, shown as photographed`},...g.members.map((n,i)=>({label:String(i+1),value:`Strawberry Point Backpacking Trip #${n}`,href:`/products/strawberry-point-${n}/`})),{label:'Details',value:MISSING}],
  story:['Each painting in this photograph has its own page, linked above.'],
  image:image(g.display,`${g.members.length} paintings by TJ Murphy from Strawberry Point, photographed together`,title),
  gallery:g.members.map(n=>{const p=strawberryPaintings.find(x=>x.index===n);return {...p.display,alt:`${strawberryTitle(p)}, a painting by TJ Murphy`,caption:strawberryTitle(p),href:`/products/strawberry-point-${n}/`};}),
  inquiry:{label:'Ask about these paintings',note:''},back:{href:STRAWBERRY_GALLERY,label:'← Back to Strawberry Point Backpacking Trip'},
  strawberryGroup:{members:g.members}};});
export default [...paintings,...groups];
