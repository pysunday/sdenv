module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  const IDBFactory = function IDBFactory() {
    throw new TypeError("Illegal constructor");
  }

  const indexedDB = {
    __proto__: IDBFactory.prototype
  };

  sdenv.tools.setNativeFuncName(IDBFactory, 'IDBFactory');
  sdenv.tools.setNativeObjName(indexedDB, 'IDBFactory');

  window.IDBFactory = IDBFactory;
  window.indexedDB = indexedDB;
}
