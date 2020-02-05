/**
 * 封装 axios 请求模块
 */
import axios from 'axios'
import jsonBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/' // 基础路径
})
request.defaults.transformResponse = [function (data) {
  try {
    return jsonBig.parse(data)
  } catch (error) {
    return {}
  }
}]

// 1、请求拦截器
request.interceptors.request.use(function (config) {
  // config 请求配置对象，我们可以通过修改 config 来实现统一请求数据处理
  const { user } = store.state
  // 在发送请求之前做些什么，例如加入token
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 2、响应拦截器
request.interceptors.response.use(function (response) {
  // 在接收响应做些什么，例如跳转到登录页
  return response
}, async function (error) {
  // 对响应错误做点什么  当请求失败的时候会进入这个响应拦截中的错误处理函数
  if (error.response && error.response.status === 401) {
    // 1. 如果没有 refresh_token，则直接跳转登录页
    const user = store.state.user
    if (!user || !user.refresh_token) {
      redirectLogin()
      return
    }

    // 2. 如果有，则请求更新 token
    try {
      const { data } = await axios({
        method: 'PUT',
        url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })

      // 3. 如果刷新 token 成功了，则把新的 token 更新到容器中
      store.commit('setUser', {
        ...user, // { id, token, refresh_token }
        token: data.data.token // 更新 token
      })

      // 4. 把之前失败的请求继续发出去
      return request(error.config)
    } catch (error) {
      redirectLogin()
    }
  }
  return Promise.reject(error)
})

function redirectLogin () {
  // router.push({
  //   name: 'login',
  //   // query 参数会以 ?key=value&key=value 的格式添加到 url 后面
  //   query: {
  //     // 这里使用查询参数把要跳转回来的路由地址传递给了登录页面
  //     // router.currentRoute 就是当前路由对象，好比我们在组件中的 this.$route
  //     // 当前路由对象的fullPath 就是当前路由的路径
  //     redirect: router.currentRoute.fullPath
  //   }
  // })
  router.push({
    name: 'login',
    // query 参数会以 ?key=value&key=value 的格式添加到 url 后面
    query: {
      // 这里使用查询参数把要跳转回来的路由地址传递给了登录页面
      // router.currentRoute 就是当前路由对象，好比我们在组件中的 this.$route
      // 当前路由对象的fullPath 就是当前路由的路径
      redirect: router.currentRoute.fullPath
    }
  })
}
export default request
