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

// 获取文章详情
export const getArticleById = articleId => {
  return request({
    url: `/app/v1_0/articles/${articleId}`,
    method: 'get'
  })
}
