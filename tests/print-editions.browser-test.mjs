import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import prints,{printVersion} from '../cloudflare/print-catalog.mjs';
import {publicCartItem} from '../cloudflare/cart-policy.mjs';
const origin='https://vermillionaurora.com',root=path.resolve('dist');
const editions=Object.values(prints).filter(p=>p.sizeBasis==='image-proportional');
const ids=[...new Set(editions.map(p=>p.productId))];assert.equal(ids.length,39);assert.equal(editions.filter(p=>!p.frame).length,115);assert.equal(editions.filter(p=>p.frame).length,345);
const available=editions.map(p=>({...publicCartItem({...p,quantity:1}),status:'available',methods:['paypal','bitcoin']}));
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE}:{}),args:['--no-sandbox']});
try {
  const page=await browser.newPage(),errors=[];let stale=false;
  await page.addInitScript(()=>{
    if(!location.pathname.startsWith('/products/'))return;
    for(const key of ['va-cart-v1','va-cart-order-v1','va-cart-reservation-v1'])localStorage.removeItem(key);
  });
  page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/*',async route=>{
    const u=new URL(route.request().url());
    if(u.pathname.startsWith('/checkout/cart/')){
      const action=u.pathname.split('/').at(-1);
      assert(['catalog','hold'].includes(action),'Browsing and adding prints must not create payments or orders');
      if(action==='hold'){
        assert.equal(route.request().method(),'POST');
        const {items}=route.request().postDataJSON();
        assert(items.every(item=>available.some(p=>p.id===item.id)&&item.quantity===1));
        return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{status:'held',heldIds:[],expiresAt:new Date(Date.now()+900000).toISOString()}});
      }
      return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{enabled:true,version:'edition-test-'+(stale?'old':printVersion),products:available}});
    }
    if(u.hostname!==new URL(origin).hostname)return route.fulfill({json:{products:[],availability:{}}});
    const file=path.join(root,decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');
    if(!fs.existsSync(file))return route.fulfill({status:404});
    return route.fulfill({body:fs.readFileSync(file),contentType:({'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg'})[path.extname(file)]||'application/octet-stream'});
  });
  await page.goto(origin+'/exhibitions/paul-murphy/');
  assert.match(await page.locator('.section-heading').textContent(),/prints are available for every painting/);
  for(const id of ids)assert(await page.locator(`a[href="/products/${id}/"]`).count(),`Gallery link: ${id}`);
  for(const width of [1280,390]){
    await page.setViewportSize({width,height:900});
    for(const id of ids){
      await page.goto(origin+'/products/'+id+'/');
      const dialog=page.locator('[data-print-dialog]'),trigger=page.getByRole('button',{name:'Buy a print',exact:true});
      assert(await dialog.isHidden());await trigger.click();
      assert.match(await dialog.textContent(),/without cropping or stretching/);assert.doesNotMatch(await dialog.textContent(),/% of the original/);
      assert.equal(await page.locator('[data-print-finish] option').count(),4);
      const variants=editions.filter(p=>p.productId===id&&!p.frame);assert.equal(await page.locator('.print-choice').count(),variants.length);
      for(const variant of variants){
        await page.locator(`input[value="${variant.id}"]`).check();
        await page.waitForFunction(()=>!document.querySelector('[data-print-add]').disabled);
        assert.equal(await page.locator('[data-print-total]').textContent(),`Print: $${Number(variant.amount).toFixed(2)}`);
        assert.equal(await page.locator('[data-print-image-area]').evaluate(el=>el.style.width),'100%','The asset already includes its paper margin');
      }
      assert(await dialog.evaluate(el=>el.scrollWidth<=el.clientWidth+1));
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
      if(id.endsWith('-55')){
        assert.equal(variants.length,1);assert.match(await page.locator('[data-print-dimensions]').textContent(),/Paper: 4.76 × 4.52/);
        await page.waitForFunction(()=>{const image=document.querySelector('[data-print-image-area] img');return image.complete&&image.naturalWidth>0;});
        await dialog.screenshot({path:`/tmp/paul-55-${width}.png`});
      }
      await page.keyboard.press('Escape');assert(await dialog.isHidden());assert(await trigger.evaluate(el=>el===document.activeElement));
      await trigger.click();
      const frameKey=['black','white','natural'][ids.indexOf(id)%3],framed=editions.find(p=>p.id===`${variants.at(-1).id}-frame-${frameKey}`);
      await page.locator('[data-print-finish]').selectOption(`frame-${frameKey}`);
      assert.equal(await page.locator('[data-print-total]').textContent(),`Framed print: $${Number(framed.amount).toFixed(2)}`);
      assert(await page.locator('[data-print-add]').isEnabled());
      await Promise.all([page.waitForURL(origin+'/cart/'),page.locator('[data-print-add]').click()]);
      await page.locator('.cart-line').waitFor();
      const saved=await page.evaluate(()=>JSON.parse(localStorage.getItem('va-cart-v1')));assert.deepEqual(saved,[{id:framed.id,quantity:1}]);
      assert.match(await page.locator('.cart-frame-description').textContent(),new RegExp(framed.frame.name));
    }
  }
  stale=true;await page.goto(origin+'/products/paul-murphy-painting-55/#print-options');
  assert(await page.locator('[data-print-dialog]').isVisible());assert(await page.locator('[data-print-add]').isDisabled());
  assert.deepEqual(errors,[]);console.log('PASS: all 39 gallery links, 115 print sizes and 345 framed variants, desktop/mobile dialogs and framed cart selections; providers mocked.');
} finally {await browser.close();}
