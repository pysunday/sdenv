const {
  jsdomFromText
} = require('../utils/jsdom');
const browser = require('../browser/');

let index_url = "https://www.example.com/"
const [jsdomer, cookieJar] = jsdomFromText({
  url: `${index_url}`,
  referrer: `${index_url}`,
  contentType: "text/html",
  runScripts: 'dangerously',
  beforeParse(window) {
    browser(window, 'chrome')
  },
})

const dom = jsdomer('<html></html>');
window = dom.window;

debugger;
console.log(window.navigator.userAgent);

function detectForm(document) {
  let url = 'https://www.baidu.com/'
  let form = document.createElement('form');
  form.action = '';
  let input = document.createElement('input');
  input.name = 'action';
  form.appendChild(input)
  input = document.createElement('input');
  input.name = 'textContent';
  input.id = 'password';
  form.appendChild(input)
  return form.action != url && form.action.__proto__.toString() == '[object HTMLInputElement]'
}

console.log('test _globalObject', (typeof window._globalObject != "undefined" && typeof window != "undefined" && window._globalObject == window) === false);
console.log('test document ', window.document.toString() === '[object HTMLDocument]')
console.log('test open ', window.open.toString() === 'function open() { [native code] }')
console.log('test fetch ', window.fetch !== undefined && window.fetch.toString() === 'function fetch() { [native code] }')
console.log('test prompt ', window.prompt.toString() === 'function prompt() { [native code] }')
console.log('test Event ', window.Event.toString() === 'function Event() { [native code] }')
console.log('test Request', window.Request !== undefined && window.Request.toString() === 'function Request() { [native code] }')
console.log('test XPathException', window.XPathException === undefined)
console.log('test webdriver ', window.navigator.webdriver === false)
console.log('test webdriver ', (Object.getOwnPropertyDescriptor(window.navigator.__proto__, 'webdriver') && Object.getOwnPropertyDescriptor(window.navigator.__proto__, 'webdriver').get.toString()) === 'function get webdriver() { [native code] }')
console.log('test document.all ', typeof window.document.all === 'undefined')
console.log('test document.all ', window.document.all !== undefined && (window.document.all.__proto__.toString() === '[object HTMLAllCollection]'))
console.log('test form ', detectForm(window.document) === true)
