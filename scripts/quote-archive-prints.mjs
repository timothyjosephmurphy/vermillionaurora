// Existing sandbox quote and application routines, in small batches. No orders.
import {spawnSync} from 'node:child_process';
import {copyFile,mkdir} from 'node:fs/promises';
import archiveRecipes from '../catalog/archive-print-masters.json' with {type:'json'};
import olderWorkRecipes from '../catalog/older-work-print-masters.json' with {type:'json'};
const set=process.argv.includes('--older-work')?'older-work':'archive',recipes=set==='older-work'?olderWorkRecipes:archiveRecipes;
const frames=process.argv.includes('--frames');
const dir=set==='older-work'?'older-work-print-quotes':'archive-print-quotes';
await mkdir(dir,{recursive:true});
for(let start=0;start<recipes.length;start+=6){
  const env={...process.env,PRINT_RECIPE_SET:set,TJ_PRINT_IDS:recipes.slice(start,start+6).map(p=>p.id).join(',')};
  const run=args=>{const p=spawnSync(process.execPath,args,{env,stdio:'inherit'});if(p.status!==0)throw Error(`Archive quote batch ${start/6+1} failed`);};
  run(['payments/quote-tj-prints.mjs',...(frames?['--frames']:[])]);
  const report=frames?'tj-frame-quotes.json':'tj-print-quotes.json';
  run(frames?['payments/apply-tj-frame-quotes.mjs',report]:['payments/apply-tj-print-quotes.mjs']);
  await copyFile(report,`${dir}/${frames?'frames':'prints'}-${String(start/6+1).padStart(2,'0')}.json`);
}
