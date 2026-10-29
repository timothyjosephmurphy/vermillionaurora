// Full-image editions keep the photograph's measurements. Paper grows around the image.
// The embedded white margin is 1 inch on every side (TJ, Oct 29 2026). FinerWorks style 8
// (borderless) is the sold file: style 9 adds only 1/2 inch and crops an embedded margin,
// so it must not be used for this sheet. Style 8 can trim about 0.06 inch (its bleed; the
// style text says up to about 1/8 inch), so the finished white can land slightly under 1 inch.
// The file itself is exactly 1.00 inch. Mats overlap that white edge; they do not cover the image.
export const EDITION_LAYOUT = 'full-image-white-border-v2';
export const EDITION_BORDER_IN = 1;
// Orders placed before this change keep the 1/8 inch safety sheet. The build still emits those bytes.
export const LEGACY_EDITION_LAYOUT = 'full-image-white-border-v1';
export const LEGACY_EDITION_BORDER_IN = 0.125;
// A listed artwork may ask for more white than the shop default. It cannot ask for less.
export function editionBorderIn(options = {}) {
  const borderIn = options.borderIn ?? EDITION_BORDER_IN;
  if (typeof borderIn !== 'number' || !Number.isFinite(borderIn) || borderIn < EDITION_BORDER_IN || borderIn > 2) return null;
  return Math.round(borderIn * 1000) / 1000;
}
const round = n => Math.round(n * 10000) / 10000;
export function editionLayouts(source, original, dpi = 300, options = {}, borderOverride = null) {
  if (!Number.isSafeInteger(dpi) || dpi < 300 || !['widthPx','heightPx'].every(k => Number.isSafeInteger(source?.[k]) && source[k] > 0)) return [];
  const borderIn = borderOverride == null ? editionBorderIn(options) : borderOverride;
  if (typeof borderIn !== 'number' || !Number.isFinite(borderIn) || borderIn <= 0 || borderIn > 2) return [];
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
  const borderPx = Math.ceil(borderIn * dpi), seen = new Set();
  return [['full','Large print',1],['medium','Medium print',0.75],['small','Small print',0.5]].flatMap(([key,label,scale]) => {
    if (options.sizeKeys && !options.sizeKeys.includes(key)) return [];
    // Paper dimensions are hundredths of an inch; never round quality upwards.
    let paperWidth = Math.floor((w*factor*scale+2*borderIn)*100+1e-8)/100;
    let paperHeight = Math.floor((h*factor*scale+2*borderIn)*100+1e-8)/100;
    if (options.padPaperToMinimum) {paperWidth=Math.max(4,paperWidth);paperHeight=Math.max(4,paperHeight);}
    if (Math.min(paperWidth,paperHeight) < 4 || Math.max(paperWidth,paperHeight) > 40) return [];
    const widthPx = Math.round(paperWidth*dpi), heightPx = Math.round(paperHeight*dpi);
    const resize = Math.min(1,factor*scale*dpi,(widthPx-2*borderPx)/w,(heightPx-2*borderPx)/h);
    const contentWidth = Math.round(w*resize), contentHeight = Math.round(h*resize);
    if (contentWidth < 1 || contentHeight < 1) return [];
    const layoutSpec = {dpi,widthPx,heightPx,content:{left:Math.floor((widthPx-contentWidth)/2),top:Math.floor((heightPx-contentHeight)/2),width:contentWidth,height:contentHeight}};
    const identity = `${paperWidth}x${paperHeight}`;
    if (seen.has(identity)) return []; seen.add(identity);
    return [{key,label,scale,sizeBasis:'image-proportional',image:{width:round(contentWidth/dpi),height:round(contentHeight/dpi),unit:'in'},paper:{width:paperWidth,height:paperHeight,unit:'in'},layoutSpec,borderIn}];
  });
}

// Historical unframed sheets used FinerWorks style 9 instead of an embedded margin.
// Style 9 "1/2" Extra Border Added" (list_style_types, 2026-10-17): no bleed; the lab adds a 1/2" white
// border outside the ordered print size, so the cut sheet is 1" larger in each dimension.
// That path crops an embedded margin, so a 1" shop sheet is sold as style 8 and does not call this.
// Kept so already-paid style 9 files can be reproduced byte-for-byte.
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
