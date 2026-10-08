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
class Bucket {
  data=new Map();seq=0;
  async put(key,value,options={}){const prev=this.data.get(key);if(options.onlyIf?.etagMatches&&prev?.etag!==options.onlyIf.etagMatches)return null;const item={key,value,etag:String(++this.seq),...options};this.data.set(key,item);return item;}
  async get(key){const item=this.data.get(key);if(!item)return null;const text=typeof item.value==='string'?item.value:null;return {...item,body:item.value,text:async()=>text??new TextDecoder().decode(item.value),json:async()=>JSON.parse(text)};}
  async delete(keys){for(const key of Array.isArray(keys)?keys:[keys])this.data.delete(key);}
  async list({prefix='',limit=1000,cursor}){const all=[...this.data.values()].filter(x=>x.key.startsWith(prefix)).sort((a,b)=>a.key.localeCompare(b.key));const rest=all.filter(x=>!cursor||x.key>cursor),objects=rest.slice(0,limit);return {objects,truncated:rest.length>limit,cursor:objects.at(-1)?.key};}
}
const issued=[];
const setup=()=>({COMMISSION_UPLOADS:new Bucket(),COMMISSION_MANAGER_TOKEN:'owner-token',GOOGLE_CLIENT_ID:'id',GOOGLE_CLIENT_SECRET:'s',GOOGLE_REFRESH_TOKEN:'r',PAYPAL_MODE:'live',
  CART_ORDERS:{getByName:name=>({codeIssue:async(hash,record)=>{issued.push({name,record});}})}});
let mails=[];
test.beforeEach(()=>{mails=[];issued.length=0;globalThis.fetch=async(url,init={})=>{const u=new URL(url);
  if(u.hostname==='oauth2.googleapis.com')return Response.json({access_token:'T'});
  if(u.hostname==='gmail.googleapis.com'){mails.push(JSON.parse(init.body));return Response.json({id:'m'});}
  if(u.hostname==='nominatim.openstreetmap.org'){assert.equal(u.searchParams.get('q'),'Tacoma, WA');return Response.json([{lat:'47.2455013',lon:'-122.438329',display_name:'Tacoma, Pierce County, Washington, United States'}]);}
  throw Error('unexpected fetch '+url);};});
const form=(fields={},photos=[])=>{const f=new FormData();for(const [k,v] of Object.entries({name:'Jane D.',email:'jane@example.com',quote:'It makes our kitchen glow.',city:'Tacoma, WA',paintingSlug:'painting-emergence',painting:'Emergence',consent:'yes',...fields}))if(v!=null)f.set(k,v);photos.forEach(([bytes,name,type])=>f.append('photos',new File([bytes],name,{type})));return f;};
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

test('validation, honeypot, consent, file type and rate limit',async()=>{
  const env=setup();
  assert.equal((await submit(env,form({consent:null}))).status,400);
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
  assert.deepEqual(pub,{id,name:'Jane',city:'Tacoma, WA',painting:'Emergence',paintingHref:'/products/painting-emergence/',quote:'It makes our kitchen glow.',photos:[`/testimonials/api/photo/${id}/0`],pin:[47.25,-122.44],approvedAt:new Date(now).toISOString()});
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
});
