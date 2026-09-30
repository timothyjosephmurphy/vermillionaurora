import {chromium} from 'playwright';
import {load} from 'cheerio';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const root=path.resolve('dist'),origin='https://vermillionaurora.com';
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']});
try{
 const page=await browser.newPage(),errors=[];let simulatedSale=false;
 page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/*',route=>{
  const url=new URL(route.request().url());
  if(url.hostname!==new URL(origin).hostname)return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{products:[],availability:{}}});
  const file=path.join(root,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
  if(!fs.existsSync(file))return route.fulfill({status:404});
  let body=fs.readFileSync(file);
  if(simulatedSale&&url.pathname.endsWith('/payments/cart.js'))return route.fulfill({contentType:'application/javascript',body:`window.vaCartReady=Promise.resolve({products:[{id:'print-painting-portrait-in-green-small-mat-snow-white',status:'available'}]});document.addEventListener('cart:add-print',e=>{window.testMatSelection={id:e.detail.id,quantity:e.detail.quantity};e.detail.onResult({ok:true,message:'Added'});});`});
  if(simulatedSale&&url.pathname.startsWith('/print-preview/')&&url.pathname.endsWith('/')){
   const $=load(body.toString()),section=$('[data-print-options]'),options=JSON.parse(section.attr('data-options'));
   for(const o of options){o.ready=true;o.sampleOnly=false;for(const m of o.matOptions){m.ready=true;m.sampleOnly=false;m.amount='45.00';}}
   section.attr('data-preview','false').attr('data-options',JSON.stringify(options));body=$.html();
  }
  return route.fulfill({body,contentType:({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream'});
 });
 for(const width of [1400,390]){
  await page.setViewportSize({width,height:900});await page.goto(origin+'/print-preview/painting-portrait-in-green/');
  const finish=page.locator('[data-print-finish]'),frames=page.locator('[data-frame-recommendations]');
  await finish.selectOption('snow-white');
  assert.match(await page.locator('[data-print-dimensions]').textContent(),/Mat \/ frame size: 20 × 16/);
  assert.equal(await frames.locator('.frame-link').count(),1);assert.match(await frames.locator('.frame-link').getAttribute('href'),/B0BQQY92LH/);
  await page.locator('input[value$="-small"]').check();
  assert.match(await page.locator('[data-print-dimensions]').textContent(),/Image: 6 × 7.5.*Mat \/ frame size: 8 × 10/);
  assert.match(await frames.locator('.frame-link').getAttribute('href'),/B0B1CNJL7N/);
  assert.match(await frames.locator('.frame-fit').textContent(),/Fits the selected mat/);
  assert(await page.locator('[data-print-add]').isDisabled());
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await page.locator('[data-print-options]').screenshot({path:`/tmp/matting-${width}.png`});
  await finish.selectOption('none');
  assert(!(await page.locator('[data-print-dimensions]').textContent()).includes('Mat / frame size'));
  assert.match(await page.locator('[data-print-total]').textContent(),/Print: \$25.00/);
 }
 simulatedSale=true;await page.goto(origin+'/print-preview/painting-portrait-in-green/');
 await page.locator('input[value$="-small"]').check();await page.locator('[data-print-finish]').selectOption('snow-white');
 await page.locator('[data-print-quantity]').fill('2');await page.locator('[data-print-add]').click();
 assert.deepEqual(await page.evaluate(()=>window.testMatSelection),{id:'print-painting-portrait-in-green-small-mat-snow-white',quantity:2});
 assert.deepEqual(errors,[]);
 console.log('PASS: mat selector, sizes, frame links, mobile layout, sale gates and separate mat cart identity; providers mocked.');
}finally{await browser.close();}
