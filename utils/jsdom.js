const jsdom = require('sdenv-jsdom');
const logger = require('./logger');
const { JSDOM, CookieJar } = jsdom;
const browser = require('../browser/');

function getVirtualConsole(consoleConfig) {
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.on("log", consoleConfig.log || logger.log.bind(logger));
  virtualConsole.on("warn", consoleConfig.warn || logger.warn.bind(logger));
  virtualConsole.on("error", consoleConfig.error || logger.error.bind(logger));
  virtualConsole.on("info", consoleConfig.info || logger.info.bind(logger));
  virtualConsole.on("jsdomError", consoleConfig.error || logger.error.bind(logger));
  return virtualConsole;
}

exports.jsdomFromUrl = async (url, {
  consoleConfig = {},
  cookieJar = new CookieJar(),
  browserType = 'chrome',
  ...config
} = {}) => {
  if (!browser.isSupport(browserType)) throw new Error(`浏览器类型（${browserType}）不正确或未适配！`)
  const resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false,
    ...config,
  });
  const options = {
    pretendToBeVisual: true,
    runScripts: "dangerously",
    resources: resourceLoader,
    cookieJar,
    virtualConsole: getVirtualConsole(consoleConfig),
  }
  const dom = await JSDOM.fromURL(url, options);
  dom.sdenv = browser(dom.window, browserType);
  return dom;
};

exports.jsdomFromText = (html, {
  consoleConfig = {},
  cookieJar = new CookieJar(),
  browserType = 'chrome',
  ...config
} = {}) => {
  if (!browser.isSupport(browserType)) throw new Error(`浏览器类型（${browserType}）不正确或未适配！`)
  const options = {
    pretendToBeVisual: true,
    cookieJar,
    virtualConsole: getVirtualConsole(consoleConfig),
    ...config,
  }
  const dom = new JSDOM(html, options);
  dom.sdenv = browser(dom.window, browserType);
  return dom;
}
