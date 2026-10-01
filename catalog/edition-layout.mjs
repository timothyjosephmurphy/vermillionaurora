// Full-image editions: original measurements are not rewritten to fit a photograph.
// A white safety margin absorbs the borderless lab's trimming bleed.
export const EDITION_LAYOUT = 'full-image-white-border-v1';
export const EDITION_BORDER_IN = 0.125;
const round = n => Math.round(n * 10000) / 10000;
export function editionLayouts(source, original, dpi = 300) {
  if (!Number.isSafeInteger(dpi) || dpi < 300 || !['widthPx','heightPx'].every(k => Number.isSafeInteger(source?.[k]) && source[k] > 0)) return [];
  const w = source.widthPx, h = source.heightPx;
  let factor = 1 / dpi;
  if (original) {
    if (!['in','cm'].includes(original.unit) || ![original.width,original.height].every(n => Number.isFinite(n) && n > 0)) return [];
    const divisor = original.unit === 'cm' ? 2.54 : 1;
    const [short,long] = [original.width/divisor,original.height/divisor].sort((a,b)=>a-b);
    factor = Math.min(factor, short/Math.min(w,h), long/Math.max(w,h));
  }
  const borderPx = Math.ceil(EDITION_BORDER_IN * dpi), seen = new Set();
  return [['full','Large print',1],['medium','Medium print',0.75],['small','Small print',0.5]].flatMap(([key,label,scale]) => {
    // Paper dimensions are hundredths of an inch; never round quality upwards.
    const paperWidth = Math.floor((w*factor*scale+2*EDITION_BORDER_IN)*100+1e-8)/100;
    const paperHeight = Math.floor((h*factor*scale+2*EDITION_BORDER_IN)*100+1e-8)/100;
    if (Math.min(paperWidth,paperHeight) < 4 || Math.max(paperWidth,paperHeight) > 40) return [];
    const widthPx = Math.round(paperWidth*dpi), heightPx = Math.round(paperHeight*dpi);
    const resize = Math.min(1,(widthPx-2*borderPx)/w,(heightPx-2*borderPx)/h);
    const contentWidth = Math.round(w*resize), contentHeight = Math.round(h*resize);
    if (contentWidth < 1 || contentHeight < 1) return [];
    const layoutSpec = {dpi,widthPx,heightPx,content:{left:Math.floor((widthPx-contentWidth)/2),top:Math.floor((heightPx-contentHeight)/2),width:contentWidth,height:contentHeight}};
    const identity = `${paperWidth}x${paperHeight}`;
    if (seen.has(identity)) return []; seen.add(identity);
    return [{key,label,scale,sizeBasis:'image-proportional',image:{width:round(contentWidth/dpi),height:round(contentHeight/dpi),unit:'in'},paper:{width:paperWidth,height:paperHeight,unit:'in'},layoutSpec}];
  });
}
