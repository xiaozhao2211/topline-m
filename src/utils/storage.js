// 封装操作本地存储的工具方法模块
// 存储token
export const setItem = (name, value) => {
  const data = typeof value === 'object' ? JSON.stringify(value) : value
  window.localStorage.setItem(name, JSON.stringify(data))
}
// 获取token
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  try {
    return JSON.parse(data)
  } catch (error) {
    return data
  }
}
// 删除token
export const removeItem = name => {
  window.localStorage.removeItem(name)
}
