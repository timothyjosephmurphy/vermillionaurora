import catalog from './checkout-catalog.mjs';
import {cartOrigin,cartItems,commonMethods,paymentMethods,cleanEmail,ORDER_ID,ACCESS_KEY,catalogVersion,keyHash} from './cart-policy.mjs';
import {priceCart} from './checkout-pricing.mjs';
export async function cartCheckout(request,env) {
  const url=new URL(request.url),action=url.pathname.split('/').at(-1);
  const headers={'Access-Control-Allow-Origin':cartOrigin(env),'Access-Control-Allow-Methods':'GET, POST, OPTIONS','Access-Control-Allow-Headers':'Content-Type','Cache-Control':'no-store','Vary':'Origin'};
  const reply=(data,status=200)=>Response.json(data,{status,headers});
  if(request.method==='OPTIONS')return new Response(null,{status:204,headers});
  if(request.headers.get('Origin')&&request.headers.get('Origin')!==cartOrigin(env))return reply({error:'Origin not allowed'},403);
  if(action==='catalog'&&request.method==='GET') {
    if(env.CART_CHECKOUT_ENABLED!=='true'||!env.CART_ORDERS)return reply({enabled:false,version:catalogVersion,products:[]});
    const products=await Promise.all(Object.entries(catalog).filter(([id])=>paymentMethods(env,id).length).map(async([id,p])=>({id,title:p.title,amount:p.amount,methods:paymentMethods(env,id),status:await env.PAINTING_STOCK.getByName(id).status()})));
    return reply({enabled:true,version:catalogVersion,products});
  }
  if(request.method!=='POST'||!['quote','start','status','capture','cancel'].includes(action)||!env.CART_ORDERS)return reply({error:'Not found'},404);
  const raw=await request.text();if(raw.length>12000)return reply({error:'Request too large'},413);
  let body;try{body=JSON.parse(raw);}catch{return reply({error:'Invalid request'},400);}
  try {
    if(action==='quote') {
      if(env.CART_CHECKOUT_ENABLED!=='true')return reply({error:'Cart checkout is not available yet.'},503);
      if(body.catalogVersion!==catalogVersion)return reply({error:'The catalog has changed. Refresh your cart.'},409);
      const items=cartItems(body.items),methods=commonMethods(env,items),email=cleanEmail(body.email);
      if(!methods.length)return reply({error:'These items do not share an available payment method. Please review your cart.'},409);
      for(const item of items)if(await env.PAINTING_STOCK.getByName(item.id).status()!=='available')return reply({error:`${item.title} is reserved or sold. Please remove it from your cart.`,unavailable:item.id},409);
      const quote=await priceCart(env,items,body.address,email),id=crypto.randomUUID();
      const key=[...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join('');
      const result=await env.CART_ORDERS.getByName(id).createQuote(id,await keyHash(key),quote,methods);
      return reply({...result,key});
    }
    if(!ORDER_ID.test(body.orderId||'')||!ACCESS_KEY.test(body.key||''))return reply({error:'Invalid order reference'},400);
    const order=env.CART_ORDERS.getByName(body.orderId);
    if(!await order.authorize(await keyHash(body.key)))return reply({error:'Order not found'},404);
    if(action==='start')return reply(await order.start(body.method));
    if(action==='capture')return reply(await order.capture());
    if(action==='cancel')return reply(await order.cancel());
    return reply(await order.publicStatus());
  } catch(error) {
    console.error('Cart checkout failed:',action,error.message);
    return reply({error:action==='quote'?'Could not calculate this cart. Check the items and US address, then try again.':'The order could not be updated yet. Keep this page and check the payment status before starting another order.'},action==='quote'?422:503);
  }
}
