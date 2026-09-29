import { ipnRecord, ledgerFor } from './sales-records.mjs';
// PayPal account-level IPN listener. Disabled until the merchant configures
// PAYPAL_IPN_ENABLED, PAYPAL_MERCHANT_ID, and GITHUB_TOKEN as Worker secrets.
const REPO = 'timothyjosephmurphy/vermillionaurora';
const API = `https://api.github.com/repos/${REPO}`;
const BRANCH = 'main';
const IPN_VERIFY = 'https://ipnpb.paypal.com/cgi-bin/webscr';
const FILES = ['gallery/inventory.json', 'payments/paypal-links.json', 'index.html', 'gallery/index.html'];

export async function handlePaypalIpn(request, env) {
  if (request.method !== 'POST') return new Response('Method not allowed', { status: 405 });
  if (env.PAYPAL_IPN_ENABLED !== 'true' || !env.PAYPAL_MERCHANT_ID || !env.GITHUB_TOKEN) {
    return new Response('Inventory listener is not configured', { status: 503 });
  }

  const raw = new Uint8Array(await request.arrayBuffer());
  if (!raw.length || raw.length > 32768) return new Response('Invalid message size', { status: 400 });

  try {
    // Send the unchanged form body, in its original order, back to PayPal.
    const prefix = new TextEncoder().encode('cmd=_notify-validate&');
    const verificationBody = new Uint8Array(prefix.length + raw.length);
    verificationBody.set(prefix);
    verificationBody.set(raw, prefix.length);
    const verification = await fetch(IPN_VERIFY, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'VermillionAurora-IPN/1.0' },
      body: verificationBody
    });
    if (!verification.ok) throw new Error('PayPal verification unavailable');
    if ((await verification.text()).trim() !== 'VERIFIED') {
      return new Response('Invalid notification', { status: 400 });
    }

    const fields = new URLSearchParams(new TextDecoder().decode(raw));
    if (fields.get('receiver_id') !== env.PAYPAL_MERCHANT_ID) return new Response('Wrong merchant', { status: 400 });
    if (fields.get('test_ipn') === '1') return new Response('Sandbox notification', { status: 400 });
    const record=ipnRecord(env,fields);
    if(!record)return new Response('Ignored',{status:200});
    if(!env.SALES_LEDGER)throw Error('Sales ledger is not configured');
    // Record every verified merchant payment even when no inventory link matches.
    // A failed write receives 503 so PayPal retries; never acknowledge and lose it.
    await ledgerFor(env,record).record(record);
    if(fields.get('payment_status')!=='Completed')return new Response('Recorded',{status:200});
    const isCart = fields.get('txn_type') === 'cart';
    const nameKey = isCart ? 'item_name1' : 'item_name';
    if (fields.get('mc_currency') !== 'USD' || !single(fields, 'txn_id') || !single(fields, nameKey) ||
        (isCart && fields.has('item_name') && fields.get('item_name') !== fields.get(nameKey))) {
      return new Response('Missing transaction data', { status: 400 });
    }
    if (['quantity', 'quantity1'].some(key => fields.has(key) && fields.get(key) !== '1') ||
        (fields.has('num_cart_items') && fields.get('num_cart_items') !== '1')) {
      return new Response('Unexpected quantity', { status: 400 });
    }

    for (let attempt = 0; attempt < 3; attempt++) {
      const head = await github(env, `git/ref/heads/${BRANCH}`);
      const sha = head.object.sha;
      const commit = await github(env, `git/commits/${sha}`);
      const files = await readFiles(env, sha, FILES);
      const links = JSON.parse(files['payments/paypal-links.json']);
      const sale = Object.entries(links).find(([, item]) => item.autoInventory === true &&
        item.paypalTitle === fields.get(nameKey) && item.currency === 'USD');
      if (!sale) {
        console.log('IPN completed payment did not match an enabled inventory item');
        return new Response('Ignored', { status: 200 });
      }
      const [slug, item] = sale;
      const gross = Number(fields.get('mc_gross'));
      if (!Number.isFinite(gross) || gross < Number(item.amount) || Number(item.amount) <= 0) {
        return new Response('Amount below item price', { status: 400 });
      }

      const productPath = `products/${slug}/index.html`;
      files[productPath] = await readFile(env, sha, productPath);
      const updated = applySale(files, slug, item);
      const tree = await github(env, 'git/trees', {
        base_tree: commit.tree.sha,
        tree: Object.entries(updated).map(([path, content]) => ({ path, mode: '100644', type: 'blob', content }))
      });
      const newCommit = await github(env, 'git/commits', {
        message: `Mark ${slug} sold after verified PayPal IPN`,
        tree: tree.sha,
        parents: [sha]
      });
      try {
        await github(env, `git/refs/heads/${BRANCH}`, { sha: newCommit.sha, force: false }, 'PATCH');
        console.log('Marked sold:', slug);
        return new Response('OK', { status: 200 });
      } catch (error) {
        if (error.status !== 409 && error.status !== 422) throw error;
        // Another commit reached main first. Re-read current state and retry.
      }
    }
    throw new Error('GitHub main changed during inventory update');
  } catch (error) {
    console.error('Inventory notification failed:', error.message);
    // PayPal retries non-2xx IPN deliveries. Never acknowledge a failed write.
    return new Response('Retry later', { status: 503 });
  }
}

function single(params, key) {
  return params.getAll(key).length === 1 && Boolean(params.get(key));
}

async function github(env, path, body, method = body ? 'POST' : 'GET') {
  const response = await fetch(`${API}/${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'Content-Type': 'application/json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'VermillionAurora-Inventory'
    },
    body: body ? JSON.stringify(body) : undefined
  });
  if (!response.ok) {
    const error = new Error(`GitHub ${method} ${path} returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return response.status === 204 ? null : response.json();
}

async function readFile(env, sha, path) {
  const file = await github(env, `contents/${path}?ref=${sha}`);
  if (file.encoding !== 'base64' || typeof file.content !== 'string') throw new Error(`Unexpected GitHub content for ${path}`);
  const binary = atob(file.content.replace(/\s/g, ''));
  return new TextDecoder().decode(Uint8Array.from(binary, c => c.charCodeAt(0)));
}

async function readFiles(env, sha, paths) {
  return Object.fromEntries(await Promise.all(paths.map(async path => [path, await readFile(env, sha, path)])));
}

export function applySale(files, slug, item) {
  const inventory = JSON.parse(files['gallery/inventory.json']);
  const painting = inventory.paintings.find(p => p.A === slug);
  if (!painting || painting.E !== 'Available' || Number(painting.C) !== Number(item.amount) || painting.B !== item.title) {
    throw new Error(`Inventory mismatch for ${slug}`);
  }
  painting.C = '0';
  painting.E = 'Sold';
  inventory.updated = new Date().toISOString().slice(0, 10);

  const links = JSON.parse(files['payments/paypal-links.json']);
  if (!links[slug]?.autoInventory) throw new Error(`No active link for ${slug}`);
  delete links[slug];

  const productPath = `products/${slug}/index.html`;
  let product = files[productPath];
  if (!product?.includes(`<h1>${item.title}</h1>`) || !product.includes('<p class="product-availability">Available</p>')) {
    throw new Error(`Product page mismatch for ${slug}`);
  }
  product = product.replace('<p class="product-availability">Available</p>', '<p class="product-availability">Sold</p>');
  product = product.replace('Available."', 'Sold."');

  const changed = {
    'gallery/inventory.json': JSON.stringify(inventory, null, 2) + '\n',
    'payments/paypal-links.json': JSON.stringify(links, null, 2) + '\n',
    [productPath]: product
  };
  for (const path of ['index.html', 'gallery/index.html']) {
    let count = 0;
    changed[path] = files[path].replace(/<article\b[^>]*>[\s\S]*?<\/article>/g, article => {
      if (!article.includes(`/products/${slug}/`) && !article.includes(`/?buy=${slug}`)) return article;
      if (!article.includes(`${formatPrice(item.amount)} USD · Available`)) return article;
      count++;
      return article.replace(`${formatPrice(item.amount)} USD · Available`, `${formatPrice(item.amount)} USD · Sold`)
        .replace('data-availability="Available"', 'data-availability="Sold"')
        .replaceAll(`/?buy=${slug}#contact`, `/products/${slug}/`);
    });
    if (!count) throw new Error(`No matching gallery card in ${path}`);
  }
  return changed;
}

// Shared checkout uses the same four-page inventory update but has no reusable link.
export async function commitCheckoutSale(env, slug, item) {
  const productPath = `products/${slug}/index.html`;
  const paul = slug.startsWith('paul-murphy-painting-');
  const paulPath = 'exhibitions/paul-murphy/index.html';
  for (let attempt = 0; attempt < 3; attempt++) {
    const head = await github(env, `git/ref/heads/${BRANCH}`);
    const sha = head.object.sha;
    const commit = await github(env, `git/commits/${sha}`);
    const files = await readFiles(env, sha, paul ? ['gallery/inventory.json',productPath,paulPath,'payments/paypal-links.json'] : [...FILES, productPath]);
    const inventory = JSON.parse(files['gallery/inventory.json']);
    const painting = inventory.paintings.find(p => p.A === slug);
    if (painting?.E === 'Sold') return;
    if (!painting || painting.E !== 'Available' || painting.B !== item.title || Number(painting.C) !== Number(item.amount)) {
      throw new Error(`Inventory mismatch for ${slug}`);
    }
    // Reuse the page and card transformation, with a temporary link entry only in memory.
    const links = JSON.parse(files['payments/paypal-links.json']);
    if (links[slug]) throw new Error(`Conflicting hosted link for ${slug}`);
    let changes;
    if (paul) {
      painting.C = '0'; painting.E = 'Sold'; inventory.updated = new Date().toISOString().slice(0,10);
      const product = files[productPath];
      if (!product.includes(`<h1>${item.title}</h1>`) || !product.includes('<p class="product-availability">Available</p>')) throw new Error(`Product page mismatch for ${slug}`);
      const card = new RegExp(`(<a class="ex-photo"[^>]*data-product="/products/${slug}/"[^>]*>)`);
      const exhibition = files[paulPath].replace(card,match => match.replace(/data-caption="[^"]*"/, 'data-caption="Sold"'));
      if (exhibition === files[paulPath]) throw new Error(`Exhibition card missing for ${slug}`);
      changes = {
        'gallery/inventory.json':JSON.stringify(inventory,null,2)+'\n',
        [productPath]:product.replace('<p class="product-availability">Available</p>','<p class="product-availability">Sold</p>').replace('Available."','Sold."'),
        [paulPath]:exhibition
      };
    } else {
      links[slug] = { ...item, autoInventory: true };
      changes = applySale({...files, 'payments/paypal-links.json': JSON.stringify(links)}, slug, item);
      delete changes['payments/paypal-links.json'];
    }
    const tree = await github(env, 'git/trees', {
      base_tree: commit.tree.sha,
      tree: Object.entries(changes).map(([path, content]) => ({path, mode:'100644', type:'blob', content}))
    });
    const newCommit = await github(env, 'git/commits', {
      message: `Mark ${slug} sold after verified PayPal checkout`, tree:tree.sha, parents:[sha]
    });
    try {
      await github(env, `git/refs/heads/${BRANCH}`, {sha:newCommit.sha,force:false}, 'PATCH');
      return;
    } catch (error) {
      if (error.status !== 409 && error.status !== 422) throw error;
    }
  }
  throw new Error('GitHub main changed during checkout inventory update');
}

function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(Number(amount));
}
