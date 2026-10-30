// The padded edition sheet: the whole source, contained, never enlarged, on white paper.
import sharp from 'sharp';
export async function renderEditionSheet(bytes, choice, borderIn, exact = false) {
  const {layoutSpec} = choice, c = layoutSpec.content;
  const {data: normalized, info} = await sharp(bytes).rotate().removeAlpha().raw().toBuffer({resolveWithObject: true});
  // Use the reserved margin, not the centered leftover, so a minimum-paper pad does not change the fit.
  const border = Math.ceil(borderIn * layoutSpec.dpi);
  const widthLimited = (layoutSpec.widthPx - 2 * border) / info.width <= (layoutSpec.heightPx - 2 * border) / info.height;
  // exact snaps at most a pixel so the sheet matches the layout box. The legacy path stays
  // single-dimension so already-paid files stay byte-identical.
  const resized = await sharp(normalized, {raw: {width: info.width, height: info.height, channels: info.channels}})
    .resize(exact ? {width: c.width, height: c.height, fit: 'fill', withoutEnlargement: true} : {...(widthLimited ? {width: c.width} : {height: c.height}), withoutEnlargement: true})
    .raw().toBuffer({resolveWithObject: true});
  if (resized.info.width !== c.width || resized.info.height !== c.height) throw Error(`Unexpected fitted dimensions ${resized.info.width}x${resized.info.height} wanted ${c.width}x${c.height}`);
  const data = await sharp({create: {width: layoutSpec.widthPx, height: layoutSpec.heightPx, channels: 3, background: '#ffffff'}})
    .composite([{input: resized.data, raw: {width: c.width, height: c.height, channels: resized.info.channels}, left: c.left, top: c.top}])
    .jpeg({quality: 95, chromaSubsampling: '4:4:4'}).toBuffer();
  return data;
}
