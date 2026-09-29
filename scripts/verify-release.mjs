import {catalogVersion,products} from '../catalog/catalog.mjs';
const site='https://vermillionaurora.com',api='https://vermillion-commissions.timothyjosephmurphy.workers.dev';
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
   const html=await(await request(site+path)).text();if(!html.includes(catalogVersion))throw Error(`Old page at ${path}`);
  }
  console.log(`Verified website and API catalog ${catalogVersion}; ${products.length} product URLs and live inventory.`);verified=true;break;
 }catch(error){console.log(`Release verification ${attempt+1}: ${error.message}`);if(attempt<17)await new Promise(resolve=>setTimeout(resolve,5000));}
}
if(!verified)throw Error('Production did not serve the matching catalog release');
