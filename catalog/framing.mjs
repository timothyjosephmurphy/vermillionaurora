import {matSizeAllowed} from './matting.mjs';
export function frameFinish(material, glazing, mat) {
  if(!material?.key||!material.canMat||!material.canGlaze||!matSizeAllowed(material,mat?.outer)||!Number.isSafeInteger(glazing?.id)||glazing.id<=0)return null;
  return {key:material.key,id:material.id,collectionId:material.collectionId,name:material.label,color:material.previewColor,
    material:material.composite,mouldingWidth:material.width,size:mat.outer,glazing:{id:glazing.id,name:glazing.name}};
}
export function sameFrame(a,b) {
  return !!a&&!!b&&a.id===b.id&&a.key===b.key&&a.collectionId===b.collectionId&&a.glazing?.id===b.glazing?.id&&a.size?.width===b.size?.width&&a.size?.height===b.size?.height;
}
