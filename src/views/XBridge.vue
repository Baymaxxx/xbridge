<template>
  <div class="g-OpBridge">
    <img alt="Vue logo" class="logo" src="../assets/logo.png" />
    {{returnRes}}
    <ul v-if="returnRes">
      <li v-for="(item, index) in Object.keys(returnRes)"
      :key="index">{{item}}: {{returnRes[item]}}</li>
    </ul>
    <ul class="m-native-wrap">
      <li v-for="(item ,index) in methods"
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
  name: 'OpBridge',
  data() {
    return {
      methods: [
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
      returnRes: null,
      activeId: -1,
    };
  },
  mounted() {
    this.OpBridge.registerHandler('jsx_jsHandler', (res) => {
      console.info(JSON.parse(res).method, JSON.parse(res).params);
      const { method, params } = typeof res === 'string' && JSON.parse(res);
      switch (method) {
        case 'jsx_onLoginChanged':
          console.info('jsx_onLoginChanged');
          break;
        case 'jsx_onVisibilityChanged':
          console.info(params.visibility);
          break;

        default:
          break;
      }
    });
  },
  components: {},
  methods: {
    callNative(method, index) {
      let params = {};
      this.returnRes = null;
      this.activeId = index;
      switch (method) {
        case 'jsx_getPublicUserInfo':
          this.OpBridge.getPublicUserInfo(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
            console.info(this.returnRes);
          });
          break;
        case 'jsx_startApp':
          params = {
            packageName: 'com.startinghandak',
          };
          this.OpBridge.startApp(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_getAppInfo':
          this.OpBridge.getAppInfo(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_queryApp':
          params = {
            packageName: 'com.startinghandak',
          };
          this.OpBridge.queryApp(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_goToLogin':
          this.OpBridge.goToLogin(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_isLogin':
          this.OpBridge.isLogin(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_copy':
          params = {
            content: '12345',
          };
          this.OpBridge.copy(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_openUrlInNewWindow':
          params = {
            uri: 'http://www.2345.com',
            hasTitleBar: 0,
            isFullscreen: 0,
          };
          this.OpBridge.openUrlInNewWindow(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_closeWindow':
          this.OpBridge.closeWindow(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_getNetworkType':
          this.OpBridge.getNetworkType(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
          });
          break;
        case 'jsx_openUrlBySystem':
          params = {
            url: 'http://www.2345.com',
          };
          this.OpBridge.openUrlBySystem(params).then((data) => {
            this.returnRes = data && JSON.parse(data);
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
.g-OpBridge {
  text-align: left;
  width: 100%;
  overflow: hidden;
  .logo {
    margin: 0 auto;
    display: block;
    width: 40px;
  }
  .m-native-wrap {
    width: 100%;
    text-align: left;
    li {
      padding: 12px 20px;
      box-sizing: border-box;
      word-break: break-all;
      @include border1px(bottom,#e8e8e8, after);
      &:active, &.active {
        background-color: #e8e8e8;
      }
    }
  }
}
</style>
