const { jsdomFromText, jsdomFromUrl } = require('./utils/jsdom');
const browser = require('./browser/');
const version = require('./package.json').version.split('-')[0];

module.exports = {
  jsdomFromUrl,
  jsdomFromText,
  browser,
  version,
}
