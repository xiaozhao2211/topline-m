<template>
  <div class="user-articles">
    <van-nav-bar title="我的收藏/浏览历史/作品"/>
    <van-tabs v-model="active">
        <van-tab title="我的收藏">收藏</van-tab>
        <van-tab title="浏览历史">历史</van-tab>
        <van-tab title="作品">作品</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'UserArticles',
  components: {},
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
