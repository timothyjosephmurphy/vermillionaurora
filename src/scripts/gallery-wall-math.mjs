export const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
export function fitView(view,world){
  const scale=Math.min(view.width/world.width,view.height/world.height)*.96;
  return {scale,x:(view.width-world.width*scale)/2,y:(view.height-world.height*scale)/2};
}
export function zoomAt(transform,point,scale){
  const ratio=scale/transform.scale;
  return {scale,x:point.x-(point.x-transform.x)*ratio,y:point.y-(point.y-transform.y)*ratio};
}
// Leave only a small breathing margin and a slim strip for the gallery controls.
// Product information never participates in this calculation or shrinks the art.
export function paintingView(art,view){
  const pad=view.width<=760?16:24,bottom=64;
  const scale=Math.min((view.width-pad*2)/art.width,(view.height-pad*2-bottom)/art.height);
  return {scale,x:view.width/2-(art.x+art.width/2)*scale,y:(view.height-bottom)/2-(art.y+art.height/2)*scale};
}
export function constrainView(transform,view,world){
  const bound=(offset,size,viewport)=>{
    const margin=Math.min(viewport*.4,160);
    return size<=viewport?(viewport-size)/2:clamp(offset,viewport-size-margin,margin);
  };
  return {...transform,x:bound(transform.x,world.width*transform.scale,view.width),y:bound(transform.y,world.height*transform.scale,view.height)};
}
export function screenRect(art,transform){return {x:transform.x+art.x*transform.scale,y:transform.y+art.y*transform.scale,width:art.width*transform.scale,height:art.height*transform.scale};}
export function intersects(rect,view,padding=0){return rect.x+rect.width>-padding&&rect.y+rect.height>-padding&&rect.x<view.width+padding&&rect.y<view.height+padding;}
export function imageSource(sources,pixels){return sources.find(s=>s.width>=pixels)||sources.at(-1);}
export function focusArtwork(artworks,transform,view,fitScale,point={x:view.width/2,y:view.height/2}){
  if(transform.scale<fitScale*1.8)return null;
  const cx=point.x,cy=point.y;
  const candidates=artworks.map(art=>{
    const rect=screenRect(art,transform);
    if(!intersects(rect,view)||Math.max(rect.width,rect.height)<Math.min(view.width,view.height)*.22)return null;
    // Distance to the visible painting, rather than its off-screen center at deep zoom.
    const dx=Math.max(rect.x-cx,cx-rect.x-rect.width,0),dy=Math.max(rect.y-cy,cy-rect.y-rect.height,0);
    const center=Math.hypot(rect.x+rect.width/2-cx,rect.y+rect.height/2-cy)*.0001;
    return {art,score:Math.hypot(dx,dy)+center};
  }).filter(Boolean).sort((a,b)=>a.score-b.score);
  return candidates[0]&&candidates[0].score<Math.min(48,Math.min(view.width,view.height)*.08)?candidates[0].art:null;
}
export function panelPosition(rect,view,panel,obstacles=[rect]){
  const gap=12,pad=12,maxX=view.width-panel.width-pad,maxY=view.height-panel.height-pad;
  if(maxX<pad||maxY<pad)return null;
  const xs=new Set([pad,maxX]),ys=new Set([pad,maxY]);
  for(const r of obstacles){
    for(const x of [r.x-panel.width-gap,r.x+r.width+gap])xs.add(clamp(x,pad,maxX));
    for(const y of [r.y-panel.height-gap,r.y+r.height+gap,r.y])ys.add(clamp(y,pad,maxY));
  }
  let best=null,bestDistance=Infinity;
  for(const x of xs)for(const y of ys){
    if(obstacles.some(r=>x<r.x+r.width+gap&&x+panel.width>r.x-gap&&y<r.y+r.height+gap&&y+panel.height>r.y-gap))continue;
    const distance=Math.hypot(x+panel.width/2-rect.x-rect.width/2,y+panel.height/2-rect.y-rect.height/2);
    if(distance<bestDistance){best={x,y};bestDistance=distance;}
  }
  // At deep zoom, no empty wall may remain. Hiding is preferable to covering art.
  return best;
}
