import test from 'node:test';
import assert from 'node:assert/strict';
import {Bucket} from '../tests/r2-memory-bucket.mjs';
import {jpegExifTags} from './image-metadata.mjs';
import {testimonialsApi} from './testimonials.mjs';
import {ASK_TEMPLATE, DEFAULT_REPLY_ADDRESS, EMAIL_REPLY_NOTICE, explicitCity, handleTestimonialEmail, htmlToText, ingestRawBytes, matchPainting, publicCollectorName, stripReplyJunk} from './testimonial-reply.mjs';

const b64 = s => Uint8Array.from(atob(s), c => c.charCodeAt(0));
const GPS_JPEG = b64('/9j/4AAQSkZJRgABAQAAAQABAAD/4QCoRXhpZgAATU0AKgAAAAgAAwEPAAIAAAAIAAAAMgESAAMAAAABAAYAAIglAAQAAAABAAAAOgAAAABUZXN0Q2FtAAAEAAEAAgAAAAJOAAAAAAIABQAAAAMAAABwAAMAAgAAAAJXAAAAAAQABQAAAAMAAACIAAAAAAAAAC8AAAABAAAAJAAAAAEAAAAZAAAAAgAAAHoAAAABAAAAEwAAAAEAAAA3AAAAAf/bAEMABgQFBgUEBgYFBgcHBggKEAoKCQkKFA4PDBAXFBgYFxQWFhodJR8aGyMcFhYgLCAjJicpKikZHy0wLSgwJSgpKP/bAEMBBwcHCggKEwoKEygaFhooKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKP/AABEIAAYACAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAAAAQIDBAUGBwgJCgv/xAC1EAACAQMDAgQDBQUEBAAAAX0BAgMABBEFEiExQQYTUWEHInEUMoGRoQgjQrHBFVLR8CQzYnKCCQoWFxgZGiUmJygpKjQ1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4eLj5OXm5+jp6vHy8/T19vf4+fr/xAAfAQADAQEBAQEBAQEBAAAAAAAAAQIDBAUGBwgJCgv/xAC1EQACAQIEBAMEBwUEBAABAncAAQIDEQQFITEGEkFRB2FxEyIygQgUQpGhscEJIzNS8BVictEKFiQ04SXxFxgZGiYnKCkqNTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqCg4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2dri4+Tl5ufo6ery8/T19vf4+fr/2gAMAwEAAhEDEQA/AOaooor5g/Uj/9k=');
const now = Date.parse('2026-10-19T18:00:00Z');
const jpegB64 = Buffer.from(GPS_JPEG).toString('base64').replace(/.{1,76}/g, '$&\r\n');

const setup = (images) => ({
  COMMISSION_UPLOADS: new Bucket(),
  COMMISSION_MANAGER_TOKEN: 'owner-token',
  GOOGLE_CLIENT_ID: 'id', GOOGLE_CLIENT_SECRET: 's', GOOGLE_REFRESH_TOKEN: 'r',
  ...(images ? {IMAGES: images} : {}),
});
const largeImages = () => ({
  async info() { return {width: 4032, height: 3024, format: 'jpeg'}; },
  input() {
    return {transform() { return this; }, async output() { return {response: () => new Response(GPS_JPEG)}; }};
  },
});

let mails = [];
test.beforeEach(() => {
  mails = [];
  globalThis.fetch = async (url, init = {}) => {
    const u = new URL(url);
    if (u.hostname === 'oauth2.googleapis.com') return Response.json({access_token: 'T'});
    if (u.hostname === 'gmail.googleapis.com') { mails.push(JSON.parse(init.body)); return Response.json({id: 'm'}); }
    if (u.hostname === 'nominatim.openstreetmap.org' && u.searchParams.get('q') === 'Tacoma, WA') {
      return Response.json([{lat: '47.2455013', lon: '-122.438329', display_name: 'Tacoma, Pierce County, Washington, United States'}]);
    }
    if (u.hostname === 'nominatim.openstreetmap.org' || u.hostname === 'geocoding-api.open-meteo.com') return Response.json([]);
    throw Error('unexpected fetch ' + url);
  };
});

const replyText = `The light in our kitchen is different now.

Painting: Honeybadger and Cub with Genesis Block
City: Tacoma, WA

-- 
Jane Collector
Sent from my iPhone

On Mon, Oct 19, 2026 at 10:00 AM TJ Murphy <tj@tjm.art> wrote:

> ${EMAIL_REPLY_NOTICE}
> Hi,
> If you have a moment, reply to this email.
`;

function rawReply({text = replyText, subject = 'Re: A photo of your painting?', from = 'Jane Collector <jane@example.com>', to = DEFAULT_REPLY_ADDRESS, id = '<reply-1@example.com>', photo = true} = {}) {
  const boundary = 'bound_test_1';
  const headers = [
    `From: ${from}`, `To: ${to}`, `Subject: ${subject}`, `Message-ID: ${id}`, 'MIME-Version: 1.0',
    `In-Reply-To: <ask-1@tjm.art>`, `References: <ask-1@tjm.art>`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
  ].join('\r\n') + '\r\n\r\n';
  const textPart = `--${boundary}\r\nContent-Type: text/plain; charset="UTF-8"\r\nContent-Transfer-Encoding: 8bit\r\n\r\n${text.replace(/\n/g, '\r\n')}\r\n`;
  const photoPart = photo ? `--${boundary}\r\nContent-Type: image/jpeg; name="kitchen.jpg"\r\nContent-Transfer-Encoding: base64\r\nContent-Disposition: attachment; filename="kitchen.jpg"\r\n\r\n${jpegB64}\r\n` : '';
  return `${headers}${textPart}${photoPart}--${boundary}--\r\n`;
}
const records = env => [...env.COMMISSION_UPLOADS.data.keys()].filter(key => key.startsWith('testimonials/records/'));
const owner = (env, body) => testimonialsApi(new Request('https://tjm.art/testimonials/api/owner', {method: 'POST', headers: {Origin: 'https://tjm.art', Authorization: 'Bearer owner-token', 'Content-Type': 'application/json'}, body: JSON.stringify(body)}), env, null, now);

test('ask template carries the consent line and the dedicated reply address', () => {
  assert.equal(ASK_TEMPLATE.includes(EMAIL_REPLY_NOTICE), true);
  assert.equal(ASK_TEMPLATE.includes(`Reply-To: ${DEFAULT_REPLY_ADDRESS}`), true);
  assert.equal(DEFAULT_REPLY_ADDRESS.endsWith('@reply.tjm.art'), true);
});

test('names, quoted replies, city lines, and painting titles', () => {
  assert.equal(publicCollectorName('Jane Collector', 'jane@example.com'), 'Jane');
  assert.equal(publicCollectorName('Dr. Jane Collector', 'jane@example.com'), 'Jane');
  assert.equal(publicCollectorName('', 'jane.doe@example.com'), 'J.D.');
  assert.equal(publicCollectorName('J. C.', 'jc@example.com'), 'J.C.');
  assert.equal(stripReplyJunk(replyText), 'The light in our kitchen is different now.\n\nPainting: Honeybadger and Cub with Genesis Block\nCity: Tacoma, WA');
  assert.equal(stripReplyJunk('Loved it.\n\nFrom: TJ Murphy <tj@tjm.art>\nSent: Monday\nSubject: A photo\n\nOld ask'), 'Loved it.');
  assert.equal(explicitCity('City: Tacoma, WA'), 'Tacoma, WA');
  assert.equal(explicitCity('City: 123 Main St'), '');
  assert.equal(matchPainting('Re: hello', 'Painting: Honeybadger and Cub with Genesis Block').slug, 'honeybadger-and-cub-with-genesis-block');
  assert.equal(matchPainting('Re: hello', 'I hope this painting lasts'), null);
  assert.equal(matchPainting('Re: hello', 'Honeybadger and Cub with Genesis Block and Sunrise from Punta El Zonte Hostel'), null);
  assert.equal(htmlToText('<p>Hello</p><div class="gmail_quote">On Monday wrote:<br>old</div>').includes('old'), false);
  assert.match(htmlToText('<p>Hello there</p>'), /Hello there/);
});

test('email reply is stored pending, strips GPS, resizes, and stays off the public list until approval', async () => {
  const env = setup(largeImages());
  const raw = new TextEncoder().encode(rawReply());
  assert.ok(jpegExifTags(GPS_JPEG)[0].includes(0x8825));
  const result = await ingestRawBytes(env, null, raw, {envelopeFrom: 'jane@example.com', envelopeTo: DEFAULT_REPLY_ADDRESS, now});
  assert.equal(result.stored, true);
  assert.equal(result.outcome, 'pending');
  const rec = JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/' + result.id + '.json').value);
  assert.equal(rec.status, 'pending');
  assert.equal(rec.source, 'email-reply');
  assert.equal(rec.name, 'Jane');
  assert.equal(rec.fromName, 'Jane Collector');
  assert.equal(rec.email, 'jane@example.com');
  assert.equal(rec.quote, 'The light in our kitchen is different now.');
  assert.equal(rec.paintingSlug, 'honeybadger-and-cub-with-genesis-block');
  assert.equal(rec.city, 'Tacoma, WA');
  assert.equal(rec.geo.lat, 47.25);
  assert.equal(rec.publishConsent, 'implied-by-reply');
  assert.equal(rec.consent.publish, true);
  assert.equal(rec.consent.notice, EMAIL_REPLY_NOTICE);
  assert.equal(rec.consent.noticeSeen, true);
  assert.equal(rec.photos.length, 1);
  assert.equal(rec.photos[0].resized, true);
  assert.equal(rec.photos[0].publishable, true);
  const stored = env.COMMISSION_UPLOADS.data.get(rec.photos[0].key).value;
  assert.equal(jpegExifTags(stored).some(tags => tags.includes(0x8825)), false);
  assert.equal(new TextDecoder('latin1').decode(stored).includes('TestCam'), false);
  assert.equal(mails.length, 1);
  const note = atob(mails[0].raw.replace(/-/g, '+').replace(/_/g, '/'));
  assert.match(note, /email reply to stories@reply\.tjm\.art/);
  assert.match(note, /Reply-To: jane@example.com/);
  const again = await ingestRawBytes(env, null, raw, {envelopeTo: DEFAULT_REPLY_ADDRESS, now});
  assert.equal(again.duplicate, true);
  assert.equal(records(env).length, 1);
  assert.deepEqual((await (await testimonialsApi(new Request('https://tjm.art/testimonials/api/approved'), env, null, now)).json()).testimonials, []);

  const approved = await owner(env, {action: 'approve', id: result.id, sendThanks: false, lat: '47.25', lng: '-122.44', map: true});
  assert.equal(approved.status, 200);
  const [pub] = (await (await testimonialsApi(new Request('https://tjm.art/testimonials/api/approved'), env, null, now)).json()).testimonials;
  assert.equal(pub.name, 'Jane');
  assert.equal(pub.painting, 'Honeybadger and Cub with Genesis Block');
  assert.equal(pub.paintingHref, '/products/honeybadger-and-cub-with-genesis-block/');
  assert.equal(pub.quote, 'The light in our kitchen is different now.');
  assert.equal(pub.photos.length, 1);
  assert.equal(JSON.stringify(pub).includes('jane@example.com'), false);
  assert.equal(JSON.stringify(pub).includes('fromName'), false);
});

test('photo-only reply approves with initials when there is no given name', async () => {
  const env = setup();
  const raw = rawReply({text: 'Sent from my iPhone\n', from: 'j.collector@example.com', subject: 'Re: A photo of your painting?', id: '<photo-only@example.com>'});
  const result = await ingestRawBytes(env, null, new TextEncoder().encode(raw), {envelopeTo: DEFAULT_REPLY_ADDRESS, now});
  assert.equal(result.stored, true);
  const rec = JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/' + result.id + '.json').value);
  assert.equal(rec.quote, '');
  assert.equal(rec.name, 'J.C.');
  assert.equal(rec.consent.noticeSeen, false);
  assert.equal(rec.consent.publish, true);
  assert.equal(rec.photos[0].resized, false);
  assert.equal(jpegExifTags(env.COMMISSION_UPLOADS.data.get(rec.photos[0].key).value).some(tags => tags.includes(0x8825)), false);
  const approved = await owner(env, {action: 'approve', id: result.id, sendThanks: false});
  assert.equal(approved.status, 200);
  const [pub] = (await (await testimonialsApi(new Request('https://tjm.art/testimonials/api/approved'), env, null, now)).json()).testimonials;
  assert.equal(pub.name, 'J.C.');
  assert.equal(pub.quote, '');
  assert.equal(pub.photos.length, 1);
});

test('the email handler ignores other recipients and the owner ingest requires the manager token', async () => {
  const env = setup();
  const forwards = [];
  const message = {
    from: 'jane@example.com', to: 'tj@tjm.art',
    raw: new Blob([new TextEncoder().encode(rawReply({to: 'tj@tjm.art'}))]).stream(),
    async forward(rcpt) { forwards.push(rcpt); },
    setReject(reason) { forwards.push('reject:' + reason); },
  };
  await handleTestimonialEmail(message, env, null);
  assert.deepEqual(forwards, ['tj@vermillionaurora.com']);
  assert.equal(records(env).length, 0);
  const denied = await testimonialsApi(new Request('https://tjm.art/testimonials/api/owner', {method: 'POST', headers: {Origin: 'https://tjm.art', Authorization: 'Bearer wrong', 'Content-Type': 'application/json'}, body: JSON.stringify({action: 'ingestReply', raw: 'YQ=='})}), env, null, now);
  assert.equal(denied.status, 403);
  const accepted = await owner(env, {action: 'ingestReply', raw: Buffer.from(rawReply({id: '<owner-ingest@example.com>', text: 'It hangs by the window.\n'})).toString('base64'), to: DEFAULT_REPLY_ADDRESS});
  assert.equal(accepted.status, 200);
  const body = await accepted.json();
  assert.equal(body.ok, true);
  assert.equal(body.outcome, 'pending');
  const rec = JSON.parse(env.COMMISSION_UPLOADS.data.get('testimonials/records/' + body.id + '.json').value);
  assert.equal(rec.quote, 'It hangs by the window.');
  assert.equal(rec.source, 'email-reply');
});

test('the website form still requires words when there is no video', async () => {
  const env = setup();
  const form = new FormData();
  form.set('name', 'Jane'); form.set('email', 'jane@example.com'); form.set('quote', ''); form.set('publishNotice', '2026-10-08b');
  const response = await testimonialsApi(new Request('https://tjm.art/testimonials/api/submit', {method: 'POST', body: form, headers: {Origin: 'https://tjm.art', 'CF-Connecting-IP': '203.0.113.9', Accept: 'application/json'}}), env, null, now);
  assert.equal(response.status, 400);
  assert.equal(records(env).length, 0);
});
