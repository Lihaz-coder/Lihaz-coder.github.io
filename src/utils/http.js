const axios = require('axios');
const { config } = require('../server/config');

async function getJson(url, options = {}) {
  const response = await axios.get(url, {
    timeout: config.requestTimeoutMs,
    ...options,
  });

  return response.data;
}

async function postJson(url, body, options = {}) {
  const response = await axios.post(url, body, {
    timeout: config.requestTimeoutMs,
    ...options,
  });

  return response.data;
}

module.exports = { getJson, postJson };
