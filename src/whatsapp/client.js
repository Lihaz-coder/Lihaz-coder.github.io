const { config } = require('../server/config');
const { getJson, postJson } = require('../utils/http');

function apiBaseUrl() {
  return `https://graph.facebook.com/${config.whatsappApiVersion}`;
}

function authHeaders() {
  return {
    Authorization: 'Bearer ' + config.whatsappToken,
    'Content-Type': 'application/json',
  };
}

async function getMediaMetadata(mediaId) {
  return getJson(`${apiBaseUrl()}/${mediaId}`, {
    headers: authHeaders(),
  });
}

async function sendTextMessage(to, body) {
  return postJson(
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
      headers: authHeaders(),
    },
  );
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
