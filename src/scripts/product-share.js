function setupProductShare(root) {
  const {shareUrl: url, shareTitle: title, shareImage: image, shareSlug: slug}=root.dataset;
  const status=root.querySelector('[data-share-status]');
  const panels=[...root.querySelectorAll('[data-share-panel]')];
  const toggles=[...root.querySelectorAll('[data-share-toggle]')];
  const setStatus=(message)=>{status.textContent=message;};
  const selectForCopy=(field)=>{field.focus();field.select();};
  const copy=async(text,field,message)=>{
    try {
      if(!navigator.clipboard?.writeText)throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(text);
      setStatus(message);
    } catch {
      if(field){selectForCopy(field);}
      else {
        const fallback=root.querySelector('[data-share-copy-fallback]');
        fallback.hidden=false;
        selectForCopy(fallback.querySelector('input'));
      }
      setStatus('Select and copy the highlighted text to share it.');
    }
  };
  for(const button of toggles) {
    button.hidden=false;
    button.addEventListener('click',()=>{
      const open=button.getAttribute('aria-expanded')!=='true';
      for(const toggle of toggles)toggle.setAttribute('aria-expanded',String(toggle===button&&open));
      for(const panel of panels)panel.hidden=!(open&&panel.dataset.sharePanel===button.dataset.shareToggle);
      setStatus('');
    });
  }
  for(const button of root.querySelectorAll('[data-share-copy-link]')) {
    button.hidden=false;
    button.addEventListener('click',()=>copy(url,null,'Product link copied.'));
  }
  for(const button of root.querySelectorAll('[data-share-copy-post]')) {
    button.addEventListener('click',()=>{
      const field=button.closest('[data-share-panel]').querySelector('[data-share-post]');
      copy(field.value,field,'Text and product link copied. Paste them into your app.');
    });
  }
  for(const button of root.querySelectorAll('[data-share-native]')) {
    button.hidden=typeof navigator.share!=='function';
    button.addEventListener('click',async()=>{
      setStatus('');
      try {await navigator.share({title,text:title,url});}
      catch(error) {
        if(error?.name!=='AbortError')await copy(url,null,'Product link copied. Paste it into your chosen app.');
      }
    });
  }
  const download=root.querySelector('[data-share-download]');
  download?.addEventListener('click',async()=>{
    download.disabled=true;
    setStatus('Preparing the artwork image…');
    let bitmap;
    try {
      const response=await fetch(image,{credentials:'omit',signal:AbortSignal.timeout(20000)});
      if(!response.ok)throw new Error('Image unavailable');
      bitmap=await createImageBitmap(await response.blob());
      const scale=Math.min(1,1200/Math.max(bitmap.width,bitmap.height));
      const canvas=document.createElement('canvas');
      canvas.width=Math.max(1,Math.round(bitmap.width*scale));
      canvas.height=Math.max(1,Math.round(bitmap.height*scale));
      const context=canvas.getContext('2d');
      context.fillStyle='#fff';context.fillRect(0,0,canvas.width,canvas.height);
      context.drawImage(bitmap,0,0,canvas.width,canvas.height);
      const blob=await new Promise(resolve=>canvas.toBlob(resolve,'image/jpeg',.9));
      if(!blob)throw new Error('Image unavailable');
      const objectUrl=URL.createObjectURL(blob);
      const link=document.createElement('a');
      link.href=objectUrl;link.download=`${slug}-share.jpg`;
      document.body.append(link);link.click();link.remove();
      setTimeout(()=>URL.revokeObjectURL(objectUrl),60000);
      setStatus('Image download started. Copy the caption and product link for your Instagram post or Story.');
    } catch {
      setStatus('Use Open image, then save it from your browser. You can still copy the caption and link.');
    } finally {bitmap?.close();download.disabled=false;}
  });
}

document.querySelectorAll('[data-product-share]').forEach(setupProductShare);
