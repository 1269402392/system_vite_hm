import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { cache } from '@/utils/cache'
import { firstRoute, mapPathToBreadcrumb } from '@/utils/map-menus'
import { useMain } from '@/store/main'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/Login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/Main.vue'),
    children: [
      {
        path: '/handleGoods',
        name: 'handleGoods',
        component: () =>
          import('@/views/main/commodity/goods/children/HandleGoods.vue')
      }
    ]
  }
]

const router = createRouter({
  routes,
  history: createWebHistory()
})

router.beforeEach(async (to) => {
  if (to.path !== '/login') {
    const token = cache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
  if (to.path === '/main') {
    const store = useMain()
    cache.setCache('authName', '一览无余')
    store.breadcrumb = mapPathToBreadcrumb(cache.getCache('menuList'), '一览无余')
    cache.setCache('menuKey', 654)
    store.titleTag = [{ key: 654, title: '一览无余', path: 'overview' }]
    await router.replace(firstRoute.path)
  }
})
export default router
