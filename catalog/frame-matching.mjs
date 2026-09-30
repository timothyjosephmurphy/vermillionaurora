import catalog from './frames.json' with {type:'json'};

export const frameCatalog = catalog;
const tolerance = 0.001;
export function frameSizeInches(size) {
  if (!size || (size.unit && !['in','cm'].includes(size.unit)) ||
      !['width','height'].every(key => Number.isFinite(size[key]) && size[key] > 0)) return null;
  const divisor = size.unit === 'cm' ? 2.54 : 1;
  return {width:size.width/divisor,height:size.height/divisor,unit:'in'};
}
export function frameSizeLabel(size) {
  return `${Number(size.width.toFixed(2))} × ${Number(size.height.toFixed(2))} in`;
}
export function amazonFrameUrl(asin, tag = catalog.affiliateTag) {
  if (!/^[A-Z0-9]{10}$/.test(asin)) throw Error('Invalid frame ASIN');
  const url = new URL(`https://www.amazon.com/dp/${asin}`);
  if (tag) {
    if (!/^[a-zA-Z0-9-]+-20$/.test(tag)) throw Error('Invalid US Amazon Associates tracking ID');
    url.searchParams.set('tag',tag);
  }
  return url.href;
}
export function amazonFrameSearchUrl(size) {
  if (!frameSizeInches(size)) return null;
  const [short,long] = [size.width,size.height].sort((a,b)=>a-b);
  const url = new URL('https://www.amazon.com/s');
  url.searchParams.set('k',`${short} x ${long} ${size.unit==='cm'?'cm':'inch'} picture frame`);
  return url.href;
}
// Match the physical sheet, never just the image or a rounded nominal size.
// A larger frame needs room for a mat on all four sides. No trimming is assumed.
export function matchingFrames(paper, image = paper) {
  const sheet = frameSizeInches(paper), art = frameSizeInches(image);
  if (!sheet || !art || art.width > sheet.width+tolerance || art.height > sheet.height+tolerance) return [];
  const [short,long] = [sheet.width,sheet.height].sort((a,b)=>a-b);
  return catalog.frames.flatMap(frame => {
    const [fw,fh] = [frame.width,frame.height].sort((a,b)=>a-b);
    const direct = Math.abs(fw-short)<tolerance && Math.abs(fh-long)<tolerance;
    const mat = fw>=short+1 && fh>=long+1 && fw*fh<=short*long*4;
    if (!direct && !mat) return [];
    const size = frameSizeLabel(frame);
    return [{...frame,fit:direct?'direct':'mat',title:`${size} · ${frame.color.toLowerCase()}`,
      label:direct?'Fits directly · without the supplied mat':'Requires a custom mat',
      detail:direct
        ? 'Use without the supplied mat. The visible opening is about ½ inch smaller overall than the listed size, so the frame covers part of the edge.'
        : `Use a ${size} custom mat made for a ${frameSizeLabel(art)} image on ${frameSizeLabel(sheet)} paper. The supplied mat is not a confirmed fit.`,
      href:amazonFrameUrl(frame.asin)}];
  }).sort((a,b)=>(a.fit==='direct'?0:1)-(b.fit==='direct'?0:1)||a.width*a.height-b.width*b.height).slice(0,2);
}
export function originalFrameEligible(product) {
  return product.type==='painting' && product.listing?.status==='available' &&
    /paper/i.test(product.surface||'') && !/\bframed\b/i.test(product.framing||'') &&
    !!frameSizeInches(product.dimensions);
}
export function frameSelection(paper, image, context='original',mat=null) {
  if(mat){
    const outer=frameSizeInches(mat.outer),art=frameSizeInches(image);
    return {summary:outer?`Mat / frame: ${frameSizeLabel(outer)}${art?` · Image: ${frameSizeLabel(art)}`:''}`:'Mat size awaiting confirmation',
      options:outer?matchingFrames(outer,outer).filter(f=>f.fit==='direct').map(f=>({...f,label:'Fits the selected mat',detail:`Use the ${frameSizeLabel(outer)} FinerWorks mat with this frame. Remove the frame’s supplied mat.`})):[],
      empty:'No checked frame matches the selected mat size.'};
  }
  const sheet=frameSizeInches(paper), art=frameSizeInches(image||paper);
  return {
    summary:sheet ? `${context==='print'?'Print paper':'Artwork'}: ${frameSizeLabel(sheet)}${art&&(art.width!==sheet.width||art.height!==sheet.height)?` · Image: ${frameSizeLabel(art)}`:''}` : 'Paper size awaiting confirmation',
    options:matchingFrames(paper,image||paper),
    empty:sheet ? 'No checked Amazon frame matches this size. Please ask a framer for a custom frame; do not trim the artwork to fit.' : 'Frame recommendations will appear once the print paper size is confirmed.'
  };
}
