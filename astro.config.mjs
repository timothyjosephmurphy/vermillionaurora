import {rmSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {defineConfig} from 'astro/config';
export default defineConfig({
  site:'https://tjm.art',output:'static',trailingSlash:'always',publicDir:'./static',build:{format:'directory'},
  integrations:[{name:'omit-print-masters',hooks:{'astro:build:done':({dir})=>{rmSync(fileURLToPath(dir)+'/print-masters',{recursive:true,force:true});}}}],
});
