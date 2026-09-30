export function printAssetUrl(value,mode) {
  const u=new URL(value);
  const live=['vermillionaurora.com','media.vermillionaurora.com'].includes(u.hostname);
  const sandbox=mode==='sandbox'&&u.hostname==='vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev'&&/^\/checkout\/print-assets\/[a-f0-9]{64}\.jpg$/.test(u.pathname);
  if(u.protocol!=='https:'||u.username||u.password||u.search||u.hash||u.port||!live&&!sandbox||! /\.(jpe?g|png)$/i.test(u.pathname))throw Error('Invalid FinerWorks image URL');
  return u.href;
}
