<template>
  <div class="user-profile">
    <!-- 用户信息 -->
    <van-nav-bar
        title="个人信息"
        left-text="返回"
        @click-left="$router.back()"
    />
    <van-cell-group>
        <van-cell title="头像" is-link @click="onSelectFile">
            <van-image
             round
             width="30"
             height="30"
             :src="user.photo"
            />
        </van-cell>
        <input type="file" hidden ref="file" @change="onChangeFile">
        <van-cell title="昵称"
        :value="user.name"
        is-link
        @click="isEditNameShow = true"
        />
        <van-cell
        title="性别"
        :value="user.gender === 0 ? '男' : '女'"
        is-link
        @click="isEditGenderShow = true"
        />
        <van-cell
        title="生日"
        :value="user.birthday"
        is-link
         @click="isEditBirthdayShow = true"
        />
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

     <!-- 编辑性别 -->
     <van-action-sheet
     v-model="isEditGenderShow"
     cancel-text="取消"
     :actions="actions"
     @select="onGenderSelect" />
     <!-- /编辑性别 -->

     <!-- 编辑生日 -->
     <van-popup v-model="isEditBirthdayShow" position="bottom">
       <van-datetime-picker
        v-model="currentDate"
        type="datetime"
        :min-date="minDate"
        :max-date="maxDate"
        @cancel="isEditBirthdayShow = false"
        @confirm="onBirthdayConfirm"
      />
     </van-popup>
     <!-- /编辑生日 -->

     <!-- 头像预览 -->
     <van-image-preview
     v-model="isPreviewPhotoShow"
     :images="previewImages"
     @close="file.value = ''"
     >
       <van-nav-bar
        slot="cover"
        left-text="取消"
        right-text="确认"
        @click-left="isPreviewPhotoShow = false"
        @click-right="onPhotoConfirm"
       />
     </van-image-preview>
     <!-- /头像预览 -->
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile, updateUserPhoto } from '@/api/user'
import EditName from './components/edit-name'
import moment from 'moment'
export default {
  name: 'UserProfile',
  components: {
    EditName
  },
  props: {},
  data () {
    return {
      user: '', // 用户个人信息
      isEditNameShow: false,
      isEditGenderShow: false,
      actions: [
        { name: '男', value: 0 },
        { name: '女', value: 1 }
      ],
      isEditBirthdayShow: false,
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(),
      isPreviewPhotoShow: false,
      previewImages: []
    }
  },
  computed: {
    file () {
      return this.$refs['file']
    }
  },
  watch: {},
  created () {
    this.loadUserProfile()
  },
  mounted () {},
  methods: {
    // 修改用户头像
    onSelectFile () {
      // 出发点击事件
      this.file.click()
    },
    // 预览用户头像
    onChangeFile () {
      // 文件对象
      const fileObj = this.file.files[0]
      // 获取文件数据
      const fileData = URL.createObjectURL(fileObj)
      // 将要预览的图片放到数组中
      this.previewImages = [fileData]
      // 显示图片预览
      this.isPreviewPhotoShow = true
    },

    // 保存头像
    async onPhotoConfirm () {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        message: '更新中...',
        forbidClick: true // 是否禁止背景点击
      })
      try {
        const fd = new FormData()
        fd.append('photo', this.file.files[0])
        const { data } = await updateUserPhoto(fd)
        this.user.photo = data.data.photo
        this.$toast.success('更新成功')
        // 关闭图片预览
        this.isPreviewPhotoShow = false
      } catch (err) {
        console.log(err)
        this.$toast.fail('更新失败')
      }
    },

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

    // 编辑用户生日
    async onBirthdayConfirm (value) {
      // 处理时间格式
      value = moment(value).format('YYYY-MM-DD')
      // 请求更新
      await this.saveProfile('birthday', value)
      // 更新视图
      this.user.birthday = value
      // 关闭弹层
      this.isEditBirthdayShow = false
    },

    // 选择用户性别
    async onGenderSelect ({ value }) {
      // 请求更新
      await this.saveProfile('gender', value)
      // 更新视图
      this.user.gender = value
      // 关闭上拉菜单
      this.isEditGenderShow = false
    },

    // 编辑用户名字
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

<style scoped lang="less">
/deep/ .van-image-preview__cover {
  top: unset;
  left: 0;
  bottom: 0;
  right: 0;
  .van-nav-bar {
    background: #181818;
     .van-nav-bar__right {
      color: #fff;
    }
  }
}
</style>
