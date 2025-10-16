module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;
  const { setFuncNative, setObjName } = sdenv.tools;

  const CanvasRenderingContext2D = function CanvasRenderingContext2D() {
    throw new TypeError("Illegal constructor");
  };
  CanvasRenderingContext2D.prototype = {
    getImageData() {}
  };
  setFuncNative(CanvasRenderingContext2D.prototype.getImageData, 4);
  setObjName(CanvasRenderingContext2D.prototype, "CanvasRenderingContext2D");
  setFuncNative(window.CanvasRenderingContext2D = CanvasRenderingContext2D, 0);
}
