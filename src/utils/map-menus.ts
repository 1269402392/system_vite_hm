import { RouteRecordRaw } from 'vue-router'
import { IBreadcrumbType } from '@/components/nav-breadcrumb/type'
let firstRoute: any = null
export function mapMenusToPath(menuList: any) {
  // 存储过滤后的路由
  const routes: RouteRecordRaw[] = []
  // 存储所有路由
  const allRoute: RouteRecordRaw[] = []

  const routeFiles = import.meta.globEager('/src/router/main/**/*.ts')
  for (const route in routeFiles) {
    allRoute.push(routeFiles[route].default)
  }
  const _resourceGetRoute = (menuList: any) => {
    for (const menu of menuList ?? []) {
      if (menu.children && menu.children.length > 0) {
        _resourceGetRoute(menu.children)
      } else {
        const first = allRoute.find((item) => {
          const subRoute = item.path.substring(item.path.lastIndexOf('/') + 1) // 所有路由
          return subRoute === menu.path
        })
        if (!firstRoute) firstRoute = first
        routes.push(first!)
      }
    }
  }

  _resourceGetRoute(menuList)

  return routes
}
// 根据路由路劲匹配对应的面包屑 path -> 系统总览 no -> /overview
export function mapPathToBreadcrumb(menuList: any, path: string): IBreadcrumbType[] {
  const breadcrumb: IBreadcrumbType[] = []

  const _resourcePathToMenu = (
    menuList: any,
    name: string,
    breadcrumb?: IBreadcrumbType[]
  ) => {
    for (const menu of menuList ?? []) {
      if (menu.authName === name) {
        return menu
      }
      const childMenu = _resourcePathToMenu(menu.children ?? [], name)
      if (childMenu) {
        breadcrumb!.push({ title: menu.authName }, { title: childMenu.authName })
        return
      }
    }
  }

  _resourcePathToMenu(menuList, path, breadcrumb)
  return breadcrumb
}

export { firstRoute }
