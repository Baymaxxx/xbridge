/* eslint-disable */
/**
 * 函数描述：js调用webview事件
 *
 * jsBridge.callHandler(method, data, callBack(response));
 * @param method {string} 方法名
 * @param data {Object} 参数
 * @return {Object} 回调
 */

/**
 * 函数描述：webView调用JS事件
 *
 * jsBridge.registerHandler(method, callBack(response));
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

var JsBridge = {
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
};

JsBridge.first();

export { JsBridge };
