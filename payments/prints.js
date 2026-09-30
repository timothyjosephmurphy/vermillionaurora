(() => {
  const size=d=>`${Number(d.width.toFixed(2))} × ${Number(d.height.toFixed(2))} in`;
  document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-print-options]').forEach(async root=>{
    const options=JSON.parse(root.dataset.options),preview=root.dataset.preview==='true',button=root.querySelector('[data-print-add]'),message=root.querySelector('[data-print-message]');
    let sizeOption=options[0],selected=sizeOption,capabilities=null;
    const finish=root.querySelector('[data-print-finish]');
    const presented=o=>finish.value==='none'?o:o.matOptions?.find(m=>m.finishKey===finish.value);
    const update=()=>{
      selected=presented(sizeOption);
      const o=selected||sizeOption,p=o.mat?.outer||o.paper||o.image,sheet=root.querySelector('[data-print-sheet]'),area=root.querySelector('[data-print-image-area]');
      root.querySelectorAll('.print-choice').forEach(label=>{
        const input=label.querySelector('input'),choice=presented(options.find(o=>o.id===input.value));
        label.classList.toggle('is-selected',input.value===sizeOption.id);
        label.querySelector('b').textContent=!choice?'No matching mat':choice.amount?`$${Number(choice.amount).toFixed(2)}`:preview?'Price pending':'Coming soon';
        input.disabled=!preview&&!choice?.ready;
      });
      sheet.classList.toggle('is-matted',!!selected?.mat);
      sheet.style.aspectRatio=`${p.width} / ${p.height}`;area.style.width=`${o.image.width/p.width*100}%`;area.style.height=`${o.image.height/p.height*100}%`;
      root.querySelector('[data-print-dimensions]').textContent=`Image: ${size(o.image)}${o.paper?` · Paper: ${size(o.paper)}`:' · Paper size to be confirmed'}${o.mat?` · Mat / frame size: ${size(o.mat.outer)}`:''}`;
      root.querySelector('[data-print-paper]').textContent=o.paperLabel;
      root.querySelector('[data-print-total]').textContent=selected?.amount?`${selected.mat?'Print + mat':'Print'}: $${Number(selected.amount).toFixed(2)}`:finish.value!=='none'&&!selected?'No standard mat size is available for this print.':'Price pending';
      root.querySelector('[data-print-mat-note]').textContent=o.mat?`White conservation mat · Fits a ${size(o.mat.outer)} frame. The window overlaps the print edges slightly. Frame purchased separately.`:finish.value!=='none'?'This size needs a custom framing consultation. Choose another print size or Print only.':'A mat adds a white border around your print, sized to fit a standard frame. Frame purchased separately.';
      const list=root.querySelector('[data-print-readiness]');if(list){list.replaceChildren();for(const reason of o.reasons||[]){const li=document.createElement('li');li.textContent=reason;list.append(li);}if(!o.reasons?.length)list.textContent='This size is ready for final release review.';}
      button.disabled=preview||!selected?.ready||!capabilities?.products?.some(p=>p.id===selected.id&&p.status==='available');
      message.textContent=!preview&&button.disabled?'This print is not currently available to order.':'';
      root.dispatchEvent(new Event('print:selectionchange',{bubbles:true}));
    };
    root.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{sizeOption=options.find(o=>o.id===input.value);update();}));
    finish.addEventListener('change',update);
    button.addEventListener('click',()=>{
      if(button.disabled||!selected)return;
      const quantity=Number(root.querySelector('[data-print-quantity]').value);
      if(!Number.isSafeInteger(quantity)||quantity<1||quantity>10){message.textContent='Choose between 1 and 10 copies.';return;}
      document.dispatchEvent(new CustomEvent('cart:add-print',{detail:{id:selected.id,quantity,onResult:result=>{
        message.replaceChildren(document.createTextNode(result.message));if(result.ok){const link=document.createElement('a');link.href='/cart/';link.textContent=' View your cart';message.append(link);}
      }}}));
    });
    update();capabilities=await window.vaCartReady;update();
  }));
})();
