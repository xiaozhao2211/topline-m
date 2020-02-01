<template>
  <div class="user-profile">
    <!-- 用户信息 -->
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
        <van-cell title="昵称"
        :value="user.name"
        is-link
        @click="isEditNameShow = true"
        />
        <van-cell title="性别" :value="user.gender === 0 ? '男' : '女'" is-link/>
        <van-cell title="生日" :value="user.birthday" is-link/>
    </van-cell-group>
     <!-- /用户信息 -->

     <!-- 编辑昵称 -->
     <van-popup v-model="isEditNameShow" position="bottom">
         <edit-name
         :name='user.name'
         @close='isEditNameShow=false'
         @confirm='onSaveName'
         />
     </van-popup>
     <!-- /编辑昵称 -->
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/api/user'
import EditName from './components/edit-name'
export default {
  name: 'UserProfile',
  components: {
    EditName
  },
  props: {},
  data () {
    return {
      user: '', // 用户个人信息
      isEditNameShow: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 保存用户资料
    async saveProfile (field, value) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        await updateUserProfile({
          [field]: value
        })
        this.$toast.success('更新成功')
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },
    // 保存用户名字
    async onSaveName (name) {
      // 提交更新
      await this.saveProfile('name', name)
      // 更新视图
      this.user.name = name
      // 关闭弹层
      this.isEditNameShow = false
    },
    // 展示用户个人信息
    async loadUserProfile () {
      const { data } = await getUserProfile()
      this.user = data.data
    }
  }
}
</script>

<style scoped></style>
