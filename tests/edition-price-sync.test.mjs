import assert from 'node:assert/strict';
import test from 'node:test';
import { editionAmountChanges, resetCache, syncBuiltEditionPrices, syncBuiltPaintingStatuses } from '../cloudflare/catalog-d1.mjs';

function fakeDb(editions) {
  const meta = new Map([['rev', '1602']]);
  const rows = new Map(editions.map(edition => [edition.id, { ...edition }]));
  const audits = [];
  function prepare(sql) {
    const statement = {
      sql,
      args: [],
      bind(...args) {
        return { sql, args, first: () => statement.first() };
      },
      async first() {
        if (sql.includes("key='rev'")) return meta.has('rev') ? { value: meta.get('rev') } : null;
        if (sql.includes("key='print_version'")) return meta.has('print_version') ? { value: meta.get('print_version') } : null;
        return null;
      }
    };
    return statement;
  }
  return {
    meta, rows, audits, prepare,
    async batch(statements) {
      const out = [];
      for (const statement of statements) {
        const sql = statement.sql;
        if (sql === 'SELECT * FROM paintings') out.push({ results: [] });
        else if (sql === 'SELECT * FROM editions') out.push({ results: [...rows.values()] });
        else if (sql.startsWith('SELECT product_id')) out.push({ results: [] });
        else if (sql === 'SELECT * FROM status') out.push({ results: [] });
        else if (sql.startsWith('UPDATE editions')) {
          const [amount, , id, before] = statement.args;
          const row = rows.get(id);
          if (row && row.amount === before) row.amount = amount;
          out.push({ results: [] });
        } else if (sql.includes("key='rev'")) {
          meta.set('rev', String(Number(meta.get('rev') || 0) + 1));
          out.push({ results: [] });
        } else if (sql.startsWith('INSERT INTO audit')) {
          audits.push(statement.args);
          out.push({ results: [] });
        } else if (sql.includes("'print_version'")) {
          meta.set('print_version', statement.args[0]);
          out.push({ results: [] });
        } else throw new Error(`unexpected SQL: ${sql}`);
      }
      return out;
    }
  };
}

test('edition amount changes are only the rows whose retail differs', () => {
  const live = new Map([
    ['print-a', { id: 'print-a', amount: '134.00' }],
    ['print-b', { id: 'print-b', amount: '90.00' }]
  ]);
  assert.deepEqual(editionAmountChanges(live, [
    { id: 'print-a', amount: '135.00' },
    { id: 'print-b', amount: '90.00' },
    { id: 'print-missing', amount: '12.00' },
    { id: 'print-bad', amount: 'nope' }
  ]), [{ id: 'print-a', amount: '135.00', before: '134.00' }]);
});

test('sync writes the built framed retail into D1 and leaves a later edit until the print version changes', async () => {
  resetCache();
  const db = fakeDb([
    { id: 'print-archived-painting-364-medium-frame-white', amount: '134.00', enabled: 1 },
    { id: 'print-el-zonte-at-sunrise-medium', amount: '90.00', enabled: 1 }
  ]);
  const built = [
    { id: 'print-archived-painting-364-medium-frame-white', amount: '135.00' },
    { id: 'print-el-zonte-at-sunrise-medium', amount: '90.00' }
  ];
  const first = await syncBuiltEditionPrices(db, 'c0b6163f220287223f0f', built);
  assert.deepEqual(first, { updated: 1, skipped: false });
  assert.equal(db.rows.get('print-archived-painting-364-medium-frame-white').amount, '135.00');
  assert.equal(db.rows.get('print-el-zonte-at-sunrise-medium').amount, '90.00');
  assert.equal(db.meta.get('print_version'), 'c0b6163f220287223f0f');
  assert.equal(db.meta.get('rev'), '1603');
  assert.equal(db.audits.length, 1);

  db.rows.get('print-archived-painting-364-medium-frame-white').amount = '140.00';
  const held = await syncBuiltEditionPrices(db, 'c0b6163f220287223f0f', built);
  assert.deepEqual(held, { updated: 0, skipped: true });
  assert.equal(db.rows.get('print-archived-painting-364-medium-frame-white').amount, '140.00');

  const next = await syncBuiltEditionPrices(db, 'next-print-version', [
    { id: 'print-archived-painting-364-medium-frame-white', amount: '136.00' },
    { id: 'print-el-zonte-at-sunrise-medium', amount: '90.00' }
  ]);
  assert.deepEqual(next, { updated: 1, skipped: false });
  assert.equal(db.rows.get('print-archived-painting-364-medium-frame-white').amount, '136.00');
  assert.equal(db.meta.get('print_version'), 'next-print-version');
});

function statusDb(statuses, paintings = []) {
  const meta = new Map([['rev', '9']]);
  const rows = new Map(statuses.map(row => [row.product_id, { ...row }]));
  const paintingRows = new Map(paintings.map(row => [row.id, { ...row }]));
  function prepare(sql) {
    const statement = {
      sql,
      bind(...args) { return { sql, args }; },
      async first() {
        if (sql.includes("key='rev'")) return { value: meta.get('rev') };
        if (sql.includes("key='catalog_version'")) return meta.has('catalog_version') ? { value: meta.get('catalog_version') } : null;
        return null;
      }
    };
    return statement;
  }
  return {
    meta, rows, paintingRows, prepare,
    async batch(statements) {
      const out = [];
      for (const statement of statements) {
        const sql = statement.sql;
        if (sql === 'SELECT * FROM paintings') out.push({ results: [...paintingRows.values()] });
        else if (sql.startsWith('SELECT product_id') || sql === 'SELECT * FROM editions') out.push({ results: [] });
        else if (sql === 'SELECT * FROM status') out.push({ results: [...rows.values()] });
        else if (sql.startsWith('UPDATE paintings')) {
          const [amount, updatedAt, id] = statement.args;
          const painting = paintingRows.get(id);
          if (painting) Object.assign(painting, { price_amount: amount, updated_at: updatedAt });
          out.push({ results: [] });
        }
        else if (sql.startsWith('UPDATE status')) {
          const [status, note, updatedAt, id, before] = statement.args;
          const row = rows.get(id);
          if (row && row.status === before) Object.assign(row, { status, note, updated_at: updatedAt });
          out.push({ results: [] });
        } else if (sql.includes("key='rev'")) {
          meta.set('rev', String(Number(meta.get('rev') || 0) + 1));
          out.push({ results: [] });
        } else if (sql.startsWith('INSERT INTO audit')) out.push({ results: [] });
        else if (sql.includes("'catalog_version'")) {
          meta.set('catalog_version', statement.args[0]);
          out.push({ results: [] });
        } else throw new Error(`unexpected SQL: ${sql}`);
      }
      return out;
    }
  };
}

test('original availability sync follows the built catalog and keeps a noted override', async () => {
  resetCache();
  const db = statusDb([
    { product_id: 'strawberry-point-4', status: 'available', note: 'repo sync' },
    { product_id: 'strawberry-point-11', status: 'unavailable', note: 'catalog-admin' },
    { product_id: 'strawberry-point-7', status: 'available', note: 'repo sync' },
    { product_id: 'book-art-d78badff7e21472c00b8', status: 'unavailable', note: 'Removed: framed duplicate' }
  ]);
  const inventory = {
    'strawberry-point-4': { status: 'unavailable' },
    'strawberry-point-11': { status: 'available' },
    'strawberry-point-7': { status: 'available' },
    'book-art-d78badff7e21472c00b8': { status: 'available' }
  };
  const first = await syncBuiltPaintingStatuses(db, 'catalog-v2', inventory);
  assert.deepEqual(first, { updated: 2, skipped: false });
  assert.equal(db.rows.get('strawberry-point-4').status, 'unavailable');
  assert.equal(db.rows.get('strawberry-point-11').status, 'available');
  assert.equal(db.rows.get('strawberry-point-7').status, 'available');
  assert.equal(db.rows.get('book-art-d78badff7e21472c00b8').status, 'unavailable');
  assert.equal(db.meta.get('catalog_version'), 'catalog-v2');
  const priced = statusDb(
    [{ product_id: 'strawberry-point-3', status: 'inquiry', note: 'repo sync' }],
    [{ id: 'strawberry-point-3', price_amount: null }]
  );
  resetCache();
  const priceSync = await syncBuiltPaintingStatuses(priced, 'catalog-v3', { 'strawberry-point-3': { status: 'available' } }, { 'strawberry-point-3': { amount: '450.00' } });
  assert.deepEqual(priceSync, { updated: 2, skipped: false });
  assert.equal(priced.rows.get('strawberry-point-3').status, 'available');
  assert.equal(priced.paintingRows.get('strawberry-point-3').price_amount, '450.00');
  const again = await syncBuiltPaintingStatuses(db, 'catalog-v2', inventory);
  assert.deepEqual(again, { updated: 0, skipped: true });
});

test('an empty built catalog does not mark the print version as synced', async () => {
  resetCache();
  const db = fakeDb([{ id: 'print-a', amount: '10.00', enabled: 1 }]);
  const result = await syncBuiltEditionPrices(db, 'c0b6163f220287223f0f', []);
  assert.deepEqual(result, { updated: 0, skipped: true });
  assert.equal(db.meta.has('print_version'), false);
  assert.equal(db.rows.get('print-a').amount, '10.00');
});
