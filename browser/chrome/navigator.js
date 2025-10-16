module.exports = (sdenv) => {
  const window = sdenv.memory.sdWindow;

  const DeprecatedStorageQuota = function DeprecatedStorageQuota() {
    throw new TypeError("Illegal constructor");
  };
  DeprecatedStorageQuota.prototype = {
    queryUsageAndQuota() {
    },
    requestQuota() {
    },
  };
  sdenv.tools.setObjName(DeprecatedStorageQuota.prototype, "DeprecatedStorageQuota");
  const NetworkInformation = function NetworkInformation() {
    throw new TypeError("Illegal constructor");
  }
  sdenv.tools.setObjName(NetworkInformation.prototype, "NetworkInformation");
  class NavigatorCustomize {
    get webkitPersistentStorage() {
      return { __proto__: DeprecatedStorageQuota.prototype };
    }
    get connection() {
      return {
        __proto__: NetworkInformation.prototype,
        downlink: 3.85,
        effectiveType: "4g",
        onchange: null,
        rtt: 100,
        saveData: false,
      };
    }
    get userAgent() {
      return 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
    get appVersion() {
      return '5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
    }
    get platform() {
      return 'MacIntel';
    }
    get vendor() {
      return "Google Inc.";
    }
  };
  sdenv.tools.mixin(window.navigator, NavigatorCustomize.prototype, ['userAgent', 'platform', 'appVersion', 'vendor']);
  Object.keys(window.navigator.__proto__).forEach(name => {
    sdenv.tools.setFuncNative(Object.getOwnPropertyDescriptor(window.navigator.__proto__, name)?.get, 'get');
  })
}
