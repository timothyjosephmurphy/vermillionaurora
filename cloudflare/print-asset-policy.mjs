export function printAssetUrl(value,mode) {
  const u=new URL(value);
  const live=['vermillionaurora.com','media.vermillionaurora.com'].includes(u.hostname);
  const sandbox=mode==='sandbox'&&u.hostname==='vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev'&&/^\/checkout\/print-assets\/[a-f0-9]{64}\.jpg$/.test(u.pathname);
  if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.port||!live&&!sandbox||! /\.(jpe?g|png)$/i.test(u.pathname))throw Error('Invalid FinerWorks image URL');
  return u.href;
}

// Stable, permanent, small preview for the provider's order thumbnail. Edition masters have a
// build-time thumbnail at /print-editions/thumbs/<sha>.jpg; other approved files fall back to the file URL.
export function printThumbnailUrl(value,mode) {
  const file=printAssetUrl(value,mode),u=new URL(file);
  const m=u.hostname==='vermillionaurora.com'&&/^\/print-editions\/([a-f0-9]{64})\.jpg$/.exec(u.pathname);
  return m?`https://vermillionaurora.com/print-editions/thumbs/${m[1]}.jpg`:file;
}
