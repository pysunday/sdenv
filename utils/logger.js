const paths = require('./paths');
const pkg = require(paths.package);
const log4js = require('log4js');

log4js.configure({
  appenders: {
    out: {
      type: 'stdout',
      layout: {
        type: 'pattern',
        pattern: '%d{hh:mm:ss} %[%p %c -%] %m'
      }
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' }
  }
});

const logger = log4js.getLogger(pkg.name);
logger.level = pkg.logLevel || 'debug';

module.exports = logger;
