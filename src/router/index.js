import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'

Vue.use(VueRouter)

const routes = [{
  path: '/',
  redirect: '/login'
}, {
  // 登录
  path: '/login',
  component: Login
}]

const router = new VueRouter({
  routes
})

export default router
