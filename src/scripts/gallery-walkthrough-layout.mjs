// Pure geometry for the walkthrough, in metres. A square central hall (side S, centred on the origin) has an exit at
// each corner; a short hallway from each corner leads to an outer gallery running along one side of the hall:
// NW corner → north gallery, NE → east, SE → south, SW → west. The visitor starts at the south wall facing north,
// with the entry mural centred on the far north wall. Works hang salon-style: small works stack in columns.
export const HALL={height:4.6,eyeHeight:1.62,wall:.2,door:2.4,doorHeight:2.7,side:24,hallway:4,galleryDepth:9,galleryOverhang:2,band:[.45,4.05],gap:.32,stackGap:.14,margin:.45};
const yawFor=(nx,nz)=>Math.atan2(-nx,-nz);
const S=HALL.side/2,D=HALL.door,G=S+HALL.hallway,O=S+HALL.galleryOverhang,F=G+HALL.galleryDepth;
// rooms as rectangles; openings as {wall:'N'|'E'|'S'|'W', from, to} measured along the wall's axis (x for N/S, z for E/W)
const corner=S-.2-D; // opening sits right in the corner
export const ROOMS={
  central:{rect:[-S,S,-S,S],openings:[{wall:'N',from:-S+.2,to:-S+.2+D},{wall:'E',from:corner,to:S-.2},{wall:'S',from:corner,to:S-.2},{wall:'W',from:-S+.2,to:-S+.2+D}]},
  north:{rect:[-O,O,G,F],openings:[{wall:'S',from:-S+.2,to:-S+.2+D}]},
  east:{rect:[G,F,-O,O],openings:[{wall:'W',from:corner,to:S-.2}]},
  south:{rect:[-O,O,-F,-G],openings:[{wall:'N',from:corner,to:S-.2}]},
  west:{rect:[-F,-G,-O,O],openings:[{wall:'E',from:-S+.2,to:-S+.2+D}]}
};
// hallways: [minX,maxX,minZ,maxZ]
export const HALLWAYS={
  north:[-S+.2,-S+.2+D,S,G],east:[S,G,corner,S-.2],south:[corner,S-.2,-G,-S],west:[-G,-S,-S+.2,-S+.2+D]
};
// a wall of a rectangle, as segments between openings, with the inward normal
function wallSegments([x0,x1,z0,z1],openings){
  const walls={N:{a:[x0,z1],b:[x1,z1],n:[0,-1],axis:0},S:{a:[x0,z0],b:[x1,z0],n:[0,1],axis:0},E:{a:[x1,z0],b:[x1,z1],n:[-1,0],axis:1},W:{a:[x0,z0],b:[x0,z1],n:[1,0],axis:1}};
  const out=[];
  for(const [name,w] of Object.entries(walls)){
    const lo=w.a[w.axis],hi=w.b[w.axis],cuts=openings.filter(o=>o.wall===name).sort((p,q)=>p.from-q.from);let s=lo;
    for(const c of [...cuts,{from:hi,to:hi}]){if(c.from-s>.05){const A=[...w.a],B=[...w.a];A[w.axis]=s;B[w.axis]=c.from;out.push({wall:name,from:A,to:B,n:w.n});}s=c.to;}
  }
  return out.map(mk);
}
function mk(g){const len=Math.hypot(g.to[0]-g.from[0],g.to[1]-g.from[1]),yaw=yawFor(...g.n),dir=[Math.cos(yaw),-Math.sin(yaw)];
  const dot=(g.to[0]-g.from[0])*dir[0]+(g.to[1]-g.from[1])*dir[1],start=dot>=0?g.from:g.to;return {...g,len,yaw,dir,start};}
// remove the stretch [a,b] (along the wall's axis) from a segment
const cut=(g,a,b)=>{const ax=g.n[0]===0?0:1,lo=Math.min(g.from[ax],g.to[ax]),hi=Math.max(g.from[ax],g.to[ax]),at=v=>{const p=[...g.from];p[ax]=v;return p;};
  return [[lo,Math.min(hi,a)],[Math.max(lo,b),hi]].filter(([u,v])=>v-u>.5).map(([u,v])=>mk({wall:g.wall,n:g.n,from:at(u),to:at(v)}));};
// salon columns: small works of similar width stack (centred) while they fit the hanging band
function columns(items){
  const band=HALL.band[1]-HALL.band[0],out=[];
  for(const it of items){
    const col=out.at(-1),h=col?col.items.reduce((t,i)=>t+i.height,0)+HALL.stackGap*col.items.length:0;
    const stackable=col&&it.kind!=='plaque'&&it.kind!=='mural'&&!col.solo&&it.height<1.25&&col.items.every(i=>i.height<1.25)&&
      it.width<=col.width*1.45&&it.width>=col.width*.55&&h+it.height<=Math.min(band,2.9)&&col.items.length<3&&(it.exhibition||'')===(col.exhibition||'');
    if(stackable){col.items.push(it);col.width=Math.max(col.width,it.width);}
    else out.push({items:[it],width:it.width,solo:it.kind==='plaque'||it.kind==='mural',exhibition:it.exhibition||''});
  }
  return out;
}
function hang(cols,segs,roomId,title){
  const placed=[];let k=0;
  const groups=segs.map(()=>[]);
  // spread the columns over the walls in proportion to their length
  const need=cols.reduce((t,c)=>t+c.width+HALL.gap,0),wallLen=segs.reduce((t,g)=>t+g.len,0);
  for(const c of cols){
    for(;;){
      if(k>=segs.length)throw Error(`${title}: works do not fit the walls`);
      const used=groups[k].reduce((t,x)=>t+x.width,0)+HALL.gap*groups[k].length,share=need*segs[k].len/wallLen*1.08;
      const fits=used+c.width<=segs[k].len-2*HALL.margin,last=k===segs.length-1;
      if(fits&&(last||!groups[k].length||used+c.width<=share)){groups[k].push(c);break;}
      k++;
    }
  }
  groups.forEach((group,g)=>{
    if(!group.length)return;const seg=segs[g],total=group.reduce((t,c)=>t+c.width,0);
    const gap=Math.min(1.1,(seg.len-2*HALL.margin-total)/Math.max(1,group.length+1));let u=HALL.margin+gap;
    if(group.length===1)u=(seg.len-total)/2;
    for(const col of group){
      const c=u+col.width/2;u+=col.width+gap;
      const h=col.items.reduce((t,i)=>t+i.height,0)+HALL.stackGap*(col.items.length-1);
      let top=Math.max(HALL.band[0]+h,Math.min(1.6+h/2,HALL.band[1]));
      if(col.items[0].kind==='plaque')top=1.45+h/2;
      for(const it of col.items){
        const y=top-it.height/2;top-=it.height+HALL.stackGap;
        const x=seg.start[0]+seg.dir[0]*c+seg.n[0]*.035,z=seg.start[1]+seg.dir[1]*c+seg.n[1]*.035;
        placed.push({...it,room:roomId,roomTitle:title,x,y,z,yaw:seg.yaw,inward:{x:seg.n[0],z:seg.n[1]},wall:seg.wall});
      }
    }
  });
  return placed;
}
export function walkthroughLayout(rooms){
  const items=[],laid=[];
  for(const room of rooms){
    const geo=ROOMS[room.position==='centre'?'central':room.position];
    let segs=wallSegments(geo.rect,geo.openings);
    let list=room.items;
    if(room.position==='centre'){
      // the focal mural hangs alone, centred on the north wall, on the entry sightline
      const focal=list.find(i=>i.focal),northZ=geo.rect[3];
      items.push({...focal,room:room.id,roomTitle:room.title,x:0,y:Math.max(1.75,focal.height/2+.6),z:northZ-.035,yaw:yawFor(0,-1),inward:{x:0,z:-1},wall:'N'});
      list=list.filter(i=>i!==focal);
      // the rest of the north wall is split either side of the mural; the south wall's centre stays clear for the welcome sign
      const half=focal.width/2+1.2;
      segs=segs.flatMap(g=>g.wall==='N'?cut(g,-half,half):g.wall==='S'?cut(g,-2,2):[g]);
      laid.start={x:0,z:-S+1.6,yaw:0};
    }
    // the gallery wall facing the doorway first, then around
    const order={central:['W','N','E','S'],north:['N','W','E','S'],east:['E','N','S','W'],south:['S','E','W','N'],west:['W','S','N','E']}[room.position==='centre'?'central':room.position];
    segs.sort((a,b)=>order.indexOf(a.wall)-order.indexOf(b.wall));
    items.push(...hang(columns(list),segs,room.id,room.title));
    const [x0,x1,z0,z1]=geo.rect;
    laid.push({id:room.id,title:room.title,kind:room.kind,position:room.position,galleries:room.galleries,minX:x0,maxX:x1,minZ:z0,maxZ:z1,openings:geo.openings,count:room.items.length});
  }
  // a sign over each corner doorway (both sides) naming the gallery beyond it
  const signs=[];
  for(const r of laid.filter(r=>r.position!=='centre')){
    const [hx0,hx1,hz0,hz1]=HALLWAYS[r.position],cx=(hx0+hx1)/2,cz=(hz0+hz1)/2,y=HALL.doorHeight+.45;
    if(r.position==='north')signs.push({title:r.title,x:cx,y,z:S-.12,yaw:yawFor(0,-1)},{title:'Central Hall',x:cx,y,z:G+.12,yaw:yawFor(0,1)});
    if(r.position==='south')signs.push({title:r.title,x:cx,y,z:-S+.12,yaw:yawFor(0,1)},{title:'Central Hall',x:cx,y,z:-G-.12,yaw:yawFor(0,-1)});
    if(r.position==='east')signs.push({title:r.title,x:S-.12,y,z:cz,yaw:yawFor(-1,0)},{title:'Central Hall',x:G+.12,y,z:cz,yaw:yawFor(1,0)});
    if(r.position==='west')signs.push({title:r.title,x:-S+.12,y,z:cz,yaw:yawFor(1,0)},{title:'Central Hall',x:-G-.12,y,z:cz,yaw:yawFor(-1,0)});
  }
  return {rooms:laid,items,hall:HALL,hallways:Object.entries(HALLWAYS).map(([id,r])=>({id,minX:r[0],maxX:r[1],minZ:r[2],maxZ:r[3]})),signs,start:laid.start,
    bounds:{minX:-F,maxX:F,minZ:-F,maxZ:F}};
}
export function approachPosition(art,distance=1.25){return {x:art.x+art.inward.x*distance,y:HALL.eyeHeight,z:art.z+art.inward.z*distance};}
export const insideWalk=(layout,x,z,pad=.25)=>[...layout.rooms,...layout.hallways].some(r=>x>r.minX+pad&&x<r.maxX-pad&&z>r.minZ+pad&&z<r.maxZ-pad);
