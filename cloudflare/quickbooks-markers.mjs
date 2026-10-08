// Backfill of the at-cost code marker on records that were already in QuickBooks before the marker existed.
// For each Sales Receipt / Purchase: read it, and if its Memo (PrivateNote) belongs to the order and lacks the marker,
// sparse-update ONLY PrivateNote (Id + SyncToken + sparse:true). Amounts, accounts, lines and dates are never sent.
import { AT_COST_MARKER, withAtCostMarker } from './quickbooks-core.mjs';

export async function markAtCostRecords(client, { sales = [], costs = [] }) {
  const result = { marked: [], already: [], errors: [] };
  const jobs = [...sales.map(s => ({ ...s, entity: 'SalesReceipt' })), ...costs.map(c => ({ ...c, entity: 'Purchase' }))];
  for (const job of jobs) {
    const label = `${job.entity} ${job.docNumber || job.qboId}`;
    try {
      if (!/^\d{1,20}$/.test(String(job.qboId || ''))) throw Error('no QuickBooks id');
      const record = await client.read(`${job.entity.toLowerCase()}/${job.qboId}`, job.entity);
      if (!record?.Id) throw Error('not found in QuickBooks');
      const note = String(record.PrivateNote || '');
      if (note.includes(AT_COST_MARKER)) { result.already.push(label); continue; }
      // Safety: only touch the record this order created (its Memo names the order).
      if (!note.includes(job.orderId)) throw Error('memo does not name this order; left unchanged');
      const updated = await client.update(job.entity, { Id: String(record.Id), SyncToken: String(record.SyncToken), sparse: true, PrivateNote: withAtCostMarker(note, job.printCode) });
      if (!String(updated?.PrivateNote || '').includes(AT_COST_MARKER)) throw Error('update did not keep the marker');
      if (record.TotalAmt !== undefined && updated.TotalAmt !== undefined && Number(updated.TotalAmt) !== Number(record.TotalAmt)) throw Error(`total changed from ${record.TotalAmt} to ${updated.TotalAmt}; check it`);
      result.marked.push(label);
    } catch (error) { result.errors.push(`${label}: ${String(error.message).slice(0, 200)}`); }
  }
  return result;
}
