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

编译node插件用的是[node-gyp](https://github.com/nodejs/node-gyp)工具，该工具需要有python环境和c环境(如windows系统需安装Visual Studio，Mac系统需要安装XCode)，请根据[工具文档](https://github.com/nodejs/node-gyp)进行系统环境搭建。

**需要注意windows中安装Visual Studio时需要勾选`使用C++的桌面开发`选项**

![安装Visual Studio注意](https://github.com/pysunday/sdenv/blob/main/static/vs-tip.png)

## 可能出现的问题

1. npm安装node-gyp报错：请确保操作系统有c++编译环境与python环境，报错示例（感谢用户风流小混沌提供图片素材）:
![npm安装报错](https://github.com/pysunday/sdenv/blob/main/static/install-error.jpeg)
2. 安装缓慢及canvas报错：由于canvas安装会优先从github获取现成的包，因此请在安装前先设置代理或者其它国内源，如果安装仍然失败请使用npm官方源+代理方式重新尝试；

**解决完报错后记得重新执行下依赖安装！**

有其它问题请提issues！

## 使用

### npm包使用

1. 创建自己的项目
2. 项目中安装sdenv：`npm i sdenv`（请确保安装没有报错）
3. 在项目中导入api并使用（可以参考example目录下的用例）：
```javascript
const { jsdomFromText, jsdomFromUrl, browser } = require('sdenv');
```

### 样例代码运行

注意：样例代码仅供参考，作者建议使用npm包方式使用sdenv框架!

#### 源码方式

clone项目仓库后执行依赖安装`npm i`，确保依赖安装成功后即可运行example目录下的样例文件了。

1. 运行本地代码：[use-local](./example/use-local/README.md)
    ![样例调用](https://github.com/pysunday/sdenv/blob/main/static/example-use-local.png)
2. 运行网站代码：[use-remote](./example/use-remote/README.md)
    ![样例调用](https://github.com/pysunday/sdenv/blob/main/static/example-use-remote.png)

#### docker运行容器内的样例文件

首先执行`uname -a`后查看架构类型，支持`arm64`和`x86_64`

如果是`arm64`架构则执行命令：

1. 运行本地代码：`docker run --rm crpi-vkjftqt0qsdk2jmc.cn-shanghai.personal.cr.aliyuncs.com/pysunday/sdenv-arm64:0.3.0 ./example/use-local/index.js`
2. 运行网站代码：`docker run --rm crpi-vkjftqt0qsdk2jmc.cn-shanghai.personal.cr.aliyuncs.com/pysunday/sdenv-arm64:0.3.0 ./example/use-remote/index.js`

如果是`x86_64`架构则执行命令：

1. 运行本地代码：`docker run --rm crpi-vkjftqt0qsdk2jmc.cn-shanghai.personal.cr.aliyuncs.com/pysunday/sdenv-x86_64:0.3.0 ./example/use-local/index.js`
2. 运行网站代码：`docker run --rm crpi-vkjftqt0qsdk2jmc.cn-shanghai.personal.cr.aliyuncs.com/pysunday/sdenv-x86_64:0.3.0 ./example/use-remote/index.js`

#### docker运行宿主机本地文件

以本地文件`./example/use-remote/index.js`示例，`uname -a`的结果为`arm64`，利用docker的-v参数映射本地文件再执行该文件，如：

```bash
docker run --rm -v $(pwd)/example/use-docker:/app crpi-vkjftqt0qsdk2jmc.cn-shanghai.personal.cr.aliyuncs.com/pysunday/sdenv-arm64:0.3.0 /app/index.js
```

### docker打包

可以参考项目的`Dockerfile.example`文件，通过命令`uname -a`查看架构类型，然后取消对应的`FROM`语句注释，修改文件名为`Dockerfile`，如arm64架构的Dockerfile文件内容：

```docker
FROM crpi-vkjftqt0qsdk2jmc.cn-shanghai.personal.cr.aliyuncs.com/pysunday/sdenv_base:arm64

RUN git clone https://github.com/pysunday/sdenv.git
WORKDIR /sdenv
RUN npm i

ENTRYPOINT ["/usr/local/bin/node"]
```

最后执行命令`docker build -t pysunday/sdenv ./`生成容器

运行容器内的样例代码与前面类似：

1. 运行本地代码：`docker run --rm pysunday/sdenv ./example/use-local/index.js`
2. 运行网站代码：`docker run --rm pysunday/sdenv ./example/use-remote/index.js`

**如果需要在docker内调试代码，作者建议使用npm包的方式使用sdenv，然后通过映射方式调用docker**

## API

sdenv设计极其简单，它的核心API只有一个，即browser！

### browser(window: object, type: string)

传入window对象，和需要拟真的浏览器类型，browser方法会自动将浏览器特性集成到window对象中。

```javascript
const { browser } = require('sdenv');
...
browser(window, 'chrome')
```

浏览器类型及支持情况：

类型 | 是否支持
---- | --------
Chrome | Y
Firefox | N
Safari | N

### jsdomFromText(config: object)

返回回调方法，用于纯文本方式调用jsdom，第一个参数为配置对象，最终会作为第二个参数传入到jsdom中。

```javascript
const { Script } = require("vm");
const { jsdomFromText } = require('sdenv');
const [jsdomer, cookieJar] = jsdomFromText({
    url: 'https://host/path',
    referrer: 'https://host/path',
    contentType: "text/html",
    runScripts: "outside-only", // 不会执行html文本中的js代码
})
const dom = jsdomer('<html>...</html>');
new Script('javascript代码').runInContext(dom.getInternalVMContext()); // 执行javascript代码
console.log('cookie值：', cookieJar.getCookieStringSync('https://host'));
```

进一步阅读：

[jsdom的JSDOM API](https://github.com/jsdom/jsdom?tab=readme-ov-file#customizing-jsdom)

### jsdomFromUrl(config?: object, cookieJar?: CookieJar)

返回回调方法用于链接形式调用jsdom，第一个参数为配置对象，与jsdomFromText方法不同，该配置对象用于配置ResourceLoader，建议至少传入ua值，否则请求header中的ua内容会有jsdom标识，需要注意的是，该ua仅在jsdom层使用，cookieJar非必传，当需要延续cookie时需要传入。

```javascript
const { jsdomFromUrl } = require('sdenv');
const config = { userAgent: 'native browser userAgent' };
const [jsdomer, cookieJar] = jsdomFromUrl(config); // 返回自动生成的cookieJar
const oneDom = await jsdomer('https://host/path');
const twoDom = await jsdomFromUrl(config, cookieJar)[0]('https://host/path'); // 使用已经存在的cookieJar，因为要沿用上一次产生的cookie
console.log('cookie值：', cookieJar.getCookieStringSync('https://host'));
```

进一步阅读：

[jsdom的ResourceLoader API](https://github.com/jsdom/jsdom?tab=readme-ov-file#advanced-configuration)

[jsdom的CookieJar API](https://github.com/jsdom/jsdom?tab=readme-ov-file#cookie-jars)

[jsdom的fromURL API](https://github.com/jsdom/jsdom?tab=readme-ov-file#fromurl)

## sdenv-extend使用说明

为了模拟浏览器执行环境，需要将node环境与浏览器环境共有代码进行提取，并提供返回环境对象用于sdenv内window与dom内容补充使用。

sdenv-extend具体功能可参考项目内[README文档](https://github.com/pysunday/sdenv-extend/blob/main/README.md)。

## sdenv-jsdom使用说明

sdenv-jsdom包是sdenv补环境框架能运行瑞数vmp网站并产生正确cookie的核心，该包仓库fork自jsdom仓库，并应对瑞数vmp对jsdom的检测做了代码修改，因此sdenv可以过网站对jsdom的检测!

## 声明

该项目的开发基于瑞数vmp网站，不能保证在其它反爬虫产品稳定使用，出现问题请及时提issues或者提pull参与共建!

添加作者微信进技术交流群：howduudu_tech(备注sdenv)

订阅号不定时发表版本动态及技术文章：码功

<img src="https://github.com/pysunday/sdenv/raw/main/static/qrcode.png" alt="订阅号：码功" width="320">
