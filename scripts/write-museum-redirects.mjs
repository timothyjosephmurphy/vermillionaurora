import { mkdirSync, writeFileSync } from 'node:fs';
import { MUSEUM_REDIRECTS, museumRedirectsFile } from '../worker/museum-redirects.mjs';
for (const project of Object.keys(MUSEUM_REDIRECTS)) {
  mkdirSync(`redirects/museum-pagesdev/${project}`, { recursive: true });
  writeFileSync(`redirects/museum-pagesdev/${project}/_redirects`, museumRedirectsFile(project));
}
