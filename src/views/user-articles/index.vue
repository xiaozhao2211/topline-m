<template>
  <div class="user-articles">
    <van-nav-bar
    title="我的收藏/浏览历史/作品"
    left-arrow
    @click-left="$router.back()"
    fixed
    />
    <van-tabs v-model="active">
        <van-tab title="我的收藏">
          <user-collect />
        </van-tab>
        <van-tab title="浏览历史">
          <user-history />
        </van-tab>
        <van-tab title="作品">
          <user-article />
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/article'
import UserCollect from './components/collect'
import UserHistory from './components/history'
export default {
  name: 'UserArticles',
  components: {
    UserArticle,
    UserCollect,
    UserHistory
  },
  props: {
    type: {
      type: String
    }
  },
  data () {
    let active = ['collect', 'history'].indexOf(this.type)
    if (active === -1) {
      active = 2 // 我的作品
    }
    return {
      active
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    beforeRouteLeave (to, from, next) {
    // 如果跳转的是文章详情页，则把当前页面缓存起来，否则不缓存
      if (to.name === 'article') {
        this.$store.commit('addCachePage', 'UserArticles')
      } else {
        this.$store.commit('removeCachePage', 'UserArticles')
      }
      // 放行通过
      next()
    }
  }
}
</script>

<style scoped lang="less">
.user-articles {
  padding-top: 90px;
  padding-bottom: 50px;
  /deep/ .van-tabs__wrap {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
