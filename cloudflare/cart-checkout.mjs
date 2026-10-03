import catalog from './checkout-catalog.mjs';
import prints from './print-catalog.mjs';
import {publicCartItem} from './cart-policy.mjs';
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
    for(const [id,p] of Object.entries(prints))if(paymentMethods(env,id).length)products.push({...publicCartItem({...p,quantity:1}),methods:paymentMethods(env,id),status:'available'});
    const squareReady=products.some(product=>product.methods.includes('square'));
    return reply({enabled:true,version:catalogVersion,products,...(squareReady?{square:{applicationId:env.SQUARE_APPLICATION_ID,locationId:env.SQUARE_LOCATION_ID,mode:env.SQUARE_MODE}}:{})});
  }
  if(request.method!=='POST'||!['hold','quote','start','status','capture','cancel'].includes(action)||!env.CART_ORDERS)return reply({error:'Not found'},404);
  const raw=await request.text();if(raw.length>12000)return reply({error:'Request too large'},413);
  let body;try{body=JSON.parse(raw);}catch{return reply({error:'Invalid request'},400);}
  try {
    if(action==='hold') {
      if(env.CART_CHECKOUT_ENABLED!=='true')return reply({error:'Cart checkout is not available yet.'},503);
      if(!ORDER_ID.test(body.holdId||'')||!ACCESS_KEY.test(body.key||'')||!Array.isArray(body.items)||body.items.length>12)return reply({error:'Invalid cart reservation'},400);
      const items=body.items.length?cartItems(body.items):[];
      for(const item of items.filter(i=>i.type!=='print'))if(!paymentMethods(env,item.id).length)return reply({error:`${item.title} cannot be reserved for checkout.`,unavailable:item.id},409);
      const holdId=body.holdId,keyHashValue=await keyHash(body.key);
      const result=await env.CART_ORDERS.getByName(holdId).syncCart(holdId,keyHashValue,items);
      return reply(result);
    }
    if(action==='quote') {
      if(env.CART_CHECKOUT_ENABLED!=='true')return reply({error:'Cart checkout is not available yet.'},503);
      if(body.catalogVersion!==catalogVersion)return reply({error:'The catalog has changed. Refresh your cart.'},409);
      const items=cartItems(body.items),methods=commonMethods(env,items),email=cleanEmail(body.email);
      if(!methods.length)return reply({error:'These items do not share an available payment method. Please review your cart.'},409);
      const quote=await priceCart(env,items,body.address,email),id=crypto.randomUUID();
      if(ORDER_ID.test(body.holdId||'')&&ACCESS_KEY.test(body.key||'')) {
        const holdId=body.holdId,keyHashValue=await keyHash(body.key),order=env.CART_ORDERS.getByName(holdId);
        if(!await order.authorize(keyHashValue))return reply({error:'Your cart reservation expired. Refresh your cart and try again.'},409);
        const result=await order.createHeldQuote(holdId,keyHashValue,quote,methods,items.filter(i=>i.type!=='print').map(i=>i.id));
        return reply({...result,key:body.key});
      }
      for(const item of items.filter(i=>i.type!=='print'))if(await env.PAINTING_STOCK.getByName(item.id).status()!=='available')return reply({error:`${item.title} is reserved or sold. Please remove it from your cart.`,unavailable:item.id},409);
      const key=[...crypto.getRandomValues(new Uint8Array(32))].map(n=>n.toString(16).padStart(2,'0')).join('');
      const result=await env.CART_ORDERS.getByName(id).createQuote(id,await keyHash(key),quote,methods);
      return reply({...result,key});
    }
    if(!ORDER_ID.test(body.orderId||'')||!ACCESS_KEY.test(body.key||''))return reply({error:'Invalid order reference'},400);
    const order=env.CART_ORDERS.getByName(body.orderId);
    if(!await order.authorize(await keyHash(body.key)))return reply({error:'Order not found'},404);
    if(action==='start')return reply(await order.start(body.method,{sourceId:body.sourceId}));
    if(action==='capture')return reply(await order.capture());
    if(action==='cancel')return reply(await order.cancel());
    return reply(await order.publicStatus());
  } catch(error) {
    console.error('Cart checkout failed:',action,error.message);
    if(action==='hold'&&error.message==='Checkout has already started.')return reply({error:'Checkout has already started.',code:'CHECKOUT_STARTED'},409);
    const reservationError=/^(Your cart reservation expired|Your cart changed while calculating shipping|An original in your cart is no longer reserved)/.test(error.message||'');
    const bitcoinPermissionError=action==='status'&&/^BTCPay API (401|403)$/.test(error.message||'');
    const safeError=bitcoinPermissionError?'BTCPay denied invoice status access. Its API key needs View invoices permission for this store. Your reservation is being kept safe.':action==='quote'&&reservationError?error.message:action==='quote'?'Could not calculate this cart. Check the items and US address, then try again.':'The cart could not be updated yet. Keep your cart open and try again.';
    return reply({error:safeError},action==='quote'?422:503);
  }
}
