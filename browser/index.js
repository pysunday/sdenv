require('module-alias/register');
const SdenvExtend = require('sdenv-extend');

module.exports = (win, type = 'chrome') => {
  new SdenvExtend({
    memory: {
      SdenvExtend,
    }
  }, win);
  require(`@/browser/${type}`);
  return new SdenvExtend();
}
