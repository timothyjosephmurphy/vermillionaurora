import manifest from './archive-paintings.json' with {type:'json'};
import {deriveParcel} from './shipping.mjs';
import {estimatePaperParcelWeightLb} from './shipping-estimates.mjs';

export const archivePaintings = manifest.paintings;
// Title: TJ's own title, else the inscription on the reverse, else the archive index (Oct 15 2026: retitled from the reverse).
export const archiveTitle = p => p.title || p.inscription || `Painting #${p.index}`;
export const archivePreview = (p, width=960) => `/display/${p.id}-${width}.webp`;

export default archivePaintings.map(p => {
  const recorded=p.recordedDimensions||p.cataloguedDimensions;
  const dimensions=recorded?{width:recorded.width,height:recorded.height,unit:recorded.unit}:null;
  const price=p.originalSale&&!p.notForSale?{amount:p.originalSale.amount,currency:p.originalSale.currency}:null;
  let checkout={mode:'inquiry'};
  if(price&&dimensions){
    const weight=estimatePaperParcelWeightLb({dimensions,checkout:{shipping:{height:2}}});
    checkout={mode:'integrated',shipping:{...deriveParcel(dimensions,weight,2),insuranceRequested:false,verification:'estimated',notes:'Estimated from the recorded sheet dimensions using the existing paper, envelope, and tube packing model. Confirm packed weight before buying a label.'}};
  }
  return {
    id:p.id,slug:p.id,type:'painting',title:archiveTitle(p),artist:'TJ Murphy',
    description:p.description||`${archiveTitle(p)} by TJ Murphy, from Archived Paintings.${p.index!==null&&p.inscription&&p.inscription!==archiveTitle(p)?` ${p.inscription}.`:''}`,
    eyebrow:'Archived Paintings',listing:{status:price?'available':'not-for-sale',price},
    medium:p.medium||null,year:p.year||null,dimensions,
    facts:[
      ...(p.index===null?[]:[{label:'Archive index',value:`#${p.index}`}]),
      ...(p.dimensionsInscription?[{label:'Size noted on reverse',value:`${p.dimensionsInscription.text} in`}]:[]),
      ...(recorded?.source==='artist'?[{label:'Size',value:`${recorded.width} × ${recorded.height} ${recorded.unit} (W × H)`}]:[]),
      ...(p.bookReference?[{label:'Book reference',value:`${p.bookReference.book}, page ${p.bookReference.page}: “${p.bookReference.caption}”`}]:[]),
      ...(p.estimatedDimensions&&recorded?.source!=='artist'?[{label:'Approximate paper size',value:`About ${p.estimatedDimensions.width} × ${p.estimatedDimensions.height} in (W × H), estimated from photographs; allow roughly 10% variation.`}]:[]),
      ...(p.cataloguedDimensions?[{label:'Previously catalogued size',value:`${p.cataloguedDimensions.width} × ${p.cataloguedDimensions.height} ${p.cataloguedDimensions.unit} (W × H)`}]:[])
    ],
    story:p.inscription&&p.index!==null?[`Inscribed on the reverse: “${p.inscription}”.`]:[],
    image:{src:p.front.sourceUrl,fullSrc:archivePreview(p,1600),alt:p.alt,width:p.front.width,height:p.front.height,caption:archiveTitle(p)},
    checkout,inquiry:{label:price?'Contact me to purchase the original':'Ask about this painting',note:price&&!dimensions?'Contact me to arrange purchase and shipping.':''},
    back:{href:'/gallery/archived/',label:'← Back to Archived Paintings'},
    archive:{index:p.index,...(p.withdrawnOriginalSale?{originalWithdrawn:true}:{}),order:p.order,indexStatus:p.indexStatus,master:p.front,reverse:p.back,...(p.estimatedDimensions?{estimatedDimensions:p.estimatedDimensions}:{}),...(p.cataloguedDimensions?{cataloguedDimensions:p.cataloguedDimensions}:{})}
  };
});
