// Pure geometry for the walkthrough, in metres. Four rooms form one loop around a courtyard, mirror-symmetric
// about the north–south axis (x = 0): the central hall on the south side, a gallery on the west and east sides, and
// one on the north. Walking through the doorways you circle back to the hall; there are no dead ends. The two side
// galleries share one length and the hall and north gallery share one length, each just long enough for the art.
// The visitor starts at the hall's south wall facing north, with the entry mural centred on the hall's north wall.
export const HALL={height:4.6,eyeHeight:1.62,wall:.2,door:2.4,doorHeight:2.7,passage:2.2,band:[.5,3.9],gap:.5,stackGap:.14,margin:.45,maxGap:1.1};
const DEPTH={hall:12,gallery:8};
const yawFor=(nx,nz)=>Math.atan2(-nx,-nz);
function mk(g){const len=Math.hypot(g.to[0]-g.from[0],g.to[1]-g.from[1]),yaw=yawFor(...g.n),dir=[Math.cos(yaw),-Math.sin(yaw)];
  const dot=(g.to[0]-g.from[0])*dir[0]+(g.to[1]-g.from[1])*dir[1],start=dot>=0?g.from:g.to;return {...g,len,yaw,dir,start};}
function wallSegments([x0,x1,z0,z1],openings){
  const walls={N:{a:[x0,z1],b:[x1,z1],n:[0,-1],axis:0},S:{a:[x0,z0],b:[x1,z0],n:[0,1],axis:0},E:{a:[x1,z0],b:[x1,z1],n:[-1,0],axis:1},W:{a:[x0,z0],b:[x0,z1],n:[1,0],axis:1}};
  const out=[];
  for(const [name,w] of Object.entries(walls)){
    const lo=w.a[w.axis],hi=w.b[w.axis],cuts=openings.filter(o=>o.wall===name).sort((p,q)=>p.from-q.from);let s=lo;
    for(const c of [...cuts,{from:hi,to:hi}]){if(c.from-s>.05){const A=[...w.a],B=[...w.a];A[w.axis]=s;B[w.axis]=c.from;out.push(mk({wall:name,from:A,to:B,n:w.n}));}s=c.to;}
  }
  return out;
}
const cut=(g,a,b)=>{const ax=g.n[0]===0?0:1,lo=Math.min(g.from[ax],g.to[ax]),hi=Math.max(g.from[ax],g.to[ax]),at=v=>{const p=[...g.from];p[ax]=v;return p;};
  return [[lo,Math.min(hi,a)],[Math.max(lo,b),hi]].filter(([u,v])=>v-u>.5).map(([u,v])=>mk({wall:g.wall,n:g.n,from:at(u),to:at(v)}));};
// columns: consecutive works of the same series stack while they fit the band; everything else hangs alone
function columns(items){
  const band=HALL.band[1]-HALL.band[0],out=[];
  for(const it of items){
    const col=out.at(-1),h=col?col.items.reduce((t,i)=>t+i.height,0)+HALL.stackGap*col.items.length:0;
    const ok=col&&it.series&&col.series===it.series&&it.kind!=='plaque'&&!col.solo&&h+it.height<=Math.min(band,2.8)&&it.width<=col.width*1.6&&it.width>=col.width*.5;
    if(ok){col.items.push(it);col.width=Math.max(col.width,it.width);}
    else out.push({items:[it],width:it.width,series:it.series,solo:it.kind==='plaque'||it.kind==='mural'});
  }
  return out;
}
// fill walls in order; returns null when the columns don't fit
function assign(cols,segs){
  const groups=segs.map(()=>[]);let k=0;
  const need=cols.reduce((t,c)=>t+c.width+HALL.gap,0),wallLen=segs.reduce((t,g)=>t+Math.max(0,g.len-2*HALL.margin),0);
  for(const c of cols){
    for(;;){
      if(k>=segs.length)return null;
      const used=groups[k].reduce((t,x)=>t+x.width,0)+HALL.gap*groups[k].length,room=segs[k].len-2*HALL.margin,share=need*Math.max(0,room)/wallLen+.3;
      if(used+c.width<=room&&(k===segs.length-1||!groups[k].length||used+c.width<=share)){groups[k].push(c);break;}
      k++;
    }
  }
  return groups;
}
function place(groups,segs,room){
  const out=[];
  groups.forEach((group,g)=>{
    if(!group.length)return;const seg=segs[g],total=group.reduce((t,c)=>t+c.width,0);
    const gap=Math.min(HALL.maxGap,(seg.len-total)/(group.length+1));let u=(seg.len-total-gap*(group.length-1))/2;
    for(const col of group){
      const c=u+col.width/2;u+=col.width+gap;
      const h=col.items.reduce((t,i)=>t+i.height,0)+HALL.stackGap*(col.items.length-1);
      let top=col.items[0].kind==='plaque'?1.45+h/2:Math.max(HALL.band[0]+h,Math.min(1.6+h/2,HALL.band[1]));
      for(const it of col.items){
        const y=top-it.height/2;top-=it.height+HALL.stackGap;
        out.push({...it,room:room.id,roomTitle:room.title,x:seg.start[0]+seg.dir[0]*c+seg.n[0]*.035,y,z:seg.start[1]+seg.dir[1]*c+seg.n[1]*.035,yaw:seg.yaw,inward:{x:seg.n[0],z:seg.n[1]},wall:seg.wall});
      }
    }
  });
  return out;
}
const ORDER=['N','S','W','E'];
// rect(L) -> {rect:[x0,x1,z0,z1],openings}; long axis x for the hall/north rooms, z for the side rooms
function fitRoom(room,shape,minL){
  const focal=room.items.find(i=>i.focal),list=room.items.filter(i=>i!==focal),cols=columns(list);
  for(let L=Math.max(minL,8,focal?focal.width+6:0);L<200;L+=.25){
    const {rect,openings}=shape(L),[x0,x1,,z1]=rect;let segs=wallSegments(rect,openings);
    if(focal){const cx=(x0+x1)/2,half=focal.width/2+1.2;segs=segs.flatMap(g=>g.wall==='N'?cut(g,cx-half,cx+half):g.wall==='S'?cut(g,cx-2,cx+2):[g]);}
    segs.sort((a,b)=>ORDER.indexOf(a.wall)-ORDER.indexOf(b.wall));
    const groups=assign(cols,segs);if(!groups)continue;
    const items=place(groups,segs,room);
    if(focal){const cx=(x0+x1)/2;items.unshift({...focal,room:room.id,roomTitle:room.title,x:cx,y:Math.max(1.75,focal.height/2+.6),z:z1-.035,yaw:yawFor(0,-1),inward:{x:0,z:-1},wall:'N'});}
    return {L,room:{id:room.id,title:room.title,kind:room.kind,ring:room.ring,galleries:room.galleries,minX:x0,maxX:x1,minZ:rect[2],maxZ:z1,openings,count:room.items.length},items};
  }
  throw Error(room.title+': could not fit');
}
const COURT=4;
export function walkthroughLayout(rooms){
  const by=Object.fromEntries(rooms.map(r=>[r.ring,r])),d=HALL.door/2,Dh=DEPTH.hall,Dg=DEPTH.gallery,link=HALL.passage+2*HALL.wall;
  // hall (S) spans z∈[0,Dh]; north room spans z∈[Zn-Dg/2, Zn+Dg/2]; side rooms run z∈[0, Zn+Dg/2]
  const ew=(r,L,Zc,D)=>({rect:[-L/2,L/2,Zc-D/2,Zc+D/2],openings:[{wall:'W',from:Zc-d,to:Zc+d},{wall:'E',from:Zc-d,to:Zc+d}]});
  const side=(r,L,X,Zn,west)=>({rect:[X,X+Dg,0,L],openings:[{wall:west?'E':'W',from:Dh/2-d,to:Dh/2+d},{wall:west?'E':'W',from:Zn-d,to:Zn+d}]});
  let Lx=0,Lz=Dh+COURT+Dg,out;
  for(let guard=0;guard<40;guard++){
    const Zn=Lz-Dg/2,X=Lx/2+link;
    const fit=[fitRoom(by.S,L=>ew(by.S,L,Dh/2,Dh),Lx),fitRoom(by.N,L=>ew(by.N,L,Zn,Dg),Lx),fitRoom(by.W,L=>side(by.W,L,-X-Dg,L-Dg/2,true),Lz),fitRoom(by.E,L=>side(by.E,L,X,L-Dg/2,false),Lz)];
    const nLx=Math.max(fit[0].L,fit[1].L),nLz=Math.max(fit[2].L,fit[3].L);
    if(nLx===Lx&&nLz===Lz){out=fit;break;}Lx=nLx;Lz=nLz;
  }
  if(!out)throw Error('loop layout did not settle');
  const laid=out.map(f=>f.room),items=out.flatMap(f=>f.items),R=Object.fromEntries(laid.map(r=>[r.ring,r]));
  const Zh=Dh/2,Zn=Lz-Dg/2,passages=[
    {id:'passage-central-people',from:'central',to:by.W.id,minX:R.W.maxX,maxX:R.S.minX,minZ:Zh-d,maxZ:Zh+d},
    {id:'passage-people-archive',from:by.W.id,to:by.N.id,minX:R.W.maxX,maxX:R.N.minX,minZ:Zn-d,maxZ:Zn+d},
    {id:'passage-archive-travels',from:by.N.id,to:by.E.id,minX:R.N.maxX,maxX:R.E.minX,minZ:Zn-d,maxZ:Zn+d},
    {id:'passage-travels-central',from:by.E.id,to:'central',minX:R.S.maxX,maxX:R.E.minX,minZ:Zh-d,maxZ:Zh+d}];
  const byId=Object.fromEntries(laid.map(r=>[r.id,r])),name=r=>r.kind==='hall'?'Central Hall':r.title,signs=[],y=HALL.doorHeight+.45;
  // a sign over both faces of every doorway, naming the room it leads into
  for(const p of passages){const z=(p.minZ+p.maxZ)/2;const [w,e]=[byId[p.from],byId[p.to]].sort((a,b)=>a.minX-b.minX);
    signs.push({title:name(e),x:p.minX-.12,y,z,yaw:yawFor(-1,0)},{title:name(w),x:p.maxX+.12,y,z,yaw:yawFor(1,0)});}
  const minX=Math.min(...laid.map(r=>r.minX)),maxX=Math.max(...laid.map(r=>r.maxX)),maxZ=Math.max(...laid.map(r=>r.maxZ));
  return {rooms:laid,items,hall:HALL,hallways:passages,signs,loop:['central',by.W.id,by.N.id,by.E.id,'central'],courtyard:{minX:R.S.minX,maxX:R.S.maxX,minZ:Dh,maxZ:Zn-Dg/2},
    start:{x:0,z:1.6,yaw:0},bounds:{minX:minX-1,maxX:maxX+1,minZ:-1,maxZ:maxZ+1}};
}
export function approachPosition(art,distance=1.25){return {x:art.x+art.inward.x*distance,y:HALL.eyeHeight,z:art.z+art.inward.z*distance};}
export const insideWalk=(layout,x,z,pad=.25)=>[...layout.rooms,...layout.hallways].some(r=>x>r.minX+pad&&x<r.maxX-pad&&z>r.minZ+pad&&z<r.maxZ-pad);
