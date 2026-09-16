const crypto = require('crypto');
const { config } = require('../server/config');

let warnedMissingSecret = false;

function timingSafeEqual(a, b) {
  const first = Buffer.from(a);
  const second = Buffer.from(b);

  if (first.length !== second.length) {
    return false;
  }

  return crypto.timingSafeEqual(first, second);
}

function isValidWebhookSignature(signatureHeader, rawBodyBuffer) {
  if (!config.whatsappAppSecret) {
    if (!warnedMissingSecret) {
      warnedMissingSecret = true;
      return { valid: true, warning: 'WHATSAPP_APP_SECRET not set; webhook signatures are not being verified.' };
    }

    return { valid: true };
  }

  if (!signatureHeader || !rawBodyBuffer) {
    return { valid: false };
  }

  const expected =
    'sha256=' +
    crypto
      .createHmac('sha256', config.whatsappAppSecret)
      .update(rawBodyBuffer)
      .digest('hex');

  return { valid: timingSafeEqual(expected, signatureHeader) };
}

module.exports = { isValidWebhookSignature };
