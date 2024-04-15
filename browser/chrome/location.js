module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  Object.defineProperty(window.location, 'replace', {
    ...Object.getOwnPropertyDescriptor(window.location, 'replace'),
    writable: false,
    value: function(url) {
      sdenv.tools.exit({ url });
    }
  });
}
