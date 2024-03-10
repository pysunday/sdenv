该example通过执行本地js文件生成cookie，请求网站方式可以参考`example/use-remote`.

output目录是使用[rs-reverse](https://github.com/pysunday/rs-reverse)下载的文件目录，命令：`npx -p rs-reverse@latest --registry=https://registry.npmjs.org rs-reverse makecode -u https://wcjs.sbj.cnipa.gov.cn/sgtmi`

会用到三个文件：

1. 网页html：`output/makecode_input_html.html`
2. 网页中的js外链：`output/makecode_input_js.js`
3. 网页中提取的$_ts：`output/makecode_input_ts.json`

文件存在后执行命令`node example/use-local/index.js`生成cookie。
