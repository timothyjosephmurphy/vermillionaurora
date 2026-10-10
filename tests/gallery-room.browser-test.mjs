import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {wallArtworks} from '../src/data/gallery-wall.mjs';
import {ROOM} from '../src/scripts/gallery-room-layout.mjs';
const origin='https://tjm.art',root=path.resolve('dist');
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const mime={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.webp':'image/webp','.png':'image/png','.svg':'image/svg+xml','.ico':'image/x-icon'};
async function context(options={}){
  const ctx=await browser.newContext(options);
  await ctx.route('**/*',async route=>{
    const u=new URL(route.request().url());if(u.hostname!=='tjm.art')return route.fulfill({json:{products:[],availability:{}}});
    const file=path.join(root,decodeURIComponent(u.pathname),u.pathname.endsWith('/')?'index.html':'');
    if(!fs.existsSync(file))return route.fulfill({status:404});
    return route.fulfill({body:fs.readFileSync(file),contentType:mime[path.extname(file)]||'application/octet-stream'});
  });return ctx;
}
try{
  for(const mobile of [false,true]){
    const ctx=await context({viewport:mobile?{width:390,height:844}:{width:1440,height:960},hasTouch:mobile,isMobile:mobile,deviceScaleFactor:mobile?2:1});
    const page=await ctx.newPage(),errors=[];
    page.on('pageerror',e=>{errors.push(e.message);console.log('ROOM PAGE ERROR',e.message);});page.on('console',m=>{if(m.type()==='error'&&m.text().includes('Gallery room'))console.log(m.text());});
    page.on('request',r=>{if(r.url().includes('/checkout/'))throw Error('The room must not initiate checkout');});
    await page.goto(origin+'/gallery/room/');
    await page.waitForFunction(()=>document.querySelector('[data-gallery-room]').dataset.ready==='true',{},{timeout:60000});
    await page.waitForFunction(()=>document.querySelector('[data-gallery-room]').dataset.loadedImages==='24');
    assert.equal(await page.locator('[data-gallery-room]').getAttribute('data-paintings'),'24');
    assert.equal(await page.locator('[data-gallery-room]').getAttribute('data-walls'),'4');
    assert.equal(await page.locator('[data-room-picker] option').count(),25);
    const label=mobile?'mobile':'desktop';
    await page.screenshot({path:`/tmp/gallery-room-${label}-welcome.png`});
    await page.locator('[data-room-enter]').click();
    await page.waitForFunction(()=>document.querySelector('[data-gallery-room]').dataset.playing==='true');
    const position=()=>page.locator('[data-gallery-room]').getAttribute('data-position').then(JSON.parse);
    const start=await position();
    const moved=()=>page.waitForFunction(start=>{const p=JSON.parse(document.querySelector('[data-gallery-room]').dataset.position);return Math.hypot(p.x-start.x,p.z-start.z)>.15;},start,{timeout:15000}).catch(async error=>{console.log('WALK DIAGNOSTIC',JSON.stringify({start,after:await position(),state:await page.locator('[data-gallery-room]').evaluate(el=>({...el.dataset,active:document.activeElement?.tagName,locked:!!document.pointerLockElement})),errors}));await page.screenshot({path:`/tmp/gallery-room-${label}-walk-failure.png`});throw error;});
    if(mobile){
      const b=await page.locator('[data-room-move="forward"]').boundingBox(),cdp=await ctx.newCDPSession(page);await cdp.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{id:1,x:b.x+b.width/2,y:b.y+b.height/2}]});await moved();await cdp.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    }else{await page.keyboard.down('w');await moved();await page.keyboard.up('w');}
    const after=await position();assert(Math.hypot(after.x-start.x,after.z-start.z)>.1,'Keyboard / touch walking changes the visitor position');
    assert(Math.abs(after.y-ROOM.eyeHeight)<.12,'The visitor stays at walking height');
    await page.screenshot({path:`/tmp/gallery-room-${label}-walking.png`});
    await page.keyboard.press('Escape');await page.waitForFunction(()=>document.querySelector('[data-gallery-room]').dataset.playing==='false');
    const art=wallArtworks.find(a=>a.id==='meditation-at-denny-blaine');
    await page.locator('[data-room-picker]').selectOption(art.id);
    await page.waitForFunction(id=>document.querySelector('[data-gallery-room]').dataset.focusedArt===id,art.id);
    assert.equal(await page.locator('[data-room-product]').getAttribute('href'),origin+art.href);
    assert.equal(await page.locator('[data-room-art-title]').textContent(),art.title);
    await page.waitForTimeout(900);await page.screenshot({path:`/tmp/gallery-room-${label}-painting.png`});
    if(mobile){await Promise.all([page.waitForURL(origin+art.href),page.locator('[data-room-product]').click()]);}
    else{await Promise.all([page.waitForURL(origin+art.href),page.keyboard.press('e')]);}
    await page.goBack();await page.waitForFunction(()=>document.querySelector('[data-gallery-room]').dataset.ready==='true');
    assert(await page.locator('[data-room-welcome]').isVisible(),'Returning from a product page restores a paused gallery');
    assert.deepEqual(errors,[]);await ctx.close();console.log(`PASS: ${label} Babylon gallery renders 24 framed paintings, walking controls, correct picking, product navigation and return.`);
  }
  const ctx=await context({viewport:{width:1280,height:900}}),page=await ctx.newPage();
  await page.goto(origin+'/gallery/room/');await page.waitForFunction(()=>document.querySelector('[data-gallery-room]').dataset.ready==='true',{},{timeout:60000});
  await page.locator('[data-room-enter]').click();await page.keyboard.down('w');await page.waitForTimeout(6500);await page.keyboard.up('w');
  const edge=JSON.parse(await page.locator('[data-gallery-room]').getAttribute('data-position'));
  assert(Math.abs(edge.x)<=ROOM.size/2-.2&&Math.abs(edge.z)<=ROOM.size/2-.2,'Room collision prevents walking through the walls');
  assert(Math.max(Math.abs(edge.x),Math.abs(edge.z))>ROOM.size/2-.5,'The collision check actually reaches a wall');
  await page.keyboard.press('Escape');const art=wallArtworks[0];await page.locator('[data-room-picker]').selectOption(art.id);
  await page.waitForFunction(id=>document.querySelector('[data-gallery-room]').dataset.focusedArt===id,art.id);
  await page.keyboard.down('w');await page.waitForURL(origin+art.href,{timeout:15000});await page.keyboard.up('w');
  assert.equal(page.url(),origin+art.href,'Walking up to the painting opens its exact product page');await ctx.close();
  const fallback=await context();await fallback.addInitScript(()=>{const original=HTMLCanvasElement.prototype.getContext;HTMLCanvasElement.prototype.getContext=function(type,...args){return /webgl/i.test(type)?null:original.call(this,type,...args);};});
  const fallbackPage=await fallback.newPage();await fallbackPage.goto(origin+'/gallery/room/');await fallbackPage.locator('[data-room-error]').waitFor({state:'visible'});
  assert.equal(await fallbackPage.locator('[data-room-index] li a').count(),24);await fallback.close();
  console.log('PASS: square room wall collisions, contact-to-product interaction, and WebGL-unavailable fallback.');
}finally{await browser.close();}
