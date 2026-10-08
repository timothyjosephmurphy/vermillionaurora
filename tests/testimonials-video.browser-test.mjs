// End-to-end video testimonial flow in Chromium against the real Worker code (cloudflare/testimonials.mjs) backed by an
// in-memory R2 bucket: record/choose buttons, file checks, multipart upload with progress, the two optional video
// permissions, moderation playback (signed links + Range), approval, and the public inline player.
// SCREENSHOT_DIR=/some/dir saves desktop/mobile form, moderation and public screenshots.
import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {testimonialsApi} from '../cloudflare/testimonials.mjs';
import {Bucket} from './r2-memory-bucket.mjs';
const root=path.resolve('dist'),origin='https://tjm.art',shots=process.env.SCREENSHOT_DIR;
if(shots)fs.mkdirSync(shots,{recursive:true});
const env={COMMISSION_UPLOADS:new Bucket(),COMMISSION_MANAGER_TOKEN:'owner-token',GOOGLE_CLIENT_ID:'id',GOOGLE_CLIENT_SECRET:'s',GOOGLE_REFRESH_TOKEN:'r',
  CART_ORDERS:{getByName:()=>({codeIssue:async()=>{}})}};
const mails=[];
globalThis.fetch=async(url,init={})=>{const u=new URL(url);
  if(u.hostname==='oauth2.googleapis.com')return Response.json({access_token:'T'});
  if(u.hostname==='gmail.googleapis.com'){mails.push(init.body);return Response.json({id:'m'+mails.length});}
  return Response.json([]);};
const types={'.html':'text/html','.css':'text/css','.js':'application/javascript','.json':'application/json','.jpg':'image/jpeg','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp'};
const unstick=p=>shots&&p.addStyleTag({content:'.site-header{position:static!important}'}); // keep the sticky header out of element screenshots
async function serve(route){
  const req=route.request(),url=new URL(req.url());
  if(url.hostname!=='tjm.art')return route.abort();
  if(url.pathname.startsWith('/testimonials/api/')){
    const body=['GET','HEAD'].includes(req.method())?undefined:req.postDataBuffer();
    const r=await testimonialsApi(new Request(url,{method:req.method(),headers:{...req.headers(),'CF-Connecting-IP':'203.0.113.50'},body}),env,null,Date.now());
    return route.fulfill({status:r.status,headers:Object.fromEntries(r.headers),body:Buffer.from(await r.arrayBuffer())});
  }
  const file=path.join(root,decodeURIComponent(url.pathname),url.pathname.endsWith('/')?'index.html':'');
  if(fs.existsSync(file)&&fs.statSync(file).isFile())return route.fulfill({body:fs.readFileSync(file),contentType:types[path.extname(file)]||'application/octet-stream'});
  return route.fulfill({status:404});
}
// A real 3-second WebM made in the browser (canvas + MediaRecorder), padded past one 8 MiB part so the upload is multipart.
async function makeVideo(page){
  const b64=await page.evaluate(async()=>{
    const c=Object.assign(document.createElement('canvas'),{width:360,height:640});const g=c.getContext('2d');
    const rec=new MediaRecorder(c.captureStream(25),{mimeType:'video/webm'});const chunks=[];rec.ondataavailable=e=>chunks.push(e.data);
    let t=0;const draw=()=>{g.fillStyle=`hsl(${t*4%360} 60% 55%)`;g.fillRect(0,0,360,640);g.fillStyle='#fff';g.font='bold 44px sans-serif';g.fillText('Hi TJ!',100,320+Math.sin(t/8)*40);t++;};
    const timer=setInterval(draw,40);draw();rec.start();await new Promise(r=>setTimeout(r,3000));rec.stop();await new Promise(r=>rec.onstop=r);clearInterval(timer);
    const buf=new Uint8Array(await new Blob(chunks).arrayBuffer());let s='';for(let i=0;i<buf.length;i+=0x8000)s+=String.fromCharCode(...buf.subarray(i,i+0x8000));return btoa(s);
  });
  const video=Buffer.from(b64,'base64');
  return Buffer.concat([video,Buffer.alloc(9*1024*1024-video.length)]);
}
const browser=await chromium.launch({headless:true,...(process.env.CHROMIUM_EXECUTABLE?{executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-gpu','--disable-dev-shm-usage','--no-zygote']}:{})});
try{
  const errors=[];
  const desktop=await browser.newContext({viewport:{width:1280,height:900}});await desktop.route('**/*',serve);
  const page=await desktop.newPage();page.on('pageerror',e=>errors.push(e.message));
  await page.goto(origin+'/testimonials/#share');
  const invite=page.locator('.video-invite');await invite.waitFor();
  assert.match(await invite.textContent(),/Stand next to your painting, hold your phone at arm’s length/);
  assert.equal(await invite.locator('li').count(),3);
  assert(await page.locator('[data-video-record]').isHidden(),'no record button on desktop');
  assert(await page.locator('[data-video-consent]').isHidden(),'permissions only appear with a video');
  assert.equal(await page.locator('[data-video-input]').getAttribute('capture'),null,'library input never forces the camera');
  // Wrong type and oversize are refused in the browser with a clear message.
  await page.locator('[data-video-input]').setInputFiles({name:'notes.txt',mimeType:'text/plain',buffer:Buffer.from('hello')});
  assert.match(await page.locator('[data-form-status]').textContent(),/MP4, MOV or WebM/);
  const video=await makeVideo(page);
  await page.locator('[data-video-input]').setInputFiles({name:'my-painting.webm',mimeType:'video/webm',buffer:video});
  await page.locator('[data-video-consent]').waitFor();
  assert.match(await page.locator('[data-video-name]').textContent(),/my-painting\.webm/);
  assert.match(await page.locator('[data-video-size]').textContent(),/9\.0 MB/);
  assert.equal(await page.locator('textarea[name=quote]').evaluate(n=>n.required),false,'words are optional with a video');
  assert.match(await page.locator('[data-video-consent]').textContent(),/TJ can show my video on tjm\.art.*TJ can share my video on his social media\..*take it down anytime/s);
  assert.equal(await page.locator('[data-video-consent] input:checked').count(),0,'both permissions start unticked');
  await page.locator('input[name=name]').fill('Jane D.');await page.locator('input[name=email]').fill('jane@example.com');
  await page.locator('input[name=painting]').fill('Emergence');await page.locator('input[name=city]').fill('');
  await page.locator('input[name=consent]').check();await page.locator('input[name=videoSite]').check();
  await page.waitForTimeout(1200); // poster capture
  await unstick(page);
  if(shots)await page.locator('.share-form-wrap').screenshot({path:path.join(shots,'form-desktop.png')});
  const progress=[];page.on('console',m=>progress.push(m.text()));
  await page.locator('button[type=submit]').click();
  await page.locator('[data-thanks]').waitFor({timeout:30000});
  assert(await page.locator('[data-thanks-video]').isVisible());
  const records=[...env.COMMISSION_UPLOADS.data.keys()].filter(k=>k.startsWith('testimonials/records/'));
  assert.equal(records.length,1);
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get(records[0]).value);
  assert.equal(rec.quote,'');assert.equal(rec.video.type,'video/webm');assert.equal(rec.video.bytes,video.length);
  assert.deepEqual([rec.video.consent.site,rec.video.consent.social],[true,false]);
  assert.ok(rec.video.poster,'poster frame captured and stored');
  assert.equal(env.COMMISSION_UPLOADS.data.get(rec.video.key).value.length,video.length);

  // Moderation: plays the private video through a signed link, shows both permissions, approve publishes it.
  await page.goto(origin+'/testimonial-manager/');
  await page.locator('#tm-token').fill('owner-token');await page.locator('#tm-login button').click();
  const card=page.locator(`#${rec.id}`);await card.waitFor();await unstick(page);
  assert.match(await card.locator('.tm-consent').textContent(),/tjm\.art: allowed.*Social media: not allowed/);
  await card.locator('video').evaluate(v=>new Promise((res,rej)=>{if(v.readyState>=1)return res();v.onloadedmetadata=res;v.onerror=()=>rej(Error('moderation video failed'));}));
  assert(await card.locator('a',{hasText:'Download video'}).getAttribute('href').then(h=>/download=1/.test(h)));
  if(shots)await card.screenshot({path:path.join(shots,'moderation-player.png')});
  await card.getByRole('button',{name:'Approve & publish'}).click();
  await page.waitForFunction(()=>/Published/.test(document.getElementById('tm-status').textContent));
  assert.equal(mails.length,2,'owner alert + thank-you email');
  await page.locator('[data-filter="social"]').click();
  assert.equal(await page.locator('.tm-card').count(),0,'no social permission, so not in the social list');

  // Public page: inline player, lazy, poster, playsinline, no autoplay.
  await page.goto(origin+'/testimonials/');
  const player=page.locator(`#${rec.id} video`);await player.waitFor();
  assert.deepEqual(await player.evaluate(v=>({preload:v.preload,autoplay:v.autoplay,playsinline:v.hasAttribute('playsinline'),poster:/\/poster$/.test(v.poster),controls:v.controls,type:v.querySelector('source').type})),{preload:'none',autoplay:false,playsinline:true,poster:true,controls:true,type:'video/webm'});
  assert.equal(await page.locator(`#${rec.id} blockquote`).count(),0,'no empty quote');
  await player.evaluate(v=>{v.muted=true;return v.play();});await unstick(page);
  if(shots){await page.waitForTimeout(800);await page.locator(`#${rec.id}`).screenshot({path:path.join(shots,'public-card.png')});}

  // Phone: record (front camera) and library buttons.
  const phone=await browser.newContext({viewport:{width:390,height:844},isMobile:true,hasTouch:true,deviceScaleFactor:2});await phone.route('**/*',serve);
  const m=await phone.newPage();m.on('pageerror',e=>errors.push(e.message));
  await m.goto(origin+'/testimonials/#share');await m.locator('.video-invite').waitFor();
  assert(await m.locator('[data-video-record]').isVisible());
  assert.equal(await m.locator('[data-video-choose-label]').textContent(),'Choose from my videos');
  assert.equal(await m.locator('[data-video-capture]').getAttribute('capture'),'user');
  await unstick(m);
  if(shots)await m.locator('.share-form-wrap').screenshot({path:path.join(shots,'form-mobile.png')});
  await m.locator('[data-video-capture]').setInputFiles({name:'IMG_0042.webm',mimeType:'video/webm',buffer:video});
  await m.locator('[data-video-consent]').waitFor();
  assert(await m.locator('[data-video-record]').isHidden());
  if(shots)await m.locator('.share-form-wrap').screenshot({path:path.join(shots,'form-mobile-video-selected.png')});
  assert(await m.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),'no horizontal overflow on phones');
  assert.deepEqual(errors,[]);
  console.log('Video testimonial browser test passed');
}finally{await browser.close();}
