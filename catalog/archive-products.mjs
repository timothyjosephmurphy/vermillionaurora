import manifest from './archive-paintings.json' with {type:'json'};

export const archivePaintings = manifest.paintings;
export const archiveTitle = p => p.index === null ? p.inscription : `Painting #${p.index}`;
export const archivePreview = (p, width=960) => `/display/${p.id}-${width}.webp`;

export default archivePaintings.map(p => ({
  id:p.id, slug:p.id, type:'painting', title:archiveTitle(p), artist:'TJ Murphy',
  description:`${archiveTitle(p)} by TJ Murphy, from Archived Paintings.${p.index!==null&&p.inscription?` ${p.inscription}.`:''}`,
  eyebrow:'Archived Paintings',
  listing:{status:'not-for-sale',price:null},
  year:p.year||null, dimensions:null,
  facts:[
    {label:'Archive index',value:p.index===null?'No index visible on the reverse':`#${p.index}`},
    ...(p.dimensionsInscription?[{label:'Size noted on reverse',value:`${p.dimensionsInscription.text} (unit not written)`}]:[]),
    ...(p.estimatedDimensions?[{label:'Approximate paper size',value:`About ${p.estimatedDimensions.width} × ${p.estimatedDimensions.height} in (W × H), estimated from photographs; allow roughly 10% variation.`}]:[]),
    ...(p.cataloguedDimensions?[{label:'Previously catalogued size',value:`${p.cataloguedDimensions.width} × ${p.cataloguedDimensions.height} ${p.cataloguedDimensions.unit} (W × H)`}]:[])
  ],
  story:p.inscription&&p.index!==null?[`Inscribed on the reverse: “${p.inscription}”.`]:[],
  image:{src:p.front.sourceUrl,fullSrc:archivePreview(p,1600),alt:p.alt,width:p.front.width,height:p.front.height,caption:archiveTitle(p)},
  checkout:{mode:'inquiry'}, inquiry:{label:'Ask about this painting',note:''},
  back:{href:'/gallery/archived/',label:'← Back to Archived Paintings'},
  archive:{index:p.index,order:p.order,indexStatus:p.indexStatus,master:p.front,reverse:p.back,...(p.estimatedDimensions?{estimatedDimensions:p.estimatedDimensions}:{}),...(p.cataloguedDimensions?{cataloguedDimensions:p.cataloguedDimensions}:{})}
}));
