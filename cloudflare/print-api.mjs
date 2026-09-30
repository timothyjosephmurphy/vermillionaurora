import {finerworksDiagnostic} from './finerworks-diagnostic.mjs';
import products from '../catalog/products.json' with {type:'json'};
import {ORDER_ID,ACCESS_KEY} from './cart-policy.mjs';

export async function printApi(request,env) {
  const url=new URL(request.url),action=url.pathname.split('/').at(-1);
  if(action==='callback') {
    const reply=(data,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
    if(request.method!=='POST'||!ORDER_ID.test(url.searchParams.get('order')||'')||!ACCESS_KEY.test(url.searchParams.get('key')||'')||!env.CART_ORDERS)return reply({error:'Not found'},404);
    // Preserve callbacks for existing saved jobs; no new orders are enabled here.
    const ok=await env.CART_ORDERS.getByName(url.searchParams.get('order')).printCallback(url.searchParams.get('key'));
    return reply({received:ok},ok?200:404);
  }
  return finerworksDiagnostic(request,env,products);
}
