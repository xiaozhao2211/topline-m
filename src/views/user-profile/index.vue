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
             :src="user.photo"
            />
        </van-cell>
        <van-cell title="昵称" :value="user.name" is-link/>
        <van-cell title="性别" :value="user.gender" is-link/>
        <van-cell title="生日" :value="user.birthday" is-link/>
    </van-cell-group>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
export default {
  name: 'UserProfile',
  components: {},
  props: {},
  data () {
    return {
      user: ''// 用户个人信息
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 展示用户个人信息
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    }
  }
}
</script>

<style scoped></style>
