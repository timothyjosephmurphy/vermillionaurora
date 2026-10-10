import {chromium,webkit} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import prints,{printVersion} from '../cloudflare/print-catalog.mjs';
import {publicCartItem} from '../cloudflare/cart-policy.mjs';
import {wallArtworks} from '../src/data/gallery-wall.mjs';
const origin='https://tjm.art',root=path.resolve('dist');
const available=Object.values(prints).map(p=>({...publicCartItem({...p,quantity:1}),status:'available',methods:['bitcoin']}));
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml'};
for(const engine of [chromium,webkit]){
  const browser=await engine.launch({headless:true,...(engine===chromium?{args:['--no-sandbox']}: {})});
  try{
    const context=await browser.newContext({viewport:{width:1280,height:1000},hasTouch:true});
    const page=await context.newPage(),errors=[],masters=[];let stale=false;
    page.on('pageerror',e=>errors.push(e.message));
    await page.route('**/*',async route=>{
      const u=new URL(route.request().url());
      if(u.pathname.startsWith('/checkout/cart/')){
        const action=u.pathname.split('/').at(-1);
        assert(['catalog','hold'].includes(action),'Viewer never initiates payments or orders');
        if(action==='hold'){
          assert.equal(route.request().method(),'POST');
          assert(route.request().postDataJSON().items.every(item=>wallArtworks.some(a=>a.printId===item.id)&&item.quantity===1));
          return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{status:'held',heldIds:[],expiresAt:new Date(Date.now()+900000).toISOString()}});
        }
        return route.fulfill({headers:{'Access-Control-Allow-Origin':origin},json:{enabled:true,version:'wall-test-'+(stale?'old':printVersion),products:available}});
      }
      if(u.hostname!=='tjm.art')return route.fulfill({json:{products:[],availability:{}}});
      if(u.pathname.startsWith('/print-masters/'))masters.push(u.pathname);
      const file=path.join(root,decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');
      if(!fs.existsSync(file))return route.fulfill({status:404});
      return route.fulfill({body:fs.readFileSync(file),contentType:mime[path.extname(file)]||'application/octet-stream'});
    });
    const open=async()=>{await page.goto(origin+'/gallery/wall/');await page.locator('[data-gallery-wall][data-ready="true"]').waitFor();};
    const panel=page.locator('[data-wall-panel]'),picker=page.locator('[data-wall-picker]');
    const focus=async art=>{await picker.selectOption(art.id);await page.waitForFunction(title=>document.querySelector('[data-wall-title]').textContent===title&&document.querySelector('[data-wall-panel]').getAttribute('aria-hidden')==='false',art.title);};
    await open();
    assert.equal(await page.locator('[data-wall-art]').count(),24);assert.equal(await panel.getAttribute('aria-hidden'),'true');
    await page.waitForFunction(()=>[...document.querySelectorAll('[data-art-image]')].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(masters.length,0,'The overview must not download original masters');
    const rects=await page.locator('[data-wall-art]').evaluateAll(elements=>elements.map(el=>{const r=el.getBoundingClientRect(),img=el.querySelector('img');return {x:r.x,y:r.y,width:r.width,height:r.height,fit:getComputedStyle(img).objectFit,overflow:getComputedStyle(el).overflow};}));
    for(const r of rects){assert.equal(r.fit,'contain');assert.notEqual(r.overflow,'hidden');}
    for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];assert(a.x+a.width<=b.x+.1||b.x+b.width<=a.x+.1||a.y+a.height<=b.y+.1||b.y+b.height<=a.y+.1);}
    await page.screenshot({path:`/tmp/gallery-wall-${engine.name()}-overview.png`,fullPage:true});
    const art=wallArtworks.find(a=>a.id.includes('cormorant'))||wallArtworks[0];
    await focus(art);assert.equal(await page.locator('[data-wall-product]').getAttribute('href'),art.href);
    await page.waitForFunction(()=>!document.querySelector('[data-wall-buy]').disabled);
    assert.equal(await page.locator('[data-wall-price]').textContent,`$${Number(art.price).toFixed(2)}`);
    await page.screenshot({path:`/tmp/gallery-wall-${engine.name()}-detail.png`,fullPage:true});
    // Zoom to the source level, with the camera centered on this painting.
    const viewport=page.locator('[data-wall-viewport]');await viewport.focus();
    for(let i=0;i<9;i++)await page.keyboard.press('+');
    await page.waitForFunction(id=>Number(document.querySelector(`[data-art-image="${id}"]`).dataset.loadedWidth)>1920,art.id);
    assert(masters.includes(art.fullSrc),'Deep zoom requests the exact original image file');
    await page.locator('[data-wall-fit]').click();await page.waitForFunction(()=>document.querySelector('[data-wall-panel]').getAttribute('aria-hidden')==='true');
    // A drag over a painting pans without following its product link.
    await focus(art);const box=await page.locator(`[data-wall-art="${art.id}"]`).boundingBox();
    const canvas=await viewport.boundingBox(),dragX=Math.max(canvas.x+20,Math.min(box.x+30,canvas.x+canvas.width-340)),dragY=Math.max(canvas.y+20,Math.min(box.y+30,canvas.y+canvas.height-120));
    await page.mouse.move(dragX,dragY);await page.mouse.down();await page.mouse.move(dragX+45,dragY+30,{steps:4});await page.mouse.up();assert.equal(page.url(),origin+'/gallery/wall/');
    await page.setViewportSize({width:390,height:844});await page.locator('[data-wall-fit]').click();await focus(art);
    await page.waitForFunction(()=>{const p=document.querySelector('[data-wall-panel]').getBoundingClientRect(),t=document.querySelector('.wall-tools').getBoundingClientRect();return p.bottom<=t.top;});
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await page.screenshot({path:`/tmp/gallery-wall-${engine.name()}-mobile.png`,fullPage:true});
    // Use real touch input for pinch on Chromium. WebKit exercises the same pointer handler through desktop interaction above.
    if(engine===chromium){
      await page.locator('[data-wall-fit]').click();await viewport.scrollIntoViewIfNeeded();const r=await viewport.boundingBox(),cdp=await context.newCDPSession(page);
      const x=r.x+r.width/2,y=r.y+r.height*.35;
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:x-35,y},{id:2,x:x+35,y}]});
      await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:x-100,y},{id:2,x:x+100,y}]});
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await page.waitForFunction(()=>parseInt(document.querySelector('[data-wall-zoom]').textContent)>180);
      assert.equal(page.url(),origin+'/gallery/wall/');
    }
    await focus(art);
    await Promise.all([page.waitForURL(origin+'/cart/'),page.locator('[data-wall-buy]').click()]);
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('va-cart-v1'))),[{id:art.printId,quantity:1}]);
    await page.evaluate(()=>localStorage.clear());stale=true;await open();await focus(art);
    assert(await page.locator('[data-wall-buy]').isDisabled(),'Stale print catalog cannot be purchased');
    await Promise.all([page.waitForURL(origin+art.href),page.locator('[data-wall-product]').click()]);
    assert.deepEqual(errors,[]);console.log(`PASS: ${engine.name()} print wall: layout, source detail, zoom, touch, panel, product links, cart selection, and stale-catalog guard.`);
  }finally{await browser.close();}
}
