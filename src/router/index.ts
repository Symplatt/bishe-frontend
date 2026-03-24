// router/index.ts

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
    meta: { requiresAuth: false }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/Dashboard.vue'),
    meta: { requiresAuth: true, requiresAdmin: true }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('access_token')
  const userInfo = JSON.parse(localStorage.getItem('user_info') || '{}')

  if (to.meta.requiresAuth && !token) {
    // 需要登录但没 token
    next('/login')
  } else if (to.meta.requiresAdmin && !userInfo.is_admin) {
    // 需要管理员权限但不是管理员
    alert('仅系统管理员可访问数据大屏！')
    next('/')
  } else {
    next()
  }
})

export default router

/** 
import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      // 路由懒加载：只有访问该路由时才加载对应文件
      component: () => import('@/views/HomeView.vue'),
      meta: { keepAlive: true } // 标记需要缓存的页面
    },


    // 404页面
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFound.vue'),
      meta: {
        title: '404',
        hideFooter: true,
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

export default router
*/