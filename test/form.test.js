const jsdom = require('sdenv-jsdom');
const { JSDOM, CookieJar } = jsdom;

describe('form特性检测', () => {
  test('子元素存在name属性', () => {
    const dom = new JSDOM('<form id="__Zm9ybS5pZAo__" action="https://target.url/path/to"><input id="username" name="action"><input name="textContent" id="password"><input id="innerText" type="submit" name="id"></form>');
    const action = dom.window.document.getElementsByTagName('form')[0].action;
    expect(action !== 'https://target.url/path/to').toBe(true);
    expect(dom.window.document.getElementById('username')).toBe(action);
  });
});
