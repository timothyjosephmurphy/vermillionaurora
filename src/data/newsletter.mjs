// Buttondown newsletter. Set username to '' to hide every signup form.
// The form posts to the site Worker, which subscribes via the Buttondown API and emails one print code.
export const BUTTONDOWN_USERNAME = 'timothyjosephmurphy';
export const newsletterAction = BUTTONDOWN_USERNAME ? '/newsletter/subscribe' : '';
