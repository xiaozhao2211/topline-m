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
         :title="item.title"></van-cell>
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
    onRefresh () {
      setTimeout(() => {
        this.$toast('刷新成功')
        this.isLoading = false
        this.count++
      }, 500)
    }
  }
}
</script>

<style>

</style>
