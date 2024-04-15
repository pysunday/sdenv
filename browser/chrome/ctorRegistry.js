const logger = require('@utils/logger');
const utils = require('sdenv-jsdom/lib/jsdom/living/generated/utils.js');

module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;
  const ctorRegistry = window[utils.ctorRegistrySymbol]
  window[utils.ctorRegistrySymbol] = new window.Proxy(ctorRegistry, {
    get(target, propKey, receiver) {
      logger.trace('proxy ctorRegistry get', propKey);
      return window.Reflect.get(target, propKey, receiver);
    }
  })
}
