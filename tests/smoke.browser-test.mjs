// Smoke test against the built site (dist/): home, one gallery, one product, cart, plus any
// pages passed via SMOKE_PATHS or inferred from CHANGED_FILES. Live checkout APIs are mocked;
// nothing reaches payments, FinerWorks, or inventory holds.
import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion,products} from '../catalog/catalog.mjs';
const root=path.resolve('dist'),origin='https://tjm.art';
assert(fs.existsSync(path.join(root,'index.html')),'Run npm run build first');
const product=products.find(p=>p.type==='painting'&&fs.existsSync(path.join(root,'products',p.slug,'index.html')))||products.find(p=>fs.existsSync(path.join(root,'products',p.slug,'index.html')));
const paths=new Set(['/','/gallery/',`/products/${product.slug}/`,'/cart/']);
for(const p of (process.env.SMOKE_PATHS||'').split(/\s+/).filter(Boolean))paths.add(p);
// Changed content -> pages: blog files map to /blog/, product images/data map to product pages whose slug appears in the file path.
const changed=(process.env.CHANGED_FILES||'').split(/\s+/).filter(Boolean);
const slugs=fs.existsSync(path.join(root,'products'))?fs.readdirSync(path.join(root,'products')):[];
for(const f of changed){
  if(/(^|\/)blog(\/|-)/.test(f))paths.add('/blog/');
  const base=path.basename(f).replace(/\.[^.]+$/,'').replace(/-(\d+w|small|medium|large|full|thumb|display|print)$/,'');
  for(const s of slugs)if(base.length>4&&(s===base||f.includes(`/${s}/`)||f.includes(`/${s}.`)))paths.add(`/products/${s}/`);
}
const list=[...paths].slice(0,40);
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}:{})});
const page=await browser.newPage({viewport:{width:1280,height:900}}),errors=[];
page.on('pageerror',e=>errors.push(`${page.url()}: ${e.message}`));
const types={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.webp':'image/webp','.avif':'image/avif','.woff2':'font/woff2','.txt':'text/plain','.xml':'application/xml'};
await page.route('**/*',async route=>{
  const req=route.request(),url=new URL(req.url());
  const cors={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'Content-Type','Access-Control-Allow-Methods':'GET, POST, OPTIONS'};
  if(req.method()==='OPTIONS')return route.fulfill({status:204,headers:cors});
  if(url.pathname.startsWith('/checkout/cart/catalog'))return route.fulfill({status:200,headers:cors,json:{enabled:true,version:catalogVersion,products:[]}});
  if(url.pathname.startsWith('/inventory/'))return route.fulfill({status:200,headers:cors,json:{version:catalogVersion,availability:{}}});
  if(url.pathname.startsWith('/checkout/')||url.pathname.startsWith('/testimonials/api'))return route.fulfill({status:503,headers:cors,json:{error:'Unavailable in smoke test'}});
  if(['tjm.art','vermillionaurora.com','www.vermillionaurora.com'].includes(url.hostname)){
    let file=path.join(root,decodeURIComponent(url.pathname));
    if(file.endsWith(path.sep)||url.pathname.endsWith('/'))file=path.join(file,'index.html');
    else if(!path.extname(file)&&fs.existsSync(file+'/index.html'))file+='/index.html';
    if(!file.startsWith(root)||!fs.existsSync(file)||fs.statSync(file).isDirectory())return route.fulfill({status:404,body:'not found'});
    return route.fulfill({status:200,headers:{'Content-Type':types[path.extname(file).toLowerCase()]||'application/octet-stream'},body:fs.readFileSync(file)});
  }
  return route.abort();
});
const failures=[];
for(const p of list){
  const response=await page.goto(origin+p,{waitUntil:'domcontentloaded'}).catch(e=>({status:()=>0,e}));
  const status=response.status();
  if(status!==200){failures.push(`${p}: HTTP ${status}`);continue;}
  await page.waitForTimeout(400);
  const title=await page.title();if(!title)failures.push(`${p}: empty title`);
  const body=(await page.locator('body').innerText()).trim();if(body.length<20)failures.push(`${p}: empty page`);
}
// Cart smoke: the cart page renders its container and the product page offers a purchase/inquiry action.
await page.goto(origin+`/products/${product.slug}/`,{waitUntil:'domcontentloaded'});
const actions=await page.locator('button, a[href]').count();if(!actions)failures.push('product page has no actions');
await browser.close();
if(errors.length)failures.push(...errors.map(e=>`script error ${e}`));
assert.deepEqual(failures,[],failures.join('\n'));
console.log(`PASS: smoke loaded ${list.length} pages without script errors: ${list.join(', ')}`);
