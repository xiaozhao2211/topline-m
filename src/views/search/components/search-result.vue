<template>
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
        />
    </van-list>
</template>

<script>
import { getSearchResult } from '@/api/search'
export default {
  props: {
    searchContent: {
      type: String,
      required: true
    }
  },
  components: {},
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      perPage: 20
    }
  },
  methods: {
    async onLoad () {
      // 1.请求数据
      const { data } = await getSearchResult({
        page: this.page,
        per_page: this.perPage,
        q: this.searchContent
      })
      // 2.将数据添加到列表
      const { results } = data.data
      this.list.push(...results)
      // 3.加载状态结束
      this.loading = false

      // 4.数据全部加载完成
      if (results.length) {
        this.page++
      } else {
        this.finished = true // 没有数据了，将加载状态设置结束，不再 onLoad
      }
    }
  },
  created () {}
}
</script>

<style>

</style>
