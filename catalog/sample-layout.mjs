// Exact 4:5 sample crop. Never distort the artwork or bake in paper margins.
export function portraitSampleCrop(source) {
  const width=source?.widthPx,height=source?.heightPx;
  if(!Number.isSafeInteger(width)||!Number.isSafeInteger(height)||width<=0||height<=0)throw Error('Invalid sample source dimensions');
  const unit=Math.floor(Math.min(width/4,height/5));
  if(unit<1)throw Error('Sample source is too small');
  return {left:Math.floor((width-unit*4)/2),top:Math.floor((height-unit*5)/2),width:unit*4,height:unit*5};
}
export function reviewedPortraitSample(asset,source,image) {
  if(asset?.layout!=='borderless-center-crop'||asset.widthPx!==1000||asset.heightPx!==1250||Math.abs(image.width/image.height-.8)>1e-9)return false;
  try {const expected=portraitSampleCrop(source);return Object.entries(expected).every(([key,value])=>asset.crop?.[key]===value);}catch{return false;}
}
