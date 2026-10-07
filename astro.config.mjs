import { defineConfig } from 'astro/config';
export default defineConfig({site:'https://tjm.art',output:'static',trailingSlash:'always',publicDir:'./static',build:{format:'directory'}});
