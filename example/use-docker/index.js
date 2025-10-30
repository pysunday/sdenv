#!/usr/bin/env node

// process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
// process.env.OPENSSL_LEGACY_RENEGOTIATION = '1';
try{require('module-alias')()}catch(err){};
const logger = require('sdenv/utils/logger');
const { jsdomFromUrl, jsdomFromText } = require('sdenv');
const header = {
  userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
  // proxy: "http://127.0.0.1:8888",
}

const args = process.argv.slice(2);

const tarUrl = args[0];
if (!tarUrl) throw new Error('请传入目标网站地址！')
logger.debug(`请求网站：${tarUrl}`);

async function loadPage(url) {
  const { window, sdenv, cookieJar, serialize } = await jsdomFromUrl(url, header);
  if (window.$_ts) {
    logger.info(`请求为rs网站，请等待生成cookie及重新请求，当前$_ts值：${JSON.stringify(window.$_ts)}`)
  } else {
    logger.warn(sdenv.tools.compressText(serialize(), 800));
    logger.warn('请求非rs网站!');
  }
  window.addEventListener('sdenv:exit', async (e) => {
    if (['location.replace', 'location.assign'].includes(e.detail.eventId)) {
      const cookies = cookieJar.getCookieStringSync(url);
      logger.debug('生成cookie：', cookies);
      logger.debug(`${e.detail.eventId} 事件触发，跳转并验证cookie：${e.detail.url}`);
      window.close();
      const res = await fetch(e.detail.url, {
        headers: {
          "Cookie": cookies,
          "user-agent": header.userAgent,
        },
      });
      const contentType = res.headers.get('content-type');
      const text = await res.text()
      if (contentType === 'application/json') {
        logger.info(`cookie验证通过，返回的数据：${sdenv.tools.compressText(text, 300)}`);
      } else {
        const { window } = jsdomFromText(text);
        const title = window.document.title
          || window.document.querySelector('meta[name="keywords"]')?.content
          || window.document.querySelector('meta[name="description"]')?.content;
        if (title) {
          logger.info(`cookie验证通过，网站名称或者描述为：${title}`);
        } else {
          try {
            const bodyContent = window.document.getElementsByTagName('body')[0].textContent.replace(/\s+/g, ' ')
            logger.info(`body文本：${sdenv.tools.compressText(bodyContent, 300)}`);
            logger.error('未找到网页标题、关键词或描述，请自行核对body文本验证！');
          } catch(err) {
            logger.error('cookie验证不通过！')
          }
        }
      }
    }
  })
}

loadPage(tarUrl)
