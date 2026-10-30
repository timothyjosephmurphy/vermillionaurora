import {editionLayouts,EDITION_LAYOUT,editionBorderIn,borderedLayout,BORDERED_LAYOUT} from './edition-layout.mjs';
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
    const padded=withFrameOptions(withMatOptions({...choice,id:`print-${product.id}-${choice.key}`,productId:product.id,provider:'finerworks',paper:{...choice.paper,provider:'finerworks',paper:stock?.paper,sku},resolution:{dpi:Math.floor(Math.min(art.source.widthPx/choice.image.width,art.source.heightPx/choice.image.height))},paperLabel:config.papers[stock?.paper]?.label||'',amount,asset:asset||null,previewIncludesPaper:true,testOnly:false,sampleOnly:false,reasons,ready:art.enabled===true&&reasons.length===0},variant),variant);
    return withBorderedUnframed(padded,choice,art,stock,variant);
  });
}
// Mats and frames use the same padded sheet as the unframed sale. The mat overlaps its white edge.
// Style 9 adds only 1/2 inch and crops an embedded margin, so a 1 inch sheet stays on style 8.
function withBorderedUnframed(padded,choice,art,stock,variant) {
  if((editionBorderIn(art.layoutOptions)||0)>=1)return padded;
  const b=borderedLayout(choice);
  if(!b||!stock?.borderedStyle)return padded;
  const saved=variant.bordered||{},asset=saved.asset,reasons=padded.reasons.filter(r=>r!=='Retrieve and approve the FinerWorks retail price');
  let sku=null,amount=null;
  try {sku=finerworksProductCode({...stock.media,styleIds:[stock.borderedStyle.id]},stock.borderedStyle,b.print);amount=publishedPrintPrice(saved,sku);}catch{}
  if(!sku)reasons.push('Verify this exact FinerWorks bordered print size');
  if(!amount)reasons.push('Retrieve and approve the FinerWorks bordered print price');
  if(!padded.asset||!asset||asset.provider!=='finerworks'||asset.approved!==true||asset.layoutApproved!==true||asset.layout!==BORDERED_LAYOUT||asset.sourceSha256!==art.source?.sha256||asset.editionSha256!==padded.asset.sha256||!/^[a-f0-9]{64}$/.test(asset.sha256||'')||asset.productCode!==sku||asset.imageWidthIn!==b.image.width||asset.imageHeightIn!==b.image.height||asset.printWidthIn!==b.print.width||asset.printHeightIn!==b.print.height||asset.paperWidthIn!==b.sheet.width||asset.paperHeightIn!==b.sheet.height||asset.borderIn!==stock.borderedStyle.borderSize||JSON.stringify(asset.layoutSpec)!==JSON.stringify(b.layoutSpec))reasons.push('Prepare and approve the bordered print file');
  if(asset?.url!==`https://vermillionaurora.com/print-editions/${asset?.sha256}.jpg`)reasons.push('Use the exact content-addressed bordered edition image');
  return {...padded,image:b.image,print:b.print,layoutSpec:b.layoutSpec,paper:{...padded.paper,width:b.sheet.width,height:b.sheet.height,sku},amount,asset:asset||null,reasons,ready:art.enabled===true&&reasons.length===0};
}
