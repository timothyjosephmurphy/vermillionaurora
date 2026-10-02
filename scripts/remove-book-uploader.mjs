const r=await fetch('https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/vermillion-book-media-upload',{method:'DELETE',headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`}});
if(!r.ok&&r.status!==404)throw Error('Temporary uploader cleanup failed: '+r.status);
console.log('Temporary uploader removed; R2 images retained.');
