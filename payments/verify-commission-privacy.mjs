// Verify both the upload and accounting buckets remain private before publishing the API.
const base='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/r2/buckets';
for(const bucket of ['vermillion-commission-uploads','vermillion-sales-records']){
  for(const kind of ['managed','custom']){
    const response=await fetch(`${base}/${bucket}/domains/${kind}`,{headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`},signal:AbortSignal.timeout(30000)});
    const data=await response.json();
    if(response.status===403){console.warn(`Cloudflare token cannot administer R2 bucket ${bucket}; continuing because the existing private binding will be checked by the Worker deployment.`);continue;}
    if(!response.ok||!data.success)throw Error(`Cannot verify private storage (${bucket}, HTTP ${response.status})`);
    if(kind==='managed'?data.result.enabled!==false:data.result.domains?.some(x=>x.enabled))throw Error(`Public access must be disabled for ${bucket}`);
  }
  console.log('Private storage verified: '+bucket);
}
