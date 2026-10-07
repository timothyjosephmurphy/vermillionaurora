import fs from 'node:fs';
import {catalogVersion,products} from '../catalog/catalog.mjs';
// Pages that 301 elsewhere (static/_redirects) are checked for the redirect instead of the catalog version.
const redirects=new Map(fs.readFileSync(new URL('../static/_redirects',import.meta.url),'utf8').split('\n').map(line=>line.trim().split(/\s+/)).filter(([from,to])=>from&&!from.startsWith('#')&&to).map(([from,to,code])=>[from,{to,code:Number(code||302)}]));
const site='https://tjm.art',api='https://vermillion-commissions.timothyjosephmurphy.workers.dev';
const request=async url=>{const response=await fetch(url,{cache:'no-store',signal:AbortSignal.timeout(15000)});if(!response.ok)throw Error(`${url}: HTTP ${response.status}`);return response;};
let verified=false;
for(let attempt=0;attempt<18;attempt++){
 try {
  const version=await(await request(`${site}/catalog/version.json?release=${catalogVersion}`)).json();
  const health=await(await request(`${api}/checkout/health`)).json();
  if(version.version!==catalogVersion||health.catalogVersion!==catalogVersion)throw Error('Catalog versions differ');
  const status=await(await request(`${api}/inventory/status?ids=painting-portrait-in-green`)).json();
  if(status.version!==catalogVersion||!status.availability['painting-portrait-in-green'])throw Error('Live inventory unavailable');
  for(const path of ['/','/gallery/','/exhibitions/paul-murphy/','/exhibitions/chase-toole/','/exhibitions/gavin-robertson/',...products.map(p=>`/products/${p.slug}/`)]){
   const redirect=redirects.get(path);
   if(redirect){
    const response=await fetch(site+path,{cache:'no-store',redirect:'manual',signal:AbortSignal.timeout(15000)});
    const location=response.headers.get('location')||'';
    if(response.status!==redirect.code||new URL(location,site).href!==new URL(redirect.to,site).href)throw Error(`Redirect missing at ${path}: HTTP ${response.status} ${location}`);
    continue;
   }
   const html=await(await request(site+path)).text();if(!html.includes(catalogVersion))throw Error(`Old page at ${path}`);
  }
  // Old domain: pages 301 to the same path and query on tjm.art; hash-bound catalog/print files stay put.
  const legacy='https://vermillionaurora.com',moved=await fetch(`${legacy}/commissions/?ref=release-check`,{cache:'no-store',redirect:'manual',signal:AbortSignal.timeout(15000)});
  if(moved.status!==301||moved.headers.get('location')!==`${site}/commissions/?ref=release-check`)throw Error(`Old domain redirect missing: HTTP ${moved.status} ${moved.headers.get('location')}`);
  if((await(await request(`${legacy}/catalog/version.json?release=${catalogVersion}`)).json()).version!==catalogVersion)throw Error('Old domain catalog files moved');
  console.log(`Verified website and API catalog ${catalogVersion}; ${products.length} product URLs (${[...redirects.keys()].filter(path=>path.startsWith('/products/')&&path.endsWith('/')).length} redirected) and live inventory.`);verified=true;break;
 }catch(error){console.log(`Release verification ${attempt+1}: ${error.message}`);if(attempt<17)await new Promise(resolve=>setTimeout(resolve,5000));}
}
if(!verified)throw Error('Production did not serve the matching catalog release');
