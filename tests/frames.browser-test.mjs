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
  await page.goto(origin+'/products/painting-portrait-in-green/');
  const frames=page.locator('.product-frame-action'),frameLink=frames.locator('[data-original-frame]');
  assert.equal(await frameLink.count(),1);
  assert.equal(await frameLink.textContent(),'Find a matching frame on Amazon');
  assert.equal(new URL(await frameLink.getAttribute('href')).searchParams.get('k'),'12 x 15 inch picture frame');
  assert.equal(await page.locator('.product-inquiry a').count(),0);
  assert.equal(await page.locator('.product-inquiry').isVisible(),false);
  assert.equal(await page.locator('[data-frame-recommendations][data-frame-context="original"]').count(),0);
  await frames.screenshot({path:'/tmp/frames-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
  await frameLink.focus();
  assert(await frameLink.evaluate(el=>el===document.activeElement));
  await frames.screenshot({path:'/tmp/frames-mobile.png'});
  await page.goto(origin+'/products/painting-portrait-with-hat/');
  assert.equal(await page.locator('[data-original-frame]').count(),0);
  await page.goto(origin+'/products/el-zonte-at-sunrise/');
  assert.equal(new URL(await page.locator('[data-original-frame]').getAttribute('href')).searchParams.get('k'),'24 x 48 inch picture frame');
  await page.goto(origin+'/products/painting-guitarist/');
  assert.equal(await page.locator('[data-original-frame]').count(),0);

  const preview='/print-preview/painting-portrait-in-green/';
  if(fs.existsSync(path.join(root,preview,'index.html'))){
    await page.goto(origin+preview);
    const recommendations=page.locator('[data-frame-recommendations]');
    await page.waitForFunction(()=>document.querySelector('[data-frame-recommendations]').dataset.frameInitialized==='true');
    // Match the new print sheet, independently of the original painting size.
    assert.match(await recommendations.locator('.frame-link').first().getAttribute('href'),/B0BQR2BQYZ$/);
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
    assert.match(await recommendations.locator('.frame-link').first().getAttribute('href'),/B0B1CNJL7N$/);
    assert.match(await recommendations.locator('[data-frame-size]').textContent(),/6.9 × 8.3/);
    await page.locator('input[value$="-full"]').check();
    assert.match(await recommendations.locator('.frame-link').first().getAttribute('href'),/B0BQR2BQYZ$/);
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
