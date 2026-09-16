function formatMeta(meta = {}) {
  const entries = Object.entries(meta).filter(([, value]) => value !== undefined);
  if (!entries.length) return '';
  return ` ${JSON.stringify(Object.fromEntries(entries))}`;
}

function log(level, message, meta) {
  const timestamp = new Date().toISOString();
  const output = `[${timestamp}] [${level}] ${message}${formatMeta(meta)}`;

  if (level === 'ERROR') {
    console.error(output);
    return;
  }

  console.log(output);
}

const logger = {
  info(message, meta) {
    log('INFO', message, meta);
  },
  warn(message, meta) {
    log('WARN', message, meta);
  },
  error(message, meta) {
    log('ERROR', message, meta);
  },
};

module.exports = { logger };
