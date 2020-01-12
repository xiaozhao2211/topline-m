// 搜索相关的请求模块
import request from '@/utils/request'

// 获取联想建议
export const getSuggestions = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}
