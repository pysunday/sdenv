const getDocumentAll = require('../build/Release/documentAll.node').getDocumentAll;

describe('模拟document.all检测', () => {
  const da = getDocumentAll({ length: 1 });
  console.log(
    '运行：getDocumentAll({ length: 1 })，返回：', da,
    '\n运行：getDocumentAll({ length: 1 }) == undefined，返回：', da == undefined,
    '\n运行：getDocumentAll({ length: 1 })()，返回：', da(),
    '\n运行：typeof getDocumentAll({ length: 1 })，返回：', typeof da,
  );
  test('getDocumentAll({ length: 1 }).length === 1', () => {
    expect(da.length).toBe(1);
  });
  test('getDocumentAll({ length: 1 }) == undefined', () => {
    expect(da == undefined).toBe(true);
  });
  test('typeof getDocumentAll({ length: 1 })', () => {
    expect(typeof da).toBe('undefined');
  });
  test('getDocumentAll({ length: 1 })() === null', () => {
    expect(da()).toBe(null);
  });
});
