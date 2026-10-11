// Deterministic salon-style packing for the all-paintings walls. Units are inches.
// Paintings are placed in centred rows (tallest row in the middle, tallest painting in the middle of
// its row) and the row width is chosen so the finished wall is close to the target aspect ratio.
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
export function packWall(inputs,{gap=WALL_GAP,margin=WALL_MARGIN,aspect=TARGET_ASPECT}={}){
  if(!inputs.length)return {width:margin*2,height:margin*2,items:[]};
  const items=[...inputs].sort((a,b)=>b.height-a.height||b.width-a.width||(a.id<b.id?-1:1));
  const area=items.reduce((sum,i)=>sum+(i.width+gap)*(i.height+gap),0),widest=Math.max(...items.map(i=>i.width));
  const base=Math.sqrt(area*aspect);let best=null;
  for(let rowWidth=Math.max(widest,base*.55);rowWidth<=base*1.9;rowWidth+=1){
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
      placed.push({...item,x:+x.toFixed(3),y:+(y+(row.height-item.height)/2).toFixed(3)});
      x+=item.width+gap;
    }
    y+=row.height+gap;
  }
  return {width:best.width+margin*2,height:best.height+margin*2,items:placed.sort((a,b)=>a.y-b.y||a.x-b.x)};
}
