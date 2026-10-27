// Deterministic salon-style packing for the all-paintings walls. Units are inches.
// Paintings are placed in centred rows (tallest row in the middle, tallest painting in the middle of
// its row) and the row width is chosen so the finished wall is close to the target aspect ratio.
// Optional hang sets stay contiguous: `row` left to right, `stack` top to bottom, `grid` two across.
export const WALL_GAP=2.6;
export const WALL_MARGIN=12;
const TARGET_ASPECT=1.9;

function shelves(items,rowWidth,gap){
  const rows=[];let row=null;
  for(const item of items){
    if(!row||row.width+gap+item.width>rowWidth){row={items:[],width:-gap,height:0};rows.push(row);}
    row.items.push(item);row.width+=gap+item.width;row.height=Math.max(row.height,item.height);
  }
  return rows;
}
const centreOut=list=>{
  const out=[];list.forEach((item,i)=>{if(i%2)out.push(item);else out.unshift(item);});
  // unshift/push on a descending list leaves the largest item in the middle.
  return out;
};
function blockOf(members,arrangement,gap){
  const rowOf=list=>{
    const width=list.reduce((s,m)=>s+m.width,0)+gap*(list.length-1);
    const height=Math.max(...list.map(m=>m.height));
    return {width,height,list};
  };
  if(arrangement==='grid'){
    const cols=2,colW=[];
    for(let c=0;c<cols;c++)colW[c]=Math.max(...members.filter((_,i)=>i%cols===c).map(m=>m.width));
    const rows=[];
    for(let i=0;i<members.length;i+=cols){const list=members.slice(i,i+cols);rows.push({list,height:Math.max(...list.map(m=>m.height))});}
    return {width:colW.reduce((s,w)=>s+w,0)+gap*(cols-1),height:rows.reduce((s,r)=>s+r.height,0)+gap*(rows.length-1),rows,colW};
  }
  const rows=arrangement==='stack'?members.map(m=>rowOf([m])):[rowOf(members)];
  return {width:Math.max(...rows.map(r=>r.width)),height:rows.reduce((s,r)=>s+r.height,0)+gap*(rows.length-1),rows};
}
function placeBlock(block,x,y,gap){
  const placed=[];let yy=y;
  for(const row of block.rows){
    if(block.colW){
      let xx=x;
      row.list.forEach((item,c)=>{
        const cw=block.colW[c];
        placed.push({...item,x:+(xx+(cw-item.width)/2).toFixed(3),y:+(yy+(row.height-item.height)/2).toFixed(3)});
        xx+=cw+gap;
      });
    }else{
      let xx=x+(block.width-row.width)/2;
      for(const item of row.list){
        placed.push({...item,x:+xx.toFixed(3),y:+(yy+(row.height-item.height)/2).toFixed(3)});
        xx+=item.width+gap;
      }
    }
    yy+=row.height+gap;
  }
  return placed;
}
export function packWall(inputs,{gap=WALL_GAP,margin=WALL_MARGIN,aspect=TARGET_ASPECT,sets=[]}={}){
  if(!inputs.length)return {width:margin*2,height:margin*2,items:[]};
  const byId=new Map(inputs.map(i=>[i.id,i]));
  const grouped=new Set(),blocks=[];
  for(const set of sets){
    const members=set.members.map(id=>byId.get(id)).filter(m=>m&&!grouped.has(m.id));
    if(members.length<2)continue;
    for(const m of members)grouped.add(m.id);
    const box=blockOf(members,set.arrangement,gap);
    blocks.push({id:set.id,width:box.width,height:box.height,box});
  }
  const items=[...inputs.filter(i=>!grouped.has(i.id)),...blocks].sort((a,b)=>b.height-a.height||b.width-a.width||(a.id<b.id?-1:1));
  const area=items.reduce((sum,i)=>sum+(i.width+gap)*(i.height+gap),0),widest=Math.max(...items.map(i=>i.width));
  const base=Math.sqrt(area*aspect);let best=null;
  const start=Math.max(widest,base*.55),end=Math.max(start,base*1.9);
  for(let rowWidth=start;rowWidth<=end;rowWidth+=1){
    const rows=shelves(items,rowWidth,gap),width=Math.max(...rows.map(r=>r.width)),height=rows.reduce((s,r)=>s+r.height,0)+gap*(rows.length-1);
    const fill=area/((width+gap)*(height+gap)),score=Math.abs(Math.log(width/height/aspect))+(1-fill)*1.5;
    if(!best||score<best.score-1e-9)best={score,rows,width,height};
  }
  const rows=best.rows.map(r=>({...r,items:centreOut(r.items)})).sort((a,b)=>b.height-a.height);
  const ordered=centreOut(rows);
  let y=margin;const placed=[];
  for(const row of ordered){
    let x=margin+(best.width-row.width)/2;
    for(const item of row.items){
      const top=y+(row.height-item.height)/2;
      if(item.box)placed.push(...placeBlock(item.box,x,top,gap));
      else placed.push({...item,x:+x.toFixed(3),y:+top.toFixed(3)});
      x+=item.width+gap;
    }
    y+=row.height+gap;
  }
  return {width:best.width+margin*2,height:best.height+margin*2,items:placed.sort((a,b)=>a.y-b.y||a.x-b.x)};
}
