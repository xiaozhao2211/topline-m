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
        @cancel="onCancel"
      />
    </form>

    <!-- 联想建议 -->
    <van-cell-group>
      <van-cell title="单元格"  icon="search" />
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell title="历史记录">
      <span>全部删除</span> &nbsp;&nbsp; <span>完成</span>
      <van-icon name="delete" />
    </van-cell>
    <van-cell-group>
      <van-cell title="单元格">
        <van-icon name="close" />
      </van-cell>
    </van-cell-group>

    <!-- 搜索结果 -->
    <search-result/>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
export default {
  props: {},
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: ''
    }
  },
  methods: {
    onSearch () {},
    onCancel () {}
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
