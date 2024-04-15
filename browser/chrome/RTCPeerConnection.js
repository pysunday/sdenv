module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  function RTCPeerConnection() {
    if (!(this instanceof RTCPeerConnection)) {
      throw new TypeError("Uncaught TypeError: Failed to construct 'RTCPeerConnection': Please use the 'new' operator, this DOM object constructor cannot be called as a function.");
    }
    this.createDataChannel = function(...params) {
      // window.console.log(`【RTCPeerConnection RTCPeerConnection】调用，参数：${params}`)
    }
    this.createOffer = function(...params) {
      // window.console.log(`【RTCPeerConnection createOffer】调用，参数：${params}`)
    }
  }
  sdenv.tools.setNativeFuncName(RTCPeerConnection, 'RTCPeerConnection');
  sdenv.tools.setNativeObjName(RTCPeerConnection.prototype, 'RTCPeerConnection');


  window.RTCPeerConnection = RTCPeerConnection;
}
