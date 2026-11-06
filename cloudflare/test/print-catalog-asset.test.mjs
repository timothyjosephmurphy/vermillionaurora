import {env} from 'cloudflare:workers';
import {runInDurableObject} from 'cloudflare:test';
import {it, expect} from 'vitest';
import {printVersion} from '../print-catalog-version.mjs';
import {printCatalogAssetUrl} from '../print-catalog-asset.mjs';
import {CartOrder} from '../cart-order.mjs';

async function readCatalog(fetcher) {
  const response = await fetcher(new Request(printCatalogAssetUrl()));
  expect(response.status).toBe(200);
  const data = await response.json();
  expect(data.printVersion).toBe(printVersion);
  expect(data.prints['print-el-zonte-at-sunrise-full'].assetUrl).toMatch(/^https:/);
  expect(data.prints['print-el-zonte-at-sunrise-full'].sku).toMatch(/\S/);
  expect(data.prints['print-el-zonte-at-sunrise-full'].amount).toMatch(/^\d+\.\d{2}$/);
}

it('the checkout Worker and cart durable object both read the print catalog asset', async () => {
  await readCatalog(request => env.ASSETS.fetch(request));
  const stub = env.CART_ORDERS.getByName('print-catalog-asset');
  await runInDurableObject(stub, async instance => {
    expect(instance).toBeInstanceOf(CartOrder);
    await readCatalog(request => instance.env.ASSETS.fetch(request));
  });
});
