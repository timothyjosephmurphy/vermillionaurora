// Pure product-code validation, shared by build-time sizing and server-side quotes.
const positive = n => Number.isSafeInteger(n) && n > 0;
const sizeOK = d => d && ['width','height'].every(k => typeof d[k] === 'number' && Number.isFinite(d[k]) && d[k] > 0);
export function finerworksSizeAllowed(style, size) {
  if (!style || !sizeOK(size)) return false;
  if (!style.allowDecimal && (!Number.isInteger(size.width) || !Number.isInteger(size.height))) return false;
  const fits = d => {
    if (!style.customSizing) return (style.availableSizes || []).some(a => sizeOK(a) && Math.abs(a.width-d.width)<0.00001 && Math.abs(a.height-d.height)<0.00001);
    if (!sizeOK(style.min) || !sizeOK(style.max)) return false;
    return d.width >= style.min.width && d.height >= style.min.height && d.width <= style.max.width && d.height <= style.max.height;
  };
  return fits(size) || (style.allowRotate === true && fits({width:size.height,height:size.width}));
}
export function finerworksProductCode(media, style, size) {
  if (!positive(media?.id) || !positive(media?.productTypeId) || !positive(style?.id) || !media.styleIds?.includes(style.id) || !finerworksSizeAllowed(style,size)) throw Error('FinerWorks does not confirm this exact material, style, and size');
  return `${media.productTypeId}M${media.id}M${style.id}S${size.width}X${size.height}`;
}
