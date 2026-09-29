import { sellerMailToken, sendShippingEmail, secureUrl } from './shipping-email.mjs';
import { verifyQuotedInsurance, insuredTransactionMatches } from './shipping-insurance.mjs';

const week = 7 * 24 * 60 * 60_000;
const shippoHeaders = env => ({Authorization:`ShippoToken ${env.SHIPPO_TOKEN}`,
  'Content-Type':'application/json','SHIPPO-API-VERSION':'2018-02-08'});

export function newShippingJob(env, orderId, quote) {
  return {orderId,mode:env.PAYPAL_MODE,quote,
    status:env.SHIPPO_AUTO_LABEL_ENABLED === 'true' ? 'pending' : 'disabled'};
}

function configurationIssue(env, job) {
  if (env.PAYPAL_MODE !== job.mode || !['live','sandbox'].includes(job.mode)) return 'Checkout mode changed after the order was created.';
  const prefix = job.mode === 'sandbox' ? 'shippo_test_' : 'shippo_live_';
  if (!env.SHIPPO_TOKEN?.startsWith(prefix)) return 'Shippo token does not match the checkout mode.';
  return '';
}

function transactionState(job, transaction) {
  const transactionId = transaction.object_id;
  if (typeof transactionId !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(transactionId)) {
    return {...job,status:'review',reason:'Shippo did not return a transaction ID. The purchase outcome is uncertain.'};
  }
  job = {...job,transactionId};
  if (transaction.test !== (job.mode === 'sandbox')) {
    return {...job,status:'review',reason:'Shippo returned a label in an unexpected test/live mode.'};
  }
  if (['WAITING','QUEUED'].includes(transaction.status)) return {...job,status:'waiting'};
  if (transaction.status === 'SUCCESS' && secureUrl(transaction.label_url)) {
    if (job.quote.insurance && (!job.insuranceVerified || !insuredTransactionMatches(transaction, job.quote))) {
      return {...job,status:'review',reason:'The purchased label did not confirm the insured rate. Review its coverage in Shippo before shipping.'};
    }
    return {...job,status:'ready',labelUrl:secureUrl(transaction.label_url),
      ...(job.quote.insurance ? {insuranceConfirmed:true} : {}),
      trackingNumber:transaction.tracking_number || '',trackingUrl:secureUrl(transaction.tracking_url_provider)};
  }
  return {...job,status:'review',reason:`Shippo label status: ${String(transaction.status || 'unknown').slice(0,40)}. Check the transaction in Shippo.`};
}

// Called only by the per-painting alarm after verified payment settlement.
// `save` must durably commit before resolving. Never repeat a transaction POST:
// Shippo does not document an idempotency key for this endpoint.
export async function fulfillSale(env, sale, initialJob, save) {
  let job = initialJob;
  if (!job || job.orderId !== sale.order_id || sale.state !== 'sold' || !sale.capture_id ||
      job.status === 'disabled' || job.emailId) return true;
  const persist = async next => { await save(next); job = next; };
  // Verify email authorization before buying postage, then reuse it for this attempt.
  const emailToken = await sellerMailToken(env);
  if (job.status === 'purchasing') {
    await persist({...job,status:'review',reason:'A label request was interrupted. It may already have been purchased.'});
  }
  if (job.status === 'pending') {
    const reason = configurationIssue(env, job) ||
      (env.SHIPPO_AUTO_LABEL_ENABLED !== 'true' ? 'Automatic label purchases were paused.' : '') ||
      (!['PDF','PDF_4x6'].includes(env.SHIPPING_LABEL_FORMAT || 'PDF') ? 'Shipping label format is not supported.' : '') ||
      (!job.quote.rateId || !Number.isFinite(job.quote.quotedAt) || Date.now() - job.quote.quotedAt >= week ? 'The saved shipping rate is missing or expired.' : '') ||
      (!await verifyQuotedInsurance(env, job.quote) ? 'The saved shipping rate no longer confirms the requested insurance. No label was purchased.' : '');
    if (reason) await persist({...job,status:'review',reason});
    else {
      await persist({...job,status:'purchasing',metadata:sale.capture_id.startsWith('btcpay:')?sale.capture_id:`paypal-${sale.capture_id}`,attemptedAt:Date.now(),
        ...(job.quote.insurance ? {insuranceVerified:true} : {})});
      let transaction;
      try {
        const response = await fetch('https://api.goshippo.com/transactions/', {
          method:'POST',headers:shippoHeaders(env),signal:AbortSignal.timeout(20_000),
          body:JSON.stringify({rate:job.quote.rateId,label_file_type:env.SHIPPING_LABEL_FORMAT || 'PDF',async:false,metadata:job.metadata})
        });
        transaction = await response.json();
        if (!response.ok) throw new Error('Shippo request failed');
      } catch {
        await persist({...job,status:'review',reason:'Shippo did not confirm the label request. It may already have been purchased.'});
      }
      // Keep storage errors outside the network catch; a retry must see purchasing.
      if (job.status === 'purchasing') await persist(transactionState(job, transaction));
    }
  } else if (job.status === 'waiting') {
    const issue = configurationIssue(env, job);
    if (issue) await persist({...job,status:'review',reason:issue});
    else {
      const response = await fetch(`https://api.goshippo.com/transactions/${encodeURIComponent(job.transactionId)}/`, {
        headers:shippoHeaders(env),signal:AbortSignal.timeout(20_000)
      });
      if (!response.ok) throw new Error(`Shippo label lookup failed (${response.status})`);
      const transaction = await response.json();
      if (transaction.object_id !== job.transactionId) throw new Error('Shippo transaction lookup mismatch');
      await persist(transactionState(job, transaction));
      if (job.status === 'waiting' && Date.now() - job.attemptedAt >= 60 * 60_000) {
        await persist({...job,status:'review',reason:'Shippo has not completed this label within an hour. Check its existing transaction.'});
      }
    }
  }
  if (['ready','review'].includes(job.status)) {
    const email = await sendShippingEmail(emailToken, sale, job);
    await persist({...job,emailId:email.id,pdfAttached:email.pdfAttached,attachmentError:email.attachmentError,emailedAt:Date.now()});
    return true;
  }
  return false;
}
