import test from 'node:test';
import assert from 'node:assert/strict';
import {SITE_ORIGINS,isSiteOrigin,corsOrigin,withCors,PRIMARY_SITE} from './site-origins.mjs';
const req=origin=>new Request('https://worker/x',{headers:origin?{Origin:origin}:{}});
test('both website domains are allowed; look-alikes are not',()=>{
  assert.deepEqual(SITE_ORIGINS.sort(),['https://tjm.art','https://vermillionaurora.com']);
  for(const o of ['https://tjm.art','https://vermillionaurora.com'])assert.equal(isSiteOrigin(o),true);
  for(const o of ['http://tjm.art','https://www.tjm.art','https://tjm.art.example','https://evil.example',null])assert.equal(isSiteOrigin(o),false);
});
test('CORS echoes an allowed origin and otherwise answers with the primary site',async()=>{
  assert.equal(corsOrigin(req('https://tjm.art')),'https://tjm.art');
  assert.equal(corsOrigin(req('https://evil.example')),PRIMARY_SITE);
  assert.equal(corsOrigin(req()),PRIMARY_SITE);
  assert.equal(corsOrigin(req('https://sandbox.example'),['https://sandbox.example']),'https://sandbox.example');
  assert.equal(corsOrigin(req('https://tjm.art'),['https://sandbox.example']),'https://sandbox.example');
  const r=withCors(req('https://tjm.art'),Response.json({ok:true},{status:201,headers:{'Access-Control-Allow-Origin':PRIMARY_SITE,'X-Keep':'1'}}));
  assert.equal(r.status,201);assert.equal(r.headers.get('Access-Control-Allow-Origin'),'https://tjm.art');assert.equal(r.headers.get('X-Keep'),'1');
});
