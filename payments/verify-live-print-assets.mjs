// Release gate: the exact approved sample sheets must be public before sales open.
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
import {readyPrints,printVersion} from '../catalog/prints.mjs';
import {catalogVersion} from '../catalog/catalog.mjs';
const prints=Object.values(readyPrints),site='https://vermillionaurora.com';
assert.equal(prints.filter(p=>!p.mat&&!p.frame).length,6);
assert(prints.every(p=>p.sampleOnly&&!p.testOnly&&['painting-portrait-in-green','painting-portrait-in-gold'].includes(p.productId)));
assert(prints.filter(p=>p.frame).every(p=>p.mat&&p.frame.glazing?.id===1&&p.baseSku));
export async function verifyLivePrintAssets() {
  const release=await fetch(`${site}/catalog/version.json?release=${catalogVersion}`,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  assert.equal(release.status,200);
  assert.equal((await release.json()).version,catalogVersion,'The website must expose the promoted catalog before the API deploy');
  const page=await fetch(`${site}/print-test/?release=${printVersion}`,{cache:'no-store',signal:AbortSignal.timeout(15000)});
  assert.equal(page.status,200);assert((await page.text()).includes(printVersion));
  const catalog=await (await fetch(`${site}/catalog/products.json?prints=${printVersion}`,{cache:'no-store',signal:AbortSignal.timeout(15000)})).json();
  assert.equal(catalog.printVersion,printVersion);assert.deepEqual(catalog.prints.map(p=>p.id).sort(),prints.map(p=>p.id).sort());
  for(const url of new Set(prints.map(p=>p.assetUrl))) {
    assert.equal(new URL(url).origin,site);
    const r=await fetch(url,{signal:AbortSignal.timeout(15000)});assert.equal(r.status,200);assert.match(r.headers.get('content-type'),/^image\/jpeg/);
    assert.equal(createHash('sha256').update(Buffer.from(await r.arrayBuffer())).digest('hex'),prints.find(p=>p.assetUrl===url).assetSha256);
  }
  for(const sha of ['1b2ecbeb6d8c7ce0f1ab3ea91b0da547efc6d31fb5de30aa2eba858f0138b514','787d8ece2ad8e68971a89d559bd910cbca4049e2ff1afc3e1bda567b11173765']){
    const r=await fetch(`${site}/print-samples/${sha}.jpg`,{signal:AbortSignal.timeout(15000)});assert.equal(r.status,200);
    assert.equal(createHash('sha256').update(Buffer.from(await r.arrayBuffer())).digest('hex'),sha,'Keep previous paid orders backed by their exact original file');
  }
}
if(process.argv[1]?.endsWith('/verify-live-print-assets.mjs')||process.argv[1]==='payments/verify-live-print-assets.mjs') {
  let ready=false;
  for(let i=0;i<36;i++)try{await verifyLivePrintAssets();ready=true;break;}catch{console.log(`Waiting for sample website release (${i+1}/36)`);await new Promise(resolve=>setTimeout(resolve,5000));}
  if(!ready)throw Error('The approved live sample page, catalog and images are not deployed');
  console.log('PASS: exact approved sample files, page and public catalog are deployed.');
}
