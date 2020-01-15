import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'
import decodeJwt from 'jwt-decode'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
      // 解析 JWT 中的数据（需要使用用户ID）
      if (data && data.token) {
        data.id = decodeJwt(data.token).user_id
      }
      state.user = data
      // 将数据存储到本地存储 持久化
      setItem('user', state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
