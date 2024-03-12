## 样例说明

为了模拟浏览器与sdenv运行相同瑞数vmp代码生成一摸一样的cookie的复现方法与源文件。

## 启动代理

该样例需要使用代理工具，推荐代理工具：[sd_proxy](https://github.com/pysunday/tools-proxy)，该工具为自研工具，支持网站资源的收集与回放

启动代理回放：`sd_proxy -H 0.0.0.0 -p 3000 -n playback -d pysunday-proxy --log`

## 应用代理

浏览器端需要使用SwitchyOmega配置并应用3000端口转发。

sdenv需要使用jsdomFromUrl方法传入代理配置`proxy: "http://127.0.0.1:3000"`。

## 获取cookie

该example对应的访问链接为：`https://wcjs.sbj.cnipa.gov.cn/sgtmi`

假设代理配置完全ok，则请求该链接时会返回html内容为文件[pysunday-proxy/wcjs.sbj.cnipa.gov.cn/sgtmi/format](./pysunday-proxy/wcjs.sbj.cnipa.gov.cn/sgtmi/format)，可以看到html中存在代码：

```javascript
.getHandle('cookie')({
    log: false,
    setCb: (val) => {
        if (val.includes('goN9uW4i0iKzT')) {
            cookies.push(val);
            if (cookies.length === 3) {
                console.log(`第三次cookie值写入：${val}`);
                debugger;
            }
        }
    }
})
```

其中第三次cookie的值即为最终发起请求的cookie值。

* node端: node中直接执行`node-9229 example/use-proxy/index.js`，命令操作符中会打印cookie值后退出
* 浏览器端: 浏览器端需要打开开发面板后再请求网址`https://wcjs.sbj.cnipa.gov.cn/sgtmi`，在断点处即可看到cookie值

## 结论

作者电脑系统版本：macOS(13.4)

作者浏览器版本：Chrome Canary(121.0.6124.0)

作者node和浏览器分别运行后断点处打印的值都为`goN9uW4i0iKzT=0o6uz9peZ4RlIIiCpo6uz9F9f4zZghSX8vcCtuqn0xNaRncrIKsE8SR4aRoGLBGiDlCiw69spB51I78BjEbiyeIPgiMdhjjQvrJQ.7iwYLKrWMPMi0xRa.xN64KvZGbXlPfFz0OaiHM8o.IvfnXEaf0RuNFu5VKDSSevbBeiVFAqzWPD_gZzXwDmJnf6bpaet1yyg2lmCOWCzUre8W52LiD2U95ZxkI2jrAzmfpcdX.V; path=/; expires=Tue, 12 Mar 2024 09:42:17 GMT`

如果您的系统及浏览器与作者一致，那么您可以直接运行该样例复现。

当然，您也可以参考`browser/chrome`目录下的文件内容，新建一个browser并将您浏览器的值填如后参考前面方法进行试验，如果试验成功请提交您browser代码的pr，并写明您操作系统版本及浏览器版本，感谢！
