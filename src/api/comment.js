// 文章评论相关的请求模块
import request from '@/utils/request'

// 获取当前用户文章列表
export const getComments = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'GET',
    params
  })
}

// 发布评论
export const addComments = data => {
  return request({
    url: '/app/v1_0/comments',
    method: 'POST',
    data
  })
}

// 对评论或评论回复点赞
export const addCommentLike = commentId => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'POST',
    data: {
      target: commentId
    }
  })
}

// 对评论或评论回复点赞
export const deleteCommentLike = commentId => {
  return request({
    url: `/app/v1_0/article/likings/${commentId}`,
    method: 'DELETE'
  })
}
