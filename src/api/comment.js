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
