// 用户相关的请求模块
import request from '@/utils/request'

// 用户登录
export const login = data => {
  return request({
    url: '/app/v1_0/authorizations',
    method: 'post',
    data
  })
}

// 发送验证码
export const getSmsCode = mobile => {
  return request({
    url: `/app/v1_0/sms/codes/${mobile}`,
    method: 'get'
  })
}

// 获取当前登录用户信息
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'get'
  })
}

// 获取频道列表
export const getUserChannels = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}

// 关注作者
export const addFollow = userId => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target: userId
    }
  })
}

// 取消关注
export const deleteFollow = userId => {
  return request({
    url: `/app/v1_0/user/followings/${userId}`,
    method: 'delete'
  })
}

// 获取用户个人资料
export const getUserProfile = () => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'GET'
  })
}
