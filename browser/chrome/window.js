const logger = require('@utils/logger');
const sdenv = require('sdenv-extend').sdenv();
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
// window.console = logger;
