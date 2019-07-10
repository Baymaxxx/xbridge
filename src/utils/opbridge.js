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
  init: function (callback) {
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

  first: function () {
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
  /**
   * h5为native注册方法
   * @param {*} name h5注册给native调用的方法名
   * @param {*} fun native调用此方法的回调
   */
  registerHandler: function (name, fun) {
    var $this = this;
    $this.init((bridge) => {
      bridge.registerHandler(name, fun);
    });
  },

  /**
   *
   * @param {*} method native注册给h5调用的方法名
   * @param {*} params 调用方法传参
   * @param {*} fun 调用方法回调
   */
  callHandler: function (method, params, fun) {
    var $this = this;
    var data =  { method, params };
    $this.init((bridge) => {
        bridge.callHandler('jsCallJavaAllInOne', data, fun);
    });
  },

  /**
   * h5内部封装native方法
   * @param {*} method 需封装的方法名
   */
  install: function(method) {
    return function(params) {
      return new Promise((resolve, reject) =>{
          try {
            this.callHandler(method, params, (data) => {
              resolve(data);
            });
          } catch (error) {
            reject(error);
          }
      })
    }
  }
};

const METHODS = {
  getPublicUserInfo: 'jsx_getPublicUserInfo',
  startApp: 'jsx_startApp',
  getAppInfo: 'jsx_getAppInfo',
  queryApp: 'jsx_queryApp',
  goToLogin: 'jsx_goToLogin',
  isLogin: 'jsx_isLogin',
  copy: 'jsx_copy',
  openUrlInNewWindow: 'jsx_openUrlInNewWindow',
  closeWindow: 'jsx_closeWindow',
  getNetworkType: 'jsx_getNetworkType',
  openUrlBySystem: 'jsx_openUrlBySystem'
};

for (const key in METHODS) {
  if (METHODS.hasOwnProperty(key)) {
    const element = METHODS[key];
    OpBridge[key] = OpBridge.install(element);
  }
}

OpBridge.first();

export { OpBridge };

