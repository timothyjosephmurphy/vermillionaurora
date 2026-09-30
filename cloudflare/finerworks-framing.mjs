import {finerworksRequest,finerworksPrices} from './finerworks-api.mjs';
import {matProductBuild,finerworksMats} from './finerworks-matting.mjs';
import {matLayout} from '../catalog/matting.mjs';
import {frameFinish} from '../catalog/framing.mjs';
import {reviewFramedPrice} from '../catalog/frame-pricing.mjs';
import frames from '../catalog/finerworks-frames.json' with {type:'json'};
const text = (v, max = 160) => typeof v === 'string' ? v.slice(0, max) : '';
const number = v => Number.isFinite(v) ? v : null;
export function frameMaterial(f) {
  return {id:f.id,name:text(f.name),color:text(f.color),composite:text(f.composite),
    type:text(f.type),typeDescription:text(f.type_description),width:number(f.thickness),depth:number(f.depth),lip:number(f.lip),
    minWidth:number(f.min_width),minHeight:number(f.min_height),maxWidth:number(f.max_width),maxHeight:number(f.max_height),
    canMat:f.allow_matting===true,canGlaze:f.allow_glazing===true,startingPrice:number(f.starting_price),
    image:text(f.sample_image_url_1,500)};
}
export async function finerworksFrames(env, baseSku, collectionId) {
  if(!/^\d+M\d+M\d+S[\d.]+X[\d.]+$/.test(baseSku) || collectionId!==undefined&&(!Number.isSafeInteger(collectionId)||collectionId<=0))throw Error('Invalid frame catalog selection');
  const data=await finerworksRequest(env,'/v3/list_collections',{product_code:baseSku,...(collectionId?{id:collectionId}:{})});
  if(!Array.isArray(data.collections))throw Error('Unexpected FinerWorks frame catalog');
  return data.collections.filter(c=>Number.isSafeInteger(c.id)&&c.id>0).map(c=>({id:c.id,name:text(c.name),startingPrice:number(c.starting_price),
    frames:(c.frames||[]).filter(f=>Number.isSafeInteger(f.id)&&f.id>0).map(frameMaterial)}));
}
export async function finerworksGlazing(env) {
  const data=await finerworksRequest(env,'/v3/list_glazing',{});
  if(!Array.isArray(data.glazing))throw Error('Unexpected FinerWorks glazing catalog');
  return data.glazing.filter(g=>Number.isSafeInteger(g.id)&&g.id>0).map(g=>({id:g.id,name:text(g.name),description:text(g.description,600),composite:g.composite,startingPrice:number(g.starting_price)}));
}
export async function quoteFramedOption(env,materials,option,frameKey,published={}) {
  const saved=frames.frames.find(f=>f.key===frameKey);
  if(!saved)throw Error('Frame style is not offered');
  const collections=await finerworksFrames(env,option.paper.sku,saved.collectionId);
  const active=collections.find(c=>c.id===saved.collectionId)?.frames.find(f=>f.id===saved.id);
  const glazing=(await finerworksGlazing(env)).find(g=>g.id===frames.glazing.id&&g.name===frames.glazing.name);
  const matMaterial=(await finerworksMats(env)).find(m=>m.name==='Snow White'&&m.thickness===4);
  const mat=matMaterial&&matLayout(option.paper,option.image,matMaterial);
  if(!active||active.name!==saved.name||active.composite!==saved.composite||active.width!==saved.width||!mat)throw Error('FinerWorks frame material needs review');
  const frame=frameFinish({...active,key:saved.key,collectionId:saved.collectionId,label:saved.label,previewColor:saved.previewColor},glazing,mat);
  if(!frame)throw Error('FinerWorks frame size or glazing needs review');
  const match=option.paper.sku.match(/^(\d+)M(\d+)M(\d+)S/);
  const media=materials.media.find(m=>m.id===Number(match?.[2])),style=materials.styles.find(s=>s.id===Number(match?.[3]));
  const build={...matProductBuild(media,style,option.image,option.paper,mat),FrameID:frame.id,GlassID:frame.glazing.id};
  const result=await finerworksRequest(env,'/v3/build_product_code',{build});
  const sku=result.product_code;
  if(typeof sku!=='string'||!/^[A-Za-z0-9._-]{1,160}$/.test(sku))throw Error('FinerWorks did not return a valid framed product code');
  const validation=await finerworksRequest(env,'/v3/validate_product',{skus_or_codes:[sku]});
  const rows=validation.product_validations;
  if(!Array.isArray(rows)||rows.length!==1||rows[0].valid!==true||!(rows[0].product_code===sku||rows[0].product_sku===sku))throw Error('FinerWorks did not validate the exact framed print');
  const [price]=await finerworksPrices(env,[sku]);
  if(!price?.ok||Number(price.matCost)<=0||Number(price.frameCost)<=0||Number(price.glazingCost)<=0||Number(price.secondMatCost)!==0)throw Error('No verified complete framed print price');
  return {id:`${option.id}-frame-${frameKey}`,baseId:option.id,key:option.key,finishKey:`frame-${frameKey}`,mat,frame,sku,baseSku:option.paper.sku,image:option.image,paper:{...option.paper,sku},
    quote:price,pricing:reviewFramedPrice(price,option.amount,published?.sku===sku?published:{}),quotedAt:new Date().toISOString(),sellable:false};
}
