const { jsdomFromText, jsdomFromUrl } = require('./utils/jsdom');
const browser = require('./browser/');

module.exports = {
  jsdomFromUrl,
  jsdomFromText,
  browser
}
