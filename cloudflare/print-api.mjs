import {prodigiProduct,quotePrints} from './prodigi-api.mjs';
import papers from '../catalog/prodigi-papers.json' with {type:'json'};
import {ORDER_ID,ACCESS_KEY} from './cart-policy.mjs';
export async function printApi(request,env) {
  const url=new URL(request.url),action=url.pathname.split('/').at(-1),reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
  if(action==='callback') {
    if(request.method!=='POST'||!ORDER_ID.test(url.searchParams.get('order')||'')||!ACCESS_KEY.test(url.searchParams.get('key')||'')||!env.CART_ORDERS)return reply({error:'Not found'},404);
    const ok=await env.CART_ORDERS.getByName(url.searchParams.get('order')).printCallback(url.searchParams.get('key'));
    return reply({received:ok},ok?200:404);
  }
  if(action==='health'&&request.method==='GET')return reply({provider:'prodigi',mode:env.PRODIGI_ENV||null,keyConfigured:!!env.PRODIGI_API_KEY,enabled:env.PRINT_CHECKOUT_ENABLED==='true'});
  // Administrative verification uses the same short-lived audit credential as checkout readiness.
  // It can only read product details and quotes, never create an order or send email.
  if(action!=='verify'||request.method!=='POST'||!env.CHECKOUT_AUDIT_TOKEN||request.headers.get('Authorization')!==`Bearer ${env.CHECKOUT_AUDIT_TOKEN}`)return reply({error:'Not found'},404);
  if(env.PRODIGI_ENV!=='sandbox'||env.PAYPAL_MODE!=='sandbox')return reply({error:'Sandbox verification only'},409);
  const raw=await request.text();if(raw.length>2000)return reply({error:'Request too large'},413);
  let input;try{input=JSON.parse(raw);}catch{return reply({error:'Invalid request'},400);}
  const selected=input.skus;
  if(!Array.isArray(selected)||selected.length<1||selected.length>6||selected.some(s=>!papers.some(p=>p.sku===s)))return reply({error:'Choose up to six configured paper candidates'},400);
  const results=[];
  for(const sku of selected)try {
    const product=await prodigiProduct(env,sku);
    const quote=await quotePrints(env,[{sku,quantity:1,paperSize:product,attributes:{}}]);
    results.push({sku,ok:true,product,quote});
  }catch(error){results.push({sku,ok:false,error:error.message,...(error.productOptions?{productOptions:error.productOptions}:{})});}
  return reply({mode:'sandbox',results});
}
