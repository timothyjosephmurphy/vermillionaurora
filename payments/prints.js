(() => {
  const size=d=>`${Number(d.width.toFixed(1))} × ${Number(d.height.toFixed(1))} in`;// one decimal for buyers; exact values stay in the data
  document.addEventListener('DOMContentLoaded',()=>{
    const dialog=document.querySelector('[data-print-dialog]'),trigger=document.querySelector('[data-print-open]');
    if(!dialog||!trigger)return;
    let scrollX=0,scrollY=0,startedOnBackdrop=false;
    const open=()=>{
      if(dialog.open)return;
      scrollX=window.scrollX;scrollY=window.scrollY;
      dialog.showModal();dialog.scrollTop=0;
      document.documentElement.style.setProperty('--print-dialog-scroll',`-${scrollY}px`);
      document.documentElement.classList.add('print-dialog-open');
    };
    trigger.addEventListener('click',open);
    dialog.querySelector('[data-print-close]').addEventListener('click',()=>dialog.close());
    const outside=event=>{const r=dialog.getBoundingClientRect();return event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom;};
    dialog.addEventListener('pointerdown',event=>{startedOnBackdrop=event.target===dialog&&outside(event);});
    dialog.addEventListener('click',event=>{if(startedOnBackdrop&&event.target===dialog&&outside(event))dialog.close();startedOnBackdrop=false;});
    dialog.addEventListener('close',()=>{
      document.documentElement.classList.remove('print-dialog-open');
      document.documentElement.style.removeProperty('--print-dialog-scroll');
      window.scrollTo({left:scrollX,top:scrollY,behavior:'instant'});
      trigger.focus({preventScroll:true});
    });
    // Preserve links shared before the print selector moved into a dialog.
    const openFromHash=()=>{if(location.hash==='#print-options')open();};
    window.addEventListener('hashchange',openFromHash);openFromHash();
  });
  document.addEventListener('DOMContentLoaded',()=>document.querySelectorAll('[data-print-options]').forEach(async root=>{
    const options=JSON.parse(root.dataset.options),preview=root.dataset.preview==='true',button=root.querySelector('[data-print-add]'),message=root.querySelector('[data-print-message]');
    let sizeOption=options.find(o=>o.id===root.querySelector('input[type="radio"]:checked')?.value)||options[0],selected=sizeOption,capabilities=null;
    const finish=root.querySelector('[data-print-finish]');
    const presented=o=>finish.value==='none'?o:[...(o.matOptions||[]),...(o.frameOptions||[])].find(m=>m.finishKey===finish.value);
    const update=()=>{
      selected=presented(sizeOption);
      const o=selected||sizeOption,p=o.mat?.outer||o.paper||o.image,sheet=root.querySelector('[data-print-sheet]'),area=root.querySelector('[data-print-image-area]');
      root.querySelectorAll('.print-choice').forEach(label=>{
        const input=label.querySelector('input'),choice=presented(options.find(o=>o.id===input.value));
        label.classList.toggle('is-selected',input.value===sizeOption.id);
        label.querySelector('b').textContent=!choice?'Unavailable':choice.amount?`$${Number(choice.amount).toFixed(2)}`:preview?'Price pending':'Coming soon';
        input.disabled=!preview&&!choice?.ready;
      });
      sheet.classList.toggle('is-matted',!!selected?.mat);
      sheet.classList.toggle('is-framed',!!selected?.frame);
      sheet.style.setProperty('--print-frame-color',selected?.frame?.color||'#262321');
      const previewUrl=o.previewUrl||sizeOption.previewUrl;if(previewUrl)area.querySelector('img').src=previewUrl;
      const shown=o.previewIncludesPaper?o.paper:o.image;
      // A shared physical scale makes a smaller print visibly smaller too.
      const largestWidth=Math.max(...options.map(base=>{const choice=presented(base)||base;return (choice.mat?.outer||choice.paper||choice.image).width;}));
      sheet.style.width=`${p.width/largestWidth*100}%`;
      sheet.style.maxWidth=`${320*p.width/largestWidth}px`;
      sheet.style.aspectRatio=`${p.width} / ${p.height}`;area.style.width=`${shown.width/p.width*100}%`;area.style.height=`${shown.height/p.height*100}%`;
      root.querySelector('[data-print-dimensions]').textContent=`Image: ${size(o.image)}${o.paper?` · Paper: ${size(o.paper)}`:' · Paper size to be confirmed'}${o.mat?` · Mat / frame size: ${size(o.mat.outer)}`:''}`;
      root.querySelector('[data-print-paper]').textContent=o.paperLabel;
      root.querySelector('[data-print-total]').textContent=selected?.amount?`${selected.frame?'Framed print':selected.mat?'Print + mat':'Print'}: $${Number(selected.amount).toFixed(2)}`:finish.value!=='none'&&!selected?'This presentation is unavailable in the selected size.':'Price pending';
      const border=o.frame?Number(((o.mat.outer.width-o.paper.width)/2).toFixed(1)):null;
      root.querySelector('[data-print-mat-note]').textContent=o.frame?`${o.frame.name} custom frame with a ${border}-inch white conservation mat border and ${o.frame.glazing.name}. Sized for this print, assembled and shipped by FinerWorks.`:o.mat?`White conservation mat · Fits a ${size(o.mat.outer)} frame. The window overlaps the print edges slightly. Frame purchased separately.`:finish.value!=='none'?'Choose another print size or Unframed print.':o.sizeBasis==='image-proportional'?'Unframed watercolor-paper print with a narrow white margin. Choose a frame or custom mat to fit the paper dimensions shown.':'An unframed print lets you choose your own frame. Add a white mat or have FinerWorks frame it for you.';
      root.querySelector('[data-print-inclusions]').textContent=o.frame?'Price includes the print, frame, white mat and glazing.':o.mat?'Price includes the print and mat. Frame not included.':'Print only; frame not included.';
      root.querySelector('[data-print-own-frame]').hidden=!!o.frame;
      for(const option of finish.options){const candidate=option.value==='none'?sizeOption:[...(sizeOption.matOptions||[]),...(sizeOption.frameOptions||[])].find(o=>o.finishKey===option.value);option.disabled=!preview&&!candidate?.ready;}
      const list=root.querySelector('[data-print-readiness]');if(list){list.replaceChildren();for(const reason of o.reasons||[]){const li=document.createElement('li');li.textContent=reason;list.append(li);}if(!o.reasons?.length)list.textContent='This size is ready for final release review.';}
      const samePrintRelease=capabilities?.version?.endsWith('-'+root.dataset.printVersion);
      button.disabled=preview||!selected?.ready||!samePrintRelease||!capabilities?.products?.some(p=>p.id===selected.id&&p.status==='available');
      if(!preview)button.textContent=selected?.frame?'Add framed print to cart':'Add print to cart';
      message.textContent=!preview&&button.disabled?'This print is not currently available to order.':'';
      root.dispatchEvent(new Event('print:selectionchange',{bubbles:true}));
    };
    root.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{sizeOption=options.find(o=>o.id===input.value);update();}));
    finish.addEventListener('change',update);
    button.addEventListener('click',()=>{
      if(button.disabled||!selected)return;
      const quantity=Number(root.querySelector('[data-print-quantity]').value);
      if(!Number.isSafeInteger(quantity)||quantity<1||quantity>(selected.sampleOnly?1:10)){message.textContent=selected.sampleOnly?'Choose one sample copy per painting.':'Choose between 1 and 10 copies.';return;}
      document.dispatchEvent(new CustomEvent('cart:add-print',{detail:{id:selected.id,quantity,onResult:result=>{
        message.textContent=result.message;if(result.ok)location.assign('/cart/');
      }}}));
    });
    update();capabilities=await window.vaCartReady;update();
  }));
})();
