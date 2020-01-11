<template>
  <div class="channels-edit">
      <!-- 我的频道-->
      <van-cell title="我的频道" :border="false">
        <van-button size="mini" round type="danger" plain>编辑</van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
         v-for="value in 8"
         :key="value"
         text="文字"
        />
      </van-grid>

      <!-- 推荐频道 -->
      <van-cell title="推荐频道" :border="false"></van-cell>
      <van-grid :gutter="10">
        <van-grid-item
         v-for="value in 8"
         :key="value"
         text="文字"
        />
      </van-grid>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
 .channels-edit {
 padding: 40px 0;
}
</style>
