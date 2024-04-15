process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const logger = require('../../utils/logger');
const browser = require('../../browser/');
const { jsdomFromUrl } = require('../../utils/jsdom');

const baseUrl = "https://wcjs.sbj.cnipa.gov.cn"

async function loadPagesSecond(cookieJar) {
  const [jsdomer, ..._] = jsdomFromUrl({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  }, cookieJar);
  const dom = await jsdomer(`${baseUrl}/sgtmi`);
  if (dom.window.document.title === '商标网上检索') {
    logger.info(`cookie验证通过，存在document.title，且值为：${dom.window.document.title}`);
  } else {
    logger.error('cookie验证不通过!');
  }
  dom.window.close();
}

async function loadPagesFirst() {
  const [jsdomer, cookieJar] = jsdomFromUrl({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  });
  const dom = await jsdomer(`${baseUrl}/sgtmi`);
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
