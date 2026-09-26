// Deployed automatically from GitHub via Cloudflare Builds.
const ALLOWED_ORIGIN = "https://vermillionaurora.com";
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg","image/png","image/webp","image/heic","image/heif"]);

export default {
  async fetch(request, env) {
    const cors = {
      "Access-Control-Allow-Origin": ALLOWED_ORIGIN,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Vary": "Origin"
    };
    if (request.method === "OPTIONS") return new Response(null,{status:204,headers:cors});
    if (request.method !== "POST") return json({success:false,error:"Method not allowed"},405,cors);
    const origin=request.headers.get("Origin");
    if (origin && origin !== ALLOWED_ORIGIN) return json({success:false,error:"Origin not allowed"},403,cors);

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

          // Read the upload once, then reuse the same bytes for R2 and Gmail.
          // A File body cannot reliably be consumed once by file.stream() and
          // then consumed again by file.arrayBuffer().
          const bytes = new Uint8Array(await file.arrayBuffer());

          await env.COMMISSION_UPLOADS.put(key, bytes, {
            httpMetadata:{contentType:file.type},
            customMetadata:{originalName:file.name.slice(0,200),customerEmail:email}
          });

          uploaded.push({
            label,
            key,
            originalName: file.name,
            type: file.type,
            bytes
          });
        }
      }

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
        console.error("OAuth error",tokenData);
        return json({success:false,error:"Unable to send request."},500,cors);
      }

      const uploadLines=uploaded.length
        ? uploaded.flatMap(x=>[`${x.label}: ${x.originalName}`,`R2 object: ${x.key}`])
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
            "Project description:",description
          ].join("\r\n");

      const totalAttachmentBytes = uploaded.reduce((sum, x) => sum + x.bytes.byteLength, 0);
      if (totalAttachmentBytes > 18 * 1024 * 1024) {
        return json({success:false,error:"Combined image attachments must be 18 MB or smaller."},400,cors);
      }

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

      for (const item of uploaded) {
        mimeParts.push(
          `--${boundary}`,
          `Content-Type: ${item.type}; name="${safeFilename(item.originalName)}"`,
          "Content-Transfer-Encoding: base64",
          `Content-Disposition: attachment; filename="${safeFilename(item.originalName)}"`,
          "",
          base64Lines(item.bytes)
        );
      }
      mimeParts.push(`--${boundary}--`, "");
      const mime = mimeParts.join("\r\n");

      const gmail=await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send",{
        method:"POST",
        headers:{Authorization:`Bearer ${tokenData.access_token}`,"Content-Type":"application/json"},
        body:JSON.stringify({raw:base64url(mime)})
      });
      const gmailData=await gmail.json();
      if (!gmail.ok) {
        console.error("Gmail error",gmailData);
        return json({success:false,error:"Unable to send request."},500,cors);
      }
      return json({success:true,message:"Commission request sent.",requestId},200,cors);
    } catch (error) {
      console.error("Commission form error",error);
      return json({success:false,error:"Unable to send request."},500,cors);
    }
  }
};

function clean(v,n){return typeof v==="string" ? v.replace(/\0/g,"").trim().slice(0,n) : "";}
function validEmail(v){return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);}
function extensionFor(t){return ({"image/jpeg":"jpg","image/png":"png","image/webp":"webp","image/heic":"heic","image/heif":"heif"})[t] || "bin";}
function mimeHeader(v){const b=new TextEncoder().encode(v);let s="";for(const x of b)s+=String.fromCharCode(x);return `=?UTF-8?B?${btoa(s)}?=`;}
function base64url(v){const b=new TextEncoder().encode(v);let s="";for(const x of b)s+=String.fromCharCode(x);return btoa(s).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");}
function safeFilename(v){return String(v || "attachment").replace(/[\r\n"]/g,"_").slice(0,180);}
function base64Lines(bytes){let out="";const chunk=0x8000;for(let i=0;i<bytes.length;i+=chunk){out+=String.fromCharCode(...bytes.subarray(i,i+chunk));}const encoded=btoa(out);return encoded.match(/.{1,76}/g).join("\r\n");}
function json(d,status,h={}){return new Response(JSON.stringify(d),{status,headers:{"Content-Type":"application/json; charset=UTF-8",...h}});}
