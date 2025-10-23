// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// process.env.OPENSSL_LEGACY_RENEGOTIATION = '1';
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
  const title = dom.window.document.title || dom.window.document.querySelector('meta[name="keywords"]')?.content;
  if (title) {
    logger.info(`cookie验证通过，网站名称或者描述为：${title}`);
  } else {
    try {
      logger.info(`body文本：${[...dom.window.document.getElementsByTagName('body')].pop().textContent.replace(/\s+/g, ' ')}`);
      logger.error('未找到网页标题或描述，请自行核对body文本验证！');
    } catch(err) {
      logger.error('cookie验证不通过！')
    }
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
