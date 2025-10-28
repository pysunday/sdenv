module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;
  const setFuncNative = sdenv.tools.setFuncNative;

  Object.defineProperty(window.location, 'replace', {
    ...Object.getOwnPropertyDescriptor(window.location, 'replace'),
    writable: false,
    value: function(url) {
      sdenv.tools.exit({ url, eventId: 'location.replace' });
    }
  });
  setFuncNative(window.location.replace, 'replace', 1);

  Object.defineProperty(window.location, 'assign', {
    ...Object.getOwnPropertyDescriptor(window.location, 'assign'),
    writable: false,
    value: function(url) {
      sdenv.tools.exit({ url, eventId: 'location.assign' });
    }
  });
  setFuncNative(window.location.assign, 'assign', 1);
}
