document.addEventListener('DOMContentLoaded',async()=>{
  const form=document.querySelector('[data-print-samples]'),message=form.querySelector('[data-sample-status]'),button=form.querySelector('button');
  const catalog=await window.vaCartReady;
  const choices=[...form.querySelectorAll('select')];
  const ids=choices.flatMap(s=>[...s.options].map(o=>o.value).filter(Boolean));
  if(!catalog?.enabled||!ids.every(id=>catalog.products.some(p=>p.id===id&&p.sampleOnly&&p.status==='available'&&p.methods.includes('paypal')))){message.textContent='Sample checkout is not available yet. Please refresh in a moment.';return;}
  button.disabled=false;message.textContent='Choose one copy of either or both paintings.';
  form.addEventListener('submit',event=>{
    event.preventDefault();const selected=choices.map(s=>s.value).filter(Boolean);
    if(!selected.length){message.textContent='Choose at least one painting.';return;}
    button.disabled=true;let ok=true;
    for(const id of selected)document.dispatchEvent(new CustomEvent('cart:add-print',{detail:{id,quantity:1,onResult:result=>{if(!result.ok){ok=false;message.textContent=result.message;}}}}));
    if(ok)location.assign('/cart/');else button.disabled=false;
  });
});
