const utils = require('sdenv-jsdom/lib/jsdom/living/generated/utils.js');
module.exports = (sdenv) => {
  const document = sdenv.memory.sdWindow.document;
  const getElementsByTagNameOri = document.getElementsByTagName;
  document.getElementsByTagName = (...params) => {
    var findArr = getElementsByTagNameOri.apply(document, params);
    if (params[0] === 'script') {
      var lastIdx = findArr.length - 1;
      if (lastIdx > -1) {
        return [...findArr].slice(0, lastIdx);
      }
    }
    return findArr;
  }
}
