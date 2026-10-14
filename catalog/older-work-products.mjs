import manifest from './older-work.json' with {type:'json'};
// Older Work: each photographed group is one product (one page, one composite master); a lone painting is its own product.
export const olderWorkGroups = manifest.groups;
export const olderWorkPreview = (g, width=960) => `/display/${g.id}-${width}.webp`;
const size = d => d ? `${d.width} × ${d.height} ${d.unit} (W × H, from the label on the reverse)` : 'Unknown';
const memberLine = m => `${m.name}${m.year?` (${m.year})`:''} — ${m.dimensions?`${m.dimensions.width} × ${m.dimensions.height} in`:'size unknown'}`;
export const olderWorkTitle = g => g.members.length===1 ? g.members[0].name : g.title;
export const olderWorkAlt = g => g.members.length===1
  ? `${g.members[0].name}, a painting by TJ Murphy`
  : `${g.members.length} paintings by TJ Murphy shown together: ${g.members.map(m=>m.name).join(', ')}`;
// Original prices by size tier (TJ, Oct 14 2026).
const TIER={'4.25x4':75,'7x5':75,'6x9':75,'9x6':75,'7x8.5':75,'12x4.5':100,'9x10.75':200,'11x12':200,'7.25x11.75':200,'10.5x13.5':200,'12x16':250,'17.5x12.25':250,'7.75x30':250};
export const originalPrice = m => {const d=m.dimensions;const v=d&&TIER[`${d.width}x${d.height}`];return v?{amount:v.toFixed(2),currency:'USD'}:null;};
export const originalId = (g,i) => `${g.id}-original-${i+1}`;
const shippingFor = d => {const [a,b]=[d.width,d.height].sort((x,y)=>x-y),sq=a*b*0.00064516,grams=sq*300+2*sq*180+10,oz=Math.ceil(grams/28.3495+4);
  return {length:b+2,width:a+2,height:2,weight:oz/16,packaging:'flat',insuranceRequested:false,verification:'estimated',notes:'Estimated: one 300 gsm paper sheet plus a same-size two-face 180 gsm envelope and 10 g flap/label allowance; adds 4 oz for flat-mailer protection. Rounded up to a whole ounce. Confirm packed weight before buying a label.'};};
const originals = olderWorkGroups.flatMap(g=>g.members.map((m,i)=>{const price=originalPrice(m);if(!price||g.members.length===1)return null;const id=originalId(g,i);
  return {id,slug:id,type:'painting',title:m.name,artist:'TJ Murphy',description:`${m.name}, an original painting by TJ Murphy.`,eyebrow:'Older Work · Original',
    listing:{status:'available',price},medium:null,surface:'Paper',year:m.year??null,dimensions:{width:m.dimensions.width,height:m.dimensions.height,unit:'in'},dimensionOrder:'width-height',
    facts:[{label:'Index',value:m.index?`#${m.index}`:'Not recorded'},{label:'Size',value:size(m.dimensions)},{label:'Prints',value:g.members.length>1?`Available as part of ${olderWorkTitle(g)}`:'Available'}],
    story:[],image:{src:`https://tjm.art${m.display.fallback}`,fullSrc:m.display.fallback,alt:`${m.name}, a painting by TJ Murphy`,width:m.display.width,height:m.display.height,caption:m.name},
    checkout:{mode:'integrated',shipping:shippingFor(m.dimensions)},inquiry:{label:'Inquire about this painting',note:''},
    back:{href:`/products/${g.id}/`,label:`← Back to ${olderWorkTitle(g)}`}};}).filter(Boolean));
export const olderWorkOriginals = originals;
const groupProducts = olderWorkGroups.map(g => {
  const single=g.members.length===1, title=olderWorkTitle(g), m0=g.members[0];
  return {
    id:g.id,slug:g.id,type:'painting',title,artist:'TJ Murphy',
    description:single?`${title}, an older painting by TJ Murphy.`:`${title}: ${g.members.length} older paintings by TJ Murphy, presented together as photographed.`,
    eyebrow:'Older Work',listing:single&&originalPrice(m0)?{status:'available',price:originalPrice(m0)}:{status:'not-for-sale',price:null},
    year:single?m0.year:null,dimensions:single&&m0.dimensions?{width:m0.dimensions.width,height:m0.dimensions.height,unit:'in'}:null,
    facts:single?[
      {label:'Index',value:m0.index?`#${m0.index}`:'Not recorded'},
      {label:'Size',value:size(m0.dimensions)},
      {label:'Original',value:originalPrice(m0)?`Available · $${Number(originalPrice(m0).amount)}`:'Not for sale'}
    ]:[
      {label:'Paintings',value:`${g.members.length}, shown in the order photographed`},
      ...g.members.map((m,i)=>({label:`${g.layout==='stack'?['Top','Middle','Bottom'][i]||i+1:i+1}`,value:memberLine(m)+(originalPrice(m)?` · original $${Number(originalPrice(m).amount)}`:'')})),
      {label:'Originals',value:'Each original is sold separately; prints reproduce the whole set'}
    ],
    story:single?[]:['A print reproduces the whole set as photographed, side by side on white.'],
    image:g.preview?{src:`https://tjm.art${olderWorkPreview(g,1600)}`,fullSrc:olderWorkPreview(g,1600),alt:olderWorkAlt(g),width:g.preview.width,height:g.preview.height,caption:title}:{src:g.master.url,fullSrc:olderWorkPreview(g,1600),alt:olderWorkAlt(g),width:g.master.widthPx,height:g.master.heightPx,caption:title},
    gallery:single?[]:g.members.map(m=>({...m.display,alt:`${m.name}, a painting by TJ Murphy`,caption:m.name})),
    checkout:single&&originalPrice(m0)?{mode:'integrated',shipping:shippingFor(m0.dimensions)}:{mode:'inquiry'},inquiry:{label:single?'Inquire about this painting':'Ask about these paintings',note:''},surface:'Paper',dimensionOrder:'width-height',
    back:{href:'/gallery/older-work/',label:'← Back to Older Work'},
    olderWork:{order:g.order,members:g.members.map(({name,index,dimensions,year})=>({name,index,dimensions,year})),master:g.master}
  };
});
export default [...groupProducts, ...originals];
