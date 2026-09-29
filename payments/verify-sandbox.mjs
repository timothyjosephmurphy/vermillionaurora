import { randomBytes } from 'node:crypto';
const worker='vermillion-checkout-sandbox';
const base=`https://${worker}.timothyjosephmurphy.workers.dev`;
const cf=`https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/secrets`;
const key='CHECKOUT_AUDIT_TOKEN',secret=randomBytes(32).toString('hex');
const cloudflare=async(method,path='',body)=>{
  const r=await fetch(cf+path,{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined});
  const d=await r.json();
  if(!r.ok||!d.success)throw Error(`Sandbox diagnostic credential ${method} failed: HTTP ${r.status}`);
};
let installed=false;
try {
  await cloudflare('PUT','',{name:key,text:secret,type:'secret_text'});installed=true;
  const headers={Authorization:`Bearer ${secret}`};
  let response;
  for(let i=0;i<6;i++){
    response=await fetch(base+'/checkout/verification',{method:'POST',headers});
    if(response.status!==404)break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  const audit=await response.json();
  console.log('Sandbox payment verification:',JSON.stringify(audit));
  if(!response.ok||!audit.registered||!audit.replayRequested)throw Error('Sandbox webhook replay could not be requested');
  let state;
  for(let i=0;i<12;i++){
    const r=await fetch(base+'/checkout/verification',{headers});state=await r.json();
    if(state.webhookReceived&&state.taxRecorded)break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  console.log('Sandbox final state:',JSON.stringify(state));
  if(state.status!=='sold'||!state.webhookReceived||!state.taxRecorded)throw Error('Webhook receipt or Stripe test tax transaction is not confirmed');
} finally {
  if(installed){await cloudflare('DELETE','/'+key);console.log('Temporary sandbox diagnostic credential removed');}
}
