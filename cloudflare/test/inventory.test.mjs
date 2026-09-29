import {env} from 'cloudflare:workers';
import {runInDurableObject,evictDurableObject} from 'cloudflare:test';
import {it,expect,afterEach,vi} from 'vitest';
const objects=[];
afterEach(async()=>{for(const stub of objects)await runInDurableObject(stub,(_,ctx)=>ctx.storage.deleteAlarm());objects.length=0;vi.unstubAllGlobals();});
function stock(){const stub=env.PAINTING_STOCK.getByName(crypto.randomUUID());objects.push(stub);return stub;}
it('one concurrent buyer wins and sold stock survives eviction without a website build',async()=>{
 const stub=stock();await stub.initialize('painting-portrait-in-green');
 const won=await Promise.all([stub.reserve('first'),stub.reserve('second')]);expect(won.filter(Boolean)).toHaveLength(1);
 const hold=won[0]?'first':'second';
 expect(await stub.bindOrder(hold,'ORDER',{title:'Saved title',base:'20.00',shipping:'6.01',tax:'1.02',total:'27.03',taxCalculationId:'taxcalc_test',address:{name:'Buyer'}})).toBe(true);
 expect((await stub.order()).base).toBe('20.00');
 await stub.complete('ORDER','CAP');await stub.complete('ORDER','CAP');
 expect(await stub.status()).toBe('sold');expect(await stub.reserve('third')).toBe(false);
 await runInDurableObject(stub,(_,ctx)=>ctx.storage.deleteAlarm());await evictDurableObject(stub);
 expect(await stub.status()).toBe('sold');
 expect(await runInDurableObject(stub,(_,ctx)=>ctx.storage.sql.exec('SELECT count(*) n FROM sale_receipt').one().n)).toBe(1);
});
it('live sale publication needs no GitHub token or repository request',async()=>{
 const stub=stock();await stub.initialize('painting-portrait-in-green');await stub.reserve('hold');
 await stub.bindOrder('hold','ORDER',{title:'Saved title',base:'20.00',shipping:'6.00',tax:'0.00',total:'26.00',taxCalculationId:'taxcalc_test',address:{name:'Buyer'}});
 await stub.complete('ORDER','CAP');
 const calls=[];vi.stubGlobal('fetch',vi.fn(async url=>{calls.push(String(url));throw Error('Providers unavailable');}));
 await runInDurableObject(stub,async instance=>{instance.env={...instance.env,PAYPAL_MODE:'live',GITHUB_TOKEN:undefined,SALES_LEDGER:{getByName:()=>({record:async()=>{}})}};await instance.alarm();});
 expect((await stub.verification()).published).toBe(true);expect(await stub.status()).toBe('sold');expect(calls.some(url=>url.includes('github.com'))).toBe(false);
});
it('legacy notification replay is idempotent and cannot overwrite another buyer',async()=>{
 const stub=stock();await stub.initialize('legacy-painting');
 expect(await stub.recordExternalSale('TX1')).toBe(true);expect(await stub.recordExternalSale('TX1')).toBe(true);expect(await stub.recordExternalSale('TX2')).toBe(false);expect(await stub.status()).toBe('sold');
 const held=stock();await held.initialize('held-painting');await held.reserve('buyer');expect(await held.recordExternalSale('TX3')).toBe(false);expect(await held.status()).toBe('reserved');
});
