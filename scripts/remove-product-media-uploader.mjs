const response = await fetch('https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-product-media-upload', {
  method: 'DELETE',
  headers: { Authorization: `Bearer ${process.env.CLOUDFLARE_API_TOKEN}` },
});
if (!response.ok && response.status !== 404) throw new Error(`Temporary uploader cleanup failed: ${response.status}`);
console.log('Temporary product media uploader removed; R2 videos retained.');
