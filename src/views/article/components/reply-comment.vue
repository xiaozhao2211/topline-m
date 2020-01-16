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
        @click="isReplyShow = true"
      >写回复</van-button>
      <van-icon
        color="#e5645f"
        name="good-job"
      />
    </div>
    <!-- /底部 -->

    <!-- 发布回复 -->
    <van-popup
    v-model="isReplyShow"
    position="bottom"
    >
    <post-comment
    @closePopup="onAddReply"/>
    </van-popup>
    <!-- /发布回复 -->
  </div>
</template>

<script>
import ArticleItem from './article-item'
import { getComments, addComments } from '@/api/comment'
import PostComment from './post-comment'
export default {
  name: 'CommentReply',
  components: {
    ArticleItem,
    PostComment
  },
  props: {
    comment: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Object, Number, String],
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      offset: null, // 请求下一页数据的页码
      limit: 20,
      isReplyShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 发布回复
    async onAddReply (postMessage) {
      // 1.非空校验
      if (!postMessage.length) {
        return
      }
      // 提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '发布中...',
        forbidClick: true // 是否禁止背景点击
      })
      // 2.发请求
      const { data } = await addComments({
        target: this.comment.com_id.toString(),
        content: postMessage,
        art_id: this.articleId.toString()
      })

      // 3.将数据添加到list列表中
      const results = data.data.new_obj
      this.list.unshift(results)

      // 4.关闭弹层
      this.isReplyShow = false

      // 5.清空输入
      postMessage = ''

      // 6.更新文章评论的回复总数量
      this.comment.reply_count++
      this.$toast.success('发布成功')
    },
    // 获取评论回复数据
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
