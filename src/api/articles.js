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

// 收藏
export const addCollect = articleId => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'post',
    data: {
      target: articleId
    }
  })
}

// 取消收藏
export const deleteCollect = articleId => {
  return request({
    url: `/app/v1_0/article/collections/${articleId}`,
    method: 'delete'
  })
}
