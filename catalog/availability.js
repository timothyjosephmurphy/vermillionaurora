// Static content is always readable; live stock overrides availability after load.
(() => {
 const nodes=[...document.querySelectorAll('[data-product-id]')];
 const ids=[...new Set(nodes.map(node=>node.dataset.productId))];
 if(!ids.length)return;
 const endpoint='https://vermillion-commissions.timothyjosephmurphy.workers.dev/inventory/status';
 const labels={available:'Available',inquiry:'Available by inquiry',reserved:'Temporarily reserved',sold:'Sold','not-for-sale':'Not for sale',retired:'Unavailable'};
 const availableTrack=document.querySelector('[data-available-paintings]');
 const collectorTrack=document.querySelector('[data-collector-paintings]');
 function moveHomepagePainting(node,value){
  if(!availableTrack||!collectorTrack||!node.matches('.product-card'))return;
  if(node.parentElement!==availableTrack&&node.parentElement!==collectorTrack)return;
  const target=['available','inquiry'].includes(value)?availableTrack:collectorTrack;
  if(node.parentElement!==target)target.append(node);
 }
 function updateHomepageEmptyMessages(){
  // The homepage only ships empty-state text when a track is really empty; add it here if live stock empties one.
  const toggle=(empty,hasItems,text)=>{if(!empty)return;if(!hasItems&&!empty.textContent.trim())empty.textContent=text;empty.hidden=hasItems;};
  if(availableTrack)toggle(document.querySelector('[data-available-empty]'),availableTrack.children.length>0,'No original paintings are available right now. Browse the collector\u2019s items or ask about a commission.');
  if(collectorTrack)toggle(document.querySelector('[data-collector-empty]'),collectorTrack.children.length>0,'There are no sold or unavailable works in this selection right now.');
 }
 for(const node of nodes){
  node.querySelectorAll('[data-live-status]').forEach(el=>{el.dataset.initialText=el.textContent;});
  node.querySelectorAll('[data-card-price]').forEach(el=>{el.dataset.price=el.textContent;});
  if(node.dataset.caption)node.dataset.initialCaption=node.dataset.caption;
 }
 let busy=false,lastSignature;
 async function refresh() {
  if(busy||document.hidden)return;busy=true;
  try {
   const status={};
   for(let i=0;i<ids.length;i+=80){const response=await fetch(`${endpoint}?ids=${encodeURIComponent(ids.slice(i,i+80).join(','))}`,{cache:'no-store',signal:AbortSignal.timeout(10000)});if(!response.ok)throw Error('Availability unavailable');Object.assign(status,(await response.json()).availability);}
   const signature=JSON.stringify(status);if(signature===lastSignature)return;lastSignature=signature;
   for(const node of nodes) {
    const value=status[node.dataset.productId],label=labels[value];if(!label)continue;
    node.dataset.availability=label;
    node.querySelectorAll('[data-live-status]').forEach(el=>{el.textContent=value==='available'?el.dataset.initialText:label;if(value!=='available')el.hidden=false;});
    node.querySelectorAll('[data-card-price]').forEach(el=>{el.textContent=value==='available'?el.dataset.price:label;});
    if(node.dataset.caption){node.dataset.caption=value==='available'?node.dataset.initialCaption:node.dataset.initialCaption.replace(/ · [^]*$/,' · '+label);}
    moveHomepagePainting(node,value);
   }
   updateHomepageEmptyMessages();
   document.dispatchEvent(new CustomEvent('catalog:availability',{detail:status}));
  }catch { /* Keep inquiry links and server-authoritative checkout available. */ }
  finally{busy=false;}
 }
 refresh();setInterval(refresh,30000);document.addEventListener('visibilitychange',()=>{if(!document.hidden)refresh();});
})();
