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
import { getItem } from '@/utils/storage'
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
      // const { data } = await getUserChannels()
      // this.UserChannels = data.data.channels
      // 1、变量接收频道
      let channels = []

      // 2、获取本地存储频道
      const loadUserChannels = getItem('user-channels')

      // 3、本地存储存在，用本地
      if (loadUserChannels) {
        channels = loadUserChannels
      } else {
        // 4、本地没有，调接口获取频道
        const { data } = await getUserChannels()
        channels = data.data.channels
      }
      // 5、最后，把数据赋值到当前组件中
      this.UserChannels = channels
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
