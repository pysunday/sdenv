require('module-alias/register');
const sdenvExtend = require('sdenv-extend');

module.exports = (win, type = 'chrome') => {
  new sdenvExtend({
    memory: {
      sdenvExtend,
    }
  }, win);
  require(`@/browser/${type}`);
  return new sdenvExtend();
}
