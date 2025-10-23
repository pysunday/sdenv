module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  const webkitRequestFileSystem = function webkitRequestFileSystem(type, size, successCallback, errorCallback) {
    if (typeof successCallback === 'function') {
      window.setTimeout(successCallback, 0);
    }
  };
  sdenv.tools.setFuncNative(webkitRequestFileSystem, 'webkitRequestFileSystem', 3);
  window.webkitRequestFileSystem = webkitRequestFileSystem;
}
