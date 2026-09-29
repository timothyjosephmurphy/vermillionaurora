// Read names/types only. Never print provider credentials or the settings response.
const required = ['SHIPPO_TOKEN','SHIP_FROM_STREET','GOOGLE_CLIENT_ID','GOOGLE_CLIENT_SECRET','GOOGLE_REFRESH_TOKEN'];
const workers = ['vermillion-commissions','vermillion-checkout-sandbox'];
if (!process.env.CLOUDFLARE_API_TOKEN) throw new Error('Cloudflare read credential is unavailable');
for (const worker of workers) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/3c1fddf0f4f4fc9c84594757d2e1bda0/workers/scripts/${worker}/settings`, {
    headers:{Authorization:`Bearer ${process.env.CLOUDFLARE_API_TOKEN}`},signal:AbortSignal.timeout(20_000)
  });
  if (!response.ok) { console.log(`${worker}: settings unavailable (HTTP ${response.status})`); continue; }
  const data = await response.json();
  if (!data.success) { console.log(`${worker}: settings unavailable`); continue; }
  const bindings = data.result.bindings || [];
  const secretNames = new Set(bindings.filter(b => b.type === 'secret_text').map(b => b.name));
  const enabled = bindings.find(b => b.name === 'SHIPPO_AUTO_LABEL_ENABLED');
  console.log(JSON.stringify({worker,
    presentSecrets:required.filter(name => secretNames.has(name)),
    missingSecrets:required.filter(name => !secretNames.has(name)),
    automaticLabelsEnabled:enabled?.type === 'plain_text' && enabled.text === 'true'
  }));
}
console.log('Presence does not verify token mode, Shippo billing, Gmail delivery or package measurements.');
