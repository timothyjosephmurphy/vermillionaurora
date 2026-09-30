import {finerworksRequest} from './finerworks-api.mjs';
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
