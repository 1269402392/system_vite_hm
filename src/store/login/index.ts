import router from '@/router'
import { defineStore } from 'pinia'
import { useMain } from '@/store/main'
import { useStore } from '@/store'
import { handleGetNoLoading, loginRequest } from '@/service/request'
import { mapMenusToPath, mapPathToBreadcrumb } from '@/utils/map-menus'
import { ILoginType } from '@/service/type'
import { cache } from '@/utils/cache'
import { dashboard, handleGoods } from '@/utils/other-route'
import { RouteRecordRaw } from 'vue-router'

const useLogin = defineStore('login', {
  state: () => {
    return {
      userInfo: {},
      menuList: []
    }
  },
  actions: {
    async loginAction(user: ILoginType) {
      const loading = (window as any).$message.loading('正在登陆...')
      try {
        const { data: loginRes, meta } = await loginRequest(`login`, user)
        loading?.destroy()
        if (meta.status === 200) {
          // 成功
          cache.setCache('token', loginRes.token) // 存到缓存
          const wait = (window as any).$message.success(`${meta.msg},即将进入系统!`)
          this.userInfo = loginRes // 存储个人用户信息
          cache.setCache('userInfo', loginRes)

          //获取菜单
          const { data } = await handleGetNoLoading('menus')
          data.unshift(dashboard) // 添加自定义菜单
          this.menuList = data
          cache.setCache('menuList', data)

          //注册动态路由
          const routes = mapMenusToPath(data)
          routes.forEach((route) => router.addRoute('main', route))

          setTimeout(() => {
            router.push('/main')
            wait?.destroy()
          }, 1500)
        } else {
          // 失败
          ;(window as any).$message.error(meta.msg)
        }
      } catch (e) {
        loading.destroy()
        // ;(window as any).$message.error('网络异常')
      }
    },
    // 解决刷新数据丢失问题
    setupLocalLogin() {
      const mainStore = useMain()
      const store = useStore()
      // store.getRoleList()
      store.getCategoryList()
      this.userInfo = cache.getCache('userInfo')
      this.menuList = cache.getCache('menuList')
      const menuList = cache.getCache('menuList')
      const authName = cache.getCache('authName')
      const titleTag = cache.getCache('titleTag')
      if (authName) {
        mainStore.authName = authName
        mainStore.breadcrumb = mapPathToBreadcrumb(menuList, authName)
      }
      if (titleTag) {
        mainStore.titleTag = titleTag
      }
      if (menuList) {
        const routes = mapMenusToPath(menuList)
        // console.log(routes)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
function setupInitialData() {
  const login = useLogin()
  login.setupLocalLogin()
}
export { useLogin, setupInitialData }
