// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const logger = require('../../utils/logger');
const { jsdomFromUrl, browser } = require('../../');

const baseUrl = "http://epub.cnipa.gov.cn/"
const config = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  consoleConfig: {
    error: () => {},
  }
}

async function loadPagesSecond(cookieJar) {
  const [jsdomer, ..._] = jsdomFromUrl(config, cookieJar);
  const dom = await jsdomer(`${baseUrl}`);
  if (dom.window.document.title) {
    logger.info(`cookie验证通过，存在document.title，且值为：${dom.window.document.title}`);
  } else {
    logger.error('cookie验证不通过!');
  }
  process.exit();
  // dom.window.close();
}

async function loadPagesFirst() {
  const [jsdomer, cookieJar] = jsdomFromUrl(config);
  const dom = await jsdomer(`${baseUrl}`);
  window = dom.window
  window.onbeforeunload = async (url) => {
    const cookies = cookieJar.getCookieStringSync(baseUrl);
    logger.debug('生成cookie：', cookies);
    await loadPagesSecond(cookieJar)
    window.close();
  }
  browser(window, 'chrome');
}

loadPagesFirst()
