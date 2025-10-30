**开源兄弟项目(瑞数纯算逆向rs-reverse)：[rs-reverse](https://github.com/pysunday/rs-reverse)**

> [!WARNING]
> [免责声明](./DISCLAIMER.md)

> [!TIP]
> 可通过拦截xhr相关方法提取后缀，后缀的相关问题可自行研究，且开源项目sdenv鼓励使用者发布关于使用该项目的教程文章。

<h1 align="center">
    <img width="100" height="100" src="https://github.com/pysunday/sdenv/blob/main/logo.png" alt=""><br>
    sdenv
</h1>

[![NPM version](https://badge.fury.io/js/sdenv.svg)](http://badge.fury.io/js/sdenv)

sdenv是一个javascript运行时补环境框架，与github上其它补环境框架存在较大区别，sdenv是站在巨人的肩膀上实现的，依赖于jsdom的强大dom仿真能力，sdenv可以真实模拟浏览器执行环境，作者在固定随机数与添加[sdenv-extend](https://github.com/pysunday/sdenv-extend)的部分插件后可以达到**瑞数vmp代码在sdenv运行生成的cookie值与浏览器生成的cookie值一致**。

* sdenv专用jsdom版本：[sdenv-jsdom](https://github.com/pysunday/sdenv-jsdom)
* sdenv多端环境提取：[sdenv-extend](https://github.com/pysunday/sdenv-extend)

## 依赖

作者开发时使用的是`v20.19.5`版本Node，由于jsdom27版本需要Node支持ESM，但是v20仅部分支持ESM，因此如果您也使用v20版本，请使用最新的，如当前最新为`v20.19.5`

编译node插件用的是[node-gyp](https://github.com/nodejs/node-gyp)工具，该工具需要有python环境和c环境(如windows系统需安装Visual Studio，Mac系统需要安装XCode)，请根据[工具文档](https://github.com/nodejs/node-gyp)进行系统环境搭建。

**需要注意windows中安装Visual Studio时需要勾选`使用C++的桌面开发`选项**

![安装Visual Studio注意](https://github.com/pysunday/sdenv/blob/main/static/vs-tip.png)

## 可能出现的问题

1. npm安装node-gyp报错：请确保操作系统有c++编译环境与python环境，报错示例（感谢用户风流小混沌提供图片素材）:
![npm安装报错](https://github.com/pysunday/sdenv/blob/main/static/install-error.jpeg)
2. 安装缓慢及canvas报错(**基本都是网络问题**)：由于canvas安装会优先从github获取现成的包，因此请在安装前先设置代理或者其它国内源，如果安装仍然失败请使用npm官方源+代理方式重新尝试；

注意：canvas安装失败不会中断安装，但是在运行时，如果网页代码中有调用canvas相关API会报错，如有使用canvas相关api请务必确认安装成功！

**解决完报错后记得重新执行下依赖安装！如不确定是否本地问题，可以先以docker方式（参见[docker运行use-docker样例](#docker运行use-docker样例)）运行和验证！**

有其它问题请提issues！

## 使用

作者推荐npm包方式或docker方式使用，遇到问题提issues或者提merge，参与sdenv共建！

### npm包方式使用

1. 创建自己的项目
2. 项目中安装sdenv：`npm i sdenv`（请确保安装没有报错, 如果是制作命令行工具可使用-g全局安装）
3. 在项目中导入api并使用（可以参考example目录下的用例）：
```javascript
const { jsdomFromText, jsdomFromUrl, browser } = require('sdenv');
```

### 源码方式使用

clone项目仓库`git clone https://github.com/pysunday/sdenv.git`后执行依赖安装`npm i`，确保依赖安装成功后即可直接运行example目录下的样例文件了。

### docker方式使用

可使用阿里云地址替代官方源：`crpi-vkjftqt0qsdk2jmc.cn-shanghai.personal.cr.aliyuncs.com/pysunday/sdenv-[arm64/x86_64]:latest`

查看sdenv版本：`docker run --rm pysunday/sdenv-[arm64/x86_64]:latest -e "console.log(require('sdenv').version)"`

#### docker运行容器内的样例文件

首先执行`uname -a`后查看架构类型，支持`arm64`和`x86_64`，接着执行对应的命令：

1. 运行本地代码：`docker run --rm pysunday/sdenv-[arm64/x86_64]:latest ./example/use-local/index.js`

![use-local样例调用](https://github.com/pysunday/sdenv/blob/main/static/docker-example-use-local.png)

2. 运行网站代码：`docker run --rm pysunday/sdenv-[arm64/x86_64]:latest ./example/use-remote/index.js`

![use-remote样例调用](https://github.com/pysunday/sdenv/blob/main/static/docker-example-use-remote.png)

#### docker运行use-docker样例

v1.0.0版本增加use-docker样例，该样例提供全局使用sdenv制作命令行命令的演示，如您使用python调用sdenv，可通过全局安装sdenv（`npm i -g sdenv`）后编写请求代码并打印后返回给python使用。

同时该样例通过外部传参的方式动态调用sdenv模拟浏览器打开目标网站，因此可直接使用该样例测试目标网站在sdenv中是否可用。

调用方式：`docker run --rm pysunday/sdenv-arm64:latest ./example/use-docker/index.js 目标网站地址`

![use-docker样例调用](https://github.com/pysunday/sdenv/blob/main/static/docker-example-use-docker.png)

#### docker运行宿主机本地文件

以本地文件`./example/use-docker/index.js`示例，`uname -a`的结果为`arm64`，利用docker的-v参数映射本地文件再执行该文件，如：

```bash
docker run --rm -v $(pwd)/example/use-docker/index.js:/app.js pysunday/sdenv-arm64:latest /app.js 目标网站地址
```

此处`$(pwd)/example/use-docker/index.js`为宿主机执行文件的绝对路径，`/app.js`为映射到容器中文件的绝对路径。

#### docker打包

可以参考项目的`Dockerfile.example`文件，通过命令`uname -a`查看架构类型，然后取消对应的`FROM`语句注释，修改文件名为`Dockerfile`，如arm64架构的Dockerfile文件内容：

```docker
FROM pysunday/sdenv_base:arm64

ENV NODE_PATH=/usr/local/lib/node_modules
RUN n 20 && npm install -g npm@latest node-gyp@latest sdenv@latest
COPY example example

ENTRYPOINT ["/usr/local/bin/node"]
```

## API

sdenv设计极其简单，它的核心API只有一个，即browser（sdenv补的环境通过browser方法注入）！

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

### jsdomFromText(htmlText: string, config: object)

除返回与jsdom保持一致外，同时返回sdenv属性，如常用的属性值有：`const { window, cookieJar, sdenv, ... } = jsdomFromText(...)`

```javascript
const { Script } = require("vm");
const { jsdomFromText } = require('sdenv');
const dom = jsdomFromText('<html>...</html>', {
    url: 'https://host/path',
    referrer: 'https://host/path',
    contentType: "text/html",
    runScripts: "outside-only", // 不会执行html文本中的js代码
})
new Script('javascript代码').runInContext(dom.getInternalVMContext()); // 执行javascript代码
console.log('cookie值：', dom.cookieJar.getCookieStringSync('https://host'));
```

**注：代码仅演示，具体使用请移步[use-local样例](./example/use-local/index.js)**

进一步阅读：

[jsdom的JSDOM API](https://github.com/jsdom/jsdom?tab=readme-ov-file#customizing-jsdom)

### jsdomFromUrl(url: string, config?: object)

除返回与jsdom保持一致外，同时返回sdenv属性，如常用的属性值有：`const { window, cookieJar, sdenv, ... } = jsdomFromUrl(...)`

```javascript
const { jsdomFromUrl } = require('sdenv');
const config = { userAgent: 'native browser userAgent' };
const oneDom = await jsdomFromUrl('https://host/path', config); // 返回自动生成的cookieJar
const twoDom = await jsdomFromUrl('https://host/path', { ...config, cookieJar: oneDom.cookieJar }); // 使用已经存在的cookieJar，因为要沿用上一次产生的cookie
console.log('cookie值：', twoDom.cookieJar.getCookieStringSync('https://host'));
```

**注：代码仅演示，具体使用请移步[use-remote样例](./example/use-remote/index.js)**

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
