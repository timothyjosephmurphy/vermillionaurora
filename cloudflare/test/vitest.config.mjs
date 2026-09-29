import { cloudflareTest } from '@cloudflare/vitest-plugin';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins:[cloudflareTest({wrangler:{configPath:'./wrangler.jsonc'}})],
  // Eviction waits for the provider request timeout signals to drain (20 seconds).
  test:{include:['./*.test.mjs'],testTimeout:30_000}
});
