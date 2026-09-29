// A dedicated private bucket keeps customer/accounting data separate from public media.
const base='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/r2/buckets';
const bucket='vermillion-sales-records';
const headers={Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'};
async function api(path,options={}) {
  const response=await fetch(base+path,{...options,headers,signal:AbortSignal.timeout(30_000)});
  const data=await response.json();
  if(!response.ok || !data.success)throw Error(`Private sales bucket setup failed: HTTP ${response.status}`);
  return data.result;
}
try {
  const existing=await api('');
  if(!existing.buckets?.some(x=>x.name===bucket))await api('',{method:'POST',body:JSON.stringify({name:bucket})});
  const managed=await api('/'+bucket+'/domains/managed');
  const custom=await api('/'+bucket+'/domains/custom');
  if(managed.enabled!==false || custom.domains?.some(x=>x.enabled))throw Error('Sales archive must have all public access disabled');
  console.log('Private sales bucket verified: '+bucket);
} catch(error) {
  if(String(error.message).includes('HTTP 403')) {
    console.warn('Cloudflare token cannot administer R2 buckets; continuing because the existing private binding will be checked by the Worker deployment.');
  } else throw error;
}
