<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录"></van-nav-bar>
      <!-- 表单 -->
      <van-cell-group>
        <van-field
        label="用户名"
        placeholder="请输入用户名"
        clearable
        required
        v-model="user.mobile"></van-field>
        <van-field
        label="验证码"
        placeholder="请输入验证码"
        required
        clearable v-model="user.code">
           <van-count-down
           slot="button"
           :time=" 60 * 1000"
           format="ss s"
           v-if="isCountDownShow"
           @finish="isCountDownShow = false"/>
           <van-button
           slot="button"
           size="small"
           type="primary"
           v-else
           @click="SendSmsCode">发送验证码</van-button>
        </van-field>
      </van-cell-group>
      <div class="btn-wrap">
        <van-button type="info" @click="userLogin">登录</van-button>
      </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
export default {
  name: 'LoginPage',
  data () {
    return {
      // 1.获取用户登录信息
      user: {
        mobile: '', // 手机号
        code: ''// 验证码
      },
      isCountDownShow: false // 倒计时是否显示
    }
  },
  methods: {
    async userLogin () {
      const user = this.user
      // 登录提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登陆中'
      })
      // 请求登录
      try {
        let result = await login(user)
        console.log(result)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('登录失败')
      }
    },
    async SendSmsCode () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2.
      // 3.发送验证码请求
      try {
        // 显示倒计时
        this.isCountDownShow = true
        // 发请求
        await getSmsCode(mobile)
      } catch (error) {
        console.log(error)
        // 发送失败 关闭倒计时
        this.isCountDownShow = false
        if (error.response.status === 429) {
          this.$toast('您的操作过于频繁')
        }
      }
      this.$toast('发送失败')
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
