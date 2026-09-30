(() => {
  const size=d=>`${Number(d.width.toFixed(2))} × ${Number(d.height.toFixed(2))} in`;
  document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-print-options]').forEach(async root=>{
    const options=JSON.parse(root.dataset.options),preview=root.dataset.preview==='true',button=root.querySelector('[data-print-add]'),message=root.querySelector('[data-print-message]');
    let selected=options[0],capabilities=null;
    const update=()=>{
      const o=selected,p=o.paper||o.image,sheet=root.querySelector('[data-print-sheet]'),area=root.querySelector('[data-print-image-area]');
      root.querySelectorAll('.print-choice').forEach(label=>label.classList.toggle('is-selected',label.querySelector('input').value===o.id));
      sheet.style.aspectRatio=`${p.width} / ${p.height}`;area.style.width=`${o.image.width/p.width*100}%`;area.style.height=`${o.image.height/p.height*100}%`;
      root.querySelector('[data-print-dimensions]').textContent=`Image: ${size(o.image)}${o.paper?` · Paper: ${size(o.paper)}`:' · Paper size to be confirmed'}`;
      root.querySelector('[data-print-paper]').textContent=o.paperLabel;
      const list=root.querySelector('[data-print-readiness]');if(list){list.replaceChildren();for(const reason of o.reasons){const li=document.createElement('li');li.textContent=reason;list.append(li);}if(!o.reasons.length)list.textContent='This size is ready for final release review.';}
      button.disabled=preview||!o.ready||!capabilities?.products?.some(p=>p.id===o.id&&p.status==='available');
      message.textContent=!preview&&button.disabled?'This print is not currently available to order.':'';
    };
    root.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{selected=options.find(o=>o.id===input.value);update();}));
    button.addEventListener('click',()=>{
      const quantity=Number(root.querySelector('[data-print-quantity]').value);
      if(!Number.isSafeInteger(quantity)||quantity<1||quantity>10){message.textContent='Choose between 1 and 10 copies.';return;}
      document.dispatchEvent(new CustomEvent('cart:add-print',{detail:{id:selected.id,quantity,onResult:result=>{
        message.replaceChildren(document.createTextNode(result.message));if(result.ok){const link=document.createElement('a');link.href='/cart/';link.textContent=' View your cart';message.append(link);}
      }}}));
    });
    update();capabilities=await window.vaCartReady;update();
  }));
})();
