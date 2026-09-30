import frames from './frames.json' with {type:'json'};
// Keep the physical paper intact. The mat uses an existing standard frame size,
// with at least one inch of board on every side, and follows the image orientation.
export function matLayout(paper, image = paper, material = null) {
  if (!paper || !image || ![paper.width,paper.height,image.width,image.height].every(n=>Number.isFinite(n)&&n>0) || image.width>paper.width || image.height>paper.height) return null;
  const landscape=paper.width>paper.height;
  const candidates=frames.frames.map(f=>{
    const [short,long]=[f.width,f.height].sort((a,b)=>a-b);
    return {width:landscape?long:short,height:landscape?short:long,unit:'in'};
  }).filter(d=>d.width>=paper.width+2&&d.height>=paper.height+2&&(!material||matSizeAllowed(material,d)))
    .sort((a,b)=>a.width*a.height-b.width*b.height);
  if (!candidates.length) return null;
  return {key:'snow-white',name:'White conservation mat',color:'#fff',outer:candidates[0],window:{width:image.width,height:image.height,unit:'in'},...(material?{id:material.id,name:material.name}: {})};
}
export function matSizeAllowed(mat,size) {
  if(!mat||!Number.isSafeInteger(mat.id)||mat.id<=0||![mat.minWidth,mat.minHeight].every(n=>Number.isFinite(n)&&n>=0)||![mat.maxWidth,mat.maxHeight,size?.width,size?.height].every(n=>Number.isFinite(n)&&n>0))return false;
  const fits=(w,h)=>w>=mat.minWidth&&h>=mat.minHeight&&w<=mat.maxWidth&&h<=mat.maxHeight;
  return fits(size.width,size.height)||fits(size.height,size.width);
}
export function sameMat(a,b) {
  return !!a&&!!b&&a.id===b.id&&a.key===b.key&&['outer','window'].every(k=>a[k]?.width===b[k]?.width&&a[k]?.height===b[k]?.height);
}
