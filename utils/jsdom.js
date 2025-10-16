const jsdom = require('sdenv-jsdom');
const logger = require('./logger');
const { JSDOM, CookieJar } = jsdom;

exports.jsdomFromUrl = (cfg, cookieJar) => {
  const { consoleConfig = {}, ...config } = cfg;
  const resourceLoader = new jsdom.ResourceLoader({
    strictSSL: false,
    ...config,
  });
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.sendTo({
    log: logger.log.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    ...consoleConfig,
  });
  if (!cookieJar) cookieJar = new CookieJar();
  const options = {
    pretendToBeVisual: true,
    runScripts: "dangerously",
    resources: resourceLoader,
    cookieJar,
    virtualConsole,
  }
  return [(url) => {
    return JSDOM.fromURL(url, options);
  }, cookieJar];
};

exports.jsdomFromText = (cfg) => {
  const { consoleConfig = {}, ...config } = cfg;
  const virtualConsole = new jsdom.VirtualConsole();
  virtualConsole.sendTo({
    log: logger.log.bind(logger),
    warn: logger.warn.bind(logger),
    error: logger.error.bind(logger),
    ...consoleConfig,
  });
  const cookieJar = new CookieJar()
  const options = {
    pretendToBeVisual: true,
    cookieJar,
    virtualConsole,
    ...config,
  }
  return [(text) => {
    return new JSDOM(text, options);
  }, cookieJar];
}
