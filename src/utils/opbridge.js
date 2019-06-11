/* eslint-disable */
// power https://github.com/lzyzsd/JsBridge
/**
 * 函数描述：js调用webview事件
 *
 * OpBridge.callHandler(method, data, callBack(response));
 * @param method {string} 方法名
 * @param data {Object} 参数
 * @return {Object} 回调
 */

/**
 * 函数描述：webView调用JS事件
 *
 * OpBridge.registerHandler(method, callBack(response));
 * @param method {string} 方法名
 * @return {Object} 回调
 */

var BRIDGE_READY = 'WebViewJavascriptBridgeReady';

function getBridge() {
  return window.WebViewJavascriptBridge;
}

function getCallbacks() {
  return window.WVJBCallbacks;
}

function setCallbacks(callbacks) {
  window.WVJBCallbacks = callbacks;
}

var OpBridge = {
  init: function bridgeInit(callback) {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    let bridge = getBridge();
    if (!isiOS) {
      if (bridge) {
        callback(bridge);
      } else {
        document.addEventListener(
          BRIDGE_READY,
          () => {
            bridge = getBridge();
            callback(bridge);
          },
          false,
        );
      }
    } else {
      if (bridge) {
        return callback(bridge);
      }
      var callbacks = getCallbacks();
      if (callbacks) {
        return callbacks.push(callback);
      }
      setCallbacks([callback]);
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(() => {
        document.documentElement.removeChild(WVJBIframe);
      }, 0);
    }
  },

  first: function bridgeFirst() {
    var u = navigator.userAgent;
    var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if (!isiOS) {
      var $this = this;
      $this.init((bridge) => {
        bridge.init((_message, responseCallback) => {
          responseCallback();
        });
      });
    }
  },

  registerHandler: function bridgeRegisterHandler(name, fun) {
    var $this = this;
    $this.init((bridge) => {
      bridge.registerHandler(name, fun);
    });
  },

  callHandler: function bridgeCallHandler(method, params, fun) {
    var $this = this;
    var data =  { method, params };
    $this.init((bridge) => {
      bridge.callHandler('jsCallJavaAllInOne', data, fun);
    });
  },
  getPublicUserInfo: function bridgeGetDeviceInfo(params, fun) {
    this.callHandler('jsx_getPublicUserInfo', params, fun);
  },
  startApp: function bridgeStartApp(params, fun) {
    this.callHandler('jsx_startApp', params, fun);
  },
  getAppInfo: function bridgeGetAppInfo(params, fun) {
    this.callHandler('jsx_getAppInfo', params, fun);
  },
  queryApp: function bridgeQueryApp(params, fun) {
    this.callHandler('jsx_queryApp', params, fun);
  },
  goToLogin: function bridgeGoToLogin(params, fun) {
    this.callHandler('jsx_goToLogin', params, fun);
  },
  isLogin: function bridgeIsLogin(params, fun) {
    this.callHandler('jsx_isLogin', params, fun);
  },
  copy: function bridgeCopy(params, fun) {
    this.callHandler('jsx_copy', params, fun);
  },
  openUrlInNewWindow: function bridgeOpenUrlInNewWindow(params, fun) {
    this.callHandler('jsx_openUrlInNewWindow', params, fun);
  },
  closeWindow: function bridgeCloseWindow(params, fun) {
    this.callHandler('jsx_closeWindow', params, fun);
  },
  getNetworkType: function bridgeGetNetworkType(params, fun) {
    this.callHandler('jsx_getNetworkType', params, fun);
  },
  openUrlBySystem: function bridgeOpenUrlBySystem(params, fun) {
    this.callHandler('jsx_openUrlBySystem', params, fun);
  }
};

OpBridge.first();


export { OpBridge };

