require('dotenv').config();

const express = require('express');
const { config } = require('./config');
const { logger } = require('../utils/logger');
const { extractIncomingMessages } = require('../whatsapp/client');
const { handleIncomingMessage } = require('../whatsapp/handlers');
const { isValidWebhookSignature } = require('../whatsapp/webhookSecurity');

const app = express();

app.use(
  express.json({
    limit: '2mb',
    verify(req, _res, buf) {
      req.rawBody = buf;
    },
  }),
);

app.get('/health', (_req, res) => {
  res.status(200).json({ ok: true, service: 'whatsapp-image-to-prompt-bot' });
});

app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === config.verifyToken) {
    logger.info('Webhook verification succeeded.');
    return res.status(200).send(challenge);
  }

  logger.warn('Webhook verification failed.', { mode });
  return res.sendStatus(403);
});

app.post('/webhook', async (req, res) => {
  const signature = req.get('x-hub-signature-256');
  const signatureValidation = isValidWebhookSignature(signature, req.rawBody);

  if (signatureValidation.warning) {
    logger.warn(signatureValidation.warning);
  }

  if (!signatureValidation.valid) {
    logger.warn('Rejected webhook with invalid signature.');
    return res.status(401).json({ ok: false, error: 'Invalid signature' });
  }

  const incomingMessages = extractIncomingMessages(req.body);
  res.sendStatus(200);

  for (const messageEnvelope of incomingMessages) {
    try {
      await handleIncomingMessage(messageEnvelope);
    } catch (error) {
      logger.error('Failed processing inbound message.', {
        error: error.message,
      });
    }
  }
});

app.use((error, _req, res, _next) => {
  logger.error('Unhandled server error.', { error: error.message });
  res.status(500).json({ ok: false, error: 'Internal server error' });
});

app.listen(config.port, () => {
  logger.info('WhatsApp image-to-prompt bot is running.', {
    port: config.port,
    nodeEnv: config.nodeEnv,
  });
});
