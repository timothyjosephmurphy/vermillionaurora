import {it,expect,afterEach,vi} from 'vitest';
import {bitcoinApi} from '../bitcoin-api.mjs';

const env={BTCPAY_URL:'https://btcpay.example.test',BTCPAY_STORE_ID:'store',BTCPAY_API_KEY:'fake'};
afterEach(()=>vi.unstubAllGlobals());

it('uses a request mode accepted by the real Workers runtime for invoice reads and creation',async()=>{
  const requests=[];
  vi.stubGlobal('fetch',vi.fn(async(input,init)=>{
    // Keep native Request validation: replacing fetch alone hides unsupported
    // workerd redirect modes, which fail before any provider call is sent.
    const request=new Request(input,init);requests.push(request);
    return Response.json([]);
  }));
  expect(await bitcoinApi(env,'/invoices?take=1')).toEqual([]);
  expect(await bitcoinApi(env,'/invoices',{amount:'20.00',currency:'USD'})).toEqual([]);
  expect(requests.map(r=>r.method)).toEqual(['GET','POST']);
  for(const request of requests)expect(request.redirect).toBe('manual');
});

it('rejects redirects without forwarding BTCPay credentials',async()=>{
  const send=vi.fn(async(input,init)=>{
    expect(new Request(input,init).redirect).toBe('manual');
    return new Response(null,{status:302,headers:{Location:'https://different.example.test'}});
  });
  vi.stubGlobal('fetch',send);
  await expect(bitcoinApi(env,'/invoices')).rejects.toThrow('BTCPay API 302');
  expect(send).toHaveBeenCalledTimes(1);
});
