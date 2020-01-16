<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      title="文章详情"
      left-arrow
      fixed
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <!-- 加载中 -->
    <van-loading
      class="loading"
      color="#1989fa"
      vertical
      v-if="loading"
    >
      <slot>加载中...</slot>
    </van-loading>
    <!-- /加载中 -->

    <!-- 文章详情 -->
    <div class="detail" v-else-if="article.title">
      <h3 class="title">{{article.title}}</h3>
      <div class="author-wrap">
        <div class="base-info">
          <van-image
            class="avatar"
            round
            fit="cover"
            :src="article.aut_photo"
          />
          <div class="text">
            <p class="name">{{article.aut_name}}</p>
            <p class="time">{{article.pubdate | datetime}}</p>
          </div>
        </div>
        <van-button
        v-if="!$store.state.user || article.aut_id !== $store.state.user.id"
        class="follow-btn"
        :type="article.is_followed ? 'default' : 'info'"
        size="small"
        round
        @click="onFollow"
        >
        {{article.is_followed ? '已关注' : '+ 关注'}}
        </van-button>
      </div>
      <div class="markdown-body" v-html="article.content"></div>
    </div>
    <!-- /文章详情 -->

    <!-- 加载失败提示 -->
    <div class="error" v-else>
      <img src="./no-network.png" alt="no-network">
      <p class="text">亲，网络不给力哦~</p>
      <van-button
        class="btn"
        type="default"
        size="small"
        :loading="isFollowLoading"
        @click="loadArticle"
      >点击重试</van-button>
    </div>
    <!-- /加载失败提示 -->

    <!-- 文章评论 -->
    <van-cell title="全部评论" :border="false" />
     <van-list
        v-model="articleComment.loading"
        :finished="articleComment.finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
      <article-item
      v-for="(comment, index) in articleComment.list"
      :key="index"
      :comment="comment"
      @reply-comment="onReplyComment"
      />
     </van-list>
    <!-- /文章评论 -->

    <!-- 底部区域 -->
    <div class="footer">
      <van-button
        class="write-btn"
        type="default"
        round
        size="small"
        @click="isPostShow=true"
      >写评论</van-button>
      <van-icon
        class="comment-icon"
        name="comment-o"
        :info="articleComment.totalCount"
      />
      <van-icon
        color="orange"
        :name="article.is_collected ? 'star' : 'star-o'"
        @click="onCollect"
      />
      <van-icon
        color="#e5645f"
        :name="article.attitude === 1 ?'good-job' :'good-job-o'"
        @click="onAttitude"
      />
      <van-icon class="share-icon" name="share" />
    </div>
    <!-- /底部区域 -->

    <!-- 发布文章评论 -->
    <van-popup
    v-model="isPostShow"
    position="bottom"
    >
    <post-comment
    @closePopup="onAddComment"
    />
    </van-popup>
    <!-- /发布文章评论 -->

    <!-- 回复文章评论 -->
    <van-popup
    v-model="isReplyShow"
    position="bottom"
    style="height: 95%"
    >
    <reply-comment
    v-if="isReplyShow"
    @click-close="isReplyShow = false"
    :comment="currentComment"
    :article-id="articleId"
    />
    </van-popup>
    <!-- /回复文章评论 -->
  </div>
</template>

<script>
import {
  getArticleById,
  addCollect,
  deleteCollect,
  addLike,
  deleteLike
} from '@/api/articles'
import { addFollow, deleteFollow } from '@/api/user'
import { getComments, addComments } from '@/api/comment'
import ArticleItem from './components/article-item'
import PostComment from './components/post-comment'
import ReplyComment from './components/reply-comment'

export default {
  name: 'ArticlePage',
  components: {
    ArticleItem,
    PostComment,
    ReplyComment
  },
  props: {
    articleId: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      article: {}, // 文章详情
      loading: true,
      isFollowLoading: false, // 关注按钮的 loading 状态
      isPostShow: false,
      isReplyShow: false,
      currentComment: {}, // 点击回复的那个评论对象
      articleComment: {
        list: [],
        loading: false,
        finished: false,
        offset: null, // 请求下一页数据的页码
        totalCount: 0 // 总数据条数
      }
    }
  },
  computed: {},
  watch: {},
  created () {
    // 获取指定id文章详情
    this.loadArticle()
  },
  mounted () {},
  methods: {
    // 回复评论
    onReplyComment (comment) {
      // 将子组件中传给我评论对象存储到当前组件
      this.currentComment = comment
      this.isReplyShow = true
    },
    // 发布评论
    async onAddComment (postMessage) {
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
        target: this.articleId,
        content: postMessage
      })

      // 3.将数据添加到list列表中
      const results = data.data.new_obj
      this.articleComment.list.unshift(results)

      // 4.关闭弹层
      this.isPostShow = false

      // 5.清空输入
      postMessage = ''

      // 6.改变评论数量
      this.articleComment.totalCount++
      this.$toast.success('发布成功')
    },

    // 获取文章评论
    async onLoad () {
      const articleComment = this.articleComment

      // 1.请求数据
      const { data } = await getComments({
        type: 'a', // 评论类型，a-对文章(article)的评论，c-对评论(comment)的回复
        source: this.articleId, // 源id，文章id或评论id
        offset: articleComment.offset,
        limit: 10
      })

      // 2.将数据添加到列表中
      const { results } = data.data
      articleComment.list.push(...results)

      // 更新总数据条数
      articleComment.totalCount = data.data.total_count

      // 3. 将加载更多的 loading 设置为 false
      articleComment.loading = false

      // 4. 判断是否还有数据
      if (results.length) {
        articleComment.offset = data.data.last_id // 更新获取下一页数据的页码
      } else {
        articleComment.finished = true // 没有数据了，关闭加载更多
      }
    },

    // 关注与取消关注
    async onFollow () {
      this.isFollowLoading = true
      const authorId = this.article.aut_id
      try {
        if (this.article.is_followed) {
          await deleteFollow(authorId)
        } else {
          await addFollow(authorId)
        }
        this.article.is_followed = !this.article.is_followed
      } catch (error) {
        this.$toast.fail('操作失败')
      }
      this.isFollowLoading = false
    },

    // 点赞与取消
    async onAttitude () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        if (this.article.attitude === 1) {
          await deleteLike(this.articleId)
          this.article.attitude = -1
          this.$toast.success('取消点赞')
        } else {
          await addLike(this.articleId)
          this.article.attitude = 1
          this.$toast.success('成功点赞')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },

    // 收藏与取消收藏
    async onCollect () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '操作中...',
        forbidClick: true // 是否禁止背景点击
      })

      try {
        // article.is_collected为true 已收藏 则取消收藏
        if (this.article.is_collected) {
          await deleteCollect(this.articleId)
          this.article.is_collected = false
          this.$toast.success('取消收藏')
        } else {
          // 添加收藏
          await addCollect(this.articleId)
          this.article.is_collected = true
          this.$toast.success('收藏成功')
        }
      } catch (error) {
        this.$toast.fail('操作失败')
      }
    },

    // 请求指定id文章数据
    async loadArticle () {
      this.loading = true
      try {
        const { data } = await getArticleById(this.articleId)
        this.article = data.data
      } catch (error) {
      }
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
@import "./github-markdown.css";

.article-container {
  padding: 46px 20px 50px;
  background: #fff;
  .loading {
    padding-top: 100px;
    text-align: center;
  }
  .detail {
    .title {
      margin: 0;
      padding-top: 24px;
      font-size: 20px;
      color: #3A3A3A;
    }
    .author-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 0;
      height: 40px;
      .base-info {
        display: flex;
        align-items: center;
        .avatar {
          width: 40px;
          height: 40px;
          margin-right: 8px;
        }
        .text {
          line-height: 1.5;
          .name {
            margin: 0;
            font-size: 14px;
          }
          .time {
            margin: 0;
            font-size: 12px;
            color: #999;
          }
        }
      }
      .follow-btn {
        width: 85px;
      }
    }
  }
  .error {
    padding-top: 100px;
    text-align: center;
    .text {
      font-size: 15px;
    }
    .btn {
      width: 30%;
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
    .comment-icon {
      bottom: -2px;
    }
    .share-icon {
      bottom: -2px;
    }
  }
}
</style>
