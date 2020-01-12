<template>
  <div class="search-container">

    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch"
        @cancel="$router.back()"
        @input="onSearchInput"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow"/>

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
      :title="item"
      icon="search"
      v-for="(item,index) in suggestions"
      :key="index"
      />
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <span>全部删除</span> &nbsp;&nbsp; <span>完成</span>
        <van-icon name="delete" />
      </van-cell>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
import { debounce } from 'loadsh'
export default {
  props: {},
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索内容
      isResultShow: false, // 样式显示状态
      suggestions: []// 联想建议数据
    }
  },
  methods: {
    onSearch () {
      this.isResultShow = true
    },
    // 获取联想建议
    onSearchInput: debounce(async function () {
      // 判断 不能为空
      const searchText = this.searchText
      if (!searchText) {
        return
      }
      const { data } = await getSuggestions(searchText)
      this.suggestions = data.data.options
    }, 300)
  },
  created () {}
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 54px;
  .van-search {
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    z-index: 1
  }
}
</style>
