import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
const origin='https://vermillionaurora.com',root=path.resolve('dist');
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox']});
try{
  const page=await browser.newPage(),errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',async route=>{
    const u=new URL(route.request().url());
    if(u.hostname!==new URL(origin).hostname)return route.fulfill({json:{products:[],availability:{}}});
    const file=path.join(root,decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');
    if(!fs.existsSync(file))return route.fulfill({status:404});
    return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream'});
  });
  for(const width of [1400,390]){
    await page.setViewportSize({width,height:1000});
    for(const slug of ['painting-portrait-in-green','painting-portrait-in-gold']){
      await page.goto(origin+'/products/'+slug+'/');
      assert.equal(await page.getByRole('button',{name:'Buy a print',exact:true}).count(),0,slug);
      assert.match(await page.locator('.product-print-availability').textContent(),/not yet available/);
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    }
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: framed portrait prints stay off sale until the 1 inch sheet is quoted.');
}finally{await browser.close();}
