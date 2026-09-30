// Catalog requests only. No order submission or customer information.
import {randomBytes} from 'node:crypto';
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const cf='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',token=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
async function secret(method){
  const r=await fetch(cf+(method==='DELETE'?'/'+name:''),{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},...(method==='PUT'?{body:JSON.stringify({name,text:token,type:'secret_text'})}:{}),signal:AbortSignal.timeout(30000)});
  if(!r.ok||(await r.json()).success!==true)throw Error('Sandbox audit credential operation failed');
}
async function verify(input={}){
  for(let attempt=0;;attempt++){
    const r=await fetch(base+'/checkout/prints/verify',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({task:'framing-materials',productId:'painting-portrait-in-green',sizeKey:'small',...input}),signal:AbortSignal.timeout(150000)});
    if(r.status===404&&attempt<6){await new Promise(resolve=>setTimeout(resolve,5000));continue;}
    const d=await r.json();if(!r.ok){console.log('FRAME_CATALOG_ERROR '+JSON.stringify(d));throw Error('Frame catalog check failed');}return d;
  }
}
let installed=false;
try{
  installed=true;await secret('PUT');
  const d=await verify();console.log('FRAME_MATERIALS '+JSON.stringify(d));
  for(const c of d.collections.sort((a,b)=>(a.startingPrice??Infinity)-(b.startingPrice??Infinity)).slice(0,5)){
    console.log('FRAME_COLLECTION '+JSON.stringify(await verify({collectionId:c.id})));
  }
}finally{if(installed)await secret('DELETE');}
