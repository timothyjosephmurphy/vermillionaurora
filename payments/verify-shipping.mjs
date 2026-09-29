import { randomBytes } from 'node:crypto';
const worker = 'vermillion-checkout-sandbox';
const base = `https://${worker}.timothyjosephmurphy.workers.dev`;
const insurance = process.argv.includes('--insurance');
const endpoint = base+'/checkout/shipping-check'+(insurance ? '?scenario=chase-insurance' : '');
const cf = `https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/secrets`;
const key = 'SHIPPING_CHECK_TOKEN', secret = randomBytes(32).toString('hex');
const cloudflare = async (method,path='',body) => {
  const response = await fetch(cf+path,{method,headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body ? JSON.stringify(body) : undefined});
  const data = await response.json();
  if (!response.ok || !data.success) throw new Error(`Sandbox test credential ${method} failed (HTTP ${response.status})`);
};
let installed = false;
try {
  await cloudflare('PUT','',{name:key,text:secret,type:'secret_text'}); installed = true;
  const headers = {Authorization:`Bearer ${secret}`};
  let response;
  for (let i=0;i<12;i++) {
    response = await fetch(endpoint,{method:'POST',headers});
    if (response.status !== 404) break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  if (!response.ok) throw new Error(`Sandbox shipping test could not start (HTTP ${response.status})`);
  let state;
  for (let i=0;i<36;i++) {
    const response = await fetch(endpoint,{headers});
    if (!response.ok) throw new Error(`Sandbox shipping status failed (HTTP ${response.status})`);
    state = await response.json();
    if (state.emailAccepted || state.error) break;
    await new Promise(resolve=>setTimeout(resolve,5000));
  }
  console.log('Sandbox shipping result:',JSON.stringify(state));
  if (state.status !== 'ready' || !state.transactionCreated || !state.emailAccepted || !state.pdfAttached) {
    throw new Error('A test label with PDF email attachment was not confirmed');
  }
  if (insurance && (!state.insuranceRequested || !state.insuranceConfirmed || state.insuranceAmount !== '20.00')) {
    throw new Error('The test label did not confirm $20 insurance');
  }
} finally {
  if (installed) { await cloudflare('DELETE','/'+key); console.log('Temporary shipping test credential removed'); }
}
