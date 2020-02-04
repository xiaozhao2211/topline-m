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

// 点赞
export const addLike = articleId => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data: {
      target: articleId
    }
  })
}

// 取消点赞
export const deleteLike = articleId => {
  return request({
    url: `/app/v1_0/article/likings/${articleId}`,
    method: 'delete'
  })
}

// 获取当前用户的文章列表
export const getCurrentUserArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/articles',
    params
  })
}

// 获取用户的收藏列表
export const getCollectArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/article/collections',
    params
  })
}

// 获取用户的历史记录
export const getHistoryArticles = params => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/histories',
    params
  })
}
