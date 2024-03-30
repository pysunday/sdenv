const path = require('path');
const fs = require('fs');

const appDirectory = (() => {
  // 返回项目根目录
  const plist = path.resolve(__dirname).split(path.sep);
  while (!fs.existsSync(path.resolve(plist.join(path.sep), 'package.json'))) {
    plist.pop();
    if (plist.length === 0) return false;
  }
  return plist.join(path.sep);
})();
const resolveApp = (...relativePath) => path.resolve(appDirectory, ...relativePath);

module.exports = {
  basePath: resolveApp('.'),
  modulePath: resolveApp('node_modules'),
  binPath: resolveApp('node_modules', '.bin/'),
  package: resolveApp('package.json'),
  resolve: resolveApp,
  handlerPath: resolveApp('handler'),
  configPath: resolveApp('config'),
  configResolve: (...p) => resolveApp('config', ...p),
};
