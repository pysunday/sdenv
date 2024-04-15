const logger = require('@utils/logger');
module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  window.fetch = function fetch() {};
  sdenv.tools.setFuncNative(window.fetch);
  window.Request = function Request() {};
  sdenv.tools.setFuncNative(window.Request);
  window.closed = false;
  window.opener = null;
  window.clientInformation = window.navigator;
  window.isSecureContext = false;
  window.open = function(url) {
    sdenv.tools.exit({ url });
  }
  sdenv.tools.setFuncNative(window.Event, 'Event');
  delete window.XPathException;
  sdenv.tools.setFuncNative(window.prompt, 'prompt');
  // Object.assign(window, {
  //   innerWidth: 326,
  //   innerHeight: 992,
  //   outerWidth: 1728,
  //   outerHeight: 1079,
  // });
}
