import frames from './finerworks-frames.json' with {type:'json'};
import {frameFinish,sameFrame} from './framing.mjs';
import {sameMat,framedMatLayout} from './matting.mjs';
import mats from './finerworks-mats.json' with {type:'json'};
import {publishedFramedPrice} from './frame-pricing.mjs';
export function withFrameOptions(option,variant={}) {
  // Retain the old stock-frame geometry for retired sample configurations.
  const mat=option.sizeBasis==='image-proportional'?framedMatLayout(option.paper,option.image,mats.materials[0]):option.matOptions?.[0]?.mat;
  const frameOptions=frames.frames.flatMap(material=>{
    const frame=frameFinish(material,frames.glazing,mat);if(!frame)return [];
    const saved=variant.frameOptions?.[material.key]||{},reasons=[...option.reasons];let amount=null;
    if(!sameFrame(saved.frame,frame)||!sameMat(saved.mat,mat)||saved.baseSku!==option.paper?.sku||typeof saved.sku!=='string'||!/^[A-Za-z0-9._-]{1,160}$/.test(saved.sku))reasons.push('Verify the frame, glazing, mat and FinerWorks product code together');
    else try{amount=publishedFramedPrice(saved,saved.sku,option.amount);}catch{}
    if(!amount)reasons.push('Retrieve the complete framed print price');
    const asset=saved.asset;
    if(!asset||asset.approved!==true||asset.layoutApproved!==true||asset.url!==option.asset?.url||asset.sha256!==option.asset?.sha256||asset.sourceSha256!==option.asset?.sourceSha256||asset.productCode!==saved.sku||asset.imageWidthIn!==option.image.width||asset.imageHeightIn!==option.image.height||asset.paperWidthIn!==option.paper?.width||asset.paperHeightIn!==option.paper?.height||option.sampleOnly&&asset.sampleOnly!==true||!sameMat(asset.mat,mat)||!sameFrame(asset.frame,frame))reasons.push('Approve the framed print layout and clear space at the mat window');
    const {matOptions,...base}=option;
    return [{...base,id:`${option.id}-frame-${material.key}`,finishKey:`frame-${material.key}`,label:`${option.label} — ${frame.name} frame`,baseSku:option.paper?.sku,
      mat,frame,paper:{...option.paper,sku:saved.sku||null},amount,unframedAmount:option.amount,asset:asset||null,reasons,ready:option.ready&&reasons.length===0}];
  });
  return {...option,frameOptions};
}
