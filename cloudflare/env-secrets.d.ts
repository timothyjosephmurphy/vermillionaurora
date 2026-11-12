// Secret names and sandbox-only bindings are not in cloudflare/wrangler.jsonc.
// `wrangler types` overwrites worker-configuration.d.ts; this file merges into
// the generated CheckoutEnv and Cloudflare.Env interfaces.
interface CheckoutSecrets {
	BTCPAY_API_KEY: string;
	BTCPAY_STORE_ID: string;
	BTCPAY_WEBHOOK_SECRET: string;
	BUFFER_API_TOKEN: string;
	BUFFER_OPERATIONS_TOKEN: string;
	BUTTONDOWN_API_KEY: string;
	BUTTONDOWN_WEBHOOK_SECRET: string;
	CATALOG_ADMIN_PASSWORD: string;
	CHECKOUT_AUDIT_TOKEN: string;
	COMMISSION_MANAGER_TOKEN: string;
	COMMISSION_NOTIFY_TO: string;
	// Optional owner credential for listing sync/media/activate without rotating the manager token.
	ETSY_OPS_TOKEN?: string;
	ETSY_KEYSTRING: string;
	ETSY_SHARED_SECRET: string;
	FINERWORKS_APP_KEY: string;
	FINERWORKS_AUDIT_TOKEN: string;
	FINERWORKS_BILLING_SETUP: string;
	FINERWORKS_PAYMENT_TOKEN: string;
	FINERWORKS_WEB_API_KEY: string;
	GOOGLE_CLIENT_ID: string;
	GOOGLE_CLIENT_SECRET: string;
	GOOGLE_REFRESH_TOKEN: string;
	INVENTORY_ADMIN_TOKEN: string;
	PRINT_MASTER_SIGNING_SECRET?: string;
	PRINTFUL_API_TOKEN: string;
	PRINTFUL_STORE_ID: string;
	PRODIGI_API_KEY: string;
	// Full "Basic …" Authorization header value for https://open.api.rpiprint.com. Never log it.
	RPI_API_KEY: string;
	QBO_CLIENT_ID: string;
	QBO_CLIENT_SECRET: string;
	QBO_TIP_CUSTOMER: string;
	SHIP_FROM_PHONE: string;
	SHIP_FROM_STREET: string;
	SHIPPING_LABEL_FORMAT: string;
	SHIPPO_CUSTOMS_SIGNER: string;
	SHIPPO_TOKEN: string;
	SITE_EMAIL_FROM: string;
	SQUARE_ACCESS_TOKEN: string;
	SQUARE_APPLICATION_ID: string;
	SQUARE_LOCATION_ID: string;
	SQUARE_WEBHOOK_SIGNATURE_KEY: string;
	TESTIMONIAL_EMAIL_FROM: string;
	TESTIMONIAL_REPLY_ADDRESS: string;
	TESTIMONIAL_THANKS_EMAIL: string;
	// Set at deploy time, or only on the sandbox Worker. Absent in some environments.
	BTCPAY_CHECKOUT_SLUGS?: string;
	CHECKOUT_PILOT_SLUGS?: string;
	CHECKOUT_RELEASE?: string;
	COMMISSION_DEPOSITS_PAUSED?: string;
	GITHUB_TOKEN?: string;
	PRODIGI_ENV?: string;
	SANDBOX_RETURN_ORIGIN?: string;
	SHIPPING_CHECK?: DurableObjectNamespace;
	SHIPPING_CHECK_TOKEN?: string;
	SQUARE_CHECKOUT_SLUGS?: string;
	SQUARE_COUNTRY?: string;
	SQUARE_SANDBOX_NO_FULFILLMENT?: string;
}
interface CheckoutEnv extends CheckoutSecrets {}
declare namespace Cloudflare {
	interface Env extends CheckoutSecrets {}
}
