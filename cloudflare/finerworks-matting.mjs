import {finerworksRequest,finerworksPrices,finerworksProductCode} from './finerworks-api.mjs';
import {matLayout,matSizeAllowed} from '../catalog/matting.mjs';
import {reviewPrintPrice} from '../catalog/print-pricing.mjs';
export async function finerworksMats(env) {
  const data=await finerworksRequest(env,'/v3/list_mats',{});
  if(!Array.isArray(data.mats))throw Error('Unexpected FinerWorks mat catalog');
  return data.mats.filter(m=>Number.isSafeInteger(m.id)&&m.id>0&&typeof m.name==='string').map(m=>({
    id:m.id,name:m.name.slice(0,100),color:typeof m.color==='string'?m.color.slice(0,60):'',thickness:m.thickness,
    minWidth:m.min_width,minHeight:m.min_height,maxWidth:m.max_width,maxHeight:m.max_height
  })).filter(m=>[m.minWidth,m.minHeight].every(n=>Number.isFinite(n)&&n>=0)&&[m.maxWidth,m.maxHeight].every(n=>Number.isFinite(n)&&n>0));
}
export function matProductBuild(media,style,image,paper,mat) {
  finerworksProductCode(media,style,paper);
  if(style.canMat!==true||![image?.width,image?.height].every(n=>Number.isFinite(n)&&n>0)||paper.width<image.width||paper.height<image.height||!Number.isSafeInteger(mat?.id)||mat.id<=0||mat.window?.width!==paper.width||mat.window?.height!==paper.height||mat.outer?.width<paper.width+2||mat.outer?.height<paper.height+2||![mat.outer?.width,mat.outer?.height].every(n=>Number.isFinite(n)&&n>0))throw Error('Invalid FinerWorks print and mat geometry');
  // The uploaded raster already includes its white border. Print the whole file
  // at the physical sheet size; do not scale that file down to the inner image.
  return {PrintProductTypeID:media.productTypeId,MediaID:media.id,MountingID:style.id,PrintW:paper.width,PrintH:paper.height,SheetW:paper.width,SheetH:paper.height,FrameID:0,FrameW:mat.outer.width,FrameH:mat.outer.height,MatID:mat.id,Mat1WindowW:mat.window.width,Mat1WindowH:mat.window.height,MatID2:0,GlassID:0,Units:0};
}
export async function buildMattedProduct(env,media,style,image,paper,mat) {
  const build=matProductBuild(media,style,image,paper,mat);
  const result=await finerworksRequest(env,'/v3/build_product_code',{build});
  const code=result.product_code;
  if(typeof code!=='string'||!/^[A-Za-z0-9._-]{1,160}$/.test(code))throw Error('FinerWorks did not return a valid mat product code');
  // The builder explicitly does not validate active materials. Always validate
  // the returned code before accepting its price or passing it to fulfillment.
  const validation=await finerworksRequest(env,'/v3/validate_product',{skus_or_codes:[code]});
  const rows=validation.product_validations;
  if(!Array.isArray(rows)||rows.length!==1||rows[0].valid!==true||!(rows[0].product_code===code||rows[0].product_sku===code))throw Error('FinerWorks did not validate the exact print and mat combination');
  return code;
}
export async function quoteMattedOption(env,materials,option,published={}) {
  const mats=await finerworksMats(env),material=mats.find(m=>m.name==='Snow White'&&m.thickness===4);
  if(!material)throw Error('White 4-ply FinerWorks mat is not confirmed');
  const mat=matLayout(option.paper,option.image,material);
  if(!mat||!matSizeAllowed(material,mat.outer))throw Error('No supported standard mat size fits this print');
  const match=option.paper.sku.match(/^(\d+)M(\d+)M(\d+)S/);
  const media=materials.media.find(m=>m.id===Number(match?.[2])),style=materials.styles.find(s=>s.id===Number(match?.[3]));
  const sku=await buildMattedProduct(env,media,style,option.image,option.paper,mat);
  const [price]=await finerworksPrices(env,[sku]);
  if(!price?.ok||Number(price.matCost)<=0||Number(price.frameCost)!==0||Number(price.glazingCost)!==0||Number(price.secondMatCost)!==0)throw Error('No verified single-mat, unframed price for this print');
  return {id:`${option.id}-mat-snow-white`,baseId:option.id,key:option.key,finishKey:'snow-white',mat,material,sku,baseSku:option.paper.sku,image:option.image,paper:{...option.paper,sku},quote:price,pricing:reviewPrintPrice(price,published?.sku===sku?published:{}),quotedAt:new Date().toISOString(),sellable:false};
}
