export function etsyConnectPage(headers) {
  const nonce = crypto.randomUUID();
  return new Response(`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Connect Etsy · Vermillion Aurora</title>
<style nonce="${nonce}">body{font:18px/1.6 system-ui,sans-serif;background:#151b1a;color:#f6f0df;margin:0}main{max-width:660px;margin:8vh auto;padding:24px}h1{font-family:Georgia,serif;font-weight:400;font-size:2.5rem;line-height:1.15}label,input{display:block}input,button{font:inherit;box-sizing:border-box;border-radius:4px;padding:12px}input{width:100%;margin:8px 0 18px;background:#fff;color:#111}button{cursor:pointer;border:1px solid #c9b28a;background:#ead5ae;color:#151b1a;margin:0 8px 8px 0}button:disabled{opacity:.5;cursor:wait}a{color:#ead5ae}code{overflow-wrap:anywhere;font-size:.85em}#status{min-height:2em}small{color:#c6cdc8}</style></head>
<body><main><p>VERMILLION AURORA · OWNER ACCESS</p><h1>Connect your Etsy shop</h1>
<p>Authorize VermillionAurora so we can prepare its listings. This connection does not publish listings or start order synchronization.</p>
<p>First, add this exact callback URL in <a href="https://www.etsy.com/developers/your-apps" rel="noreferrer" target="_blank">your Etsy app settings</a>:</p>
<p><code>https://vermillion-commissions.timothyjosephmurphy.workers.dev/etsy/callback</code></p>
<form id="connect"><label for="token">Commission manager token</label><input id="token" type="password" autocomplete="off" required><small>Use the value of COMMISSION_MANAGER_TOKEN from your private setup. It is never saved in browser storage. Your Etsy keys are already stored on the server.</small><p><button type="submit">Connect Etsy</button><button type="button" id="check">Check connection</button></p></form>
<p id="status" role="status" aria-live="polite"></p><p><small>Access requested: read shop details, read listings, and create or edit listings. Starting again replaces an unfinished connection attempt.</small></p>
<p><a href="https://vermillionaurora.com">Return to Vermillion Aurora</a></p></main>
<script nonce="${nonce}">
const token=document.getElementById('token'),status=document.getElementById('status'),form=document.getElementById('connect');
const messages={
 saved:'Authorization saved. Enter your manager token and check the connection to confirm the shop.',
 expired:'This connection attempt expired or was replaced. Please start again in this browser.',
 denied:'Etsy access was not approved. You can try again.',
 unavailable:'The Worker is missing Etsy secrets or private storage.',
 'wrong-shop':'The approved Etsy account does not own the expected VermillionAurora shop.',
 'token-response':'Etsy returned an incomplete authorization response. Check that this Etsy app has the requested shop and listing permissions.',
 'token-scopes':'Etsy did not grant all requested permissions. Reauthorize and approve access to shop details and listings.',
 'shop-network':'Etsy approved the token, but its shop lookup could not be reached. Try again shortly.',
 'shop-response':'Etsy approved the token, but returned an unreadable shop response.',
 'storage-conflict':'The connection changed while Etsy was responding. Start again to retry.',
 'storage-read':'The Worker could not read this attempt from private storage. Start a fresh connection.',
 'storage-pending-save':'The Worker could not update private storage before contacting Etsy. Start a fresh connection.',
 'token-network':'The Worker could not reach Etsy’s token service. Start a fresh connection attempt; if this keeps happening, Etsy may be having an API issue.',
 'token-redirect':'Etsy redirected the token request, so the Worker stopped without following it. Start a fresh connection attempt; if Etsy keeps redirecting, contact Etsy API support.',
 'storage-save':'Etsy approved the connection, but the Worker could not save it to private storage. Start a fresh connection.',
 'connection-internal':'The Worker could not safely save the Etsy connection. Try again; no provider details were exposed.'
};
const result=new URLSearchParams(location.search).get('result')||'';
const tokenHttp=/^token-http-(400|401|403|429|\d{3})$/.exec(result);
const shopHttp=/^shop-http-(400|401|403|404|429|\d{3})$/.exec(result);
if(tokenHttp)messages[result]='Etsy rejected the authorization exchange (HTTP '+tokenHttp[1]+'). Check that the Etsy key string and shared secret belong to the same app, then start a fresh connection.';
if(shopHttp)messages[result]='Etsy accepted authorization, but shop verification returned HTTP '+shopHttp[1]+'. Confirm the approved Etsy account owns VermillionAurora and that shop read permission was granted.';
status.textContent=messages[result]||'';
history.replaceState(null,'','/etsy/connect');
async function act(path){
 if(!form.reportValidity())return;
 const credential=token.value;token.value='';
 const buttons=[...form.querySelectorAll('button')];buttons.forEach(b=>b.disabled=true);status.textContent='Connecting…';
 try{
  const response=await fetch(path,{method:'POST',cache:'no-store',headers:{Authorization:'Bearer '+credential}});
  const data=await response.json();if(!response.ok)throw Error(data.error||'Unable to connect.');
  if(data.url){location.assign(data.url);return;}
  status.textContent=data.connected?'Connected to '+data.shopName+' (shop '+data.shopId+'). Authorization saved '+new Date(data.authorizedAt).toLocaleString()+'.':'Server settings are ready. Enter the manager token again and choose Connect Etsy.';
 }catch(error){status.textContent=error.message;}finally{buttons.forEach(b=>b.disabled=false);}
}
form.addEventListener('submit',event=>{event.preventDefault();act('/etsy/start');});
document.getElementById('check').addEventListener('click',()=>act('/etsy/status'));
window.addEventListener('pagehide',()=>{token.value='';});
</script></body></html>`, { headers: { ...headers, 'Content-Type': 'text/html; charset=utf-8', 'Content-Security-Policy': `default-src 'none'; script-src 'nonce-${nonce}'; style-src 'nonce-${nonce}'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'; form-action 'none'` } });
}
