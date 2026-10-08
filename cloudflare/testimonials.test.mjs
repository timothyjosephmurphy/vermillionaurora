import test from 'node:test';
import assert from 'node:assert/strict';
import {testimonialsApi,purgeTestimonialRateLimits,DAILY_LIMIT} from './testimonials.mjs';
import {cleanImage,jpegExifTags,sniffImageType} from './image-metadata.mjs';
import site from '../worker/site.mjs';
// Small fixtures generated with Pillow: EXIF with GPS (tag 0x8825), camera make and orientation 6; PNG tEXt + eXIf; WebP EXIF.
const b64=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
const GPS_JPEG=b64('/9j/4AAQSkZJRgABAQAAAQABAAD/4QCoRXhpZgAATU0AKgAAAAgAAwEPAAIAAAAIAAAAMgESAAMAAAABAAYAAIglAAQAAAABAAAAOgAAAABUZXN0Q2FtAAAEAAEAAgAAAAJOAAAAAAIABQAAAAMAAABwAAMAAgAAAAJXAAAAAAQABQAAAAMAAACIAAAAAAAAAC8AAAABAAAAJAAAAAEAAAAZAAAAAgAAAHoAAAABAAAAEwAAAAEAAAA3AAAAAf/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAAYACAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOaooor5g/Uj/9k=');
const GPS_PROGRESSIVE=b64('/9j/4AAQSkZJRgABAQAAAQABAAD/4QCoRXhpZgAATU0AKgAAAAgAAwEPAAIAAAAIAAAAMgESAAMAAAABAAYAAIglAAQAAAABAAAAOgAAAABUZXN0Q2FtAAAEAAEAAgAAAAJOAAAAAAIABQAAAAMAAABwAAMAAgAAAAJXAAAAAAQABQAAAAMAAACIAAAAAAAAAC8AAAABAAAAJAAAAAEAAAAZAAAAAgAAAHoAAAABAAAAEwAAAAEAAAA3AAAAAf/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/CABEIAAYACAMBIgACEQEDEQH/xAAVAAEBAAAAAAAAAAAAAAAAAAAABf/EABUBAQEAAAAAAAAAAAAAAAAAAAUG/9oADAMBAAIQAxAAAAGYC6n/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAEFAn//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/AX//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/AX//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAY/An//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/IX//2gAMAwEAAgADAAAAEPv/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAEDAQE/EH//xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oACAECAQE/EH//xAAUEAEAAAAAAAAAAAAAAAAAAAAA/9oACAEBAAE/EH//2Q==');
const META_PNG=b64('iVBORw0KGgoAAAANSUhEUgAAAAgAAAAGCAIAAABxZ0isAAAAI3RFWHRDb21tZW50AHNlY3JldCBsb2NhdGlvbiA0Ny42LC0xMjIuM3psGUwAAACgZVhJZk1NACoAAAAIAAMBDwACAAAACAAAADIBEgADAAAAAQAGAACIJQAEAAAAAQAAADoAAAAAVGVzdENhbQAABAABAAIAAAACTgAAAAACAAUAAAADAAAAcAADAAIAAAACVwAAAAAEAAUAAAADAAAAiAAAAAAAAAAvAAAAAQAAACQAAAABAAAAGQAAAAIAAAB6AAAAAQAAABMAAAABAAAANwAAAAERy3rTAAAAFElEQVR4nGM8YaPBgA0wYRWlkwQAsioBOPy3KEAAAAAASUVORK5CYII=');
const META_WEBP=b64('UklGRvYAAABXRUJQVlA4WAoAAAAIAAAABwAABQAAVlA4IDAAAADwAQCdASoIAAYAAUAmJaACdLoB+AAEgwAA/u4KZ/5BcsLrka/9pZ+pZ+pZ/ioAAABFWElGoAAAAE1NACoAAAAIAAMBDwACAAAACAAAADIBEgADAAAAAQAGAACIJQAEAAAAAQAAADoAAAAAVGVzdENhbQAABAABAAIAAAACTgAAAAACAAUAAAADAAAAcAADAAIAAAACVwAAAAAEAAUAAAADAAAAiAAAAAAAAAAvAAAAAQAAACQAAAABAAAAGQAAAAIAAAB6AAAAAQAAABMAAAABAAAANwAAAAE=');
const now=Date.parse('2026-10-07T20:00:00Z');
import {Bucket} from '../tests/r2-memory-bucket.mjs';
const issued=[];
const setup=()=>({COMMISSION_UPLOADS:new Bucket(),COMMISSION_MANAGER_TOKEN:'owner-token',GOOGLE_CLIENT_ID:'id',GOOGLE_CLIENT_SECRET:'s',GOOGLE_REFRESH_TOKEN:'r',PAYPAL_MODE:'live',
  CART_ORDERS:{getByName:name=>({codeIssue:async(hash,record)=>{issued.push({name,record});}})}});
let mails=[];
test.beforeEach(()=>{mails=[];issued.length=0;globalThis.fetch=async(url,init={})=>{const u=new URL(url);
  if(u.hostname==='oauth2.googleapis.com')return Response.json({access_token:'T'});
  if(u.hostname==='gmail.googleapis.com'){mails.push(JSON.parse(init.body));return Response.json({id:'m'});}
  if(u.hostname==='nominatim.openstreetmap.org'){assert.equal(u.searchParams.get('q'),'Tacoma, WA');return Response.json([{lat:'47.2455013',lon:'-122.438329',display_name:'Tacoma, Pierce County, Washington, United States'}]);}
  throw Error('unexpected fetch '+url);};});
const form=(fields={},photos=[])=>{const f=new FormData();for(const [k,v] of Object.entries({name:'Jane D.',email:'jane@example.com',quote:'It makes our kitchen glow.',city:'Tacoma, WA',paintingSlug:'painting-emergence',painting:'Emergence',publishNotice:'2026-10-08b',...fields}))if(v!=null)f.set(k,v);photos.forEach(([bytes,name,type])=>f.append('photos',new File([bytes],name,{type})));return f;};
const submit=(env,body,headers={})=>testimonialsApi(new Request('https://tjm.art/testimonials/api/submit',{method:'POST',body,headers:{Origin:'https://tjm.art','CF-Connecting-IP':'203.0.113.9',Accept:'application/json',...headers}}),env,null,now);
const owner=(env,body,{token='owner-token',origin='https://tjm.art'}={})=>testimonialsApi(new Request('https://tjm.art/testimonials/api/owner',{method:'POST',headers:{Origin:origin,Authorization:'Bearer '+token,'Content-Type':'application/json'},body:JSON.stringify(body)}),env,null,now);
const approved=async env=>(await (await testimonialsApi(new Request('https://tjm.art/testimonials/api/approved'),env,null,now)).json()).testimonials;

test('metadata stripping removes GPS and keeps orientation, for baseline and progressive JPEG',()=>{
  for(const input of [GPS_JPEG,GPS_PROGRESSIVE]){
    assert.ok(jpegExifTags(input)[0].includes(0x8825));
    const out=cleanImage(input);
    assert.equal(out.type,'image/jpeg');
    assert.deepEqual(jpegExifTags(out.bytes),[[0x0112]]);
    assert.equal(out.orientation,6);
    assert.equal(new TextDecoder('latin1').decode(out.bytes).includes('TestCam'),false);
    assert.deepEqual([...out.bytes.slice(-2)],[0xff,0xd9]);
  }
  const png=cleanImage(META_PNG);assert.deepEqual(png.removed.sort(),['eXIf','tEXt']);assert.equal(new TextDecoder('latin1').decode(png.bytes).includes('secret'),false);
  const webp=cleanImage(META_WEBP);assert.deepEqual(webp.removed,['EXIF']);assert.equal(new TextDecoder('latin1').decode(webp.bytes).includes('Exif'),false);
  assert.equal(sniffImageType(new TextEncoder().encode('<svg></svg>')),null);
  assert.throws(()=>cleanImage(new TextEncoder().encode('GIF89a')));
});

test('submission is stored pending with stripped photos, notifies TJ, and is not public',async()=>{
  const env=setup();
  const r=await submit(env,form({},[[GPS_JPEG,'wall.jpg','image/jpeg'],[META_PNG,'me.png','image/png']]));
  assert.equal(r.status,200);const {id}=await r.json();
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);
  assert.equal(rec.status,'pending');assert.equal(rec.email,'jane@example.com');assert.deepEqual(rec.geo,{lat:47.25,lng:-122.44,label:'Tacoma, Pierce County, Washington, United States',source:'OpenStreetMap Nominatim'});
  const stored=env.COMMISSION_UPLOADS.data.get(rec.photos[0].key).value;assert.deepEqual(jpegExifTags(stored),[[0x0112]]);
  assert.ok(JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value).notifiedAt);
  assert.equal(mails.length,1);const mail=atob(mails[0].raw.replace(/-/g,'+').replace(/_/g,'/'));assert.match(mail,/testimonial-manager/);assert.match(mail,/Reply-To: jane@example.com/);
  assert.deepEqual(await approved(env),[]);
  assert.equal((await testimonialsApi(new Request(`https://tjm.art/testimonials/api/photo/${id}/0`),env)).status,404);
});

test('painting is optional free text; submissions without it are accepted',async()=>{
  const env=setup();
  const t=await (await submit(env,form({paintingSlug:null,painting:'Sunset over the Sound',city:''}))).json();
  assert.equal(JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+t.id+'.json').value).paintingTitle,'Sunset over the Sound');
  const r=await submit(env,form({paintingSlug:null,painting:null,city:''}));assert.equal(r.status,200);
  const {id}=await r.json();const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);assert.equal(rec.paintingSlug,'');assert.equal(rec.paintingTitle,'');
});

test('validation, honeypot, file type and rate limit',async()=>{
  const env=setup();
  assert.equal((await submit(env,form({email:'nope'}))).status,400);
  assert.equal((await submit(env,form({quote:''}))).status,400);
  assert.equal((await submit(env,form({},[[new TextEncoder().encode('<svg/>'),'x.svg','image/svg+xml']]))).status,400);
  assert.equal((await submit(env,form({},Array(5).fill([GPS_JPEG,'a.jpg','image/jpeg'])))).status,400);
  assert.equal((await submit(env,form({},[[new Uint8Array(10*1024*1024+1),'big.jpg','image/jpeg']]))).status,400);
  const bot=await submit(env,form({website:'http://spam'}));assert.equal(bot.status,200);
  assert.equal([...env.COMMISSION_UPLOADS.data.keys()].filter(k=>k.startsWith('testimonials/records/')).length,0);
  assert.equal((await submit(env,form(),{Origin:'https://evil.example'})).status,403);
  for(let i=0;i<DAILY_LIMIT;i++)assert.equal((await submit(env,form({city:''}))).status,200);
  assert.equal((await submit(env,form({city:''}))).status,429);
  assert.equal((await submit(env,form({city:''}),{'CF-Connecting-IP':'198.51.100.1'})).status,200);
  const html=await submit(env,form({city:''}),{Accept:'text/html','CF-Connecting-IP':'198.51.100.2'});assert.equal(html.status,303);assert.match(html.headers.get('Location'),/thanks=1/);
  assert.equal(await purgeTestimonialRateLimits(env,now+86400000),4);
});

test('owner moderation: auth, approve with edits, public list and photos, unpublish, delete, print code',async()=>{
  const env=setup();
  const {id}=await (await submit(env,form({},[[GPS_JPEG,'wall.jpg','image/jpeg']]))).json();
  assert.equal((await owner(env,{action:'list'},{token:'wrong'})).status,403);
  assert.equal((await owner(env,{action:'list'},{origin:'https://vermillionaurora.com'})).status,403);
  const list=await (await owner(env,{action:'list'})).json();assert.equal(list.records[0].id,id);
  assert.equal((await owner(env,{action:'issueCode',id})).status,409);
  assert.equal((await owner(env,{action:'approve',id,paintingSlug:'not-a-painting'})).status,400);
  const ok=await owner(env,{action:'approve',id,name:'Jane',lat:'47.2455',lng:'-122.4383',city:'Tacoma, WA',map:true});assert.equal(ok.status,200);
  const [pub]=await approved(env);
  assert.deepEqual(pub,{id,name:'Jane',city:'Tacoma, WA',painting:'Emergence',paintingHref:'/products/painting-emergence/',quote:'It makes our kitchen glow.',photos:[`/testimonials/api/photo/${id}/0`],video:null,pin:[47.25,-122.44],approvedAt:new Date(now).toISOString()});
  assert.equal(JSON.stringify(await approved(env)).includes('jane@example.com'),false);
  const photo=await testimonialsApi(new Request('https://tjm.art'+pub.photos[0]),env);assert.equal(photo.status,200);assert.equal(photo.headers.get('Content-Type'),'image/jpeg');
  assert.deepEqual(jpegExifTags(new Uint8Array(await photo.arrayBuffer())),[[0x0112]]);
  // Approval issued one code and sent one thank-you email (sendThanks defaults to on).
  assert.equal(issued.length,1);assert.equal(issued[0].record.email,'jane@example.com');assert.equal(issued[0].record.note,'Testimonial '+id);
  assert.equal(mails.length,2);const thanks=atob(mails[1].raw.replace(/-/g,'+').replace(/_/g,'/'));
  assert.match(thanks,/To: jane@example.com/);assert.match(thanks,/Reply-To: tj@tjm.art/);
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);
  assert.match(rec.thanks.code,/^VA-[A-Z2-9]{4}-[A-Z2-9]{4}-[A-Z2-9]{4}$/);assert.ok(rec.thanks.emailedAt);
  assert.equal(JSON.stringify(await approved(env)).includes(rec.thanks.code),false);
  // Idempotent: saving, re-sending, issuing again, unpublish + re-approve never add a code or an email.
  await owner(env,{action:'approve',id,name:'Jane'});
  assert.equal((await (await owner(env,{action:'issueCode',id})).json()).thanks.code,rec.thanks.code);
  await owner(env,{action:'sendThanks',id});
  await owner(env,{action:'unpublish',id});await owner(env,{action:'approve',id,name:'Jane',lat:'47.25',lng:'-122.44'});
  assert.equal(issued.length,1);assert.equal(mails.length,2);
  await owner(env,{action:'unpublish',id});assert.deepEqual(await approved(env),[]);
  assert.equal((await owner(env,{action:'delete',id})).status,400);
  assert.equal((await owner(env,{action:'delete',id,confirm:id})).status,200);
  assert.equal([...env.COMMISSION_UPLOADS.data.keys()].filter(k=>k.includes(id)).length,0);
});

test('site Worker forwards the testimonials API to the checkout Worker on tjm.art only',async()=>{
  const seen=[];const env={PRIMARY_HOST:'tjm.art',LEGACY_REDIRECT:'true',ASSETS:{fetch:()=>new Response('asset')},CHECKOUT:{fetch:r=>{seen.push(r.url);return new Response('checkout');}}};
  assert.equal(await (await site.fetch(new Request('https://tjm.art/testimonials/api/approved'),env)).text(),'checkout');
  assert.equal(await (await site.fetch(new Request('https://tjm.art/testimonials/'),env)).text(),'asset');
  assert.equal(await (await site.fetch(new Request('https://tjm.art/testimonial-manager/'),env)).text(),'asset');
  assert.equal((await site.fetch(new Request('https://tjm.art/testimonials/api/submit',{method:'POST'}),{...env,CHECKOUT:undefined})).status,503);
});

test('approve without email issues the code only; email can follow once; flag turns emails off',async()=>{
  const env=setup();
  const {id}=await (await submit(env,form({city:''}))).json();mails=[];
  const quiet=await (await owner(env,{action:'approve',id,sendThanks:false})).json();
  assert.equal(quiet.thanks.issued,true);assert.equal(mails.length,0);assert.equal(issued.length,1);
  const sent=await (await owner(env,{action:'sendThanks',id})).json();assert.equal(sent.thanks.emailed,true);assert.equal(mails.length,1);
  assert.equal((await owner(env,{action:'sendThanks',id})).status,200);assert.equal(mails.length,1);
  const off={...setup(),TESTIMONIAL_THANKS_EMAIL:'false'};
  const second=await (await submit(off,form({city:''}))).json();mails=[];
  const r=await (await owner(off,{action:'approve',id:second.id})).json();assert.match(r.thanks.emailSkipped,/turned off/);assert.equal(mails.length,0);
});
test('thank-you email copy',async()=>{
  const {thanksEmail}=await import('./testimonials.mjs');
  const {subject,body}=thanksEmail({id:'t-20261007-abcdefabcdef',name:'Jane Doe',paintingTitle:'Emergence',thanks:{code:'VA-ABCD-EFGH-JKLM'}});
  assert.equal(subject,'Thank you, and a print code for you');
  assert.match(body,/^Hi Jane,/);assert.match(body,/VA-ABCD-EFGH-JKLM/);assert.match(body,/https:\/\/tjm.art\/cart\//);assert.match(body,/#t-20261007-abcdefabcdef/);
  assert.match(body,/doesn’t apply to original paintings or commission deposits/);
  assert.match(thanksEmail({id:'t-20261007-abcdefabcdef',name:'Sam',thanks:{code:'VA-ABCD-EFGH-JKLM'}}).body,/sharing what my painting means to you/);
  // No name: neutral greeting. Shown as “A collector” but the collector gave a name privately: greet them by it.
  for(const r of [{name:''},{name:'',published:{name:''}},{name:'',published:{name:'A collector'}}])
    assert.match(thanksEmail({id:'t-20261007-abcdefabcdef',thanks:{code:'VA-ABCD-EFGH-JKLM'},...r}).body,/^Hi there,\n/);
  assert.match(thanksEmail({id:'t-20261007-abcdefabcdef',name:'Jane Doe',published:{name:''},thanks:{code:'VA-ABCD-EFGH-JKLM'}}).body,/^Hi Jane,/);
});

test('no consent checkbox: submitting records implied consent with the notice text; old consent field is ignored',async()=>{
  const {PUBLISH_NOTICE,PUBLISH_NOTICE_VERSION}=await import('./testimonial-notice.mjs');
  assert.match(PUBLISH_NOTICE,/^By sending this, you’re OK with TJ showing your name \(if you give one\), city, words and photos on tjm\.art\.$/);assert.equal(PUBLISH_NOTICE_VERSION,'2026-10-08b');
  const env=setup();
  for(const extra of [{},{consent:'yes'}]){
    const r=await submit(env,form(extra));assert.equal(r.status,200);const {id}=await r.json();
    const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);
    assert.equal(rec.publishConsent,'implied-by-submit');
    assert.equal(rec.consent.publish,true);assert.equal(rec.consent.basis,'implied-by-submit');
    assert.equal(rec.consent.notice,PUBLISH_NOTICE);assert.equal(rec.consent.noticeVersion,PUBLISH_NOTICE_VERSION);assert.equal(rec.consent.shownVersion,'2026-10-08b');
  }
});

test('name is optional: shown publicly as “A collector” (with city), TJ can blank a name, and the thank-you says “Hi there”',async()=>{
  const env=setup();
  const r=await submit(env,form({name:''}));assert.equal(r.status,200);const {id}=await r.json();
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);assert.equal(rec.name,'');
  const alert=atob(mails[0].raw.replace(/-/g,'+').replace(/_/g,'/'));assert.match(alert,/Name: Not given/);assert.match(alert,new RegExp('Subject: =\\?UTF-8\\?B\\?'+btoa(String.fromCharCode(...new TextEncoder().encode('New testimonial — no name given')))));
  mails=[];
  const ok=await owner(env,{action:'approve',id});assert.equal(ok.status,200);
  const [pub]=await approved(env);assert.equal(pub.name,'A collector');assert.equal(pub.city,'Tacoma, WA');
  assert.equal(issued.length,1);
  assert.equal(mails.length,1);const thanks=new TextDecoder().decode(Uint8Array.from(atob(atob(mails[0].raw.replace(/-/g,'+').replace(/_/g,'/')).split('\r\n\r\n')[1].trim()),c=>c.charCodeAt(0)));
  assert.match(thanks,/^Hi there,/);
  // A named submission can be shown anonymously by clearing the name on approval.
  const named=await (await submit(env,form({quote:'Second one.'}))).json();
  await owner(env,{action:'approve',id:named.id,name:''});
  assert.deepEqual((await approved(env)).map(t=>t.name).sort(),['A collector','A collector']);
});

test('email is optional: approval publishes but issues no code and sends nothing; code actions refuse; bad email still rejected',async()=>{
  const env=setup();
  assert.equal((await submit(env,form({email:'not-an-email'}))).status,400);
  const r=await submit(env,form({email:''}));assert.equal(r.status,200);const {id}=await r.json();
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);assert.equal(rec.email,'');
  const alert=atob(mails[0].raw.replace(/-/g,'+').replace(/_/g,'/'));
  assert.doesNotMatch(alert,/Reply-To:/);assert.match(alert,/Email \(private\): Not given/);
  mails=[];
  const ok=await (await owner(env,{action:'approve',id})).json();
  assert.equal(ok.record.status,'approved');assert.deepEqual(ok.thanks,{noEmail:true,emailSkipped:'No email, so no code sent'});
  assert.equal((await approved(env)).length,1,'published as usual');
  assert.equal(issued.length,0,'no code issued');assert.equal(mails.length,0,'no thank-you email');
  for(const action of ['issueCode','sendThanks']){
    const res=await owner(env,{action,id});assert.equal(res.status,409);assert.equal((await res.json()).thanks.emailSkipped,'No email, so no code sent');
  }
  assert.equal(issued.length,0);assert.equal(mails.length,0);
  assert.equal(JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value).thanks,undefined);
});

// ---------- Video testimonials ----------
const {PART_BYTES,MAX_VIDEO_BYTES:MAX_VIDEO,blankLocations,sniffVideo}=await import('./testimonial-videos.mjs');
const {purgeVideos}=await import('./testimonials.mjs');
const api=(env,path,{method='POST',body,headers={},at=now}={})=>testimonialsApi(new Request('https://tjm.art'+path,{method,body:body&&typeof body==='object'&&!(body instanceof Uint8Array)?JSON.stringify(body):body,headers:{Origin:'https://tjm.art','CF-Connecting-IP':'203.0.113.9',...headers}}),env,null,at);
// A fake MP4: ftyp box, then an iPhone-style ISO 6709 location string, padded to the requested size.
const fakeVideo=(size,brand='isom')=>{const b=new Uint8Array(size);b.set([0,0,0,24,...new TextEncoder().encode('ftyp'+brand)]);b.set(new TextEncoder().encode('com.apple.quicktime.location.ISO6709+47.6062-122.3321+050.000/'),40);return b;};
async function uploadVideo(env,bytes,{type='video/mp4',name='me.mov',at=now,ip='203.0.113.9'}={}){
  const headers={'CF-Connecting-IP':ip};
  const start=await api(env,'/testimonials/api/video/start',{body:{type,size:bytes.length,name},at,headers});
  const s=await start.json();if(!start.ok)return {status:start.status,...s};
  const parts=[];
  for(let n=1;n<=s.parts;n++){const r=await api(env,`/testimonials/api/video/part?id=${s.id}&n=${n}`,{method:'PUT',body:bytes.slice((n-1)*s.partBytes,n*s.partBytes),headers:{...headers,'X-Upload-Token':s.token},at});const p=await r.json();if(!r.ok)return {status:r.status,...p};parts.push(p);}
  const done=await api(env,'/testimonials/api/video/complete',{body:{id:s.id,token:s.token,parts},at,headers});
  return {status:done.status,...s,...await done.json()};
}

test('video upload: multipart parts, size and type checks, magic bytes, location metadata blanked',async()=>{
  const env=setup();
  assert.equal((await api(env,'/testimonials/api/video/start',{body:{type:'video/x-msvideo',size:5000}})).status,415);
  assert.equal(MAX_VIDEO,50*1024*1024,'50 MB video limit');
  const big=await api(env,'/testimonials/api/video/start',{body:{type:'video/mp4',size:MAX_VIDEO+1}});assert.equal(big.status,413);assert.equal((await big.json()).error,'Videos need to be MP4, MOV or WebM, up to 50 MB.');
  assert.equal((await api(env,'/testimonials/api/video/start',{body:{type:'video/mp4',size:5000},headers:{Origin:'https://evil.example'}})).status,403);
  const bytes=fakeVideo(PART_BYTES*2+1234);
  const up=await uploadVideo(env,bytes);
  assert.equal(up.status,200);assert.equal(up.parts,3);
  const stored=env.COMMISSION_UPLOADS.data.get(`testimonials/videos/${up.id}/video.mp4`).value;
  assert.equal(stored.length,bytes.length);
  const text=new TextDecoder('latin1').decode(stored.slice(0,200));
  assert.equal(text.includes('47.6062'),false);assert.match(text,/ISO6709 {20,}/);
  assert.equal(JSON.parse(env.COMMISSION_UPLOADS.data.get(`testimonials/uploads/${up.id}.json`).value).state,'complete');
  // Not a video: rejected on the first part and the upload is discarded.
  const fake=await uploadVideo(env,new TextEncoder().encode('<html>'.padEnd(5000,'x')));
  assert.equal(fake.status,415);assert.equal([...env.COMMISSION_UPLOADS.uploads.keys()].length,0);
  // Wrong part size, wrong token.
  const s=await (await api(env,'/testimonials/api/video/start',{body:{type:'video/webm',size:PART_BYTES+10}})).json();
  assert.equal((await api(env,`/testimonials/api/video/part?id=${s.id}&n=1`,{method:'PUT',body:new Uint8Array(100),headers:{'X-Upload-Token':s.token}})).status,400);
  assert.equal((await api(env,`/testimonials/api/video/part?id=${s.id}&n=1`,{method:'PUT',body:new Uint8Array(PART_BYTES),headers:{'X-Upload-Token':'0'.repeat(64)}})).status,403);
  assert.equal((await api(env,'/testimonials/api/video/abort',{body:{id:s.id,token:s.token}})).status,200);
  assert.equal(env.COMMISSION_UPLOADS.data.has(`testimonials/uploads/${s.id}.json`),false);
  assert.equal(sniffVideo(fakeVideo(128,'qt  ')),'mov');assert.equal(sniffVideo(Uint8Array.from([0x1a,0x45,0xdf,0xa3,0,0,0,0,0,0,0,0])),'webm');
  const android=new TextEncoder().encode('....\xa9xyz....+47.6062-122.3321/....');assert.equal(blankLocations(android),1);assert.equal(new TextDecoder().decode(android).includes('47.6'),false);
});

test('video upload starts are rate limited per visitor',async()=>{
  const env=setup();
  for(let i=0;i<4;i++)assert.equal((await api(env,'/testimonials/api/video/start',{body:{type:'video/mp4',size:5000}})).status,200);
  assert.equal((await api(env,'/testimonials/api/video/start',{body:{type:'video/mp4',size:5000}})).status,429);
  assert.equal((await api(env,'/testimonials/api/video/start',{body:{type:'video/mp4',size:5000},headers:{'CF-Connecting-IP':'198.51.100.7'}})).status,200);
});

test('video testimonial: text optional, two optional consents stored, private until approved with tjm.art consent',async()=>{
  const env=setup();
  const up=await uploadVideo(env,fakeVideo(300000));
  // A text-only submission still needs words; with a video the words are optional.
  assert.equal((await submit(env,form({quote:''}))).status,400);
  assert.equal((await submit(env,form({quote:'',videoId:up.id,videoToken:'bad'}))).status,400);
  const r=await submit(env,form({quote:'',city:'',videoId:up.id,videoToken:up.token,videoSite:'yes',videoDuration:'64.4',posterFrame:new File([GPS_JPEG],'poster.jpg',{type:'image/jpeg'})}));
  assert.equal(r.status,200);const {id}=await r.json();assert.equal(id,up.id);
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);
  assert.deepEqual({site:rec.video.consent.site,social:rec.video.consent.social},{site:true,social:false});
  assert.equal(rec.video.duration,64);assert.equal(rec.video.poster.key,`testimonials/videos/${id}/poster.jpg`);
  assert.deepEqual(jpegExifTags(env.COMMISSION_UPLOADS.data.get(rec.video.poster.key).value),[[0x0112]]);
  assert.equal(JSON.parse(env.COMMISSION_UPLOADS.data.get(`testimonials/uploads/${id}.json`).value).state,'attached');
  // The same upload cannot be attached twice.
  assert.equal((await submit(env,form({videoId:up.id,videoToken:up.token}),{'CF-Connecting-IP':'198.51.100.3'})).status,400);
  const mail=atob(mails[0].raw.replace(/-/g,'+').replace(/_/g,'/'));
  // Not public before approval: no list entry, public video URL 404s.
  assert.deepEqual(await approved(env),[]);
  assert.equal((await api(env,`/testimonials/api/video/${id}`,{method:'GET'})).status,404);
  // Moderation gets signed playback links (Range supported), which expire and only match their own record.
  const list=await (await owner(env,{action:'list'})).json();
  const urls=list.records[0].videoUrls;assert.match(urls.video,/\/private\/.+\/video\?exp=/);assert.match(urls.poster,/\/poster\?/);
  const part=await api(env,urls.video,{method:'GET',headers:{Range:'bytes=0-99'}});
  assert.equal(part.status,206);assert.equal(part.headers.get('Content-Range'),'bytes 0-99/300000');assert.equal((await part.arrayBuffer()).byteLength,100);
  assert.equal(part.headers.get('Content-Type'),'video/mp4');
  assert.match((await api(env,urls.download,{method:'GET'})).headers.get('Content-Disposition'),/attachment; filename="testimonial-t-.+\.mp4"/);
  assert.equal((await api(env,urls.video.replace(/sig=[0-9a-f]+/,'sig='+'0'.repeat(64)),{method:'GET'})).status,403);
  assert.equal((await api(env,urls.video,{method:'GET',at:now+7*3600e3})).status,403);
  // Approve without words: allowed for a video; thank-you + code flow unchanged.
  const ok=await owner(env,{action:'approve',id,name:'Jane'});assert.equal(ok.status,200);
  assert.equal(issued.length,1);assert.equal(mails.length,2);
  const [pub]=await approved(env);
  assert.deepEqual(pub.video,{src:`/testimonials/api/video/${id}`,type:'video/mp4',poster:`/testimonials/api/video/${id}/poster`,duration:64});
  assert.equal(JSON.stringify(pub).includes('testimonials/videos/'),false);
  const full=await api(env,pub.video.src,{method:'GET'});assert.equal(full.status,200);assert.equal(full.headers.get('Content-Length'),'300000');assert.equal(full.headers.get('Accept-Ranges'),'bytes');
  assert.equal((await api(env,pub.video.src,{method:'GET',headers:{Range:'bytes=999999-'}})).status,416);
  assert.equal((await api(env,pub.video.poster,{method:'GET'})).headers.get('Content-Type'),'image/jpeg');
  // TJ can keep the video off the page.
  await owner(env,{action:'approve',id,name:'Jane',video:false});
  assert.deepEqual(await approved(env),[]);
  assert.equal((await api(env,pub.video.src,{method:'GET'})).status,404);
  // Collector withdraws the tjm.art permission: re-approving can no longer show it.
  await owner(env,{action:'approve',id,name:'Jane'});assert.equal((await approved(env)).length,1);
  const w=await (await owner(env,{action:'withdrawVideoConsent',id,site:true})).json();assert.equal(w.record.video.consent.site,false);
  await owner(env,{action:'approve',id,name:'Jane',video:true});assert.deepEqual(await approved(env),[]);
  // Delete removes record, video, poster and manifest.
  await owner(env,{action:'delete',id,confirm:id});
  assert.equal([...env.COMMISSION_UPLOADS.data.keys()].filter(k=>k.includes(id)).length,0);
});

test('video upload and submission work with no email and no name (token and rate limit never use the email)',async()=>{
  const env=setup();
  const up=await uploadVideo(env,fakeVideo(PART_BYTES+5000),{ip:'198.51.100.77'});
  const r=await submit(env,form({name:'',email:'',quote:'',city:'',videoId:up.id,videoToken:up.token,videoSite:'yes'}),{'CF-Connecting-IP':'198.51.100.77'});
  assert.equal(r.status,200);const {id}=await r.json();assert.equal(id,up.id);
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);
  assert.equal(rec.email,'');assert.equal(rec.name,'');assert.equal(rec.video.bytes,PART_BYTES+5000);
  mails=[];
  const ok=await (await owner(env,{action:'approve',id})).json();assert.equal(ok.thanks.emailSkipped,'No email, so no code sent');
  const [pub]=await approved(env);assert.equal(pub.name,'A collector');assert.equal(pub.video.src,`/testimonials/api/video/${id}`);
  assert.equal(issued.length,0);assert.equal(mails.length,0);
});

test('video without the tjm.art permission stays private after approval; words still show; email skips the link when nothing shows',async()=>{
  const env=setup();
  const a=await uploadVideo(env,fakeVideo(5000));
  const {id}=await (await submit(env,form({city:'',videoId:a.id,videoToken:a.token,videoSocial:'yes'}))).json();
  await owner(env,{action:'approve',id,name:'Jane'});
  const [pub]=await approved(env);assert.equal(pub.video,null);assert.equal(pub.quote,'It makes our kitchen glow.');
  assert.equal((await api(env,`/testimonials/api/video/${id}`,{method:'GET'})).status,404);
  const rec=JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value);
  assert.deepEqual([rec.video.consent.site,rec.video.consent.social],[false,true]);
  // Neither box, no words: approval thanks them (code + email) but nothing appears publicly and the email has no link.
  const b=await uploadVideo(env,fakeVideo(5000),{});
  const second=await (await submit(env,form({city:'',quote:'',videoId:b.id,videoToken:b.token}),{'CF-Connecting-IP':'198.51.100.4'})).json();
  mails=[];
  const res=await (await owner(env,{action:'approve',id:second.id,name:'Sam'})).json();
  assert.equal(res.thanks.emailed,true);
  assert.equal((await approved(env)).length,1);
  const body=atob(atob(mails[0].raw.replace(/-/g,'+').replace(/_/g,'/')).split('\r\n\r\n')[1].trim());
  assert.equal(body.includes('#'+second.id),false);assert.match(body,/print code/);
});

test('honeypot deletes an uploaded video; retention sweeps unattached, orphaned and long-pending videos',async()=>{
  const env=setup();
  const bot=await uploadVideo(env,fakeVideo(5000));
  assert.equal((await submit(env,form({website:'x',videoId:bot.id,videoToken:bot.token}))).status,200);
  assert.equal([...env.COMMISSION_UPLOADS.data.keys()].filter(k=>k.includes(bot.id)).length,0);
  const abandoned=await uploadVideo(env,fakeVideo(5000));
  const s=await (await api(env,'/testimonials/api/video/start',{body:{type:'video/mp4',size:5000}})).json(); // never finished
  const pending=await uploadVideo(env,fakeVideo(5000));
  const {id}=await (await submit(env,form({city:'',videoId:pending.id,videoToken:pending.token,videoSite:'yes'}))).json();
  const kept=await uploadVideo(env,fakeVideo(5000),{ip:'198.51.100.5'});assert.equal(kept.status,200);
  const k=await (await submit(env,form({city:'',videoId:kept.id,videoToken:kept.token,videoSite:'yes'}),{'CF-Connecting-IP':'198.51.100.5'})).json();
  await owner(env,{action:'approve',id:k.id,name:'Kim'});
  assert.deepEqual(await purgeVideos(env,now+3600e3),{removed:0});
  assert.deepEqual(await purgeVideos(env,now+25*3600e3),{removed:2});
  assert.equal(env.COMMISSION_UPLOADS.uploads.size,0);
  assert.equal([...env.COMMISSION_UPLOADS.data.keys()].filter(k=>k.includes(abandoned.id)||k.includes(s.id)).length,0);
  assert.ok(env.COMMISSION_UPLOADS.data.has(`testimonials/videos/${id}/video.mp4`));
  assert.deepEqual(await purgeVideos(env,now+91*86400e3),{removed:1});
  assert.equal(env.COMMISSION_UPLOADS.data.has(`testimonials/videos/${id}/video.mp4`),false);
  assert.equal(JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/'+id+'.json').value).video.expired,true);
  assert.ok(env.COMMISSION_UPLOADS.data.has(`testimonials/videos/${k.id}/video.mp4`),'approved videos are kept');
  // Orphan: manifest says attached but the record is gone.
  env.COMMISSION_UPLOADS.data.delete('testimonials/records/'+k.id+'.json');
  assert.deepEqual(await purgeVideos(env,now+92*86400e3),{removed:1});
  assert.equal([...env.COMMISSION_UPLOADS.data.keys()].filter(x=>x.includes(k.id)).length,0);
});

test('site Worker forwards video upload and playback paths',async()=>{
  const seen=[];const env={PRIMARY_HOST:'tjm.art',ASSETS:{fetch:()=>new Response('asset')},CHECKOUT:{fetch:r=>{seen.push(r.method+' '+new URL(r.url).pathname);return new Response('checkout');}}};
  await site.fetch(new Request('https://tjm.art/testimonials/api/video/part?id=x&n=1',{method:'PUT',body:'x'}),env);
  await site.fetch(new Request('https://tjm.art/testimonials/api/video/t-20261007-abcdefabcdef'),env);
  assert.deepEqual(seen,['PUT /testimonials/api/video/part','GET /testimonials/api/video/t-20261007-abcdefabcdef']);
});
