<template>
  <div class="g-xbridge">
    <img alt="Vue logo" class="logo" src="../assets/logo.png" />
    <div>{{ returnData }}</div>
    <ul class="m-native-wrap">
      <li v-for="(item, index) in methods"
      :class="{'active': index === activeId}"
      :key="index" @click="callNative(item.name, index)">
        {{ item.desc }}{{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'xbridge',
  data() {
    return {
      methods: [
        {
          name: 'jsCallJavaGetDeviceInfo',
          desc: '获取公开用户信息',
        },
        {
          name: 'jsx_getPublicUserInfo',
          desc: '获取公开用户信息',
        },
        {
          name: 'jsx_startApp',
          desc: '打开app',
        },
        {
          name: 'jsx_getAppInfo',
          desc: '获取应用版本',
        },
        {
          name: 'jsx_queryApp',
          desc: '查询App是否已安装',
        },
        {
          name: 'jsx_goToLogin',
          desc: '跳转到登陆',
        },
        {
          name: 'jsx_isLogin',
          desc: '判断是否登录',
        },
        {
          name: 'jsx_copy',
          desc: '调用原生剪切板',
        },
        {
          name: 'jsx_openUrlInNewWindow',
          desc: '打开新Webview加载url',
        },
        {
          name: 'jsx_closeWindow',
          desc: '关闭当前Webview',
        },
        {
          name: 'jsx_getNetworkType',
          desc: '获取网络类型',
        },
        {
          name: 'jsx_openUrlBySystem',
          desc: '交由系统打开指定url',
        },
      ],
      returnData: null,
      activeId: -1,
    };
  },
  mounted() {
    this.XBridge.registerHandler('initPage', () => {
      console.info(1);
    });
    this.XBridge.registerHandler('jsx_onVisibilityChanged', () => {
      console.info(1);
    });
    this.XBridge.registerHandler('jsx_onLoginChanged', () => {
      console.info(1);
    });
  },
  components: {},
  methods: {
    callNative(method, index) {
      let params = {};
      this.activeId = index;
      switch (method) {
        case 'jsCallJavaGetDeviceInfo':
          this.XBridge.callHandler('jsCallJavaGetDeviceInfo', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_getPublicUserInfo':
          this.XBridge.callHandler('jsx_getPublicUserInfo', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_startApp':
          params = {
            packageName: 'com.****',
          };
          this.XBridge.callHandler('jsx_startApp', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_getAppInfo':
          this.XBridge.callHandler('jsx_getAppInfo', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_queryApp':
          params = {
            packageName: 'com.****',
          };
          this.XBridge.callHandler('jsx_queryApp', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_goToLogin':
          this.XBridge.callHandler('jsx_goToLogin', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_isLogin':
          this.XBridge.callHandler('jsx_isLogin', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_copy':
          params = {
            content: '12345',
          };
          this.XBridge.callHandler('jsx_copy', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_openUrlInNewWindow':
          params = {
            uri: '12345',
            hasTitleBar: 0,
            isFullscreen: 0,
          };
          this.XBridge.callHandler('jsx_openUrlInNewWindow', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_closeWindow':
          this.XBridge.callHandler('jsx_closeWindow', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_getNetworkType':
          this.XBridge.callHandler('jsx_getNetworkType', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;
        case 'jsx_openUrlBySystem':
          params = {
            url: '12345',
          };
          this.XBridge.callHandler('jsx_openUrlBySystem', JSON.stringify(params), (data) => {
            this.returnData = data;
          });
          break;

        default:
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.g-xbridge {
  text-align: left;
  .logo {
    margin: 0 auto;
    display: block;
    width: 40px;
  }
  .m-native-wrap {
    width: 100%;
    text-align: left;
    li {
      padding-left: 20px;
      box-sizing: border-box;
      height: 40px;
      line-height: 40px;
      @include border1px(bottom, #e8e8e8, after);
      &:active, &.active {
        background-color: #e8e8e8;
      }
    }
  }
}
</style>
