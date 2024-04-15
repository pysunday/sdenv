module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  [window.VisualViewport, window.visualViewport] = sdenv.tools.getNativeProto('VisualViewport', 'visualViewport', {
    height: 904,
    offsetLeft: 0,
    offsetTop: 0,
    onresize: null,
    onscroll: null,
    pageLeft: 0,
    pageTop: 0,
    scale: 1,
    width: 1066,
  });
}
