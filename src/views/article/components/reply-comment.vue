<template>
  <div class="reply-comment">
    <!-- 导航栏 -->
    <van-nav-bar :title="`${comment.reply_count}条回复`">
      <van-icon
        slot="left"
        name="cross"
        @click="$emit('click-close',comment)"
      />
    </van-nav-bar>
    <!-- /导航栏 -->

    <!-- 当前评论项 -->
    <article-item :comment="comment" />
    <!-- /当前评论项 -->

     <van-cell title="所有回复" />

    <!-- 评论的回复列表 -->
    <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
    >
        <article-item
            v-for="(comment, index) in list"
            :key="index"
            :comment="comment"
        />
    </van-list>
    <!-- /评论的回复列表 -->

    <!-- 底部 -->
    <!-- /底部 -->
  </div>
</template>

<script>
import ArticleItem from './article-item'
import { getComments } from '@/api/comment'
export default {
  name: 'CommentReply',
  components: {
    ArticleItem
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 请求下一页数据的页码
      limit: 20
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1.请求获取数据
      const { data } = await getComments({
        type: 'c',
        source: this.comment.com_id.toString(),
        offset: this.offset,
        limit: this.limit
      })

      // 2.将数据添加到列表
      const { results } = data.data
      this.list.push(...results)

      // 3.关闭loading
      this.loading = false

      // 4。判断是否还有数据
      if (results.length) {
        this.offset = data.data.last_id
      } else {
        this.finished = true
      }
    }
  }
}
</script>

<style>

</style>
