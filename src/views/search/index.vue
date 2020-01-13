<template>
  <div class="search-container">

    <!-- 搜索栏 -->
    <form action="/">
      <van-search
        v-model="searchText"
        placeholder="请输入搜索关键词"
        show-action
        background="#3296fa"
        @search="onSearch(searchText)"
        @cancel="$router.back()"
        @input="onSearchInput"
        @focus="isResultShow=false"
      />
    </form>

    <!-- 搜索结果 -->
    <search-result v-if="isResultShow" :searchContent="searchText"/>

    <!-- 联想建议 -->
    <van-cell-group v-else-if="searchText">
      <van-cell
      icon="search"
      v-for="(item,index) in suggestions"
      :key="index"
      @click="onSearch(item)"
      >
      <div slot="title" v-html="highLight(item)"></div>
      </van-cell>
    </van-cell-group>

    <!-- 历史记录 -->
    <van-cell-group v-else>
      <van-cell title="历史记录">
        <template v-if="isDeleteShow">
          <span @click="searchHistories=[]">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isDeleteShow = false">完成</span>
        </template>
        <van-icon v-else name="delete" @click="isDeleteShow = true" />
      </van-cell>
      <van-cell
        :title="item"
        v-for="(item,index) in searchHistories "
        :key="index"
        @click="onSearch(item)"
        >
        <van-icon
        name="close"
        v-show="isDeleteShow"
        @click.stop="searchHistories.splice(index, 1)"
        ></van-icon>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import SearchResult from './components/search-result'
import { getSuggestions } from '@/api/search'
import { debounce } from 'loadsh'
import { setItem, getItem } from '@/utils/storage'
export default {
  props: {},
  components: {
    SearchResult
  },
  data () {
    return {
      searchText: '', // 搜索内容
      isResultShow: false, // 样式显示状态
      suggestions: [], // 联想建议数据
      searchHistories: getItem('search-history') || [], // 搜索历史
      isDeleteShow: false// 删除显示状态
    }
  },
  watch: {
    searchHistories (newVal) {
      setItem('search-history', newVal)
    }
  },
  methods: {
    // 联想建议高亮处理
    highLight (str) {
      return str.toLowerCase()
        .replace(this.searchText.toLowerCase(),
          `<span style="color:red">${this.searchText}</span>`)
    },
    onSearch (q) {
      this.searchText = q
      const index = this.searchHistories.indexOf(this.searchText)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(this.searchText)
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
