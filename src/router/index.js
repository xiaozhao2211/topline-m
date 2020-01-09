import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
Vue.use(VueRouter)

const routes = [
//   {
//   path: '/',
//   redirect: '/login'
// },
  {
  // 登录
    path: '/login',
    component: Login
  },
  {
    path: '/',
    component: () => import('@/views/tab_bar/index.vue')
  }]

const router = new VueRouter({
  routes
})

export default router
