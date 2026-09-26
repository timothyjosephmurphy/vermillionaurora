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
          await env.COMMISSION_UPLOADS.put(key,file.stream(),{
            httpMetadata:{contentType:file.type},
            customMetadata:{originalName:file.name.slice(0,200),customerEmail:email}
          });
          uploaded.push({label,key,originalName:file.name});
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
      const body=[
        "New commission request","",
        `Request ID: ${requestId}`,
        `Name: ${name}`,
        `Email: ${email}`,
        `Requested size: ${size || "Not specified"}`,"",
        ...uploadLines,"",
        "Project description:",description
      ].join("\r\n");

      const mime=[
        `From: Vermilion Aurora Website <${env.GMAIL_ADDRESS}>`,
        `To: ${env.GMAIL_ADDRESS}`,
        `Reply-To: ${email}`,
        `Subject: ${mimeHeader(`New Commission Request — ${name}`)}`,
        "MIME-Version: 1.0",
        'Content-Type: text/plain; charset="UTF-8"',
        "Content-Transfer-Encoding: 8bit","",body
      ].join("\r\n");

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
function json(d,status,h={}){return new Response(JSON.stringify(d),{status,headers:{"Content-Type":"application/json; charset=UTF-8",...h}});}
