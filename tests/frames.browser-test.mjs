import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const origin='https://vermillionaurora.com',root=path.resolve('dist');
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox','--disable-dev-shm-usage']});
try{
  const page=await browser.newPage({viewport:{width:1400,height:1000}}),errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.route('**/*',route=>{
    const url=new URL(route.request().url());
    if(url.hostname!==new URL(origin).hostname)return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{products:[],availability:{}}});
    const file=path.join(root,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
    if(!fs.existsSync(file))return route.fulfill({status:404});
    return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream'});
  });
  // Amazon frame links are removed from every product page (studio-tracker #127).
  for(const slug of ['painting-portrait-in-green','painting-portrait-with-hat','el-zonte-at-sunrise','painting-guitarist']){
    await page.goto(origin+'/products/'+slug+'/');
    assert.equal(await page.locator('[data-original-frame], [data-frame-recommendations], [data-print-own-frame], a[href*="amazon."][href*="frame"]').count(),0,slug);
  }
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  assert.deepEqual(errors,[]);
  console.log('PASS: no Amazon frame links on product pages. No checkout or order was submitted.');
}finally{await browser.close();}
