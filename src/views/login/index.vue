<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录"></van-nav-bar>
      <!-- 表单 -->
      <van-cell-group>
        <van-field label="用户名" placeholder="请输入用户名" clearable v-model="user.mobile"></van-field>
        <van-field label="验证码" placeholder="请输入验证码" clearable v-model="user.code">
            <van-button slot="button" size="small" type="primary">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn-wrap">
        <van-button type="info" @click="userLogin">登录</van-button>
      </div>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    async userLogin () {
      const user = this.user
      try {
        let result = await login(user)
        console.log(result)
      } catch (error) {
        console.log('登录失败', error)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.login-container {
    .btn-wrap {
        padding: 27px 16px;
        .van-button {
            width: 100%;
            background-color: #6db4fb;
        }
    }
}
</style>
