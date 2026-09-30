// Read-only migration adapter. Order submission is deliberately not allowlisted.
// Contract: https://v2.api.finerworks.com/Documentation
export const PRINT_PROVIDER='finerworks';
const READS=new Map([
  ['/v3/test_my_credentials','GET'],
  ['/v3/list_media_types','POST'],
  ['/v3/list_style_types','POST'],
  ['/v3/get_prices','POST']
]);
export function finerworksEnvironment(env,requireKeys=true) {
  const mode=['sandbox','live'].includes(env.PAYPAL_MODE)?env.PAYPAL_MODE:null;
  if(requireKeys&&(!mode||!env.FINERWORKS_WEB_API_KEY||!env.FINERWORKS_APP_KEY))throw Error('FinerWorks credentials or checkout environment are not configured');
  return mode;
}
export async function finerworksRequest(env,path,body,method='POST') {
  finerworksEnvironment(env);
  if(READS.get(path)!==method||(method==='GET'&&body!==undefined))throw Error('FinerWorks migration permits only approved read-only requests');
  let response,data;
  try {
    response=await fetch(`https://v2.api.finerworks.com${path}`,{
      method,redirect:'error',headers:{'Accept':'application/json','Content-Type':'application/json',web_api_key:env.FINERWORKS_WEB_API_KEY,app_key:env.FINERWORKS_APP_KEY},
      signal:AbortSignal.timeout(30000),...(body===undefined?{}:{body:JSON.stringify(body)})
    });
    data=await response.json();
  }catch{throw Error('FinerWorks connection failed or returned an unreadable response');}
  // Never forward upstream error messages, debug objects, account records, or credentials.
  if(!response.ok||data?.status?.success!==true){
    const error=Error(`FinerWorks read-only request failed (HTTP ${response.status})`);
    error.status=response.status;throw error;
  }
  return data;
}
const positive=n=>Number.isSafeInteger(n)&&n>0;
const text=v=>typeof v==='string'?v.slice(0,500):'';
const dimensions=d=>d&&['width','height'].every(k=>typeof d[k]==='number'&&Number.isFinite(d[k])&&d[k]>=0)?{width:d.width,height:d.height}:null;
export async function finerworksMaterials(env) {
  const media=await finerworksRequest(env,'/v3/list_media_types',{});
  const styles=await finerworksRequest(env,'/v3/list_style_types',{});
  if(!Array.isArray(media.media_types)||!Array.isArray(styles.style_types))throw Error('Unexpected FinerWorks materials response');
  return {
    media:media.media_types.filter(m=>positive(m.id)&&positive(m.product_type_id)).map(m=>({id:m.id,productTypeId:m.product_type_id,name:text(m.name),description:text(m.description),styleIds:(m.style_ids||[]).filter(positive)})),
    styles:styles.style_types.filter(s=>positive(s.id)).map(s=>({id:s.id,name:text(s.name),description:text(s.description),customSizing:s.custom_sizing===true,allowDecimal:s.allow_decimal===true,allowRotate:s.allow_rotate===true,min:dimensions(s.min),max:dimensions(s.max),availableSizes:(s.available_sizes||[]).map(dimensions).filter(Boolean),borderSize:typeof s.border_size==='number'?s.border_size:null,bleed:typeof s.bleed_amt==='number'?s.bleed_amt:null}))
  };
}
export function finerworksSizeAllowed(style,size) {
  if(!dimensions(size)||size.width<=0||size.height<=0)return false;
  if(!style.allowDecimal&&(!Number.isInteger(size.width)||!Number.isInteger(size.height)))return false;
  const fits=d=>{
    if(!style.customSizing)return style.availableSizes.some(a=>Math.abs(a.width-d.width)<0.00001&&Math.abs(a.height-d.height)<0.00001);
    if(!style.min||!style.max)return false;
    return d.width>=style.min.width&&d.height>=style.min.height&&d.width<=style.max.width&&d.height<=style.max.height;
  };
  return fits(size)||(style.allowRotate&&fits({width:size.height,height:size.width}));
}
export function finerworksProductCode(media,style,size) {
  if(!positive(media.id)||!positive(media.productTypeId)||!positive(style.id)||!media.styleIds.includes(style.id)||!finerworksSizeAllowed(style,size))throw Error('FinerWorks does not confirm this exact material, style, and size');
  // Unframed product-code grammar documented by FinerWorks; no inferred product IDs.
  return `${media.productTypeId}M${media.id}M${style.id}S${size.width}X${size.height}`;
}
function cost(value) {
  if(typeof value!=='number'||!Number.isFinite(value)||value<0||value>1000000)throw Error('Invalid FinerWorks price');
  return value.toFixed(2);
}
export async function finerworksPrices(env,codes) {
  const unique=[...new Set(codes)];
  if(!unique.length||unique.length>50||unique.some(s=>typeof s!=='string'||s.length>100||!/^\d+M\d+M\d+S\d+(?:\.\d+)?X\d+(?:\.\d+)?$/.test(s)))throw Error('Choose between one and fifty unframed product codes');
  const data=await finerworksRequest(env,'/v3/get_prices',{products:unique.map(product_sku=>({product_qty:1,product_sku}))});
  if(!Array.isArray(data.prices))throw Error('Unexpected FinerWorks pricing response');
  return unique.map(code=>{
    const rows=data.prices.filter(p=>p.product_code===code||p.product_sku===code);
    if(rows.length!==1||rows[0].product_qty!==1)return {code,ok:false,error:'No unique single-copy quote returned for this product'};
    const p=rows[0];
    try {
      const productionCost=cost(p.total_price);
      if(Number(productionCost)<=0)throw Error('No positive quote');
      return {code,ok:true,quantity:1,productionCost,baseCost:cost(p.product_price),shippingIncluded:false,taxIncluded:false};
    }catch{return {code,ok:false,error:'Provider did not return a valid positive price'};}
  });
}
