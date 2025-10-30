try{require('module-alias')()}catch(err){};
const fs = require('fs');
const path = require('path');
const { Script } = require("vm");
const logger = require('sdenv/utils/logger');
const { jsdomFromText } = require('sdenv');

const baseUrl = "https://wcjs.sbj.cnipa.gov.cn"

const files = {
  // 此处的文件可以通过运行npx rs-reverse makecode tarurl自动生成
  html: path.resolve(__dirname, 'output/makecode_input_html.html'),
  js: path.resolve(__dirname, 'output/makecode_input_js.js'),
  ts: path.resolve(__dirname, 'output/makecode_input_ts.json'),
}

function getFile(name) {
  const filepath = files[name];
  if (!filepath) throw new Error(`getFile: ${name}错误`);
  if (!fs.existsSync(filepath)) throw new Error(`文件${filepath}不存在，请使用rs-reverse工具先获取文件`);
  return fs.readFileSync(filepath);
}

function initBrowser(window, cookieJar) {
  window.$_ts = JSON.parse(getFile('ts'));
  window.addEventListener('sdenv:location.replace', (e) => {
    const cookies = cookieJar.getCookieStringSync(baseUrl);
    logger.debug('生成cookie：', cookies);
    window.close();
  })
}

async function loadPages() {
  const htmltext = getFile('html');
  const jstext = getFile('js');
  const dom = jsdomFromText(htmltext, {
    url: `${baseUrl}/sgtmi`,
    referrer: `${baseUrl}/sgtmi`,
    contentType: "text/html",
    runScripts: "outside-only",
  })
  initBrowser(dom.window, dom.cookieJar);
  new Script(jstext).runInContext(dom.getInternalVMContext());
}

loadPages()
