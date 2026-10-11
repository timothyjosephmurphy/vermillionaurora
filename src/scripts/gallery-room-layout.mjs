// Physical metres: the room shares the print wall's measured outer frames and image openings.
export const ROOM={size:7.2,height:3.3,eyeHeight:1.62,hangHeight:1.58};
export function roomLayout(artworks,wallUnit=8){
  if(artworks.length%4)throw Error('Distribute the collection equally across four walls');
  const perWall=artworks.length/4,half=ROOM.size/2,inchesToMetres=.0254/wallUnit;
  return artworks.map((art,index)=>{
    const wall=Math.floor(index/perWall),slot=index%perWall,t=(slot+.5)*ROOM.size/perWall-half;
    const x=[t,half-.035,-t,-half+.035][wall],z=[half-.035,-t,-half+.035,t][wall],yaw=wall*Math.PI/2;
    return {...art,wall,slot,x,z,y:ROOM.hangHeight,yaw,
      width:art.width*inchesToMetres,height:art.height*inchesToMetres,
      imageWidth:art.imageWidth*inchesToMetres,imageHeight:art.imageHeight*inchesToMetres,frameWidth:art.frameWidth*inchesToMetres,
      inward:{x:-Math.sin(yaw),z:-Math.cos(yaw)}};
  });
}
export function approachPosition(art,distance=1.25){return {x:art.x+art.inward.x*distance,y:ROOM.eyeHeight,z:art.z+art.inward.z*distance};}
