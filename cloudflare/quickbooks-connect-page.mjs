// Owner page for the QuickBooks connection. The manager token stays in this tab's sessionStorage.
export function quickbooksConnectPage(headers, environment) {
  const nonce = crypto.randomUUID();
  const style = `body{font:17px/1.55 system-ui,sans-serif;background:#f7f1ea;color:#1d1a17;margin:0}main{max-width:760px;margin:6vh auto;padding:24px}
h1{font:400 2.4rem/1.15 Georgia,serif;margin:0 0 .5rem}label{display:block;margin:1rem 0 .3rem;font-weight:600}input{width:100%;box-sizing:border-box;padding:10px;font:inherit}
button{margin:14px 10px 0 0;padding:11px 18px;border-radius:6px;border:1px solid #2ca01c;background:#2ca01c;color:#fff;font:600 16px system-ui;cursor:pointer}
button.secondary{background:#fff;color:#1d1a17;border-color:#9a8f84}pre{white-space:pre-wrap;background:#fff;border:1px solid #d8cfc4;padding:12px;font-size:14px;overflow:auto}
.note{color:#5e554d}.result{padding:10px 12px;background:#fff;border-left:4px solid #2ca01c}`;
  const script = `const $=id=>document.getElementById(id),out=$("out");
const token=()=>{const v=$("token").value.trim();if(v)sessionStorage.setItem("va-manager",v);return v||sessionStorage.getItem("va-manager")||"";};
$("token").value=sessionStorage.getItem("va-manager")||"";
async function call(path,body){const r=await fetch(path,{method:"POST",headers:{Authorization:"Bearer "+token(),"Content-Type":"application/json"},body:JSON.stringify(body||{})});const d=await r.json().catch(()=>({error:"HTTP "+r.status}));if(!r.ok)throw Error(d.error||("HTTP "+r.status));return d;}
const show=v=>{out.textContent=typeof v==="string"?v:JSON.stringify(v,null,2);};
$("connect").onclick=async()=>{try{const d=await call("/quickbooks/start");location.href=d.url;}catch(e){show(e.message);}};
$("status").onclick=async()=>{try{show(await call("/quickbooks/status"));}catch(e){show(e.message);}};
$("sync").onclick=async()=>{try{show(await call("/quickbooks/sync"));}catch(e){show(e.message);}};
$("logs").onclick=async()=>{try{const d=await call("/quickbooks/logs",{limit:1000});show(d);const blob=new Blob([JSON.stringify(d,null,2)],{type:"application/json"});const a=$("download");a.href=URL.createObjectURL(blob);a.hidden=false;}catch(e){show(e.message);}};
$("retry").onclick=async()=>{const id=prompt("Order id to retry (cart:…)");if(id)try{show(await call("/quickbooks/retry",{orderId:id}));}catch(e){show(e.message);}};
$("disconnect").onclick=async()=>{if(!confirm("Disconnect QuickBooks? Sales will no longer be recorded automatically."))return;try{const d=await call("/quickbooks/disconnect");location.href=d.redirect;}catch(e){show(e.message);}};
const result=new URLSearchParams(location.search).get("result");if(result){$("result").hidden=false;$("result").textContent=({connected:"QuickBooks is connected.",denied:"Authorization was cancelled in QuickBooks.",expired:"That connection attempt expired. Start again.","not-usd":"This QuickBooks company does not use US dollars; it was not connected."})[result]||("Connection did not complete ("+result+"). Check the log.");}`;
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow">
<title>QuickBooks connection · Vermillion Aurora</title><style nonce="${nonce}">${style}</style></head><body><main>
<h1>QuickBooks connection</h1><p class="note">Owner only. Records completed vermillionaurora.com sales in TJ Murphy’s QuickBooks Online${environment === 'sandbox' ? ' <strong>(sandbox)</strong>' : ''}. Support: <a href="mailto:tj@vermillionaurora.com">tj@vermillionaurora.com</a>.</p>
<p id="result" class="result" role="status" hidden></p>
<label for="token">Manager token</label><input id="token" type="password" autocomplete="off">
<div><button id="connect" type="button">Connect to QuickBooks</button><button id="status" class="secondary" type="button">Status</button><button id="sync" class="secondary" type="button">Sync now</button>
<button id="logs" class="secondary" type="button">API log</button><button id="retry" class="secondary" type="button">Retry an order</button><button id="disconnect" class="secondary" type="button">Disconnect</button></div>
<p><a id="download" download="quickbooks-log.json" hidden>Download log (JSON)</a></p><pre id="out" aria-live="polite"></pre>
<p class="note"><a href="https://vermillionaurora.com/quickbooks/">About this integration</a> · <a href="https://vermillionaurora.com/privacy/">Privacy</a> · <a href="https://vermillionaurora.com/terms/">Terms</a></p>
</main><script nonce="${nonce}">${script}</script></body></html>`;
  return new Response(html, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8',
    'Content-Security-Policy': `default-src 'none'; style-src 'nonce-${nonce}'; script-src 'nonce-${nonce}'; connect-src 'self'; img-src 'self' blob:; form-action 'none'; frame-ancestors 'none'; base-uri 'none'` } });
}
