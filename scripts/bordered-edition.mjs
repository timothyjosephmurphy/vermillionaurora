// Derives the unframed FinerWorks outer-border file from an approved padded edition file.
// Crop-only: the image pixels are the padded edition's own pixels (no resampling); white is
// added only as the equal embedded margin that small images need to meet the 4" style minimum.
import sharp from 'sharp';
import {createHash} from 'node:crypto';
import {borderedLayout,BORDERED_LAYOUT,BORDERED_BORDER_IN} from '../catalog/edition-layout.mjs';
import {finerworksProductCode} from '../catalog/finerworks-products.mjs';
export async function borderedEdition(paddedBytes,choice,paddedAsset,stock) {
  const b=borderedLayout(choice);
  if(!b||!stock?.borderedStyle)return null;
  if(stock.borderedStyle.borderSize!==BORDERED_BORDER_IN||stock.borderedStyle.bleed!==0)throw Error('Unexpected FinerWorks border style');
  const meta=await sharp(paddedBytes).metadata();
  if(meta.width!==choice.layoutSpec.widthPx||meta.height!==choice.layoutSpec.heightPx)throw Error('Padded edition dimensions do not match its layout');
  const {crop,content,widthPx,heightPx}=b.layoutSpec;
  const image=await sharp(paddedBytes).extract(crop).removeAlpha().raw().toBuffer({resolveWithObject:true});
  const data=await sharp({create:{width:widthPx,height:heightPx,channels:3,background:'#ffffff'}})
    .composite([{input:image.data,raw:{width:crop.width,height:crop.height,channels:image.info.channels},left:content.left,top:content.top}])
    .jpeg({quality:95,chromaSubsampling:'4:4:4'}).toBuffer();
  const sha256=createHash('sha256').update(data).digest('hex');
  const sku=finerworksProductCode({...stock.media,styleIds:[stock.borderedStyle.id]},stock.borderedStyle,b.print);
  return {data,sku,asset:{provider:'finerworks',url:`https://vermillionaurora.com/print-editions/${sha256}.jpg`,sha256,sourceSha256:paddedAsset.sourceSha256,editionSha256:paddedAsset.sha256,productCode:sku,
    imageWidthIn:b.image.width,imageHeightIn:b.image.height,printWidthIn:b.print.width,printHeightIn:b.print.height,paperWidthIn:b.sheet.width,paperHeightIn:b.sheet.height,borderIn:BORDERED_BORDER_IN,
    approved:true,layoutApproved:true,layout:BORDERED_LAYOUT,layoutSpec:b.layoutSpec}};
}
