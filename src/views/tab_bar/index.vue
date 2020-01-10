<template>
  <div >
      <!-- 子路由出口 -->
      <router-view />
      <!-- tab-bar 标签栏 -->
      <van-tabbar v-model="active" route>
        <van-tabbar-item icon="home-o" to='/'>首页</van-tabbar-item>
        <van-tabbar-item icon="search" to="/qa">问答</van-tabbar-item>
        <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
        <van-tabbar-item icon="user-o" to="/my">
        {{$store.state.user ? '我的':'未登录'}}
        </van-tabbar-item>
      </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'TabBar',
  components: {},
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

<style>

</style>
