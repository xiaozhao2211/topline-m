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
    component: () => import('@/views/tab_bar'),
    children: [
      {
        path: '',
        component: () => import('@/views/home')
      },
      {
        path: 'qa',
        component: () => import('@/views/qa')
      },
      {
        path: 'video',
        component: () => import('@/views/video')
      },
      {
        path: 'my',
        component: () => import('@/views/my')
      }
    ]
  }]

const router = new VueRouter({
  routes
})

export default router
