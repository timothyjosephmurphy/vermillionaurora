// Static content is always readable; live stock overrides availability after load.
(() => {
 const nodes=[...document.querySelectorAll('[data-product-id]')];
 const ids=[...new Set(nodes.map(node=>node.dataset.productId))];
 if(!ids.length)return;
 const endpoint='https://vermillion-commissions.timothyjosephmurphy.workers.dev/inventory/status';
 const labels={available:'Available',reserved:'Temporarily reserved',sold:'Sold','not-for-sale':'Not for sale',retired:'Unavailable'};
 let busy=false;
 async function refresh() {
  if(busy||document.hidden)return;busy=true;
  try {
   const status={};
   for(let i=0;i<ids.length;i+=80){const response=await fetch(`${endpoint}?ids=${encodeURIComponent(ids.slice(i,i+80).join(','))}`,{cache:'no-store',signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('Availability unavailable');Object.assign(status,(await response.json()).availability);}
   for(const node of nodes) {
    const value=status[node.dataset.productId],label=labels[value];if(!label)continue;
    if(!node.dataset.initialAvailability)node.dataset.initialAvailability=node.dataset.availability||node.querySelector('[data-live-status]')?.textContent||'';
    node.dataset.availability=label;
    node.querySelectorAll('[data-live-status]').forEach(el=>{if(!el.dataset.initialText)el.dataset.initialText=el.textContent;el.textContent=value==='available'?el.dataset.initialText:label;if(value!=='available')el.hidden=false;});
    node.querySelectorAll('[data-card-price]').forEach(el=>{if(!el.dataset.price)el.dataset.price=el.textContent;el.textContent=value==='available'?el.dataset.price:label;});
    if(node.dataset.caption){if(!node.dataset.initialCaption)node.dataset.initialCaption=node.dataset.caption;node.dataset.caption=value==='available'?node.dataset.initialCaption:node.dataset.initialCaption.replace(/ · [^]*$/,' · '+label);}
   }
   document.dispatchEvent(new CustomEvent('catalog:availability',{detail:status}));
  }catch { /* Keep inquiry links and server-authoritative checkout available. */ }
  finally{busy=false;}
 }
 refresh();setInterval(refresh,30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
})();
