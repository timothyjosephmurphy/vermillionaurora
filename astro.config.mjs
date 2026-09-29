import { defineConfig } from 'astro/config';
export default defineConfig({site:'https://vermillionaurora.com',output:'static',trailingSlash:'always',publicDir:'./static',build:{format:'directory'}});
