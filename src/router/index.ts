import { createRouter as createVueRouter, Router, createWebHistory, createMemoryHistory } from 'vue-router'

export const createRouter = (type: 'client'|'server'): Router => {
  return createVueRouter({
    history: type === 'client' ? createWebHistory()  : createMemoryHistory(),
    routes: [{
      path: '',
      name: 'index',
      meta: {
        title: '首页',
        keepAlive: true,
        requireAuth: true
      },
      component: () => import('@/views/index.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: '登录',
        keepAlive: true,
        requireAuth: false
      },
      component: () => import('@/views/login.vue')
    },
    {
      path: '/user',
      name: 'user',
      meta: {
        title: '用户中心',
        keepAlive: true,
        requireAuth: true
      },
      component: () => import('@/views/user.vue')
    }
  ]
  })
}