<template>
  <div class="login-container">
      <!-- 导航栏 -->
      <van-nav-bar title="登录"></van-nav-bar>
      <!-- 表单 -->
      <ValidationObserver ref="form">
        <ValidationProvider name="手机号" rules="required|mobile">
              <van-field
                label="用户名"
                placeholder="请输入用户名"
                clearable
                v-model="user.mobile"
              ></van-field>
        </ValidationProvider>

        <ValidationProvider name="验证码" rules="required|code">
              <van-field
                label="验证码"
                placeholder="请输入验证码"
                clearable
                v-model="user.code">
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
        </ValidationProvider>
      </ValidationObserver>
    <!-- 登录按钮 -->
      <div class="btn-wrap">
        <van-button type="info" @click="userLogin">登录</van-button>
      </div>
  </div>
</template>

<script>
import { login, getSmsCode } from '@/api/user'
import { validate } from 'vee-validate'
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
      // 1. 获取表单数据
      const user = this.user
      // 2. 表单验证
      const success = await this.$refs.form.validate()
      if (!success) {
        // console.log('验证失败')
        setTimeout(() => {
          const errors = this.$refs.form.errors
          // forEach 无法停止
          // find 方法会遍历数组，对每个元素执行方法中的条件判定
          // const item = Object.values(errors).find(item => item[0])
          // 找到第1个有错误的字段并弹出提示
          for (let key in errors) {
            const item = errors[key]
            if (item[0]) {
              this.$toast(item[0])
              return
            }
          }
        }, 100)
        return
      }
      // 登录提示
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true,
        message: '登陆中'
      })
      // 3.请求登录
      try {
        let result = await login(user)
        this.$store.commit('setUser', result.data.data)
        this.$toast.success('登录成功')
      } catch (error) {
        console.log('登录失败', error)
        this.$toast.fail('登录失败')
      }
    },
    async SendSmsCode () {
      // 1.获取手机号
      const { mobile } = this.user
      // 2.校验手机号是否有效
      const validateResult = await validate(mobile, 'required|mobile', {
        name: '手机号'
      })
      // 如果验证失败，提示错误消息，停止发送验证码
      if (!validateResult.valid) {
        this.$toast(validateResult.errors[0])
        return
      }
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
          return
        }
        this.$toast('发送失败')
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
