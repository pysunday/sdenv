process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const { jsdomFromUrl } = require('../../');

const tarUrl = "https://zhaopin.sgcc.com.cn/sgcchr/static/dynaAument.html";

jsdomFromUrl(tarUrl, { proxy: "http://127.0.0.1:7760" });
