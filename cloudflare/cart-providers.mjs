import {cartOrigin,cents} from './cart-policy.mjs';
const paypalBase=env=>env.PAYPAL_MODE==='sandbox'?'https://api-m.sandbox.paypal.com':'https://api-m.paypal.com';
export async function paypalRequest(env,path,body,requestId) {
  const response=await fetch(`${paypalBase(env)}/v1/oauth2/token`,{method:'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:`Basic ${btoa(`${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`)}`,'Content-Type':'application/x-www-form-urlencoded'},body:'grant_type=client_credentials'});
  const auth=await response.json();if(!response.ok||!auth.access_token)throw Error('PayPal authentication unavailable');
  const r=await fetch(`${paypalBase(env)}${path}`,{method:body===undefined?'GET':'POST',signal:AbortSignal.timeout(20000),headers:{Authorization:`Bearer ${auth.access_token}`,'Content-Type':'application/json',Prefer:'return=representation',...(requestId?{'PayPal-Request-Id':requestId}:{})},...(body===undefined?{}:{body:JSON.stringify(body)})});
  const result=await r.json();if(!r.ok)throw Error(`PayPal request failed (${r.status})`);return result;
}
export function paypalBody(env,data) {
  const q=data.quote,a=q.address,amount=value=>({currency_code:'USD',value});
  return {intent:'CAPTURE',purchase_units:[{reference_id:`cart:${data.id}`,custom_id:`cart:${data.id}`,payee:{merchant_id:data.merchantId},
    description:`Vermillion Aurora — ${q.items.length} artwork item${q.items.length===1?'':'s'}`,
    items:q.items.map(i=>({name:i.title.slice(0,127),sku:i.id,quantity:String(i.quantity),unit_amount:amount(i.amount),category:'PHYSICAL_GOODS'})),
    amount:{...amount(q.total),breakdown:{item_total:amount(q.base),shipping:amount(q.shipping),tax_total:amount(q.tax)}},
    shipping:{name:{full_name:a.name},address:{address_line_1:a.street1,...(a.street2?{address_line_2:a.street2}:{}),admin_area_2:a.city,admin_area_1:a.state,postal_code:a.zip,country_code:'US'}}}],
    payment_source:{paypal:{experience_context:{brand_name:'Vermillion Aurora',user_action:'PAY_NOW',shipping_preference:'SET_PROVIDED_ADDRESS',
      return_url:`${cartOrigin(env)}/cart/?order=${data.id}&result=return`,cancel_url:`${cartOrigin(env)}/cart/?order=${data.id}&result=cancel`}}}};
}
export function validatePaypal(env,data,order,paid=false) {
  const q=data.quote,u=order.purchase_units?.[0],a=u?.shipping?.address;
  if(env.PAYPAL_MODE!==data.mode||env.PAYPAL_MERCHANT_ID!==data.merchantId||! /^[A-Z0-9]{1,36}$/.test(order.id||'')|| (data.providerId&&data.providerId!==order.id)||
    order.purchase_units?.length!==1||u.reference_id!==`cart:${data.id}`||u.custom_id!==`cart:${data.id}`||u.payee?.merchant_id!==data.merchantId||
    u.amount?.currency_code!=='USD'||u.amount?.value!==q.total||u.amount.breakdown?.item_total?.value!==q.base||u.amount.breakdown?.shipping?.value!==q.shipping||u.amount.breakdown?.tax_total?.value!==q.tax||
    a?.country_code!=='US'||a.address_line_1!==q.address.street1||(a.address_line_2||'')!==(q.address.street2||'')||a.admin_area_2!==q.address.city||a.admin_area_1!==q.address.state||a.postal_code!==q.address.zip)throw Error('PayPal order does not match the saved quote');
  if(!Array.isArray(u.items)||u.items.length!==q.items.length||q.items.some(i=>!u.items.some(x=>x.sku===i.id&&x.quantity===String(i.quantity)&&x.unit_amount?.currency_code==='USD'&&x.unit_amount?.value===i.amount)))throw Error('PayPal items do not match');
  if(!paid)return;
  const captures=u.payments?.captures,c=captures?.[0];
  if(order.status!=='COMPLETED'||captures?.length!==1||c.status!=='COMPLETED'||! /^[A-Z0-9]{1,36}$/.test(c.id||'')||c.amount?.currency_code!=='USD'||cents(c.amount.value)!==cents(q.total))throw Error('Payment has not been verified');
  return c.id;
}
export function approvalUrl(env,order) {
  const value=order.links?.find(l=>l.rel==='payer-action'||l.rel==='approve')?.href;
  const u=new URL(value),hosts=env.PAYPAL_MODE==='sandbox'?['sandbox.paypal.com','www.sandbox.paypal.com']:['paypal.com','www.paypal.com'];
  if(u.protocol!=='https:'||u.username||u.password||!hosts.includes(u.hostname))throw Error('Invalid approval URL');return u.href;
}
