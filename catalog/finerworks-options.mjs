import {finerworksProductCode} from './finerworks-products.mjs';
import {publishedPrintPrice} from './print-pricing.mjs';
import {printAssetUrl} from '../cloudflare/print-asset-policy.mjs';
import {withMatOptions} from './matted-options.mjs';
import {withFrameOptions} from './framed-options.mjs';
import {reviewedPortraitSample} from './sample-layout.mjs';
// Geometry functions are injected to keep this module independent of the legacy provider.
export function finerworksOptions(product, config, papers, geometry) {
  if (product.type !== 'painting' || !product.dimensions) return [];
  const {PRINT_SCALES,scaledDimensions,inches,resolutionFor} = geometry;
  const art=config.artworks[product.id]||{}, original=inches(product.dimensions), dimensions=art.dimensions||product.dimensions;
  const stock=papers.find(p=>p.paper===(art.paper||config.defaultPaper)), testOnly=art.testOnly===true, sampleOnly=art.sampleOnly===true;
  return PRINT_SCALES.map(choice=>{
    const scale=art.scales?.[choice.key]??choice.scale, image=scaledDimensions(dimensions,scale), variant=art.variants?.[choice.key]||{};
    const reasons=[], resolution=resolutionFor(art.source,image);
    if (image.width>original.width || image.height>original.height) reasons.push('Print dimensions exceed the recorded original');
    if (art.dimensionsVerified!==true) reasons.push('Confirm the original artwork measurements');
    let paper=null, amount=null;
    try {
      const sku=finerworksProductCode(stock?.media,stock?.style,image);
      paper={provider:'finerworks',paper:stock.paper,sku,width:image.width,height:image.height,marginX:0,marginY:0,rotated:false,bleed:stock.style.bleed,borderSize:stock.style.borderSize};
      amount=publishedPrintPrice(variant,sku);
      if (variant.sku && variant.sku!==sku) reasons.push('Requote the changed material or dimensions');
    } catch {reasons.push('No verified exact-size FinerWorks paper mapping or valid price');}
    if (!amount) reasons.push('Retrieve and approve the FinerWorks retail price');
    if (!resolution) reasons.push('Add a high-resolution source image');
    else if(!((testOnly&&art.sandboxQualityTestApproved===true&&variant.asset?.sandboxOnly===true||!testOnly&&sampleOnly&&art.liveSampleApproved===true&&variant.asset?.sampleOnly===true)&&reviewedPortraitSample(variant.asset,art.source,image))) {
      if (resolution.aspectError>0.01) reasons.push('Source image proportions do not match the artwork measurements');
      if (resolution.dpi<config.minimumDpi) reasons.push(`Source resolution is below ${config.minimumDpi} dpi at this size`);
    }
    const asset=variant.asset;
    if (!asset?.url || asset.provider!=='finerworks' || asset.approved!==true || asset.layoutApproved!==true || !/^[a-f0-9]{64}$/.test(asset.sha256||'') || !/^[a-f0-9]{64}$/.test(art.source?.sha256||'') || asset.sourceSha256!==art.source.sha256 || asset.productCode!==paper?.sku || asset.imageWidthIn!==image.width || asset.imageHeightIn!==image.height || asset.paperWidthIn!==paper?.width || asset.paperHeightIn!==paper?.height) reasons.push('Prepare and approve the exact FinerWorks print file, including trimming bleed');
    if (asset?.url) {
      try {printAssetUrl(asset.url,testOnly?'sandbox':'live');if(asset.sandboxOnly&&!testOnly)throw Error();}
      catch {reasons.push('Use a full-resolution JPG or PNG hosted on your artwork media domain');}
    }
    if(sampleOnly&&art.liveSampleApproved!==true)reasons.push('Approve this low-resolution sample for a live test');
    return withFrameOptions(withMatOptions({...choice,scale,id:`print-${product.id}-${choice.key}`,productId:product.id,provider:'finerworks',image,paper,resolution,amount,asset:asset||null,testOnly,sampleOnly,
      paperLabel:config.papers[art.paper||config.defaultPaper]?.label||'',reasons,ready:art.enabled===true&&reasons.length===0},variant),variant);
  });
}
