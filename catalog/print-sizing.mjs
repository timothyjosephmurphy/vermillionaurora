// Image measurements are independent of the vendor's paper measurements.
export const PRINT_SCALES = [
  {key:'full',label:'Original-size print',scale:1},
  {key:'medium',label:'Medium print',scale:0.75},
  {key:'small',label:'Small print',scale:0.5}
];
export const round = n => Math.round(n * 10000) / 10000;
export function inches(dimensions) {
  if (!dimensions || !['in','cm'].includes(dimensions.unit) || !['width','height'].every(k=>Number.isFinite(dimensions[k])&&dimensions[k]>0)) throw Error('Verified artwork dimensions are required');
  const divisor=dimensions.unit==='cm'?2.54:1;
  return {width:round(dimensions.width/divisor),height:round(dimensions.height/divisor),unit:'in'};
}
export function scaledDimensions(dimensions,scale) {
  if (!Number.isFinite(scale)||scale<=0||scale>1) throw Error('Print scale must be greater than zero and no larger than the original');
  const size=inches(dimensions);
  return {width:round(size.width*scale),height:round(size.height*scale),unit:'in'};
}
export function fitSheet(image,papers) {
  return papers.flatMap(p=>[false,true].map(rotated=>{
    const width=rotated?p.height:p.width,height=rotated?p.width:p.height;
    return {...p,width,height,rotated,marginX:round((width-image.width)/2),marginY:round((height-image.height)/2)};
  })).filter(p=>p.marginX>=0&&p.marginY>=0).sort((a,b)=>a.width*a.height-b.width*b.height||a.marginX+a.marginY-b.marginX-b.marginY)[0]||null;
}
export function resolutionFor(source,image) {
  if(!source||!Number.isSafeInteger(source.widthPx)||!Number.isSafeInteger(source.heightPx)||source.widthPx<=0||source.heightPx<=0)return null;
  return {dpi:Math.floor(Math.min(source.widthPx/image.width,source.heightPx/image.height)),aspectError:Math.abs((source.widthPx/source.heightPx)/(image.width/image.height)-1)};
}
export function sizeLabel(size) {return `${Number(size.width.toFixed(2))} × ${Number(size.height.toFixed(2))} in`;}
export function printOptions(product,config,papers) {
  if(product.type!=='painting'||!product.dimensions)return [];
  const art=config.artworks[product.id]||{},testOnly=art.testOnly===true,dimensions=art.dimensions||product.dimensions;
  return PRINT_SCALES.map(choice=>{
    const scale=art.scales?.[choice.key]??choice.scale,image=scaledDimensions(dimensions,scale),variant=art.variants?.[choice.key]||{};
    const stock=papers.filter(p=>p.paper===(art.paper||config.defaultPaper));
    const paper=variant.sku?fitSheet(image,stock.filter(p=>p.sku===variant.sku)):fitSheet(image,stock);
    const resolution=resolutionFor(art.source,image),reasons=[];
    if(art.dimensionsVerified!==true)reasons.push('Confirm the original artwork measurements');
    if(!paper)reasons.push('No suitable paper size has been mapped');
    else if(!paper.verifiedUS&&!testOnly)reasons.push('Verify this paper size with Prodigi');
    if(!resolution)reasons.push('Add a high-resolution source image');
    else if(!testOnly) {if(resolution.aspectError>0.01)reasons.push('Source image proportions do not match the artwork measurements');if(resolution.dpi<config.minimumDpi)reasons.push(`Source resolution is below ${config.minimumDpi} dpi at this size`);}
    if(!/^\d+\.\d{2}$/.test(variant.amount||'')||Number(variant.amount)<=0)reasons.push('Set the retail price');
    const asset=variant.asset;
    if(!asset?.url||asset.approved!==true||!art.source?.sha256||asset.sourceSha256!==art.source.sha256||
      asset.imageWidthIn!==image.width||asset.imageHeightIn!==image.height||asset.paperWidthIn!==paper?.width||asset.paperHeightIn!==paper?.height)reasons.push('Prepare and approve the print file at these exact dimensions');
    if(asset?.url){try{const url=new URL(asset.url);if(url.protocol!=='https:'||url.username||url.password||!['media.vermillionaurora.com','vermillionaurora.com'].includes(url.hostname)||!url.pathname.endsWith('.pdf'))reasons.push('Print file must be a PDF hosted on your website or media domain');}catch{reasons.push('Invalid print file URL');}}
    return {...choice,scale,id:`print-${product.id}-${choice.key}`,productId:product.id,image,paper,resolution,amount:variant.amount||null,asset:asset||null,testOnly,
      paperLabel:config.papers[art.paper||config.defaultPaper]?.label||'',reasons,ready:art.enabled===true&&reasons.length===0};
  });
}
