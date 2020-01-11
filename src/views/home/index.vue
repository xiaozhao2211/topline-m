<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar title="首页" fixed/>

    <!-- 频道列表 -->
    <van-tabs v-model="active">
      <van-tab
      :title="item.name"
      v-for="item in UserChannels"
      :key="item.id"
      >
      <articles-list :channelList="item" />
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticlesList from './components/articles-list'
export default {
  components: {
    ArticlesList
  },
  data () {
    return {
      active: 0, // 默认选中第一项
      UserChannels: []// 接收文章频道列表
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
}

</style>
