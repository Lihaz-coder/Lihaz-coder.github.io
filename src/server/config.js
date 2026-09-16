const path = require('path');

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optionalNumber(name, fallback) {
  const value = process.env[name];
  if (!value) return fallback;
  const parsed = Number(value);
  if (Number.isNaN(parsed)) {
    throw new Error(`Environment variable ${name} must be a number.`);
  }
  return parsed;
}

const config = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: optionalNumber('PORT', 4000),
  verifyToken: requireEnv('WHATSAPP_VERIFY_TOKEN'),
  whatsappToken: requireEnv('WHATSAPP_ACCESS_TOKEN'),
  whatsappPhoneNumberId: requireEnv('WHATSAPP_PHONE_NUMBER_ID'),
  whatsappApiVersion: process.env.WHATSAPP_API_VERSION || 'v20.0',
  whatsappAppSecret: process.env.WHATSAPP_APP_SECRET || '',
  openAiApiKey: requireEnv('OPENAI_API_KEY'),
  openAiModel: process.env.OPENAI_VISION_MODEL || 'gpt-4o-mini',
  tempDir: process.env.TEMP_DIR || path.join(process.cwd(), 'tmp'),
  requestTimeoutMs: optionalNumber('REQUEST_TIMEOUT_MS', 30000),
};

module.exports = { config };
