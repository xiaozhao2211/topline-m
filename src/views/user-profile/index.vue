<template>
  <div class="user-profile">
    <van-nav-bar
        title="个人信息"
        left-arrow
        @click="$router.back()"
    />
    <van-cell-group>
        <van-cell title="头像" is-link>
            <van-image
             round
             width="30"
             height="30"
             src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
        </van-cell>
        <van-cell title="昵称" value="内容" is-link/>
        <van-cell title="性别" value="内容" is-link/>
        <van-cell title="生日" value="内容" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
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

<style scoped></style>
