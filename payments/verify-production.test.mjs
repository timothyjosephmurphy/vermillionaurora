import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { postAudit } from './verify-production.mjs';

const jsonResponse=status=> ({status, async json(){return {};}});
const noWait=()=>{ throw new Error('should not wait'); };

test('postAudit returns the first response that is not 404', async()=>{
  const calls=[];
  const fetchImpl=async(url,init)=>{
    calls.push(url);
    assert.equal(init.method,'POST');
    assert.equal(init.headers.Authorization,'Bearer tok');
    return jsonResponse(200);
  };
  const response=await postAudit('https://example/checkout/readiness',{token:'tok',fetchImpl,sleep:noWait,timeoutMs:0});
  assert.equal(response.status,200);
  assert.deepEqual(calls,['https://example/checkout/readiness']);
});

test('postAudit retries HTTP 404 from a secret that has not reached this isolate', async()=>{
  let n=0; const waits=[];
  const fetchImpl=async()=>jsonResponse(n++<2?404:200);
  const response=await postAudit('https://example/checkout/sales-maintenance',{token:'tok',fetchImpl,sleep:ms=>waits.push(ms),timeoutMs:0});
  assert.equal(response.status,200);
  assert.equal(n,3);
  assert.deepEqual(waits,[5000,5000]);
});

test('postAudit stops after six not-found responses', async()=>{
  let n=0; const waits=[];
  const fetchImpl=async()=>{ n++; return jsonResponse(404); };
  const response=await postAudit('https://example/checkout/sales-maintenance?action=reset&slug=x',{token:'tok',fetchImpl,sleep:ms=>waits.push(ms),timeoutMs:0});
  assert.equal(response.status,404);
  assert.equal(n,6);
  assert.deepEqual(waits,[5000,5000,5000,5000,5000]);
});

test('postAudit does not retry a configured failure', async()=>{
  let n=0;
  const fetchImpl=async()=>{ n++; return jsonResponse(503); };
  const response=await postAudit('https://example/checkout/sales-maintenance',{token:'tok',fetchImpl,sleep:noWait,timeoutMs:0});
  assert.equal(response.status,503);
  assert.equal(n,1);
});

test('sales maintenance stays routed and the unauthenticated denial is a single check',()=>{
  const worker=readFileSync(new URL('../cloudflare/commission-worker.js',import.meta.url),'utf8');
  assert.match(worker,/if \(path === '\/checkout\/sales-maintenance'\) return salesMaintenance\(request,env\);/);
  const source=readFileSync(new URL('./verify-production.mjs',import.meta.url),'utf8');
  assert.match(source,/postAudit\(base\+'\/checkout\/sales-maintenance',\{token:secret\}\)/);
  assert.match(source,/postAudit\(base\+'\/checkout\/sales-maintenance\?action=reset/);
  assert.match(source,/const denied=await fetch\(base\+'\/checkout\/sales-maintenance',\{method:'POST'\}\);if\(denied\.status!==404\)/);
});
