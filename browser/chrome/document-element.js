const utils = require('sdenv-jsdom/lib/jsdom/living/generated/utils.js');
module.exports = (sdenv) => {
  const document = sdenv.memory.sdWindow.document;
  const getElementsByTagNameOri = document.getElementsByTagName;
  document.getElementsByTagName = (...params) => {
    var findArr = getElementsByTagNameOri.apply(document, params);
    if (params[0] === 'script' && document.readyState === 'loading' && document[utils.implSymbol]._currentScript) {
      // dom动态解析的临时解决方案，看后续是否会产生其它问题
      const findIdx = [...findArr].indexOf(document[utils.implSymbol]._currentScript[utils.wrapperSymbol]);
      if (findIdx > -1) {
        return [...findArr].slice(0, findIdx + 1);
      }
    }
    return findArr;
  }
}
