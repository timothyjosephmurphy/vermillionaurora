// Read only. Report binding presence and mode flags, never credential values.
const url='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-commissions/settings';
const response=await fetch(url,{headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`},redirect:'error'});
const data=await response.json();
if(!response.ok||!data.success)throw Error(`Production configuration unavailable (${response.status})`);
const bindings=data.result.bindings||[],names=new Set(bindings.map(b=>b.name));
const flag=name=>bindings.find(b=>b.name===name)?.text||'unset';
console.log(JSON.stringify({worker:'vermillion-commissions',mode:flag('PAYPAL_MODE'),provider:flag('PRINT_PROVIDER'),printCheckoutEnabled:flag('PRINT_CHECKOUT_ENABLED'),finerworksOrderingEnabled:flag('FINERWORKS_ORDER_ENABLED'),
  credentials:Object.fromEntries(['FINERWORKS_WEB_API_KEY','FINERWORKS_APP_KEY','FINERWORKS_PAYMENT_TOKEN'].map(name=>[name,names.has(name)])),
  salesArchive:bindings.some(b=>b.name==='SALES_ARCHIVE'&&b.type==='r2_bucket'),cartOrders:bindings.some(b=>b.name==='CART_ORDERS'&&b.type==='durable_object_namespace')},null,2));
console.log('Presence only; no provider credentials validated and no live order created.');
