import {test} from 'node:test';
import assert from 'node:assert/strict';
import {walkthroughRooms,walkthroughPaintingCount} from '../src/data/gallery-walkthrough.mjs';
import {walkthroughLayout,approachPosition,insideWalk,HALL} from '../src/scripts/gallery-walkthrough-layout.mjs';
import {tjWall,WALL_UNIT} from '../src/data/paintings-wall.mjs';
import assets from '../catalog/walkthrough-assets.json' with {type:'json'};
const layout=walkthroughLayout(walkthroughRooms),{rooms,items,start}=layout;
test('walkthrough hangs every Painting Wall work once, at true size',()=>{
  assert.equal(walkthroughPaintingCount,tjWall.artworks.length);
  const works=items.filter(i=>i.kind==='painting'||(i.kind==='mural'&&tjWall.artworks.some(a=>a.id===i.id)));
  assert.equal(new Set(works.map(w=>w.id)).size,tjWall.artworks.length);
  for(const w of works){const a=tjWall.artworks.find(x=>x.id===w.id);assert(Math.abs(w.width-a.width/WALL_UNIT*.0254)<1e-9,w.id);assert.equal(w.href,a.href);}
});
test('one straight, mirror-symmetric line of rooms (no pinwheel); exhibitions and full-scale murals',()=>{
  for(const r of rooms){assert.equal(r.minZ,-r.maxZ,r.id+' is centred on the axis');for(const o of r.openings){assert(['W','E'].includes(o.wall));assert.equal(o.from,-o.to,'doorways sit at wall midpoints');}}
  const xs=[...rooms].sort((a,b)=>a.minX-b.minX);for(let i=1;i<xs.length;i++)assert(xs[i].minX>xs[i-1].maxX);
  assert.equal(xs.findIndex(r=>r.kind==='hall'),2,'two galleries on each side of the hall');
  assert.equal(layout.signs.length,2*layout.hallways.length);
  for(const ex of assets.exhibitions){const inRoom=items.filter(i=>i.href===ex.href&&i.kind!=='painting');assert(inRoom.some(i=>i.kind==='plaque'),ex.id);assert.equal(inRoom.filter(i=>i.kind==='photo').length,ex.photos.length);}
  const lillooet=items.find(i=>i.id==='friends-club-mural');assert(Math.abs(lillooet.width-480*.0254)<1e-9&&Math.abs(lillooet.height-108*.0254)<1e-9);
  const focal=items.find(i=>i.focal);assert.equal(focal.x,start.x);assert(focal.z>start.z+8,'the entry mural is straight ahead across the hall');
  assert(!items.some(i=>i!==focal&&Math.abs(i.x-start.x)<focal.width/2+.5&&i.z>start.z&&i.wall==='N'&&i.room===focal.room),'nothing else hangs in the entry sightline');
});
test('only related works share a column',()=>{
  const cols=new Map();for(const i of items){const k=i.room+i.x.toFixed(3)+i.z.toFixed(3);(cols.get(k)||cols.set(k,[]).get(k)).push(i);}
  for(const c of cols.values())if(c.length>1)assert(c.every(i=>i.series&&i.series===c[0].series),c.map(i=>i.id).join(','));
  assert([...cols.values()].some(c=>c.length>1&&c[0].series==='set:older-work-sunset-ridge-strips'),'the Ridge studies hang together');
});
test('salon hanging: no overlaps, stacks within the band, every work reachable',()=>{
  for(const i of items){assert(i.y+i.height/2<HALL.height-.3,i.id);assert(i.y-i.height/2>=HALL.band[0]-1e-9,i.id);const p=approachPosition(i);assert(insideWalk(layout,p.x,p.z,0),i.id);}
    for(const a of items)for(const b of items)if(a!==b&&a.room===b.room&&a.wall===b.wall){const d=Math.abs(a.x-b.x)+Math.abs(a.z-b.z);assert(!(d<(a.width+b.width)/2-.01&&Math.abs(a.y-b.y)<(a.height+b.height)/2-.01),a.id+' overlaps '+b.id);}
  assert.equal(new Set(items.map(i=>i.id)).size,items.length);
});
