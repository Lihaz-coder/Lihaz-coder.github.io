const axios = require('axios');
const { config } = require('../server/config');

const ALLOWED_HOSTS = new Set([
  'graph.facebook.com',
  'lookaside.fbsbx.com',
]);

function assertTrustedUrl(url) {
  const parsed = new URL(url);
  const hostname = parsed.hostname.toLowerCase();
  const isAllowedSubdomain = hostname.endsWith('.lookaside.fbsbx.com');

  if (parsed.protocol !== 'https:' || (!ALLOWED_HOSTS.has(hostname) && !isAllowedSubdomain)) {
    throw new Error('Blocked outbound request to untrusted URL.');
  }
}

async function getJson(url, options = {}) {
  assertTrustedUrl(url);

  const response = await axios.get(url, {
    timeout: config.requestTimeoutMs,
    ...options,
  });

  return response.data;
}

async function postJson(url, body, options = {}) {
  assertTrustedUrl(url);

  const response = await axios.post(url, body, {
    timeout: config.requestTimeoutMs,
    ...options,
  });

  return response.data;
}

module.exports = { assertTrustedUrl, getJson, postJson };
