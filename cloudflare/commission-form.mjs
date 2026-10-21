import {saveCommissionReferences,removeCommissionReferences} from './commission-privacy.mjs';
import {corsOrigin,isSiteOrigin} from './site-origins.mjs';
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg","image/png","image/webp","image/heic","image/heif"]);

export async function commissionForm(request,env) {
    const cors = {
      "Access-Control-Allow-Origin": corsOrigin(request),
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers:cors});
    if (request.method !== "POST") return json({success:false,error:"Method not allowed"},405,cors);
    const origin=request.headers.get("Origin");
    if (origin && !isSiteOrigin(origin)) return json({success:false,error:"Origin not allowed"},403,cors);

    let pendingReferences=null;
    let sent=false;
    try {
      const type=request.headers.get("Content-Type") || "";
      if (!type.includes("multipart/form-data")) return json({success:false,error:"Expected multipart form data"},400,cors);
      const form=await request.formData();
      const name=clean(form.get("name"),100);
      const email=clean(form.get("email"),254);
      const size=clean(form.get("size"),100);
      const description=clean(form.get("description") || form.get("message"),5000);
      const inquiryType=clean(form.get("inquiryType"),30);
      const paintingSlug=clean(form.get("paintingSlug"),150);
      const paintingTitle=clean(form.get("paintingTitle"),200);
      const paintingPrice=clean(form.get("paintingPrice"),100);
      const isPurchase=inquiryType === "purchase" && paintingTitle;
      const website=clean(form.get("website"),200);
      if (website) return json({success:true},200,cors);
      if (!name || !email || !description) return json({success:false,error:"Name, email, and project description are required."},400,cors);
      if (!validEmail(email)) return json({success:false,error:"Please enter a valid email address."},400,cors);

      const requestId=crypto.randomUUID();
      const reference=inquiryReference(requestId);
      const uploaded=[];
      for (const [field,label] of [["referenceImage","Reference image"],["paletteImage","Palette swatch"]]) {
        const file=form.get(field);
        if (file instanceof File && file.size) {
          if (file.size > MAX_FILE_SIZE) return json({success:false,error:`${label} must be 10 MB or smaller.`},400,cors);
          if (!ALLOWED_TYPES.has(file.type)) return json({success:false,error:`${label} must be JPEG, PNG, WebP, HEIC, or HEIF.`},400,cors);
          const ext=extensionFor(file.type);
          const key=`commissions/${requestId}/${field}.${ext}`;

          // Validate all files before storing any; never attach private references to email.
          const bytes = new Uint8Array(await file.arrayBuffer());

          uploaded.push({
            label,
            key,
            originalName: file.name.slice(0,200),
            type: file.type,
            bytes
          });
        }
      }

      if (uploaded.reduce((sum,x)=>sum+x.bytes.byteLength,0)>18*1024*1024) return json({success:false,error:"Combined images must be 18 MB or smaller."},400,cors);
      await saveCommissionReferences(env.COMMISSION_UPLOADS,requestId,uploaded);
      if(uploaded.length)pendingReferences={id:requestId,files:uploaded};

      const tokenResponse=await fetch("https://oauth2.googleapis.com/token",{
        method:"POST",
        headers:{"Content-Type":"application/x-www-form-urlencoded"},
        body:new URLSearchParams({
          client_id:env.GOOGLE_CLIENT_ID,
          client_secret:env.GOOGLE_CLIENT_SECRET,
          refresh_token:env.GOOGLE_REFRESH_TOKEN,
          grant_type:"refresh_token"
        })
      });
      const tokenData=await tokenResponse.json();
      if (!tokenResponse.ok || !tokenData.access_token) {
        console.error("Commission notification OAuth failed",tokenResponse.status);
        return json({success:false,error:"Unable to send request."},500,cors);
      }

      const uploadLines=uploaded.length
        ? uploaded.flatMap(x=>[`${x.label}: ${x.originalName}`,`Private reference: ${x.key}`])
        : ["Uploads: None"];
      const body = isPurchase
        ? [
            "New painting purchase inquiry","",
            `Reference: ${reference}`,
            `Request ID: ${requestId}`,
            `Painting: ${paintingTitle}`,
            `Price: ${paintingPrice || "Not specified"}`,
            `Inventory ID: ${paintingSlug || "Not specified"}`,"",
            `Name: ${name}`,
            `Email: ${email}`,"",
            "Message:",description
          ].join("\r\n")
        : [
            "New commission request","",
            `Reference: ${reference}`,
            `Request ID: ${requestId}`,
            `Name: ${name}`,
            `Email: ${email}`,
            `Requested size: ${size || "Not specified"}`,"",
            ...uploadLines,"",
            "Manage private references: https://tjm.art/commission-manager/",
            "Unaccepted inquiries expire after 90 days. Mark accepted work active and record its agreed retention date. Mark completed/cancelled work promptly for deletion after 90 days.",
            "Privacy: https://tjm.art/privacy/","",
            "Project description:",description
          ].join("\r\n");

      const boundary = "va_" + crypto.randomUUID().replace(/-/g, "");
      // Use the authenticated Gmail identity as the envelope recipient.
      // This avoids relying on a runtime address variable for MIME parsing.
      const senderAddress = "tj@vermillionaurora.com";
      const mimeParts = [
        `From: Vermilion Aurora Website <${senderAddress}>`,
        `To: ${notifyAddress(env)}`,
        `Reply-To: ${email}`,
        `Subject: ${mimeHeader(isPurchase ? `Painting Purchase Inquiry — ${paintingTitle} (${reference})` : `New Commission Request — ${name} (${reference})`)}`,
        "MIME-Version: 1.0",
        `Content-Type: multipart/mixed; boundary="${boundary}"`,
        "",
        `--${boundary}`,
        'Content-Type: text/plain; charset="UTF-8"',
        "Content-Transfer-Encoding: 8bit",
        "",
        body
      ];

      mimeParts.push(`--${boundary}--`, "");
      const mime = mimeParts.join("\r\n");

      const gmail=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",{
        method:"POST",
        headers:{Authorization:`Bearer ${tokenData.access_token}`,"Content-Type":"application/json"},
        body:JSON.stringify({raw:base64url(mime)})
      });
      const gmailData=await gmail.json();
      if (!gmail.ok) {
        console.error("Commission notification failed",gmail.status);
        return json({success:false,error:"Unable to send request."},500,cors);
      }
      sent=true;
      // studio-tracker #115: one row per inquiry, then an acknowledgement to the sender (off unless COMMISSION_AUTOREPLY is "true").
      await logInquiry(env,{requestId,reference,kind:isPurchase?"purchase":"commission",name,email,size,paintingSlug,paintingTitle,description,uploads:uploaded.length});
      let acknowledged=false;
      if (env.COMMISSION_AUTOREPLY === "true") {
        try {
          const ack=autoReply({name,email,reference,paintingTitle:isPurchase?paintingTitle:""});
          const r=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",{method:"POST",headers:{Authorization:`Bearer ${tokenData.access_token}`,"Content-Type":"application/json"},body:JSON.stringify({raw:base64url(ackMime(ack,senderAddress))})});
          acknowledged=r.ok; if(!r.ok)console.error("Commission acknowledgement failed",r.status);
        } catch {console.error("Commission acknowledgement failed");}
        await markAcknowledged(env,requestId,acknowledged);
      }
      return json({success:true,message:"Commission request sent.",requestId,reference},200,cors);
    } catch (error) {
      console.error("Commission form failed");
      return json({success:false,error:"Unable to send request."},500,cors);
    } finally {
      if(pendingReferences&&!sent) {
        try {await removeCommissionReferences(env.COMMISSION_UPLOADS,pendingReferences);} catch {console.error("Commission rollback pending scheduled cleanup");}
      }
    }
}

function clean(v,n){return typeof v==="string" ? v.replace(/\0/g,"").trim().slice(0,n) : "";}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
function extensionFor(t){return ({"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/heic":"heic","image/heif":"heif"})[t] || "bin";}
function mimeHeader(v){const b=new TextEncoder().encode(v);let s="";for(const x of b)s+=String.fromCharCode(x);return `=?UTF-8?B?${btoa(s)}?=`;}
function base64url(v){const b=new TextEncoder().encode(v);let s="";for(const x of b)s+=String.fromCharCode(x);return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function json(d,status,h={}){return new Response(JSON.stringify(d),{status,headers:{"Content-Type":"application/json; charset=UTF-8","Cache-Control":"no-store",...h}});}

// Short, human reference for an inquiry, e.g. TJM-261020-7F3A (date in Pacific time + 4 hex chars of the request ID).
export function inquiryReference(requestId,now=new Date()){
  const d=new Intl.DateTimeFormat("en-CA",{timeZone:"America/Los_Angeles",year:"2-digit",month:"2-digit",day:"2-digit"}).format(now).replace(/-/g,"");
  return `TJM-${d}-${String(requestId).replace(/-/g,"").slice(0,4).toUpperCase()}`;
}
export function notifyAddress(env){return env.COMMISSION_NOTIFY_TO || "tj@tjm.art";}
// Public copy: TJ approves this wording before COMMISSION_AUTOREPLY is turned on.
export function autoReply({name,email,reference,paintingTitle}){
  const first=(String(name).trim().split(/\s+/)[0]||"there").slice(0,60);
  const opener=paintingTitle
    ? `Thanks for asking about ${paintingTitle}. I got your message, and I'll write back to you personally in a few days.`
    : `Thanks for reaching out about a painting. I got your request, and I'll write back to you personally in a few days.`;
  return {to:email,subject:`I got your message (${reference})`,text:[
    `Hi ${first},`,"",opener,"",
    `Your reference number is ${reference}. If you write to me about this, please include it.`,"",
    "If you want to add anything, like more photos or details, just reply to this email.","",
    "TJ Murphy","https://tjm.art"
  ].join("\r\n")};
}
function ackMime(ack,from){
  return [`From: TJ Murphy <${from}>`,`To: ${ack.to}`,"Reply-To: tj@tjm.art",`Subject: ${mimeHeader(ack.subject)}`,"MIME-Version: 1.0",'Content-Type: text/plain; charset="UTF-8"',"Content-Transfer-Encoding: 8bit","",ack.text,""].join("\r\n");
}
const INQUIRY_TABLE=`CREATE TABLE IF NOT EXISTS commission_inquiries (request_id TEXT PRIMARY KEY, reference TEXT NOT NULL, created_at TEXT NOT NULL, kind TEXT NOT NULL, name TEXT, email TEXT, size TEXT, painting_slug TEXT, painting_title TEXT, description TEXT, uploads INTEGER DEFAULT 0, acknowledged INTEGER DEFAULT 0, status TEXT DEFAULT 'new')`;
// Logging never blocks the inquiry: the email to TJ has already gone out.
export async function logInquiry(env,i){
  if(!env.CATALOG_DB)return false;
  try{
    await env.CATALOG_DB.prepare(INQUIRY_TABLE).run();
    await env.CATALOG_DB.prepare("INSERT INTO commission_inquiries (request_id,reference,created_at,kind,name,email,size,painting_slug,painting_title,description,uploads) VALUES (?,?,?,?,?,?,?,?,?,?,?)")
      .bind(i.requestId,i.reference,new Date().toISOString(),i.kind,i.name,i.email,i.size||"",i.paintingSlug||"",i.paintingTitle||"",i.description,i.uploads||0).run();
    return true;
  }catch{console.error("Commission inquiry log failed");return false;}
}
async function markAcknowledged(env,requestId,ok){
  if(!env.CATALOG_DB)return;
  try{await env.CATALOG_DB.prepare("UPDATE commission_inquiries SET acknowledged=? WHERE request_id=?").bind(ok?1:0,requestId).run();}catch{}
}
