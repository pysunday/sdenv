require('module-alias/register');
// const jsdomDevtoolsFormatter = require('jsdom-devtools-formatter');
// jsdomDevtoolsFormatter.install();
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
