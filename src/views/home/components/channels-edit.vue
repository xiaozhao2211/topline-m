<template>
  <div class="channels-edit">
      <!-- 我的频道-->
      <van-cell title="我的频道" :border="false">
        <van-button
        size="mini"
        round
        type="danger"
        plain
        @click="isEdit=!isEdit"
        >
        {{isEdit?'完成':'编辑'}}
        </van-button>
      </van-cell>
      <van-grid :gutter="10">
        <van-grid-item
         v-for="channel in channelList"
         :key="channel.id"
         :text="channel.name"
        >
          <van-icon
          name="close"
          slot="icon"
          size="18"
          v-show="isEdit"
          />
        </van-grid-item>
      </van-grid>

      <!-- 推荐频道 -->
      <van-cell title="推荐频道" :border="false"></van-cell>
      <van-grid :gutter="10">
        <van-grid-item
         v-for="channel in remainingChannels"
         :key="channel.id"
         :text="channel.name"
         @click="onChannelAdd(channel)"
        />
      </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  props: {
    // 我的频道
    channelList: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      allChannels: [], // 接收所有频道
      isEdit: false// 编辑状态
    }
  },
  methods: {
    // 添加频道
    onChannelAdd (channel) {
      // 将点击的频道push到我的频道列表中 channelList
      this.channelList.push(channel)
    },
    // 获取所有频道
    async loadAllChannels () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
    //   console.log(this.allChannels)
    }
  },
  created () {
    this.loadAllChannels()
  },
  computed: {
    remainingChannels () {
      const { channelList, allChannels } = this
      const channels = []
      // 遍历所有频道
      allChannels.forEach(item => {
        // 如果我的频道中不包含当前被遍历的频道，则要
        if (!channelList.find(c => c.id === item.id)) {
          channels.push(item)
        }
      })
      return channels
    }
  }
}
</script>

<style lang="less" scoped>
 .channels-edit {
 padding: 40px 0;
 .van-icon-close {
    position: absolute;
    right: -45px;
    top: -20px;
 }
}
</style>
