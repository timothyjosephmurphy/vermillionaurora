import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';

const origin='https://vermillionaurora.com',root=path.resolve('dist');
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
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
  await page.goto(origin+'/products/painting-portrait-in-green/');
  const frames=page.locator('[data-frame-recommendations]').first();
  assert.equal(await frames.locator('.frame-link').count(),2);
  assert.match(await frames.locator('.frame-link').first().getAttribute('href'),/\/dp\/B0FJLR7MTQ$/);
  assert.match(await frames.textContent(),/purchased separately/);
  assert.equal(await frames.locator('.frame-affiliate').count(),0);
  await frames.screenshot({path:'/tmp/frames-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await frames.locator('.frame-link').first().focus();
  assert(await frames.locator('.frame-link').first().evaluate(el=>el===document.activeElement));
  await frames.screenshot({path:'/tmp/frames-mobile.png'});
  await page.goto(origin+'/products/painting-portrait-with-hat/');
  assert.equal(await page.locator('[data-frame-recommendations] a').count(),0);
  assert.match(await page.locator('[data-frame-empty]').textContent(),/custom frame/);
  await page.goto(origin+'/products/painting-guitarist/');
  assert.equal(await page.locator('[data-frame-recommendations]').count(),0);

  const preview='/print-preview/painting-portrait-in-green/';
  if(fs.existsSync(path.join(root,preview,'index.html'))){
    await page.goto(origin+preview);
    const recommendations=page.locator('[data-frame-recommendations]');
    await page.waitForFunction(()=>document.querySelector('[data-frame-recommendations]').dataset.frameInitialized==='true');
    // FinerWorks uses the exact 15-by-12-inch sheet, not the old 16-by-12 Prodigi sheet.
    assert.match(await recommendations.locator('.frame-link').first().getAttribute('href'),/B0FJLR7MTQ$/);
    await page.locator('input[value$="-small"]').check();
    assert.match(await recommendations.locator('.frame-link').first().getAttribute('href'),/B0B1CNJL7N$/);
    // Verify selection-change handling with exact-size borderless sheets.
    await page.evaluate(()=>{
      const selector=document.querySelector('[data-print-options]');
      const options=JSON.parse(selector.dataset.options).map(o=>({...o,paper:{...o.image}}));
      selector.dataset.options=JSON.stringify(options);
      selector.dispatchEvent(new Event('print:selectionchange'));
    });
    assert.match(await recommendations.locator('.frame-fit').first().textContent(),/custom mat/);
    await page.locator('input[value$="-medium"]').check();
    assert.match(await recommendations.locator('.frame-link').first().getAttribute('href'),/B0BQR2BQYZ$/);
    assert.match(await recommendations.locator('[data-frame-size]').textContent(),/11.25 × 9/);
    await page.locator('input[value$="-full"]').check();
    assert.match(await recommendations.locator('.frame-link').first().getAttribute('href'),/B0FJLR7MTQ$/);
    await page.evaluate(()=>{
      const selector=document.querySelector('[data-print-options]');
      selector.dataset.options=JSON.stringify(JSON.parse(selector.dataset.options).map(o=>({...o,paper:null})));
      selector.dispatchEvent(new Event('print:selectionchange'));
    });
    assert.equal(await recommendations.locator('.frame-link').count(),0);
    assert.match(await recommendations.locator('[data-frame-empty]').textContent(),/paper size is confirmed/);
    assert(await page.locator('[data-print-add]').isDisabled());
  }
  assert.deepEqual(errors,[]);
  console.log('PASS: original frame links, no-fit and unavailable artwork, mobile layout, keyboard access, and print-size changes when available. No checkout or order was submitted.');
}finally{await browser.close();}
