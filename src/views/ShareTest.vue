<!-- 使用注意点：相册分享类型需要设置shareBgUrl背景的值-->
<template>
  <div class="g-share">
    <div class="share-config">
      <van-tabs v-model="tabActive" animated swipeable>
        <van-tab v-for="(item, index) in shareData" :key="index" :title="item.shareName">
          <van-checkbox-group v-model="shareData">
            <van-cell-group>
              <van-cell>
                <van-switch-cell v-model="item.checked" title="是否开启" />
                <van-field
                    v-model="item.shareName"
                    type="text"
                    label="shareName"
                    placeholder="shareName"
                    required
                    clearable
                  />
                <van-field
                    v-model="item.shareContentType"
                    type="text"
                    label="shareContentType"
                    placeholder="shareContentType"
                    required
                    clearable
                  />
                <van-field
                    v-model="item.shareTitleText"
                    type="text"
                    label="shareTitleText"
                    placeholder="shareTitleText"
                    clearable
                  />
                <van-field
                    v-model="item.shareContentText"
                    type="text"
                    label="shareContentText"
                    placeholder="shareContentText"
                    clearable
                  />
                <van-field
                    v-model="item.shareIconUrl"
                    type="text"
                    label="shareIconUrl"
                    placeholder="shareIconUrl"
                    clearable
                  />
                <van-field
                    v-model="item.shareLinkUrl"
                    type="text"
                    label="shareLinkUrl"
                    placeholder="shareLinkUrl"
                    clearable
                  />
                <van-field
                    v-model="item.shareBgUrl"
                    type="text"
                    label="shareBgUrl"
                    placeholder="shareBgUrl"
                    clearable
                  />
              </van-cell>
            </van-cell-group>
          </van-checkbox-group>
        </van-tab>
      </van-tabs>
      <van-field
          v-model="appPage"
          type="text"
          label="appPage"
          placeholder="appPage"
          clearable
        />
      <van-field
          label-width="50px"
          v-model="appLocation"
          type="text"
          label="appLocation"
          placeholder="appLocation"
          clearable
        />
      <van-button size="large" type="info" @click="share">分享</van-button>
      <div>
        {{returnRes}}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'share',
  data() {
    return {
      tabActive: 0,
      methods: [
        {
          name: 'jsx_commonShare',
          desc: '通用分享',
        },
      ],
      shareData: [{
        checked: 0,
        shareChannel: 1,
        shareName: '微信',
        // 分享方式：1：图片；2：文字描述+url , 纯文本形式；4：文字粘贴形式
        shareContentType: 2,
        shareTitleText: '微信分享测试',
        shareContentText: '微信shareContentText',
        shareIconUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
        shareLinkUrl: 'https://www.2345.com/',
        shareBgUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
      }, {
        checked: 0,
        shareChannel: 2,
        shareName: '朋友圈',
        shareContentType: 2,
        shareTitleText: '朋友圈分享测试',
        shareContentText: '朋友圈shareContentText',
        shareIconUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
        shareLinkUrl: 'https://www.2345.com/',
        shareBgUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
      }, {
        checked: 0,
        shareChannel: 3,
        shareName: 'QQ',
        shareContentType: 2,
        shareTitleText: 'QQ分享测试',
        shareContentText: 'QQshareContentText',
        shareIconUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
        shareLinkUrl: 'https://www.2345.com/',
        shareBgUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
      }, {
        checked: 0,
        shareChannel: 4,
        shareName: '相册',
        shareContentType: 1,
        shareTitleText: '相册分享测试',
        shareContentText: '相册shareContentText',
        shareIconUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
        shareLinkUrl: 'https://www.2345.com/',
        shareBgUrl: 'https://www.2345.com/images/logo/logo_normal_20181008.png',
      }],
      appPage: '1',
      appLocation: '2',
      returnRes: null,
    };
  },
  mounted() {
  },
  methods: {
    toggle(index) {
      this.$refs.checkboxes[index].toggle();
    },
    share() {
      console.log(this.shareData);
      let params = {};
      let shareInfoList = [];
      shareInfoList = this.shareData.filter(item => item.checked === true);
      if (shareInfoList.length === 0) {
        this.$toast('请至少选择一个分享类型');
      }
      params = {
        shareInfoList,
        appPage: this.appPage,
        appLocation: this.appLocation,
      };
      console.log(params);
      this.OpBridge.commonShare(params).then((data) => {
        console.info(data);
        this.returnRes = data && JSON.parse(data);
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.g-share {
  text-align: left;
  width: 100%;
  padding-bottom: 200px;
  // overflow: hidden;
  .logo {
    margin: 0 auto;
    display: block;
    width: 40px;
  }
}
</style>
