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
     <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
      >写评论</van-button>
      <van-icon
        color="#e5645f"
        name="good-job"
      />
    </div>
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

<style scoped lang="less">
.comment-reply {
  padding-bottom: 44px;
}
.reply-nav-bar {
  background: #fff;
  .van-icon, .van-nav-bar__title, .van-nav-bar__right {
    color: #333;
  }
}
.footer {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-sizing: border-box;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 44px;
  border-top: 1px solid #d8d8d8;
  background-color: #fff;
  .write-btn {
    width: 160px;
  }
  .van-icon {
    font-size: 20px;
  }
}
</style>
