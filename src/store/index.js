import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user')
  },
  mutations: {
    setUser (state, data) {
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
