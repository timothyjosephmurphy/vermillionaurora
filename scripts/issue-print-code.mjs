#!/usr/bin/env node
// Issue a single-use, at-cost print code for a collector (prints only).
// Usage: COMMISSION_MANAGER_TOKEN=... node scripts/issue-print-code.mjs --name "Jane Doe" --email "jane@example.com" [--note "Testimonial Oct 2026"] [--sandbox]
// The token is read from the environment (or prompted), never from arguments, and is never printed.
import {createInterface} from 'node:readline/promises';
const args=process.argv.slice(2),get=flag=>{const i=args.indexOf(flag);return i>=0?args[i+1]:undefined;};
const name=get('--name'),email=get('--email'),note=get('--note')||'';
if(!name||!email){console.error('Usage: node scripts/issue-print-code.mjs --name "Name" --email "email@example.com" [--note "..."] [--sandbox]');process.exit(2);}
const base=args.includes('--sandbox')?'https://vermillion-checkout-sandbox.timothyjosephmurphy.workers.dev':'https://vermillion-commissions.timothyjosephmurphy.workers.dev';
let token=process.env.COMMISSION_MANAGER_TOKEN;
if(!token){const rl=createInterface({input:process.stdin,output:process.stderr});token=(await rl.question('COMMISSION_MANAGER_TOKEN: ')).trim();rl.close();}
const r=await fetch(`${base}/checkout/print-codes/issue`,{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({name,email,note})});
const data=await r.json().catch(()=>({}));
if(!r.ok){console.error(`Could not issue a code (HTTP ${r.status}): ${data.error||'unknown error'}`);process.exit(1);}
console.log(`Code for ${data.name} <${data.email}>: ${data.code}\n${data.usage}\nShare it privately. It works once, on prints only, in the cart's "Code" field.`);
