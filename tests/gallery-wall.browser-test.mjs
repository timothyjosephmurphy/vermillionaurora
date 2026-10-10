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
    page.on('pageerror',e=>{const error={name:e.name,message:e.message,url:page.url(),stack:e.stack};errors.push(error);console.log('BROWSER ERROR',JSON.stringify(error));});
    await page.addInitScript(()=>addEventListener('pagereveal',event=>{
      if(event.viewTransition)window.wallIncomingTransition=event.viewTransition.ready.then(()=>event.viewTransition.finished).then(()=>true,error=>error.name+': '+error.message);
    }));
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
    const settled=()=>page.waitForFunction(()=>document.querySelector('[data-gallery-wall]').dataset.animating!=='true');
    const fitWall=async()=>{await page.locator('[data-wall-fit]').click();await settled();};
    const focus=async art=>{await fitWall();await picker.selectOption(art.id);await settled();await page.waitForFunction(id=>document.querySelector('[data-gallery-wall]').dataset.focusedArt===id,art.id);};
    const assertWholeFrame=async art=>{
      const r=await page.locator(`[data-wall-art="${art.id}"]`).boundingBox(),v=page.viewportSize();
      assert(r.x>=15&&r.y>=15&&r.x+r.width<=v.width-15&&r.y+r.height<=v.height-64+1,'Maximum zoom must show the entire frame');
      const rect=await page.locator('[data-wall-viewport]').boundingBox();assert.equal(rect.x,0);assert.equal(rect.y,0);assert.equal(rect.width,v.width);assert.equal(rect.height,v.height);
      assert.equal(await page.locator('.site-header').evaluate(el=>getComputedStyle(el).visibility),'hidden');
    };
    const assertClearPanel=async()=>{
      const check=await panel.evaluate(el=>{
        const p=el.getBoundingClientRect();
        if(el.getAttribute('aria-hidden')==='true')return {clear:true,width:p.width,height:p.height};
        const clear=[...document.querySelectorAll('[data-wall-art]')].every(a=>{const r=a.getBoundingClientRect();return p.right<=r.left||p.left>=r.right||p.bottom<=r.top||p.top>=r.bottom;});
        const tools=document.querySelector('.wall-tools').getBoundingClientRect();
        return {clear:clear&&p.bottom<=tools.top,width:p.width,height:p.height};
      });
      assert(check.clear,'Product pane never covers any painting or the zoom controls');
      assert.equal(check.width,236);assert.equal(check.height,220);
    };
    await open();
    assert.equal(await page.locator('[data-wall-art]').count(),24);assert.equal(await panel.getAttribute('aria-hidden'),'true');
    await page.waitForFunction(()=>[...document.querySelectorAll('[data-art-image]')].every(i=>i.complete&&i.naturalWidth>0));
    assert.equal(masters.length,0,'The overview must not download original masters');
    const rects=await page.locator('[data-wall-art]').evaluateAll(elements=>elements.map(el=>{const r=el.getBoundingClientRect(),img=el.querySelector('img');return {x:r.x,y:r.y,width:r.width,height:r.height,fit:getComputedStyle(img).objectFit,overflow:getComputedStyle(el).overflow};}));
    for(const r of rects){assert.equal(r.fit,'contain');assert.notEqual(r.overflow,'hidden');}
    for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];assert(a.x+a.width<=b.x+.1||b.x+b.width<=a.x+.1||a.y+a.height<=b.y+.1||b.y+b.height<=a.y+.1);}
    await page.screenshot({path:`/tmp/gallery-wall-${engine.name()}-overview.png`,fullPage:true});
    const art=wallArtworks.find(a=>a.id==='meditation-at-denny-blaine');
    await focus(art);await assertWholeFrame(art);assert.equal(await page.locator('[data-wall-product]').getAttribute('href'),art.href);
    await page.waitForFunction(()=>!document.querySelector('[data-wall-buy]').disabled);
    assert.equal(await page.locator('[data-wall-price]').textContent(),`$${Number(art.price).toFixed(2)}`);
    await page.waitForFunction(()=>document.querySelector('[data-wall-panel]').getAttribute('aria-hidden')==='false');
    await page.waitForFunction(id=>Number(document.querySelector(`[data-art-image="${id}"]`).dataset.loadedWidth)>=960,art.id);
    await assertClearPanel();
    await page.screenshot({path:`/tmp/gallery-wall-${engine.name()}-detail.png`,fullPage:true});
    // Zooming toward a different visible painting must release the selected one.
    const other=await page.locator('[data-wall-viewport]').evaluate((viewport,id)=>{
      const v=viewport.getBoundingClientRect();
      return [...viewport.querySelectorAll('[data-wall-art]')].map(el=>{const r=el.getBoundingClientRect();return {id:el.dataset.wallArt,x:(Math.max(r.left,v.left+12)+Math.min(r.right,v.right-12))/2,y:(Math.max(r.top,v.top+12)+Math.min(r.bottom,v.bottom-110))/2,w:Math.min(r.right,v.right-12)-Math.max(r.left,v.left+12),h:Math.min(r.bottom,v.bottom-110)-Math.max(r.top,v.top+12),axis:Math.max(r.width,r.height)};}).find(a=>a.id!==id&&a.w>35&&a.h>35&&a.axis>Math.min(v.width,v.height)*.22);
    },art.id);
    assert(other,'The focused view includes a neighbor for the gesture regression');
    await page.mouse.move(other.x,other.y);await page.mouse.wheel(0,-20);
    await page.waitForFunction(id=>document.querySelector('[data-gallery-wall]').dataset.focusedArt===id,other.id);
    await assertClearPanel();
    await focus(art);
    // Repeated zoom-in input stops with the whole frame visible, at source quality.
    const viewport=page.locator('[data-wall-viewport]');await viewport.focus();
    for(let i=0;i<9;i++)await page.keyboard.press('+');
    await settled();await assertWholeFrame(art);
    await page.waitForFunction(id=>Number(document.querySelector(`[data-art-image="${id}"]`).dataset.loadedWidth)>1920,art.id);
    assert(masters.includes(art.fullSrc),'Maximum painting view requests the untouched original image');
    await assertClearPanel();await fitWall();
    assert.equal(await panel.getAttribute('aria-hidden'),'true');
    assert.equal(await page.locator('.site-header').evaluate(el=>getComputedStyle(el).visibility),'visible');
    // A drag over a painting pans without following its product link.
    await focus(art);const box=await page.locator(`[data-wall-art="${art.id}"]`).boundingBox();
    const canvas=await viewport.boundingBox(),dragX=Math.max(canvas.x+20,Math.min(box.x+30,canvas.x+canvas.width-340)),dragY=Math.max(canvas.y+20,Math.min(box.y+30,canvas.y+canvas.height-120));
    const beforePan=await page.locator('[data-wall-scene]').getAttribute('style');
    await page.mouse.move(dragX,dragY);await page.mouse.down();await page.mouse.move(dragX+45,dragY+30,{steps:4});await page.mouse.up();assert.equal(page.url(),origin+'/gallery/wall/');
    await page.waitForFunction(before=>document.querySelector('[data-wall-scene]').getAttribute('style')!==before,beforePan);
    assert.equal(await viewport.evaluate(el=>el.scrollLeft+el.scrollTop),0,'Pointer focus cannot silently scroll the viewport');
    await page.setViewportSize({width:390,height:844});await focus(art);await assertWholeFrame(art);
    await assertClearPanel();
    assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1));
    await page.screenshot({path:`/tmp/gallery-wall-${engine.name()}-mobile.png`,fullPage:true});
    // Use real touch input for pinch on Chromium. WebKit exercises the same pointer handler through desktop interaction above.
    if(engine===chromium){
      await fitWall();await viewport.scrollIntoViewIfNeeded();const r=await viewport.boundingBox(),cdp=await context.newCDPSession(page);
      const x=r.x+r.width/2,y=r.y+r.height*.35;
      await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:x-35,y},{id:2,x:x+35,y}]});
      await cdp.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{id:1,x:x-100,y},{id:2,x:x+100,y}]});
      await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
      await page.waitForFunction(()=>parseInt(document.querySelector('[data-wall-zoom]').textContent)>180);await settled();
      assert.equal(page.url(),origin+'/gallery/wall/');
    }
    await page.setViewportSize({width:1280,height:1000});await focus(art);
    await page.waitForFunction(()=>document.querySelector('[data-wall-panel]').getAttribute('aria-hidden')==='false');
    await Promise.all([page.waitForURL(origin+'/cart/'),page.locator('[data-wall-buy]').click()]);
    assert.deepEqual(await page.evaluate(()=>JSON.parse(localStorage.getItem('va-cart-v1'))),[{id:art.printId,quantity:1}]);
    await page.evaluate(()=>localStorage.clear());stale=true;await open();await focus(art);
    assert(await page.locator('[data-wall-buy]').isDisabled(),'Stale print catalog cannot be purchased');
    await fitWall();
    // Ordinary painting clicks animate before navigating. Modified clicks remain real links.
    await page.evaluate(id=>{
      const art=document.querySelector(`[data-wall-art="${id}"]`);let samples=[];
      const sample=()=>{samples.push(art.getBoundingClientRect().width);requestAnimationFrame(sample);};requestAnimationFrame(sample);
      addEventListener('pagehide',()=>{const r=art.getBoundingClientRect();sessionStorage.setItem('wall-transition-check',JSON.stringify({samples,rect:{x:r.x,y:r.y,width:r.width,height:r.height},name:art.querySelector('img').style.viewTransitionName}));},{once:true});
    },art.id);
    const started=Date.now();
    await Promise.all([page.waitForURL(origin+art.href),page.locator(`[data-wall-art="${art.id}"]`).click()]);
    assert(Date.now()-started>=500,'Navigation waits for the smooth zoom');
    const handoff=await page.evaluate(()=>JSON.parse(sessionStorage.getItem('wall-transition-check')));
    assert(new Set(handoff.samples.map(n=>Math.round(n))).size>5,'The camera renders intermediate zoom positions');
    assert(handoff.rect.x>=23&&handoff.rect.y>=23&&handoff.rect.x+handoff.rect.width<=1257&&handoff.rect.y+handoff.rect.height<=913);
    assert.equal(handoff.name,'wall-painting');
    assert.equal(await page.locator('.painting-image-trigger>img').evaluate(el=>getComputedStyle(el).viewTransitionName),'wall-painting');
    const transition=await page.evaluate(()=>window.wallIncomingTransition);
    if(engine===chromium)assert.equal(transition,true,'The native image transition completes on the product page');
    else assert(transition===undefined||transition===true,'Supported cross-page image transitions complete');
    await page.emulateMedia({reducedMotion:'reduce'});await open();
    await Promise.all([page.waitForURL(origin+art.href),page.locator(`[data-wall-art="${art.id}"]`).click()]);
    assert.deepEqual(errors,[]);console.log(`PASS: ${engine.name()} print wall: layout, source detail, full-screen fit, smooth product transition, touch, panel, cart selection, and stale-catalog guard.`);
  }finally{await browser.close();}
}
