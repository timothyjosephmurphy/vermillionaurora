import manifest from './older-work.json' with {type:'json'};
// Older Work: each photographed group is one product (one page, one composite master); a lone painting is its own product.
export const olderWorkGroups = manifest.groups;
export const olderWorkPreview = (g, width=960) => `/display/${g.id}-${width}.webp`;
const size = d => d ? `${d.width} × ${d.height} ${d.unit} (W × H, ${d.source==='estimated from reference'?'estimated from a measured painting of the same paper':'from the label on the reverse'})` : 'Unknown';
const memberLine = m => `${m.name}${m.year?` (${m.year})`:''} — ${m.dimensions?`${m.dimensions.width} × ${m.dimensions.height} in`:'size unknown'}`;
export const olderWorkTitle = g => g.members.length===1 ? g.members[0].name : g.title;
export const olderWorkAlt = g => g.members.length===1
  ? `${g.members[0].name}, a painting by TJ Murphy`
  : `${g.members.length} paintings by TJ Murphy shown together: ${g.members.map(m=>m.name).join(', ')}`;
export default olderWorkGroups.map(g => {
  const single=g.members.length===1, title=olderWorkTitle(g), m0=g.members[0];
  return {
    id:g.id,slug:g.id,type:'painting',title,artist:'TJ Murphy',
    description:single?`${title}, an older painting by TJ Murphy.`:`${title}: ${g.members.length} older paintings by TJ Murphy, presented together as photographed.`,
    eyebrow:'Older Work',listing:{status:'not-for-sale',price:null},
    year:single?m0.year:null,dimensions:single&&m0.dimensions?{width:m0.dimensions.width,height:m0.dimensions.height,unit:'in'}:null,
    facts:single?[
      {label:'Index',value:m0.index?`#${m0.index}`:'Not recorded'},
      {label:'Size',value:size(m0.dimensions)},
      {label:'Original',value:'Not for sale · Prints only'}
    ]:[
      {label:'Paintings',value:`${g.members.length}, shown in the order photographed`},
      ...g.members.map((m,i)=>({label:`${g.layout==='stack'?['Top','Middle','Bottom'][i]||i+1:i+1}`,value:memberLine(m)})),
      {label:'Originals',value:'Not for sale · Prints of the set only'}
    ],
    story:single?[]:['A print reproduces the whole set as photographed, side by side on white.'],
    image:g.preview?{src:`https://tjm.art${olderWorkPreview(g,1600)}`,fullSrc:olderWorkPreview(g,1600),alt:olderWorkAlt(g),width:g.preview.width,height:g.preview.height,caption:title}:{src:g.master.url,fullSrc:olderWorkPreview(g,1600),alt:olderWorkAlt(g),width:g.master.widthPx,height:g.master.heightPx,caption:title},
    gallery:single?[]:g.members.map(m=>({...m.display,alt:`${m.name}, a painting by TJ Murphy`,caption:m.name})),
    checkout:{mode:'inquiry'},inquiry:{label:'Ask about this painting',note:''},
    back:{href:'/gallery/older-work/',label:'← Back to Older Work'},
    olderWork:{order:g.order,members:g.members.map(({name,index,dimensions,year})=>({name,index,dimensions,year})),master:g.master}
  };
});
