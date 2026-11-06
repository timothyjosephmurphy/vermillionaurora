// Secrets and the optional hex-gallery test fetcher are not wrangler bindings.
// `wrangler types` overwrites worker-configuration.d.ts; this file merges into
// the generated SiteEnv and Cloudflare.Env interfaces.
interface SiteSecrets {
	CATALOG_ADMIN_PASSWORD: string;
	/** Optional stand-in for the hex gallery fetch. Not a deployed binding. */
	HEX_FETCH?: Fetcher;
}
interface SiteEnv extends SiteSecrets {}
declare namespace Cloudflare {
	interface Env extends SiteSecrets {}
}
