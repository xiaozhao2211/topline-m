// 搜索相关的请求模块
import request from '@/utils/request'

// 获取搜索联想建议
export const getSuggestions = q => {
  return request({
    url: '/app/v1_0/suggestion',
    method: 'get',
    params: {
      q
    }
  })
}

// 获取搜索结果
export const getSearchResult = params => {
  return request({
    url: '/app/v1_0/search',
    method: 'get',
    params
  })
}
