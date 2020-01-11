// 文章相关的请求模块
import request from '@/utils/request'

// 获取当前用户文章列表
export const getArticles = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params
  })
}
