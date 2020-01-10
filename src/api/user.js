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
