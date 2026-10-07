// Bounded retry for CI verification calls to the live checkout. Print providers occasionally answer
// with a transient 422, 429, 5xx, or an HTML error page; those are retried a few times with backoff.
// Persistent failures still throw after the last attempt, and non-idempotent actions are never retried.
const RETRY_STATUS=new Set([408,422,425,429,500,502,503,504,520,522,524]);
export async function fetchWithRetry(url,init={},{attempts=3,delays=[3000,10000],label='request',retry=true,timeout}={}){
  let last;
  for(let attempt=1;attempt<=attempts;attempt++){
    try{
      const r=await fetch(url,timeout?{...init,signal:AbortSignal.timeout(timeout)}:init);
      const html=/text\/html/i.test(r.headers.get('content-type')||'');
      if(r.ok&&!html)return r;
      last=r;
      if(!retry||attempt===attempts||!(RETRY_STATUS.has(r.status)||html))return r;
      console.warn(`${label}: HTTP ${r.status}${html?' (HTML)':''}, retrying (${attempt}/${attempts - 1})`);
    }catch(error){
      last=error;
      if(!retry||attempt===attempts)throw error;
      console.warn(`${label}: ${error.name||'error'}, retrying (${attempt}/${attempts - 1})`);
    }
    await new Promise(resolve=>setTimeout(resolve,delays[Math.min(attempt-1,delays.length-1)]));
  }
  return last;
}
