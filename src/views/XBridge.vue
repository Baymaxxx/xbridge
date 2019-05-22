<template>
  <div class="g-xbridge">
    <img alt="Vue logo" class="logo" @click="test" src="../assets/logo.png" />
    <div>{{ deviceInfo }}</div>
    <ul class="m-native-wrap">
      <li @click="test">123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
      <li>123</li>
    </ul>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'xbridge',
  data() {
    return {
      deviceInfo: null,
    };
  },
  mounted() {
    this.$bridge.registerHandler('initPage', () => {
      console.info(1);
    });
  },
  components: {},
  methods: {
    test() {
      console.log(this.$bridge.callHandler);
      this.$bridge.callHandler('jsCallJavaGetDeviceInfo', 1, (data) => {
        this.deviceInfo = data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.g-xbridge {
  text-align: left;
  .logo {
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
    }
  }
}
</style>
