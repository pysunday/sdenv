// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// process.env.OPENSSL_LEGACY_RENEGOTIATION = '1';
try{require('module-alias')()}catch(err){};
const logger = require('sdenv/utils/logger');
const { jsdomFromUrl } = require('sdenv');
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36';

const tarUrl = "https://zhaopin.sgcc.com.cn/sgcchr/static/dynaAument.html"

async function loadPagesSecond(url, cookieJar) {
  const { window, sdenv } = await jsdomFromUrl(url, { cookieJar, userAgent, consoleConfig: { error: new Function } });
  const title = window.document.title || window.document.querySelector('meta[name="keywords"]')?.content;
  if (title) {
    logger.info(`cookie验证通过，网站名称或者描述为：${title}`);
  } else {
    logger.error('cookie验证不通过！')
  }
  sdenv.tools.wrapFunc(window.document, "querySelector", (func, selector, ...params) => {
    if (selector === ':has(*,:jqfake)') {
      throw new SyntaxError(`Failed to execute 'querySelector' on 'Document': '${selector}' is not a valid selector.`);
    }
    return func(selector, ...params);
  });
  sdenv.getHandle('request')({ cb: ({ response, url, status }) => {
    if (url.indexOf('https://zhaopin.sgcc.com.cn/sgcchr/index/notes_list') === 0) {
      logger.info(`链接: ${url} 返回数据: ${sdenv.tools.compressText(response, 400)}`);
      process.exit();
    }
  } })
}

async function loadPagesFirst(url) {
  const { window, cookieJar } = await jsdomFromUrl(url, { userAgent });
  window.addEventListener('sdenv:location.replace', (e) => {
    e.target.close();
    logger.debug('生成cookie：', cookieJar.getCookieStringSync(url));
    loadPagesSecond(e.detail.url, cookieJar);
  })
}

loadPagesFirst(tarUrl)
