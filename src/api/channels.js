// 频道相关的请求模块
import request from '@/utils/request'

// 获取当前用户文章列表
export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}
