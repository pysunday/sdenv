process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const logger = require('../../utils/logger');
const browser = require('../../browser/');
const { jsdomFromUrl } = require('../../utils/jsdom');

const [jsdomer, cookieJar] = jsdomFromUrl({
  proxy: "http://127.0.0.1:7759",
})

const baseUrl = "https://wcjs.sbj.cnipa.gov.cn"

async function loadPages() {
  const dom = await jsdomer(`${baseUrl}/first`);
  browser(dom.window, 'chrome');
  dom.window.onbeforeunload = async (url) => {
    const cookies = cookieJar.getCookieStringSync(baseUrl);
    logger.debug('cookieJar：', cookies);
  }
}
loadPages()

