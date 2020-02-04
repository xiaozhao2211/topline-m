<template>
  <div class="user-articles">
    <van-nav-bar title="我的收藏/浏览历史/作品"/>
    <van-tabs v-model="active">
        <van-tab title="我的收藏">收藏</van-tab>
        <van-tab title="浏览历史">历史</van-tab>
        <van-tab title="作品">
          <user-article />
        </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import UserArticle from './components/article'
export default {
  name: 'UserArticles',
  components: {
    UserArticle
  },
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
