const path = require('path');
const fs = require('fs');

const appDirectory = (() => {
  // 返回项目根目录
  const plist = fs.realpathSync(__dirname).split('/');
  while (!fs.existsSync(path.resolve(plist.join('/'), 'package.json'))) {
    plist.pop();
    if (plist.length === 0) return false;
  }
  return plist.join('/');
})();
const resolveApp = (...relativePath) => path.resolve(appDirectory, ...relativePath);

module.exports = {
  basePath: resolveApp(''),
  homePath: __dirname,
  modulePath: resolveApp('node_modules'),
  binPath: resolveApp('node_modules/.bin/'),
  package: resolveApp('package.json'),
  resolve: resolveApp,
  handlerPath: resolveApp('handler'),
  configPath: resolveApp('config'),
  configResolve: (...p) => resolveApp('config', ...p),
};
