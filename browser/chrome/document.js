const getDocumentAll = require('@/build/Release/documentAll').getDocumentAll;
module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  window.document.all = getDocumentAll({ length: 3 });
}
