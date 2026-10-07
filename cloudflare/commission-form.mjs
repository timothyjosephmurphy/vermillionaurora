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
            `Request ID: ${requestId}`,
            `Name: ${name}`,
            `Email: ${email}`,
            `Requested size: ${size || "Not specified"}`,"",
            ...uploadLines,"",
            "Manage private references: https://vermillionaurora.com/commission-manager/",
            "Unaccepted inquiries expire after 90 days. Mark accepted work active and record its agreed retention date. Mark completed/cancelled work promptly for deletion after 90 days.",
            "Privacy: https://vermillionaurora.com/privacy/","",
            "Project description:",description
          ].join("\r\n");

      const boundary = "va_" + crypto.randomUUID().replace(/-/g, "");
      // Use the authenticated Gmail identity as the envelope recipient.
      // This avoids relying on a runtime address variable for MIME parsing.
      const senderAddress = "tj@vermillionaurora.com";
      const mimeParts = [
        `From: Vermilion Aurora Website <${senderAddress}>`,
        `To: ${senderAddress}`,
        `Reply-To: ${email}`,
        `Subject: ${mimeHeader(isPurchase ? `Painting Purchase Inquiry — ${paintingTitle}` : `New Commission Request — ${name}`)}`,
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
      return json({success:true,message:"Commission request sent.",requestId},200,cors);
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
