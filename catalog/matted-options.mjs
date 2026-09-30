import mats from './finerworks-mats.json' with {type:'json'};
import {matLayout,sameMat} from './matting.mjs';
import {publishedPrintPrice} from './print-pricing.mjs';
export function withMatOptions(option,variant={}) {
  const material=mats.materials.find(m=>m.key==='snow-white'),mat=matLayout(option.paper,option.image,material);
  if(!mat)return {...option,matOptions:[]};
  const saved=variant.matOptions?.['snow-white']||{},reasons=[...option.reasons];
  let amount=null;
  if(!material||!sameMat(saved.mat,mat)||saved.baseSku!==option.paper.sku||typeof saved.sku!=='string'||!/^[A-Za-z0-9._-]{1,160}$/.test(saved.sku))reasons.push('Verify this mat material, size, and FinerWorks product code');
  else {try{amount=publishedPrintPrice(saved,saved.sku);}catch{/* Keep unverified prices out of checkout. */}}
  if(!amount)reasons.push('Retrieve the price for the complete print and mat');
  // A print-only proof is not approval of the mat window, edge overlap or assembly.
  const asset=saved.asset;
  if(!asset||asset.approved!==true||asset.layoutApproved!==true||asset.url!==option.asset?.url||asset.sha256!==option.asset?.sha256||asset.productCode!==saved.sku||!sameMat(asset.mat,mat))reasons.push('Approve the mat opening and exact print layout together');
  const matted={...option,id:`${option.id}-mat-snow-white`,finishKey:'snow-white',label:`${option.label} with mat`,baseSku:option.paper.sku,
    mat,paper:{...option.paper,sku:saved.sku||null},amount,asset:asset||null,reasons,ready:option.ready&&reasons.length===0};
  return {...option,matOptions:[matted]};
}
