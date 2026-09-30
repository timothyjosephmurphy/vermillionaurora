import {finerworksRequest,finerworksMaterials,finerworksPrices,finerworksEnvironment} from './finerworks-api.mjs';
import {finerworksProductCode} from '../catalog/finerworks-products.mjs';
import {moneyCents,moneyString,printRetailPrice} from '../catalog/print-pricing.mjs';
// No order creation, payment, email or Shippo calls. Wholesale totals remain server-side.
const codePattern=/^(\d+)M(\d+)M(\d+)S(\d+(?:\.\d+)?)X(\d+(?:\.\d+)?)$/;
const clean=(value,max,required=true)=>{
  if(typeof value!=='string'||value.length>max||/[\u0000-\u001f]/.test(value)||(required&&!value.trim()))throw Error('Invalid print shipping address');
  return value.trim();
};
export function finerworksRecipient(address,po) {
  if(!address||address.country!=='US'||! /^[A-Z]{2}$/.test(address.state||'')||! /^\d{5}(?:-\d{4})?$/.test(address.zip||''))throw Error('A complete US print shipping address is required');
  const name=clean(address.name,100),parts=name.split(/\s+/),first=parts.shift(),last=parts.join(' ');
  if(!last||first.length>50||last.length>50)throw Error('Enter first and last name for print delivery');
  return {first_name:first,last_name:last,address_1:clean(address.street1,100),address_2:clean(address.street2||'',100,false),city:clean(address.city,50),state_code:address.state,zip_postal_code:address.zip,country_code:'US',address_order_po:po};
}
export function groupPrintProducts(items,po) {
  if(!Array.isArray(items)||!items.length||items.length>12)throw Error('Choose between 1 and 12 print variants');
  const groups=new Map(),ids=new Set();
  for(const item of items) {
    if(!item||typeof item.id!=='string'||ids.has(item.id)||item.provider!=='finerworks'||!codePattern.test(item.sku||'')||!Number.isSafeInteger(item.quantity)||item.quantity<1||item.quantity>10)throw Error('Invalid FinerWorks print selection');
    ids.add(item.id);
    const [, , , ,w,h]=item.sku.match(codePattern);
    if(Number(w)!==item.imageSize?.width||Number(h)!==item.imageSize?.height||Number(w)!==item.paperSize?.width||Number(h)!==item.paperSize?.height)throw Error('FinerWorks product dimensions do not match the print');
    const group=groups.get(item.sku)||{product_order_po:po,product_sku:item.sku,product_qty:0};group.product_qty+=item.quantity;groups.set(item.sku,group);
  }
  return [...groups.values()];
}
const cost=n=>{
  if(typeof n!=='number'||!Number.isFinite(n)||n<0||n>1000000)throw Error('Invalid FinerWorks shipping cost');
  return Math.round(n*100);
};
export function shippingOptions(data,po,products) {
  if(data?.status?.success!==true||!Array.isArray(data.orders))throw Error('Unexpected FinerWorks shipping response');
  const rows=data.orders.filter(o=>o.order_po===po);
  if(rows.length!==1||data.orders.length!==1||!Array.isArray(rows[0].options))throw Error('FinerWorks shipping quote identity mismatch');
  const seen=new Set(),options=[];
  for(const r of rows[0].options) {
    if(!Number.isSafeInteger(r.id)||r.id<=0||seen.has(r.id))continue;
    seen.add(r.id);
    try {
      const total=r.calculated_total,prices=total?.product_pricing;
      if(total?.order_po!==po||!Array.isArray(prices)||prices.length!==products.length)continue;
      if(products.some(p=>prices.filter(q=>(q.product_code===p.product_sku||q.product_sku===p.product_sku)&&q.product_qty===p.product_qty).length!==1))continue;
      const shipping=cost(r.rate),production=cost(total.order_subtotal),supplierTax=cost(total.order_sales_tax),grand=cost(total.order_grand_total);
      const discount=cost(total.order_discount??0),expedite=cost(total.order_expedite_fee??0),credits=cost(total.order_credits_used??0);
      if(shipping!==cost(total.order_shipping_rate)||production<=0||credits!==0||grand!==production+shipping+supplierTax+expedite-discount||production!==prices.reduce((sum,p)=>sum+cost(p.total_price),0))continue;
      options.push({shippingMethod:String(r.id),shipping:moneyString(shipping),productionCost:moneyString(production),supplierTax:moneyString(supplierTax),maximumProviderCost:moneyString(grand),
        service:typeof r.shipping_method==='string'?r.shipping_method.slice(0,100):'Print-lab delivery',carrier:typeof r.carrier==='string'?r.carrier.slice(0,80):'FinerWorks',quotedAt:Date.now()});
    }catch{/* A malformed option is never replaced with an estimated rate. */}
  }
  if(!options.length) {
    const error=Error('No exact FinerWorks shipping option passed validation');
    const scalar=v=>typeof v==='number'||typeof v==='boolean'?v:typeof v;
    error.details={endpoint:'/v3/list_shipping_options_multiple',optionCount:rows[0].options.length,samples:rows[0].options.slice(0,3).map(r=>({
      id:scalar(r.id),rate:scalar(r.rate),total:r.calculated_total?Object.fromEntries(['order_subtotal','order_shipping_rate','order_discount','order_sales_tax','order_expedite_fee','order_credits_used','order_grand_total'].map(k=>[k,scalar(r.calculated_total[k])])):null,
      products:(r.calculated_total?.product_pricing||[]).slice(0,12).map(p=>({product_qty:scalar(p.product_qty),product_code:codePattern.test(p.product_code||'')?p.product_code:null,product_sku:codePattern.test(p.product_sku||'')?p.product_sku:null,total_price:scalar(p.total_price)}))}))};
    throw error;
  }
  return options.sort((a,b)=>moneyCents(a.shipping,{allowZero:true})-moneyCents(b.shipping,{allowZero:true}));
}
async function selectionHash(items,address) {
  const recipient=finerworksRecipient(address,'');delete recipient.address_order_po;
  const selection={items:items.map(i=>({id:i.id,sku:i.sku,quantity:i.quantity})).sort((a,b)=>a.id.localeCompare(b.id)),recipient};
  const bytes=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(selection)));
  return [...new Uint8Array(bytes)].map(n=>n.toString(16).padStart(2,'0')).join('');
}
export async function quoteFinerWorksPrints(env,items,address) {
  if(env.PRINT_PROVIDER!=='finerworks')throw Error('FinerWorks is not the selected print provider');
  const po=`va-quote-${crypto.randomUUID()}`,products=groupPrintProducts(items,po),recipient=finerworksRecipient(address,po);
  const materials=await finerworksMaterials(env);
  for(const item of items) {
    const [,tid,mid,sid]=item.sku.match(codePattern),media=materials.media.find(m=>m.id===Number(mid)),style=materials.styles.find(s=>s.id===Number(sid));
    if(!media||media.productTypeId!==Number(tid)||!style||finerworksProductCode(media,style,item.imageSize)!==item.sku)throw Error('FinerWorks material or size needs review');
  }
  const units=await finerworksPrices(env,products.map(p=>p.product_sku));
  for(const item of items) {
    const q=units.find(q=>q.code===item.sku);
    if(!q?.ok||moneyCents(item.amount)<moneyCents(printRetailPrice(q.productionCost)))throw Error('Print production cost changed; review the saved retail price before checkout');
  }
  // The shipping endpoint validates the order model, including the image object.
  for(const product of products) {
    const item=items.find(i=>i.sku===product.product_sku),u=new URL(item.assetUrl);
    if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||!['vermillionaurora.com','media.vermillionaurora.com'].includes(u.hostname)||! /\.(jpg|jpeg|png)$/i.test(u.pathname))throw Error('Invalid FinerWorks image URL');
    product.product_image={product_url_file:u.href,product_url_thumbnail:u.href};
  }
  const body={orders:[{order_po:po,order_key:null,recipient,order_items:products,shipping_code:'EC',test_mode:env.PAYPAL_MODE==='sandbox'}]};
  const data=await finerworksRequest(env,'/v3/list_shipping_options_multiple',body);
  const options=shippingOptions(data,po,products),selected=options[0];
  return {provider:'finerworks',mode:finerworksEnvironment(env),currency:'USD',...selected,selectionHash:await selectionHash(items,address),shippingMarkup:'0.00',options};
}
export async function validateFinerWorksPrintOrder(env,items,address,quote) {
  if(env.PAYPAL_MODE!=='sandbox'||quote?.provider!=='finerworks'||quote.mode!=='sandbox'||!/^\d+$/.test(quote.shippingMethod||''))throw Error('Order preflight requires a sandbox FinerWorks quote');
  if(quote.selectionHash!==await selectionHash(items,address)||!Number.isFinite(quote.quotedAt)||Date.now()-quote.quotedAt>600000||quote.quotedAt>Date.now()+1000)throw Error('Refresh the shipping quote for these exact items and destination');
  const po=`va-test-${crypto.randomUUID()}`;
  groupPrintProducts(items,po);
  const order_items=items.map(item=>{
    const u=new URL(item.assetUrl);
    if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||!['vermillionaurora.com','media.vermillionaurora.com'].includes(u.hostname)||! /\.(jpg|jpeg|png)$/i.test(u.pathname))throw Error('Invalid FinerWorks image URL');
    return {product_order_po:po,product_sku:item.sku,product_qty:item.quantity,product_title:String(item.title||'Art print').slice(0,50),product_image:{product_url_file:u.href,product_url_thumbnail:u.href}};
  });
  // Omit the optional source label: the live validator rejected it despite its documented text type.
  const body={orders:[{order_po:po,order_key:null,recipient:finerworksRecipient(address,po),order_items,shipping_code:quote.shippingMethod,test_mode:true}],validate_only:true,payment_token:'xxxx'};
  const data=await finerworksRequest(env,'/v3/submit_orders_v2',body);
  if(data.status?.success!==true||Array.isArray(data.orders)&&data.orders.length)throw Error('FinerWorks preflight did not confirm validation-only success');
  return {provider:'finerworks',validationOnly:true,testMode:true,validated:true,ordersSubmitted:false};
}
