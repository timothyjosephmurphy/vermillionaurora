// Provision only the isolated sandbox's private order archive. Never touch live storage.
import fs from 'node:fs';
import assert from 'node:assert/strict';
const config=JSON.parse(fs.readFileSync('cloudflare/wrangler.sandbox.jsonc','utf8'));
const bucket=config.r2_buckets.find(b=>b.binding==='SALES_ARCHIVE')?.bucket_name;
assert.equal(config.name,'vermillion-checkout-sandbox');
assert.equal(config.vars.PAYPAL_MODE,'sandbox');
assert.equal(bucket,'test-sales-records');
assert.ok(process.env.CLOUDFLARE_API_TOKEN,'Configure the CLOUDFLARE_SANDBOX_API_TOKEN GitHub Actions secret before deploying the sandbox');
const base='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/r2/buckets';
const headers={Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'};
async function api(path,options={}) {
  const response=await fetch(base+path,{...options,headers,signal:AbortSignal.timeout(30000)});
  const data=await response.json();
  if(!response.ok||!data.success)throw Error(`Sandbox archive setup HTTP ${response.status}. If bucket administration is unavailable, create a private R2 bucket named ${bucket} in Cloudflare and authorize the deployment token to verify its privacy settings.`);
  return data.result;
}
const existing=await api('');
if(!existing.buckets?.some(b=>b.name===bucket)){
  await api('',{method:'POST',body:JSON.stringify({name:bucket})});
  console.log('Created private sandbox archive:',bucket);
}
const managed=await api(`/${bucket}/domains/managed`);
const custom=await api(`/${bucket}/domains/custom`);
assert.equal(managed.enabled,false,'Sandbox sales records must not be publicly accessible');
assert.ok(!custom.domains?.some(d=>d.enabled),'Sandbox sales records must not use public custom domains');
console.log('Private sandbox archive verified:',bucket);
