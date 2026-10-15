// Read configuration names and safe mode flags. Secret values never leave Cloudflare.
const url='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-commissions/settings';
const response=await fetch(url,{headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`}});
const data=await response.json();
if(!response.ok||!data.success){console.log(`Production Worker settings are inaccessible to the deployment token (HTTP ${response.status}).`);process.exitCode=1;}
else {
  const bindings=data.result.bindings||[];
  const required=['SHIPPO_TOKEN','STRIPE_SECRET_KEY','SHIP_FROM_STREET'];
  const names=new Set(bindings.map(x=>x.name));
  const missing=required.filter(x=>!names.has(x));
  const safe={requiredBindingsPresent:required.filter(x=>names.has(x)),missingBindings:missing,
    mode:bindings.find(x=>x.name==='CHECKOUT_MODE')?.text||'unset',
    inventoryBinding:bindings.some(x=>x.name==='PAINTING_STOCK'&&x.type==='durable_object_namespace')};
  console.log('Production configuration:',JSON.stringify(safe));
  console.log('Secret presence does not verify provider credentials or live webhook registration.');
  if(missing.length)process.exitCode=1;
}
