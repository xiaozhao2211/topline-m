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
