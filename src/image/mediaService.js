const crypto = require('crypto');
const fs = require('fs/promises');
const path = require('path');
const axios = require('axios');
const { config } = require('../server/config');

async function ensureTempDir() {
  await fs.mkdir(config.tempDir, { recursive: true });
}

async function downloadBinaryToTemp(url, headers = {}, extension = 'bin') {
  await ensureTempDir();

  const safeExtension = extension.replace(/[^a-z0-9]/gi, '').toLowerCase() || 'bin';
  const filename = `${Date.now()}-${crypto.randomUUID()}.${safeExtension}`;
  const filePath = path.join(config.tempDir, filename);

  const response = await axios.get(url, {
    responseType: 'arraybuffer',
    timeout: config.requestTimeoutMs,
    headers,
  });

  await fs.writeFile(filePath, response.data);
  return filePath;
}

async function fileToDataUrl(filePath, mimeType) {
  const buffer = await fs.readFile(filePath);
  const base64 = buffer.toString('base64');
  return `data:${mimeType};base64,${base64}`;
}

async function cleanupFile(filePath) {
  if (!filePath) return;
  try {
    await fs.unlink(filePath);
  } catch {
    // ignore cleanup errors
  }
}

module.exports = {
  cleanupFile,
  downloadBinaryToTemp,
  fileToDataUrl,
};
