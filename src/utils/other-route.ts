import { RouteRecordRaw } from 'vue-router'

export const dashboard = {
  id: 782,
  authName: '系统总览',
  path: 'dashboard',
  order: 1,
  children: [
    {
      authName: '一览无余',
      children: [],
      id: 654,
      order: null,
      path: 'overview'
    }
  ]
}
export const handleGoods = {
  authName: '商品操作',
  children: [],
  id: 951,
  order: null,
  path: 'handleGoods'
}
