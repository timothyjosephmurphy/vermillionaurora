// Pure geometry for the walkthrough: a long corridor with themed rooms on both sides, in metres.
export const HALL={height:4,corridor:3.2,wall:.15,door:1.8,doorHeight:2.5,eyeHeight:1.62,hangHeight:1.58,gap:.45,margin:.4,roomGap:.3};
const yawFor=(nx,nz)=>Math.atan2(-nx,-nz);
function segments(room){
  const {x0,width:W,z0,z1,side:s}=room,d=HALL.door/2,cx=x0+W/2;
  // inward normals; listed in hanging priority: back wall, sides, then the doorway wall
  return [
    {from:[x0,z1],to:[x0+W,z1],n:[0,-s]},
    {from:[x0,z0],to:[x0,z1],n:[1,0]},
    {from:[x0+W,z0],to:[x0+W,z1],n:[-1,0]},
    {from:[x0,z0],to:[cx-d,z0],n:[0,s]},
    {from:[cx+d,z0],to:[x0+W,z0],n:[0,s]}
  ].map(g=>{const len=Math.hypot(g.to[0]-g.from[0],g.to[1]-g.from[1]),yaw=yawFor(...g.n),dir=[Math.cos(yaw),-Math.sin(yaw)];
    const dot=(g.to[0]-g.from[0])*dir[0]+(g.to[1]-g.from[1])*dir[1],start=dot>=0?g.from:g.to;return {...g,len,yaw,dir,start};});
}
function pack(items,segs){
  const out=segs.map(()=>[]);let k=0,used=0;
  for(const it of items){
    for(;;){
      if(k>=segs.length)return null;
      const need=(out[k].length?HALL.gap:0)+it.width;
      if(used+need<=segs[k].len-2*HALL.margin){out[k].push(it);used+=need;break;}
      k++;used=0;
    }
  }
  return out;
}
export function walkthroughLayout(rooms){
  const depth={theme:6.5,murals:6.5,exhibition:6};
  const cursor={1:0,'-1':0},placed=[],laid=[];
  rooms.forEach((room,index)=>{
    const s=index%2?-1:1,D=depth[room.kind]||6.5;
    let W=Math.max(5,HALL.door+2);
    for(;;){
      const x0=cursor[s]+HALL.wall,z0=s*(HALL.corridor/2+HALL.wall),z1=z0+s*D;
      const geo={...room,side:s,x0,width:W,z0,z1,depth:D};
      const segs=segments(geo),groups=pack(room.items,segs);
      if(groups){
        cursor[s]=x0+W+HALL.roomGap;
        const doorX=x0+W/2;
        laid.push({id:room.id,title:room.title,kind:room.kind,href:room.href,side:s,x0,width:W,z0,z1,depth:D,doorX,count:room.items.length});
        groups.forEach((group,g)=>{
          const seg=segs[g],total=group.reduce((t,i)=>t+i.width,0)+HALL.gap*Math.max(0,group.length-1);
          let u=(seg.len-total)/2;
          for(const it of group){
            const c=u+it.width/2;u+=it.width+HALL.gap;
            const y=it.kind==='plaque'?1.45:Math.max(HALL.hangHeight,it.height/2+.5);
            const x=seg.start[0]+seg.dir[0]*c+seg.n[0]*.035,z=seg.start[1]+seg.dir[1]*c+seg.n[1]*.035;
            placed.push({...it,room:room.id,roomTitle:room.title,x,y,z,yaw:seg.yaw,inward:{x:seg.n[0],z:seg.n[1]}});
          }
        });
        break;
      }
      W+=.5;
    }
  });
  const length=Math.max(cursor[1],cursor[-1])+1.5;
  return {rooms:laid,items:placed,hall:{...HALL,length},bounds:{minX:0,maxX:length,minZ:Math.min(...laid.map(r=>Math.min(r.z0,r.z1))),maxZ:Math.max(...laid.map(r=>Math.max(r.z0,r.z1)))}};
}
export function approachPosition(art,distance=1.25){return {x:art.x+art.inward.x*distance,y:HALL.eyeHeight,z:art.z+art.inward.z*distance};}
