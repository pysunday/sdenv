process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const logger = require('../../utils/logger');
const { jsdomFromUrl, browser } = require('../../');

const [jsdomer, cookieJar] = jsdomFromUrl({
  proxy: "http://127.0.0.1:7760",
})

const baseUrl = "http://epub.cnipa.gov.cn/"

async function loadPages() {
  const dom = await jsdomer(`${baseUrl}`);
  browser(dom.window, 'chrome');
}
loadPages()

