import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    // 小智同学
    path: '/user/chat',
    name: 'user-chat',
    component: () => import('@/views/user-chat')
  }, {
  // 作品
    path: '/my-article/:type?',
    component: () => import('@/views/user-articles'),
    props: true
  },
  //  {
  //   // 浏览历史
  //   path: '/my-article/history',
  //   component: () => import('@/views/user-articles')
  // }, {
  //   // 我的收藏
  //   path: '/my-article/collect',
  //   component: () => import('@/views/user-articles')
  // },
  {
    // 编辑用户资料
    path: '/user-profile',
    component: () => import('@/views/user-profile')
  },
  {
  // 文章详情
    path: '/article/:articleId',
    component: () => import('@/views/article'),
    props: true
  },
  {
  // 搜索
    path: '/search',
    component: () => import('@/views/search')
  },
  {
  // 登录
    path: '/login',
    name: 'login',
    component: () => import('@/views/login')
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
