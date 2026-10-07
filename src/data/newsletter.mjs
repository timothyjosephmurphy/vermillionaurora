// Buttondown newsletter. Set username to '' to hide every signup form.
export const BUTTONDOWN_USERNAME = 'timothyjosephmurphy';
export const newsletterAction = BUTTONDOWN_USERNAME ? `https://buttondown.com/api/emails/embed-subscribe/${BUTTONDOWN_USERNAME}` : '';
