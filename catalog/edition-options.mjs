import {editionLayouts,EDITION_LAYOUT} from './edition-layout.mjs';
import {finerworksProductCode} from './finerworks-products.mjs';
import {publishedPrintPrice} from './print-pricing.mjs';
import {printAssetUrl} from '../cloudflare/print-asset-policy.mjs';
import {withMatOptions} from './matted-options.mjs';
import {withFrameOptions} from './framed-options.mjs';
export function editionOptions(product,config,papers) {
  const art=config.artworks[product.id],stock=papers.find(p=>p.paper===(art.paper||config.defaultPaper));
  return editionLayouts(art.source,product.dimensions,config.minimumDpi,art.layoutOptions).map(choice=>{
    const variant=art.variants?.[choice.key]||{},asset=variant.asset,reasons=[];
    let sku=null,amount=null;
    try {sku=finerworksProductCode(stock?.media,stock?.style,choice.paper);amount=publishedPrintPrice(variant,sku);}catch{}
    if(!sku)reasons.push('Verify this exact FinerWorks paper size');
    if(!amount)reasons.push('Retrieve and approve the FinerWorks retail price');
    if(art.sizingApproved!==true)reasons.push('Approve image-proportional print sizing');
    if(!/^[a-f0-9]{64}$/.test(art.source?.sha256||'')||!asset||asset.provider!=='finerworks'||asset.approved!==true||asset.layoutApproved!==true||asset.layout!==EDITION_LAYOUT||asset.sourceSha256!==art.source.sha256||!/^[a-f0-9]{64}$/.test(asset.sha256||'')||asset.productCode!==sku||asset.imageWidthIn!==choice.image.width||asset.imageHeightIn!==choice.image.height||asset.paperWidthIn!==choice.paper.width||asset.paperHeightIn!==choice.paper.height||JSON.stringify(asset.layoutSpec)!==JSON.stringify(choice.layoutSpec)||asset.sampleOnly||asset.sandboxOnly)reasons.push('Prepare and approve the full-image print file');
    try {printAssetUrl(asset?.url,'live');}catch {reasons.push('Use an approved live print image URL');}
    if(![`https://vermillionaurora.com/print-editions/${asset?.sha256}.jpg`,`https://media.vermillionaurora.com/images/book-galleries/v1/prints/${asset?.sha256}.jpg`].includes(asset?.url))reasons.push('Use the exact content-addressed edition image');
    return withFrameOptions(withMatOptions({...choice,id:`print-${product.id}-${choice.key}`,productId:product.id,provider:'finerworks',paper:{...choice.paper,provider:'finerworks',paper:stock?.paper,sku},resolution:{dpi:Math.floor(Math.min(art.source.widthPx/choice.image.width,art.source.heightPx/choice.image.height))},paperLabel:config.papers[stock?.paper]?.label||'',amount,asset:asset||null,previewIncludesPaper:true,testOnly:false,sampleOnly:false,reasons,ready:art.enabled===true&&reasons.length===0},variant),variant);
  });
}
