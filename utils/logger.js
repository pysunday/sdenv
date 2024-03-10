const paths = require('./paths');
const pkg = require(paths.package);
const log4js = require('log4js');

log4js.configure({
  appenders: {
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['console'], level: 'info' }
  }
});
const logger = log4js.getLogger(pkg.name);
logger.level = pkg.logLevel || 'debug';

module.exports = logger;
