该example通过执行本地js文件生成cookie，请求网站方式可以参考`example/use-remote`.

output目录是使用[rs-reverse](https://github.com/pysunday/rs-reverse)下载的文件目录，命令：`npx -p rs-reverse@latest --registry=https://registry.npmjs.org rs-reverse makecode -u https://wcjs.sbj.cnipa.gov.cn/sgtmi`

会用到三个文件：

1. 网页html(主要用到dom结构，内部js代码内容不会执行)：`output/makecode_input_html.html`
2. 网页中的js外链：`output/makecode_input_js.js`
3. 网页中提取的$_ts(从html页面中提取)：`output/makecode_input_ts.json`

当然不用rs-reverse工具也可自己下载对应文件(如商标局网站)：

```bash
1. 下载html和js文件
wget -O output/makecode_input_html.html https://商标局/sgtmi
wget -O output/makecode_input_js.js https://商标局/c5rxzYrjRT2h/cCdzB9ZjDFks.294cc83.js
2. 复制并保存html网页中的$_ts内容到output/makecode_input_ts.json
{
    "nsd": "html页面的$_ts.nsd值",
    "cd": "html页面的$_ts.cd值"
}

```

文件存在后执行命令`node example/use-local/index.js`生成cookie。
