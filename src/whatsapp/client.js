const { config } = require('../server/config');
const axios = require('axios');

function apiBaseUrl() {
  return `https://graph.facebook.com/${config.whatsappApiVersion}`;
}

function assertNumericId(value, fieldName) {
  if (!/^[0-9]+$/.test(String(value || ''))) {
    throw new Error(`Invalid ${fieldName}.`);
  }
}

function authHeaders() {
  return {
    Authorization: 'Bearer ' + config.whatsappToken,
    'Content-Type': 'application/json',
  };
}

async function getMediaMetadata(mediaId) {
  assertNumericId(mediaId, 'media id');
  const safeMediaId = String(mediaId);

  const response = await axios.get(apiBaseUrl(), {
    timeout: config.requestTimeoutMs,
    headers: authHeaders(),
    params: {
      ids: safeMediaId,
      fields: 'url,mime_type',
    },
  });

  const mediaMetadata = response.data?.[safeMediaId];
  if (!mediaMetadata) {
    throw new Error('Unable to retrieve media metadata.');
  }

  return mediaMetadata;
}

async function sendTextMessage(to, body) {
  const response = await axios.post(
    `${apiBaseUrl()}/${config.whatsappPhoneNumberId}/messages`,
    {
      messaging_product: 'whatsapp',
      recipient_type: 'individual',
      to,
      type: 'text',
      text: {
        body,
        preview_url: false,
      },
    },
    {
      timeout: config.requestTimeoutMs,
      headers: authHeaders(),
    },
  );
  return response.data;
}

function extractIncomingMessages(payload) {
  if (!payload?.entry?.length) return [];

  const output = [];

  for (const entry of payload.entry) {
    for (const change of entry?.changes || []) {
      const value = change?.value;
      if (!value?.messages?.length) continue;

      for (const message of value.messages) {
        output.push({
          message,
          metadata: value.metadata,
          contacts: value.contacts,
        });
      }
    }
  }

  return output;
}

module.exports = {
  authHeaders,
  extractIncomingMessages,
  getMediaMetadata,
  sendTextMessage,
};
