<template>
  <div class="post-comment">
      <van-field
        class="post-field"
        v-model="postMessage"
        rows="2"
        autosize
        label="评论"
        type="textarea"
        maxlength="50"
        placeholder="请输入评论"
        show-word-limit
      />
      <van-button
      size="small"
      type="info"
      :disabled="!postMessage"
      @click="$emit('closePopup',postMessage)"
      >发布</van-button>
    </div>
</template>

<script>
export default {
  name: 'PostComment',
  components: {},
  props: {},
  data () {
    return {
      postMessage: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.post-comment {
    display: flex;
    align-items: flex-end;
    background: #f5f7f9;
    padding: 10px;
    .post-field {
      margin-right: 15px;
    }
  }
</style>
