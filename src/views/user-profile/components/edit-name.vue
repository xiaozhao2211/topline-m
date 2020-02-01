<template>
  <div class="edit-name">
    <van-nav-bar
        title="编辑昵称"
        left-text="返回"
        right-text="保存"
        @click-left="$emit('close')"
        @click-right="$emit('confirm', message)"
    />
    <van-field
        class="field"
        :value="name"
        rows="2"
        autosize
        type="textarea"
        maxlength="10"
        placeholder="请输入昵称"
        show-word-limit
        @input=" message=$event"
    />
  </div>
</template>

<script>
export default {
  name: 'EditName',
  components: {},
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="less" scoped>
.edit-name{
 .van-nav-bar {
  background: #fff;
 .van-nav-bar__title {
  color: #333;
  }
}
.field {
   background-color: #fff;
  /deep/.van-cell__value {
    background-color: #f5f5f5;
  }
}
}
</style>
