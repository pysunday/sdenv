const sdenv = require('sdenv-extend').sdenv();
const window = sdenv.memory.sdWindow;

window.styleMedia = sdenv.tools.getNativeProto('StyleMedia', 'styleMedia', {
  type: 'screen'
})[1];
