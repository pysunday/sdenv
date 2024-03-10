const paths = require('./paths');

module.exports = (filename, def = {}) => {
  try {
    return require(paths.configResolve(`${filename}.json`));
  } catch(e) {
    return def || {};
  }
}
