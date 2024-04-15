module.exports = (sdenv) => {
  sdenv.memory.sdWindow.chrome = {
    app: {
      isInstalled: false,
      InstallState: {
        DISABLED: "disabled",
        INSTALLED: "installed",
        NOT_INSTALLED: "not_installed",
      },
      RunningState: {
        CANNOT_RUN: "cannot_run",
        READY_TO_RUN: "ready_to_run",
        RUNNING: "running",
      },
      getDetails: function () {},
      getIsInstalled: function() {},
      installState: function() {},
      runningState: function() {},
    },
    csi: function() {},
    loadTimes: function() {
      return {
        "requestTime": 1700779741.985,
        "startLoadTime": 1700779741.985,
        "commitLoadTime": 1700779742.021,
        "finishDocumentLoadTime": 0,
        "finishLoadTime": 0,
        "firstPaintTime": 0,
        "firstPaintAfterLoadTime": 0,
        "navigationType": "Reload",
        "wasFetchedViaSpdy": false,
        "wasNpnNegotiated": true,
        "npnNegotiatedProtocol": "http/1.1",
        "wasAlternateProtocolAvailable": false,
        "connectionInfo": "http/1.1"
      }
    }
  }
}
