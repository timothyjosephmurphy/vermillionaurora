import {test} from 'node:test';
import assert from 'node:assert/strict';
import worker, {buildIndex} from './worker.mjs';
const object = key => ({key,size:42,uploaded:new Date('2026-09-24T00:00:00Z'),httpMetadata:{contentType:'image/jpeg'}});
test('lists every page, excludes itself, and encodes keys', async () => {
 const calls=[];
 const env={PUBLIC_BASE_URL:'https://media.example/',MEDIA:{list:async options => {calls.push(options);return options.cursor ? {objects:[object('images/Ex-Living Room/a #1.jpeg')],truncated:false} : {objects:[...Array.from({length:1000},(_,i)=>object(`images/${i}.jpg`)),object('media-index.json'),object('images/')],truncated:true,cursor:'next'};}}};
 const index=await buildIndex(env);assert.equal(index.count,1001);assert.equal(calls[1].cursor,'next');assert.equal(index.files.at(-1).url,'https://media.example/images/Ex-Living%20Room/a%20%231.jpeg');
});
test('read does not write; scheduled refresh writes JSON', async () => {
 const writes=[];const env={PUBLIC_BASE_URL:'https://media.example',MEDIA:{list:async()=>({objects:[object('a.jpg')],truncated:false}),put:async(...args)=>writes.push(args)}};
 const response=await worker.fetch(new Request('https://index.example/'),env);assert.equal(response.status,200);assert.equal((await response.json()).count,1);assert.equal(writes.length,0);
 await worker.scheduled({},env);assert.equal(writes[0][0],'media-index.json');assert.equal(JSON.parse(writes[0][1]).count,1);
});
test('failed enumeration preserves old snapshot', async () => {
 let written=false;const env={MEDIA:{list:async()=>{throw Error('unavailable');},put:async()=>{written=true;}}};
 await assert.rejects(worker.scheduled({},env));assert.equal(written,false);
});
