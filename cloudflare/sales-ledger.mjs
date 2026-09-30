import { DurableObject } from 'cloudflare:workers';
import { monthOf, salesCsv } from './sales-records.mjs';

// One ledger per mode and calendar month; checkout locks remain per painting.
export class SalesLedger extends DurableObject {
  constructor(ctx,env) {
    super(ctx,env);
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS sales (id TEXT PRIMARY KEY, data TEXT NOT NULL)');
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS versions (id INTEGER PRIMARY KEY AUTOINCREMENT, record_id TEXT NOT NULL, data TEXT NOT NULL, recorded_at TEXT NOT NULL)');
    ctx.storage.sql.exec('CREATE TABLE IF NOT EXISTS archive (id INTEGER PRIMARY KEY CHECK(id=1), revision INTEGER NOT NULL DEFAULT 0, exported INTEGER NOT NULL DEFAULT 0, period TEXT NOT NULL, mode TEXT NOT NULL)');
  }
  async record(incoming) {
    if(!incoming?.id || !['live','sandbox'].includes(incoming.mode) || incoming.mode!==this.env.PAYPAL_MODE ||
      !/^\d{4}-\d{2}-\d{2}T/.test(incoming.paidAt||'') || !/^-?\d+\.\d{2}$/.test(incoming.gross||'') || !/^[A-Z]{3}$/.test(incoming.currency||''))throw Error('Invalid sales record');
    await this.ctx.storage.setAlarm(Date.now()+1000);
    const meta=this.ctx.storage.sql.exec('SELECT * FROM archive WHERE id=1').toArray()[0];
    if(meta && (meta.period!==monthOf(incoming)||meta.mode!==incoming.mode))throw Error('Wrong ledger period');
    const saved=this.ctx.storage.sql.exec('SELECT data FROM sales WHERE id=?',incoming.id).toArray()[0];
    const previous=saved?JSON.parse(saved.data):null;
    if(previous && (previous.gross!==incoming.gross || previous.currency!==incoming.currency || previous.transactionId!==incoming.transactionId))throw Error('Conflicting payment record');
    // Prefer checkout's detailed receipt; an IPN replay cannot erase it.
    const record=previous?.source==='checkout' && incoming.source==='ipn' ? previous : {...previous,...incoming,recordedAt:previous?.recordedAt||incoming.recordedAt};
    if(saved?.data===JSON.stringify(record))return {recorded:true,duplicate:true};
    // No external I/O between related writes.
    this.ctx.storage.transactionSync(()=>{
      this.ctx.storage.sql.exec('INSERT INTO sales (id,data) VALUES (?,?) ON CONFLICT(id) DO UPDATE SET data=excluded.data',record.id,JSON.stringify(record));
      this.ctx.storage.sql.exec('INSERT INTO versions (record_id,data,recorded_at) VALUES (?,?,?)',record.id,JSON.stringify(record),new Date().toISOString());
      this.ctx.storage.sql.exec('INSERT INTO archive (id,revision,exported,period,mode) VALUES (1,1,0,?,?) ON CONFLICT(id) DO UPDATE SET revision=revision+1',monthOf(record),record.mode);
    });
    return {recorded:true,duplicate:false};
  }
  summary() {
    const meta=this.ctx.storage.sql.exec('SELECT * FROM archive WHERE id=1').toArray()[0];
    return {records:this.ctx.storage.sql.exec('SELECT count(*) AS n FROM sales').one().n,
      withPaypalFees:this.ctx.storage.sql.exec("SELECT count(*) AS n FROM sales WHERE json_extract(data,'$.paypalFee') IS NOT NULL").one().n,
      withLabel:this.ctx.storage.sql.exec("SELECT count(*) AS n FROM sales WHERE json_extract(data,'$.fulfillment.labelStatus')='ready'").one().n,archived:!!meta&&meta.exported===meta.revision,
      period:meta?.period||null,revision:meta?.revision||0,path:meta?`sales/${meta.mode}/${meta.period}/sales.csv`:null};
  }
  hasRecordedIpnSale(transactionId) {
    if(typeof transactionId!=='string'||!/^[A-Z0-9]{1,100}$/.test(transactionId))return false;
    const row=this.ctx.storage.sql.exec('SELECT data FROM sales WHERE id=?',`payment:${transactionId}`).toArray()[0];
    if(!row)return false;
    const record=JSON.parse(row.data);
    return record.mode===this.env.PAYPAL_MODE&&record.kind==='sale'&&record.source==='ipn'&&record.transactionId===transactionId&&record.status==='Completed';
  }
  async archiveNow() { await this.alarm(); return this.summary(); }
  async alarm() {
    if(this.exporting)return this.exporting;
    this.exporting=this.exportSnapshot();
    try { return await this.exporting; } finally { this.exporting=null; }
  }
  async exportSnapshot() {
    await this.ctx.storage.setAlarm(Date.now()+60_000);
    const meta=this.ctx.storage.sql.exec('SELECT * FROM archive WHERE id=1').toArray()[0];
    if(!meta || meta.exported===meta.revision){await this.finishExport();return;}
    // Sandbox is a separate namespace and never writes into the live archive.
    if(meta.mode==='sandbox') {
      this.ctx.storage.sql.exec('UPDATE archive SET exported=? WHERE id=1',meta.revision);
      await this.finishExport();return;
    }
    if(!this.env.SALES_ARCHIVE)throw Error('Private sales archive is not configured');
    const records=this.ctx.storage.sql.exec('SELECT data FROM sales ORDER BY id').toArray().map(x=>JSON.parse(x.data));
    const versions=this.ctx.storage.sql.exec('SELECT id,record_id,data,recorded_at FROM versions ORDER BY id').toArray().map(x=>({...x,data:JSON.parse(x.data)}));
    const prefix=`sales/${meta.mode}/${meta.period}`;
    const snapshot=JSON.stringify({schemaVersion:1,period:meta.period,revision:meta.revision,records,history:versions},null,2)+'\n';
    // Revision paths are immutable backups. Latest files are serialized by the DO alarm.
    await this.env.SALES_ARCHIVE.put(`${prefix}/history/revision-${meta.revision}.json`,snapshot,{httpMetadata:{contentType:'application/json'}});
    await this.env.SALES_ARCHIVE.put(`${prefix}/sales.json`,snapshot,{httpMetadata:{contentType:'application/json'}});
    await this.env.SALES_ARCHIVE.put(`${prefix}/sales.csv`,salesCsv(records),{httpMetadata:{contentType:'text/csv; charset=utf-8'}});
    this.ctx.storage.sql.exec('UPDATE archive SET exported=? WHERE id=1',meta.revision);
    await this.finishExport();
  }
  async finishExport() {
    await this.ctx.storage.deleteAlarm();
    const meta=this.ctx.storage.sql.exec('SELECT revision,exported FROM archive WHERE id=1').toArray()[0];
    if(meta && meta.revision!==meta.exported)await this.ctx.storage.setAlarm(Date.now()+1000);
  }
}
