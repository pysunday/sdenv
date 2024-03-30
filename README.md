<h1 align="center">
    <img width="100" height="100" src="https://github.com/pysunday/sdenv/blob/main/logo.png" alt=""><br>
    sdenv
</h1>

[![NPM version](https://badge.fury.io/js/sdenv.svg)](http://badge.fury.io/js/sdenv)


sdenv是一个javascript运行时补环境框架，与github上其它补环境框架存在较大区别，sdenv是站在巨人的肩膀上实现的，依赖于jsdom的强大dom仿真能力，sdenv可以真实模拟浏览器执行环境，作者在固定随机数与添加[sdenv-extend](https://github.com/pysunday/sdenv-extend)的部分插件后可以达到**瑞数vmp代码在sdenv运行生成的cookie值与浏览器生成的cookie值一致**。

* sdenv专用jsdom版本：[sdenv-jsdom](https://github.com/pysunday/sdenv-jsdom)
* sdenv多端环境提取：[sdenv-extend](https://github.com/pysunday/sdenv-extend)
* 对瑞数算法逆向可参考项目：[rs-reverse](https://github.com/pysunday/rs-reverse)

## 依赖

作者开发时使用的是`v20.10.0`版本node，预期最低要求是18版本，由于未做其它版本可用性测试，因此建议使用sdenv的node版本大于等于`v20.10.0`。

编译node插件用的是[node-gyp](https://github.com/nodejs/node-gyp)工具，该工具需要有python环境和c环境(如windows系统需安装Visual Studio)，请根据工具文档进行系统环境搭建。

## 可能出现的问题

1. node-gyp报错：请确保操作系统有c++编译环境与python环境；
2. 安装缓慢及canvas报错：由于canvas安装会优先从github获取现成的包，因此请在安装前先设置代理或者其它国内源，如果安装仍然失败请使用npm官方源+代理方式重新尝试；

有其它问题请提issues！

## 使用

### 源码方式

1. clone项目：`git clone https://github.com/pysunday/sdenv.git`
2. 安装依赖：`cd sdenv && npm i`
3. 运行样例：
    * [运行本地代码](https://github.com/pysunday/sdenv/blob/main/example/use-local/README.md)：`node example/use-local/index.js`
    * [运行网站代码](https://github.com/pysunday/sdenv/blob/main/example/use-remote/README.md)：`node example/use-remote/index.js`

![样例调用](https://github.com/pysunday/sdenv/blob/main/static/example.png)

### npm包方式

1. 安装npm包：`npm i sdenv`
2. 导入包方法：
```javascript
const browser = require('sdenv/browser/');
const { jsdomFromText, jsdomFromUrl } = require('sdenv/utils/jsdom');
```

### 样例代码

因为项目核心功能基于jsdom，且jsdom对dom的实现非常完善，因此使用sdenv之前建议有一定html与javascript语言开发基础，然后参考example目录下的样例文件:

1. 运行本地代码：[use-local](https://github.com/pysunday/sdenv/example/use-local/README.md)
    ```javascript
    const fs = require('fs');
    const path = require('path');
    const { Script } = require("vm");
    const logger = require('../../utils/logger');
    const browser = require('../../browser/');
    const { jsdomFromText } = require('../../utils/jsdom');

    const baseUrl = "https://wcjs.sbj.cnipa.gov.cn"

    const files = {
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
      window.onbeforeunload = async (url) => {
        const cookies = cookieJar.getCookieStringSync(baseUrl);
        logger.debug('生成cookie：', cookies);
        process.exit();
      }
      browser(window, 'chrome');
    }

    async function loadPages() {
      const htmltext = getFile('html');
      const jstext = getFile('js');
      const [jsdomer, cookieJar] = jsdomFromText({
        url: `${baseUrl}/sgtmi`,
        referrer: `${baseUrl}/sgtmi`,
        contentType: "text/html",
        runScripts: "outside-only",
      })
      const dom = jsdomer(htmltext);
      initBrowser(dom.window, cookieJar);
      new Script(jstext).runInContext(dom.getInternalVMContext());
    }

    loadPages()
    ```
2. 运行网站代码：[use-remote](https://github.com/pysunday/sdenv/example/use-remote/README.md)
    ```javascript
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
    ```

## sdenv-extend使用说明

为了模拟浏览器执行环境，需要将node环境与浏览器环境共有代码进行提取，并提供返回环境对象用于sdenv内window与dom内容补充使用。

sdenv-extend初始化只执行一次，初始化成功后生成的环境对象可以使用`Object.sdenv()`(vm中使用非node)获取。

sdenv-extend具体功能可参考项目内[README文档](https://github.com/pysunday/sdenv-extend/blob/main/README.md)。


## 声明

该项目的开发基于瑞数vmp网站，不能保证在其它反爬虫产品稳定使用，出现问题请及时提issues或者提pull参与共建!

由于初期版本只做了chrome浏览器的拟真，且项目文档不完善，作者会陆续补充，可以加入技术交流群与订阅号持续关注！

添加作者微信进技术交流群：howduudu_tech(备注sdenv)

订阅号会定期发表技术文章：码功
