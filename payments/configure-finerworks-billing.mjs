// One explicit setup operation. Secrets stay in memory and are never logged or archived.
import {generateKeyPairSync,randomBytes,privateDecrypt} from 'node:crypto';
import assert from 'node:assert/strict';
const account='3c1fddf0f4f4fc9c84594757d2e1bda0',target='vermillion-commissions',sandbox='vermillion-checkout-sandbox';
const origin='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev',setupName='FINERWORKS_BILLING_SETUP';
const {publicKey,privateKey}=generateKeyPairSync('rsa',{modulusLength:3072}),setupToken=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
async function cloudflare(worker,key,path,method='GET',body) {
  const r=await fetch(`https://api.cloudflare.com/client/v4/accounts/${account}/workers/scripts/${worker}/${path}`,{
    method,redirect:'error',signal:AbortSignal.timeout(30000),headers:{Authorization:`Bearer ${key}`,'Content-Type':'application/json'},...(body?{body:JSON.stringify(body)}:{})});
  const d=await r.json();if(!r.ok||!d.success)throw Error(`Cloudflare ${worker} ${method} ${path.split('/')[0]} failed (${r.status})`);return d.result;
}
async function productionSettings() {
  const settings=await cloudflare(target,process.env.CLOUDFLARE_PRODUCTION_API_TOKEN,'settings'),bindings=settings.bindings||[];
  const flag=name=>bindings.find(b=>b.name===name)?.text;
  assert.equal(flag('PAYPAL_MODE'),'live');
  assert.notEqual(flag('PRINT_CHECKOUT_ENABLED'),'true','Print purchases must remain disabled during billing setup');
  assert.notEqual(flag('FINERWORKS_ORDER_ENABLED'),'true','Print fulfillment must remain disabled during billing setup');
  return new Set(bindings.map(b=>b.name));
}
let installed=false;
try {
  assert.ok(process.env.CLOUDFLARE_SANDBOX_API_TOKEN);assert.ok(process.env.CLOUDFLARE_PRODUCTION_API_TOKEN);
  assert.match(process.env.DEPLOYED_SHA||'',/^[a-f0-9]{40}$/);
  // Cloudflare can briefly serve the previous release after a successful deploy.
  let health;
  for(let i=0;i<18;i++) {
    const response=await fetch(origin+'/checkout/health?billing_setup='+Date.now(),{cache:'no-store',signal:AbortSignal.timeout(10000)});
    health=await response.json();assert.equal(health.mode,'sandbox');
    if(health.release===process.env.DEPLOYED_SHA)break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  assert.equal(health.release,process.env.DEPLOYED_SHA,'The expected sandbox deployment is not available yet');
  await productionSettings();
  installed=true;
  await cloudflare(sandbox,process.env.CLOUDFLARE_SANDBOX_API_TOKEN,'secrets','PUT',{name:setupName,type:'secret_text',text:JSON.stringify({token:setupToken,publicKey:publicKey.export({format:'jwk'})})});
  let result;
  for(let i=0;i<12;i++) {
    const r=await fetch(origin+'/checkout/prints/billing-setup',{method:'POST',redirect:'error',headers:{Authorization:`Bearer ${setupToken}`},signal:AbortSignal.timeout(90000)});
    if(r.status===404){await new Promise(resolve=>setTimeout(resolve,5000));continue;}
    const d=await r.json();if(!r.ok)throw Error(`Saved-card lookup failed: ${d.error}; HTTP ${d.httpStatus||r.status}`);result=d;break;
  }
  assert.equal(result?.algorithm,'RSA-OAEP-SHA256');assert.match(result.encryptedToken,/^[A-Za-z0-9+/]{512}$/);
  const bytes=privateDecrypt({key:privateKey,oaepHash:'sha256',oaepLabel:Buffer.from(`FINERWORKS_PAYMENT_TOKEN|${setupToken}`)},Buffer.from(result.encryptedToken,'base64'));
  let token=bytes.toString('utf8');
  if(!/^[\x21-\x7e]{1,128}$/.test(token)||['xxxx','invoice'].includes(token)){bytes.fill(0);token='';throw Error('Saved payment token has an invalid format');}
  // Recheck immediately before the only production write.
  await productionSettings();
  await cloudflare(target,process.env.CLOUDFLARE_PRODUCTION_API_TOKEN,'secrets','PUT',{name:'FINERWORKS_PAYMENT_TOKEN',type:'secret_text',text:token});
  bytes.fill(0);token='';
  const names=await productionSettings();assert.ok(names.has('FINERWORKS_PAYMENT_TOKEN'));
  console.log('PASS: saved FinerWorks payment token configured as a production secret.');
  console.log(JSON.stringify({selectedMethod:result.brand,last4:result.last4,usedDefault:result.usedDefault,apiKeysPresent:['FINERWORKS_WEB_API_KEY','FINERWORKS_APP_KEY'].every(n=>names.has(n)),missingApiKeys:['FINERWORKS_WEB_API_KEY','FINERWORKS_APP_KEY'].filter(n=>!names.has(n)),printPurchasesEnabled:false,ordersSubmitted:false}));
} finally {
  if(installed){await cloudflare(sandbox,process.env.CLOUDFLARE_SANDBOX_API_TOKEN,'secrets/'+setupName,'DELETE');console.log('Temporary billing setup credential and encryption key removed.');}
}
