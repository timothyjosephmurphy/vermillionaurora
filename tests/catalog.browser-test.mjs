import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {catalogVersion} from '../catalog/catalog.mjs';
const root=path.resolve('dist'),origin='https://vermillionaurora.com';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}: {})});
try {
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const errors=[],missing=[];let status='sold';page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',async route=>{
  const url=new URL(route.request().url());
  if(url.pathname==='/inventory/status'){const ids=url.searchParams.get('ids').split(',');return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{version:catalogVersion,availability:Object.fromEntries(ids.map(id=>[id,['painting-portrait-in-green','paul-murphy-painting-1'].includes(id)?status:'available']))}});}
  if(url.hostname!==new URL(origin).hostname)return route.abort();
  const file=path.join(root,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
  if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml'})[path.extname(file)]||'application/octet-stream'});
  missing.push(url.pathname);return route.fulfill({status:404});
 });
 const routes=['/','/gallery/','/exhibitions/paul-murphy/','/exhibitions/chase-toole/','/exhibitions/gavin-robertson/','/products/painting-portrait-in-green/','/products/paul-murphy-painting-1/','/products/coined-in-watercolor-film-poster/','/products/single-portrait/','/products/watercolor-portraits/'];
 fs.mkdirSync('/tmp/catalog-preview',{recursive:true});
 for(const width of [1440,390]){
  await page.setViewportSize({width,height:900});
  for(const route of routes){console.log('Preview',width,route);await page.goto(origin+route);await page.locator('main').first().waitFor();assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),`${width} overflow ${route}`);}
 }
 await page.goto(origin+'/');await page.waitForFunction(()=>document.querySelector('[data-product-id="painting-portrait-in-green"] [data-card-price]').textContent==='Sold');
 assert.equal(await page.locator('.painting-carousel .product-card').filter({hasText:'Available'}).count(),0);
 await page.goto(origin+'/exhibitions/paul-murphy/');await page.waitForFunction(()=>[...document.querySelectorAll('.ev-caption')].some(el=>el.textContent==='Tipi · Sold'));
 await page.goto(origin+'/gallery/');const card=page.locator('[data-product-id="painting-portrait-in-green"]');await page.waitForFunction(()=>document.querySelector('[data-product-id="painting-portrait-in-green"]').dataset.availability==='Sold');await page.locator('#available-only').check();assert(await card.isHidden());
 await page.goto(origin+'/products/painting-portrait-in-green/');await page.getByText('Sold',{exact:true}).waitFor();await page.screenshot({path:'/tmp/catalog-preview/product-mobile.png',fullPage:true});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'/tmp/catalog-preview/product-desktop.png',fullPage:true});
 await page.goto(origin+'/exhibitions/gavin-robertson/');assert(await page.getByRole('heading',{name:'From the Nantucket to Cape Town'}).isVisible());assert.equal(await page.locator('iframe').getAttribute('src'),'https://www.youtube-nocookie.com/embed/i7tvzE_bqM8?playsinline=1');
 assert.deepEqual(errors,[]);assert.deepEqual([...new Set(missing)],[]);
 console.log('PASS: 10 routes on desktop/mobile; live homepage, gallery filter and artist captions; preserved film/story; no local asset errors.');
}finally{await browser.close();}
