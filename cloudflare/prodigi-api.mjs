export const PRINT_PROVIDER='prodigi';
export function prodigiEnvironment(env,expected=env.PAYPAL_MODE) {
  if(!['sandbox','live'].includes(env.PRODIGI_ENV)||env.PRODIGI_ENV!==expected||!env.PRODIGI_API_KEY)throw Error('Print provider environment is not configured for this checkout');
  return env.PRODIGI_ENV;
}
export async function prodigiRequest(env,path,body,expected) {
  const mode=prodigiEnvironment(env,expected);
  if(!/^\/(products\/[A-Z0-9-]+|quotes|orders(?:\/ord_[A-Za-z0-9]+)?)$/.test(path))throw Error('Invalid print provider request');
  const response=await fetch(`https://${mode==='sandbox'?'api.sandbox':'api'}.prodigi.com/v4.0${path}`,{
    method:body===undefined?'GET':'POST',headers:{'X-API-Key':env.PRODIGI_API_KEY,'Content-Type':'application/json'},signal:AbortSignal.timeout(20000),
    ...(body===undefined?{}:{body:JSON.stringify(body)})
  });
  let data;try{data=await response.json();}catch{throw Error('Print provider returned an unreadable response');}
  if(!response.ok||!['ok','created','onhold','alreadyexists','createdwithissues'].includes(String(data.outcome).toLowerCase())){
    const error=Error(`Print provider request needs review (${response.status})`);error.status=response.status;error.outcome=data.outcome;throw error;
  }
  return data;
}
const money=(cost)=>{
  if(cost?.currency!=='USD'||!/^\d+(?:\.\d{1,2})?$/.test(String(cost.amount)))throw Error('Invalid print provider cost');
  const value=Math.round(Number(cost.amount)*100);if(!Number.isSafeInteger(value)||value<0)throw Error('Invalid print provider cost');return value;
};
const dollars=value=>(value/100).toFixed(2);
export async function prodigiProduct(env,sku) {
  if(!/^[A-Z0-9-]{1,100}$/.test(sku))throw Error('Invalid print product');
  const {product}=await prodigiRequest(env,`/products/${sku}`);
  if(product?.sku?.toUpperCase()!==sku||!product.printAreas?.default?.required)throw Error('Unexpected print product');
  const variants=(product.variants||[]).filter(v=>v.shipsTo?.includes('US')&&Object.keys(v.attributes||{}).length===0);
  if(!variants.length){
    const error=Error('This paper is not available without additional options for US delivery');
    // Product metadata only; exposed solely by the authenticated sandbox verifier.
    error.productOptions={sku,description:product.description,dimensions:product.productDimensions,attributes:product.attributes,
      variants:(product.variants||[]).map(v=>({attributes:v.attributes,shipsToUS:v.shipsTo?.includes('US')===true,printAreaSizes:v.printAreaSizes}))};
    throw error;
  }
  const d=product.productDimensions;
  if(!d||!['in','cm','mm'].includes(d.units)||!['width','height'].every(k=>Number.isFinite(d[k])&&d[k]>0))throw Error('Invalid print product dimensions');
  const divisor=d.units==='in'?1:d.units==='cm'?2.54:25.4;
  return {sku,width:d.width/divisor,height:d.height/divisor,unit:'in',verifiedUS:true,requiredPixels:variants[0].printAreaSizes?.default||null};
}
export async function verifyPrintProduct(env,item) {
  const p=await prodigiProduct(env,item.sku),expected=[item.paperSize.width,item.paperSize.height].sort((a,b)=>a-b),actual=[p.width,p.height].sort((a,b)=>a-b);
  if(actual.some((n,i)=>Math.abs(n-expected[i])>0.01))throw Error('The vendor paper dimensions changed. Review this print before selling it.');
  return p;
}
export async function quotePrints(env,items) {
  if(!items.length)throw Error('Choose a print');
  for(const item of items)await verifyPrintProduct(env,item);
  const result=await prodigiRequest(env,'/quotes',{shippingMethod:'Standard',destinationCountryCode:'US',currencyCode:'USD',items:items.map(i=>({sku:i.sku,copies:i.quantity,attributes:i.attributes||{},assets:[{printArea:'default'}]}))});
  const quote=result.quotes?.find(q=>q.shipmentMethod?.toLowerCase()==='standard');
  if(String(result.outcome).toLowerCase()==='createdwithissues')throw Error('Print quote requires review');
  if(!quote||!quote.shipments?.length||quote.shipments.some(s=>s.fulfillmentLocation?.countryCode!=='US'))throw Error('An exact-size US print and shipping quote is not available');
  const production=money(quote.costSummary?.items),shipping=money(quote.costSummary?.shipping);
  if(quote.items?.length!==items.length||items.some(i=>!quote.items.some(q=>q.sku?.toUpperCase()===i.sku&&q.copies===i.quantity)))throw Error('Print quote does not match the selected variants');
  return {provider:'prodigi',mode:prodigiEnvironment(env),shippingMethod:'Standard',productionCost:dollars(production),shipping:dollars(shipping),maximumProviderCost:dollars(production+shipping),
    carrier:[...new Set(quote.shipments.map(s=>s.carrier?.name||'Print courier'))].join(', '),service:'Prints shipped from the print lab',
    quotedAt:Date.now(),shipments:quote.shipments};
}
export function validateProdigiOrder(job,order) {
  const body=job.request;
  if(!/^ord_[A-Za-z0-9]+$/.test(order?.id||'')||(job.providerId&&order.id!==job.providerId)||order.merchantReference!==body.merchantReference||order.idempotencyKey!==body.idempotencyKey||order.shippingMethod!==body.shippingMethod)throw Error('Print fulfillment identity mismatch');
  const a=order.recipient?.address,b=body.recipient.address;
  if(!a||['line1','line2','postalOrZipCode','countryCode','townOrCity','stateOrCounty'].some(k=>(a[k]||'')!==(b[k]||''))||order.recipient.name!==body.recipient.name)throw Error('Print fulfillment address mismatch');
  if(order.items?.length!==body.items.length||body.items.some(i=>!order.items.some(o=>o.merchantReference===i.merchantReference&&o.sku?.toUpperCase()===i.sku&&o.copies===i.copies&&o.assets?.some(a=>a.printArea==='default'&&a.url===i.assets[0].url))))throw Error('Print fulfillment items mismatch');
  return order;
}
