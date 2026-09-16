const { analyzeImageForPrompt } = require('../ai/visionService');
const { downloadBinaryToTemp, fileToDataUrl, cleanupFile } = require('../image/mediaService');
const { buildFinalPrompt } = require('../prompts/promptBuilder');
const { logger } = require('../utils/logger');
const { authHeaders, getMediaMetadata, sendTextMessage } = require('./client');

const TEXT_ONLY_RESPONSE =
  'Please send an image/photo. I will create a detailed AI image-generation prompt from it.';

const ANALYSIS_FAILURE_RESPONSE =
  "❌ I couldn't analyze this image right now. Please send the photo again.";

function extensionFromMime(mimeType = '') {
  const value = mimeType.split('/')[1] || 'jpg';
  return value.split(';')[0];
}

async function handleImageMessage({ from, imageId, messageId }) {
  let tempFilePath;

  try {
    const metadata = await getMediaMetadata(imageId);

    if (!metadata?.url || !metadata?.mime_type) {
      throw new Error('Missing media URL or mime type from WhatsApp API.');
    }

    tempFilePath = await downloadBinaryToTemp(
      metadata.url,
      authHeaders(),
      extensionFromMime(metadata.mime_type),
    );

    const dataUrl = await fileToDataUrl(tempFilePath, metadata.mime_type);
    const analysis = await analyzeImageForPrompt(dataUrl);
    const { whatsappMessage } = buildFinalPrompt(analysis);

    await sendTextMessage(from, whatsappMessage);

    logger.info('Image processed successfully.', { from, messageId, imageId });
  } catch (error) {
    logger.error('Image processing failed.', {
      from,
      messageId,
      imageId,
      error: error.message,
    });

    await sendTextMessage(from, ANALYSIS_FAILURE_RESPONSE);
  } finally {
    await cleanupFile(tempFilePath);
  }
}

async function handleTextOrUnsupportedMessage({ from, type, messageId }) {
  await sendTextMessage(from, TEXT_ONLY_RESPONSE);
  logger.info('Handled non-image message.', { from, type, messageId });
}

async function handleIncomingMessage(messageEnvelope) {
  const message = messageEnvelope?.message;
  if (!message || !message.from) return;

  const from = message.from;
  const messageId = message.id;

  if (message.type === 'image' && message.image?.id) {
    await handleImageMessage({
      from,
      messageId,
      imageId: message.image.id,
    });
    return;
  }

  if (message.type === 'text') {
    await handleTextOrUnsupportedMessage({ from, type: 'text', messageId });
    return;
  }

  await handleTextOrUnsupportedMessage({ from, type: message.type || 'unknown', messageId });
}

module.exports = {
  ANALYSIS_FAILURE_RESPONSE,
  TEXT_ONLY_RESPONSE,
  handleIncomingMessage,
};
