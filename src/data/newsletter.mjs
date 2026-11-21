// Studio notes email list, kept in TJ's own storage (no third-party newsletter service).
// The form posts to the site Worker, which stores the address, shows one at-cost print code, and emails TJ.
// Set NEWSLETTER_ENABLED to false to hide every signup form.
export const NEWSLETTER_ENABLED = true;
export const newsletterAction = NEWSLETTER_ENABLED ? '/newsletter/subscribe' : '';
