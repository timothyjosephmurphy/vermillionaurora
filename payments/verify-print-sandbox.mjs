// Quote and preflight checks; --test-orders also exercises unbilled sandbox fulfillment.
// The encrypted artifact is the only output containing supplier costs/diagnostics.
import {randomBytes,createCipheriv,publicEncrypt} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {gzipSync} from 'node:zlib';
import assert from 'node:assert/strict';
import config from '../catalog/prints.json' with {type:'json'};
import products from '../catalog/products.json' with {type:'json'};
const base='https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev';
const cf='https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-checkout-sandbox/secrets';
const name='FINERWORKS_AUDIT_TOKEN',secret=`${Date.now()+15*60000}.${randomBytes(32).toString('hex')}`;
const publicKey=readFileSync(new URL(process.argv.includes('--pilot-checkout')?'./finerworks-pilot-report-public.pem':'./finerworks-report-public.pem',import.meta.url),'utf8');
const report={provider:'finerworks',release:process.env.DEPLOYED_SHA,createdAt:new Date().toISOString(),readOnly:!process.argv.includes('--test-orders'),ordersSubmitted:false,prices:[],catalogPrices:[],shipping:[],testOrders:[],failures:[]};
async function cloudflare(method,path='',body) {
  const r=await fetch(cf+path,{method,redirect:'error',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`,'Content-Type':'application/json'},body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(30000)});
  const d=await r.json();if(!r.ok||!d.success)throw Error(`Sandbox audit credential ${method} failed: HTTP ${r.status}`);
}
async function read(path,body) {
  for(let i=0;;i++) {
    const r=await fetch(base+path,{method:body?'POST':'GET',redirect:'error',headers:body?{Authorization:`Bearer ${secret}`,'Content-Type':'application/json'}:undefined,body:body?JSON.stringify(body):undefined,signal:AbortSignal.timeout(150000)});
    if(r.status===404&&body&&i<5){await new Promise(resolve=>setTimeout(resolve,5000));continue;}
    const d=await r.json();
    if(!r.ok){report.failures.push({task:body?.task,path,httpStatus:r.status,error:d.error,diagnostic:d.diagnostic||null});
      // Only our fixed mat error messages may appear in public logs.
      const matErrors=['Unexpected FinerWorks mat catalog','White 4-ply FinerWorks mat is not confirmed','No supported standard mat size fits this print','Invalid FinerWorks print and mat geometry','FinerWorks did not return a valid mat product code','FinerWorks did not validate the exact print and mat combination','No verified single-mat, unframed price for this print'];
      if(body?.task==='matting'&&matErrors.includes(d.error))console.log('MAT_VALIDATION: '+d.error);
      throw Error(`FinerWorks ${body?.task||'health'} verification failed: HTTP ${r.status}`);}
    return d;
  }
}
const verify=b=>read('/checkout/prints/verify',b);
function seal() {
  const aes=randomBytes(32),iv=randomBytes(12),c=createCipheriv('aes-256-gcm',aes,iv);
  const bytes=Buffer.concat([c.update(gzipSync(JSON.stringify(report))),c.final()]);
  const data={algorithm:'RSA-OAEP-SHA256+A256GCM+gzip',key:publicEncrypt({key:publicKey,oaepHash:'sha256'},aes).toString('base64'),iv:iv.toString('base64'),tag:c.getAuthTag().toString('base64'),data:bytes.toString('base64')};
  writeFileSync('/tmp/finerworks-audit.encrypted.json',JSON.stringify(data),{mode:0o600});
  console.log('Encrypted FinerWorks audit artifact written; no supplier costs or account details in logs.');
}
let installed=false;
try {
  assert.ok(process.env.CLOUDFLARE_API_TOKEN);assert.match(process.env.DEPLOYED_SHA||'',/^[a-f0-9]{40}$/);
  let health;
  for(let i=0;i<18;i++){health=await read('/checkout/health');if(health.mode==='sandbox'&&health.release===process.env.DEPLOYED_SHA)break;await new Promise(r=>setTimeout(r,5000));}
  assert.equal(health.mode,'sandbox');assert.equal(health.release,process.env.DEPLOYED_SHA);
  const provider=await read('/checkout/prints/health');assert.equal(provider.provider,'finerworks');assert.equal(provider.enabled,true);assert.equal(provider.readOnly,false);
  const cart=await read('/checkout/cart/catalog');assert.equal(cart.products.filter(p=>p.type==='print'&&p.methods.includes('paypal')).length,6);
  for(const art of Object.values(config.artworks)) {
    const file=art.variants.small.asset;const r=await fetch(file.url);assert.equal(r.status,200);
    const {createHash}=await import('node:crypto');assert.equal(createHash('sha256').update(Buffer.from(await r.arrayBuffer())).digest('hex'),file.sha256);
  }
  console.log('PASS: six sandbox-only print options and both exact test files are available.');
  installed=true;await cloudflare('PUT','',{name,text:secret,type:'secret_text'});
  const credentials=await verify({task:'credentials'});assert.equal(credentials.credentialsOk,true);report.credentialsOk=true;console.log('PASS: FinerWorks credentials.');
  const materials=await verify({task:'materials'});assert.ok(materials.media.length&&materials.styles.length);
  const style=materials.styles.find(s=>s.name==='Borderless'&&s.customSizing&&s.borderSize===0);assert.ok(style);
  const pilots=Object.keys(config.artworks).filter(id=>config.artworks[id].testOnly).slice(0,10);assert.ok(pilots.length);
  for(const label of ['Archival Matte Paper','Watercolor Bright White','Hahnemühle Photo Rag']) {
    const paper=materials.media.find(m=>m.name===label&&m.styleIds.includes(style.id));assert.ok(paper);
    report.prices.push(await verify({task:'prices',productIds:pilots,mediaId:paper.id,styleId:style.id}));
  }
  const pilotPrices=report.prices.flatMap(p=>p.candidates).filter(p=>p.ok),watercolor=pilotPrices.filter(p=>p.mediaName==='Watercolor Bright White');
  assert.equal(watercolor.length,pilots.length*3);assert.ok(watercolor.every(p=>p.pricing.amount===p.pricing.recommendedAmount&&!p.pricing.needsReview));
  console.log('PASS: all six pilot retail prices match the approved 3.5x / round-up-$5 / $25-floor rule.');
  report.matting=[];
  if(!process.argv.includes('--pilot-checkout')) {
    const matMaterials=await verify({task:'mats'});
    console.log('VERIFIED_WHITE_MATS '+JSON.stringify(matMaterials.materials.filter(m=>/white/i.test(m.name))));
  }
  if(!process.argv.includes('--pilot-checkout'))for(const sizeKey of ['small','medium','full']) {
    const option=await verify({task:'matting',productId:pilots[0],sizeKey});
    assert.equal(option.readOnly,true);assert.equal(option.ordersSubmitted,false);assert.equal(option.sellable,false);
    report.matting.push(option);
    // Public catalog fields only: omit supplier costs, addresses, and diagnostics.
    console.log('VERIFIED_MAT_OPTION '+JSON.stringify({key:sizeKey,sku:option.sku,baseSku:option.baseSku,mat:option.mat,material:option.material,amount:option.pricing.recommendedAmount,pricingRule:option.pricing.ruleId,quotedAt:option.quotedAt}));
  }
  if(report.matting.length)console.log('PASS: three exact-size print-and-mat configurations validated and priced.');
  // Get price recommendations for every measured painting without enabling it or
  // publishing changed prices. Unsupported sizes remain excluded, not enlarged.
  const paper=materials.media.find(m=>m.name==='Watercolor Bright White'),ids=products.filter(p=>p.type==='painting'&&p.dimensions).map(p=>p.id);
  if(process.argv.includes('--full-catalog'))for(let i=0;i<ids.length;i+=10)report.catalogPrices.push(await verify({task:'prices',productIds:ids.slice(i,i+10),mediaId:paper.id,styleId:style.id}));
  report.pricedCatalogVariants=report.catalogPrices.flatMap(p=>p.candidates).filter(p=>p.ok).length;
  if(report.pricedCatalogVariants)console.log(`PASS: ${report.pricedCatalogVariants} exact-size catalog retail recommendations retrieved; no automatic publication.`);
  // Public building address, not a customer or the artist's home. Quote/preflight only.
  const address={name:'Sandbox Test',street1:'600 4th Ave',street2:'',city:'Seattle',state:'WA',zip:'98104',country:'US'};
  for(const productId of pilots)for(const sizeKey of ['small','medium','full']) {
    report.shipping.push(await verify({task:'shipping',productId,sizeKey,quantity:1,address}));
  }
  assert.ok(report.shipping.every(q=>q.shippingMarkup==='0.00'&&q.provider==='finerworks'));
  console.log('PASS: six destination-based FinerWorks shipping quotes; shipping markup is zero.');
  let cartError;
  try {
    report.cartQuote=await verify({task:'cart-quote',productIds:pilots,sizeKey:'small',address});
    assert.equal(report.cartQuote.base,'50.00');assert.equal(report.cartQuote.ordersSubmitted,false);
    console.log('PASS: combined Dorian and Chase cart shipping and tax.');
  } catch(error) {cartError=error;}
  report.preflight=[];
  for(const productId of pilots) {
    const p=await verify({task:'preflight',productId,sizeKey:'small',quantity:1,address});
    assert.equal(p.validated,true);assert.equal(p.ordersSubmitted,false);report.preflight.push(p);
  }
  console.log('PASS: validation-only order preflight for both Dorian and Chase.');
  if(process.argv.includes('--test-orders'))for(const productId of pilots) {
    const t=await verify({task:'test-order',productId,sizeKey:'small',quantity:1,address,testRunId:process.env.DEPLOYED_SHA});
    report.testOrders.push(t);report.ordersSubmitted=report.testOrders.some(o=>o.ordersSubmitted);
    assert.equal(t.testMode,true);assert.equal(t.paymentTaken,false);assert.equal(t.status,'test-complete');assert.ok(t.orderId);
    console.log(`PASS: ${productId} accepted by FinerWorks in test mode; private test record saved.`);
  }
  console.log('No real payment, printing, shipping, or customer email occurred in this provider test.');
  if(!process.argv.includes('--pilot-checkout')&&config.artworks[pilots[0]].variants.small.matOptions?.['snow-white']?.sku){
    report.matShipping=[];
    for(const sizeKey of ['small','medium','full'])report.matShipping.push(await verify({task:'shipping',productId:pilots[0],sizeKey,finishKey:'snow-white',quantity:1,address}));
    assert.ok(report.matShipping.every(q=>q.shippingMarkup==='0.00'));
    report.matPreflight=await verify({task:'preflight',productId:pilots[0],sizeKey:'small',finishKey:'snow-white',quantity:2,address});
    assert.equal(report.matPreflight.ordersSubmitted,false);assert.equal(report.matPreflight.validated,true);
    console.log('PASS: three mat-inclusive shipping quotes and two-copy print-with-mat validation. No orders submitted.');
  }
  if(cartError)throw cartError;
}catch(error){report.error=error.message;throw error;}
finally {
  try {if(installed){await cloudflare('DELETE','/'+name);console.log('Temporary FinerWorks audit credential removed.');}}
  finally {seal();}
}
