<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      >
        <van-cell
         v-for="(item,index) in list"
         :key="index"
         :title="item.title"
         @click="$router.push('/article/' + item.art_id)"
         ></van-cell>
      </van-list>
  </van-pull-refresh>
</template>

<script>
import { getArticles } from '@/api/articles'
export default {
  props: {
    channelList: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  methods: {
    async onLoad () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channelList.id,
        timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
        with_top: 1
      })
      // console.log(data)
      // 2. 把请求获取到的数据添加到数组列表中
      const results = data.data.results
      this.list.push(...results)
      // 3. 加载状态结束
      this.loading = false
      // 4. 数据全部加载完
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        this.finished = true
      }
    },
    // 下拉刷新调用 onRefresh
    async onRefresh () {
      // 1. 请求获取数据
      const { data } = await getArticles({
        channel_id: this.channelList.id,
        timestamp: Date.now(),
        with_top: 1
      })
      // 2. 如果有最新数据，则把数据放到列表的顶部
      const { results } = data.data
      this.list.unshift(...results)
      // 3. 关闭下拉刷新的 loading 状态
      this.isLoading = false
      // 提示
      this.$toast(`已更新${results.length}条数据`)
    }
  }
}
</script>

<style>

</style>
