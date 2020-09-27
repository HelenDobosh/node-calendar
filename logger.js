const logger = {
  log: (message) => console.log('log:', message),
  debug: (message) => console.debug('debug:', message),
  error: (message) => console.error('error:', message),
  warn: (message) => console.warn('warn:', message)
};

module.exports = { logger };
