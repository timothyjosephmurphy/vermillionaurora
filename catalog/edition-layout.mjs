// Full-image editions: original measurements are not rewritten to fit a photograph.
// A white safety margin absorbs the borderless lab's trimming bleed.
export const EDITION_LAYOUT = 'full-image-white-border-v1';
export const EDITION_BORDER_IN = 0.125;
const round = n => Math.round(n * 10000) / 10000;
export function editionLayouts(source, original, dpi = 300, options = {}) {
  if (!Number.isSafeInteger(dpi) || dpi < 300 || !['widthPx','heightPx'].every(k => Number.isSafeInteger(source?.[k]) && source[k] > 0)) return [];
  const w = source.widthPx, h = source.heightPx;
  // Group composites have no single original; layoutOptions.setDimensions caps them at the physical set size.
  original = original || options.setDimensions || null;
  let factor = 1 / dpi;
  if (original) {
    if (!['in','cm'].includes(original.unit) || ![original.width,original.height].every(n => Number.isFinite(n) && n > 0)) return [];
    const divisor = original.unit === 'cm' ? 2.54 : 1;
    const [short,long] = [original.width/divisor,original.height/divisor].sort((a,b)=>a-b);
    factor = Math.min(factor, short/Math.min(w,h), long/Math.max(w,h));
  }
  const borderPx = Math.ceil(EDITION_BORDER_IN * dpi), seen = new Set();
  return [['full','Large print',1],['medium','Medium print',0.75],['small','Small print',0.5]].flatMap(([key,label,scale]) => {
    if (options.sizeKeys && !options.sizeKeys.includes(key)) return [];
    // Paper dimensions are hundredths of an inch; never round quality upwards.
    let paperWidth = Math.floor((w*factor*scale+2*EDITION_BORDER_IN)*100+1e-8)/100;
    let paperHeight = Math.floor((h*factor*scale+2*EDITION_BORDER_IN)*100+1e-8)/100;
    if (options.padPaperToMinimum) {paperWidth=Math.max(4,paperWidth);paperHeight=Math.max(4,paperHeight);}
    if (Math.min(paperWidth,paperHeight) < 4 || Math.max(paperWidth,paperHeight) > 40) return [];
    const widthPx = Math.round(paperWidth*dpi), heightPx = Math.round(paperHeight*dpi);
    const resize = Math.min(1,factor*scale*dpi,(widthPx-2*borderPx)/w,(heightPx-2*borderPx)/h);
    const contentWidth = Math.round(w*resize), contentHeight = Math.round(h*resize);
    if (contentWidth < 1 || contentHeight < 1) return [];
    const layoutSpec = {dpi,widthPx,heightPx,content:{left:Math.floor((widthPx-contentWidth)/2),top:Math.floor((heightPx-contentHeight)/2),width:contentWidth,height:contentHeight}};
    const identity = `${paperWidth}x${paperHeight}`;
    if (seen.has(identity)) return []; seen.add(identity);
    return [{key,label,scale,sizeBasis:'image-proportional',image:{width:round(contentWidth/dpi),height:round(contentHeight/dpi),unit:'in'},paper:{width:paperWidth,height:paperHeight,unit:'in'},layoutSpec}];
  });
}

// Unframed editions use FinerWorks' own outer border instead of a bleed-trimmed embedded margin.
// Style 9 "1/2" Extra Border Added" (list_style_types, 2026-10-17): no bleed; the lab adds a 1/2" white
// border outside the ordered print size, so the cut sheet is 1" larger in each dimension.
// The image keeps the padded edition's exact pixels (crop-only, at most ~1/100" for hundredth sizes).
// The style's minimum print side is 4"; smaller images get an equal embedded white margin on all sides.
export const BORDERED_LAYOUT = 'full-image-finerworks-border-v1';
export const BORDERED_STYLE_ID = 9;
export const BORDERED_BORDER_IN = 0.5;
export const BORDERED_MIN_PRINT_IN = 4;
const hundredths = n => Math.round(n * 100) / 100;
export function borderedLayout(choice) {
  const spec = choice?.layoutSpec, c = spec?.content;
  if (!spec || !c || !Number.isSafeInteger(spec.dpi) || ![c.left,c.top,c.width,c.height].every(Number.isSafeInteger)) return null;
  const dpi = spec.dpi;
  const w = Math.floor(c.width / dpi * 100 + 1e-8) / 100, h = Math.floor(c.height / dpi * 100 + 1e-8) / 100;
  const cropW = Math.round(w * dpi), cropH = Math.round(h * dpi);
  if (cropW < 1 || cropH < 1 || cropW > c.width || cropH > c.height) return null;
  const margin = Math.max(0, Math.ceil((BORDERED_MIN_PRINT_IN - Math.min(w, h)) / 2 * 100 - 1e-8) / 100);
  const print = {width: hundredths(w + 2 * margin), height: hundredths(h + 2 * margin), unit: 'in'};
  if (Math.min(print.width, print.height) < BORDERED_MIN_PRINT_IN || Math.max(print.width, print.height) > 40) return null;
  const widthPx = Math.round(print.width * dpi), heightPx = Math.round(print.height * dpi);
  const layoutSpec = {dpi, widthPx, heightPx,
    crop: {left: c.left + Math.floor((c.width - cropW) / 2), top: c.top + Math.floor((c.height - cropH) / 2), width: cropW, height: cropH},
    content: {left: Math.floor((widthPx - cropW) / 2), top: Math.floor((heightPx - cropH) / 2), width: cropW, height: cropH}};
  return {image: {width: round(cropW / dpi), height: round(cropH / dpi), unit: 'in'}, print,
    sheet: {width: hundredths(print.width + 2 * BORDERED_BORDER_IN), height: hundredths(print.height + 2 * BORDERED_BORDER_IN), unit: 'in'}, margin, layoutSpec};
}
