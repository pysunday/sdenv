process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const logger = require('../../utils/logger');
const browser = require('../../browser/');
const { jsdomFromUrl } = require('../../utils/jsdom');

const baseUrl = "https://wcjs.sbj.cnipa.gov.cn"

async function loadPages() {
  const [jsdomer, cookieJar] = jsdomFromUrl({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  });
  const dom = await jsdomer(`${baseUrl}/sgtmi`);
  window = dom.window
  window.onbeforeunload = async (url) => {
    const cookies = cookieJar.getCookieStringSync(baseUrl);
    logger.debug('生成cookie：', cookies);
    process.exit();
  }
  browser(window, 'chrome');
}

loadPages()
