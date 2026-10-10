export const clamp=(v,min,max)=>Math.min(max,Math.max(min,v));
export function fitView(view,world){
  const scale=Math.min(view.width/world.width,view.height/world.height)*.96;
  return {scale,x:(view.width-world.width*scale)/2,y:(view.height-world.height*scale)/2};
}
export function zoomAt(transform,point,scale){
  const ratio=scale/transform.scale;
  return {scale,x:point.x-(point.x-transform.x)*ratio,y:point.y-(point.y-transform.y)*ratio};
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
export function focusArtwork(artworks,transform,view,fitScale,previousId){
  if(transform.scale<fitScale*1.8)return null;
  const cx=view.width/2,cy=view.height/2;
  const candidates=artworks.map(art=>{
    const rect=screenRect(art,transform);
    if(!intersects(rect,view)||Math.max(rect.width,rect.height)<Math.min(view.width,view.height)*.22)return null;
    // Distance to the visible painting, rather than its off-screen center at deep zoom.
    const dx=Math.max(rect.x-cx,cx-rect.x-rect.width,0),dy=Math.max(rect.y-cy,cy-rect.y-rect.height,0);
    const center=Math.hypot(rect.x+rect.width/2-cx,rect.y+rect.height/2-cy)*.035;
    return {art,score:Math.hypot(dx,dy)+center-(art.id===previousId?10:0)};
  }).filter(Boolean).sort((a,b)=>a.score-b.score);
  return candidates[0]&&candidates[0].score<Math.min(view.width,view.height)*.35?candidates[0].art:null;
}
export function panelPosition(rect,view,panel){
  const gap=18,pad=12;
  let x=rect.x+rect.width+gap,y=rect.y;
  if(x+panel.width>view.width-pad)x=rect.x-panel.width-gap;
  if(x<pad){x=view.width-panel.width-pad;y=view.height-panel.height-pad;}
  return {x:clamp(x,pad,Math.max(pad,view.width-panel.width-pad)),y:clamp(y,pad,Math.max(pad,view.height-panel.height-pad))};
}
