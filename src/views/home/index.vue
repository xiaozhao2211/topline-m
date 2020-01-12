<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <!-- 点击面包按钮展示弹出层 -->
      <van-icon
      name="wap-nav"
      slot="nav-right"
      @click="isChannelEditShow= true"/>
      <van-tab
      :title="item.name"
      v-for="item in UserChannels"
      :key="item.id"
      >
      <articles-list :channelList="item" />
      </van-tab>
    </van-tabs>
    <!-- popup弹出层组件 -->
    <van-popup
     v-model="isChannelEditShow"
     position="bottom"
     closeable
     round
     close-icon-position="top-left"
     :style="{ height: '93%' }"
     >
     <channels-edit
     :channelList=" UserChannels"
     v-model="active"
     @close="isChannelEditShow=false"
     />
     </van-popup>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticlesList from './components/articles-list'
import ChannelsEdit from './components/channels-edit'
export default {
  components: {
    ArticlesList,
    ChannelsEdit
  },
  data () {
    return {
      active: 0, // 默认选中第一项
      UserChannels: [], // 接收文章频道列表
      isChannelEditShow: false// popup弹出层显示状态
    }
  },
  methods: {
    // 获取频道列表
    async loadUserChannels () {
      const { data } = await getUserChannels()
      this.UserChannels = data.data.channels
    }
  },
  created () {
    this.loadUserChannels()
  }
}
</script>

<style lang='less' scoped>
.home-container{
  padding-top: 90px;
  padding-bottom: 50px;
/deep/ .van-tabs__wrap {
  position: fixed;
  top:46px;
  left: 0;
  right: 0;
  z-index: 2
}
.van-icon {
  position: fixed;
  right: 0;
  line-height: 44px;
  background: #fff;
}
}

</style>
