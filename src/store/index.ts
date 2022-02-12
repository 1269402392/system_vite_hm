import { defineStore } from 'pinia'
import { handleGetRequest } from '@/service/request'
import { ICategory, IRightsType, IRolesType } from '@/store/type'

export const useStore = defineStore('store', {
  state: () => {
    return {
      roleList: [] as IRolesType[], // 角色列表
      rightList: [] as IRightsType[], // 所有权限列表 tree
      categoryList: [] as ICategory[], // 所有分类参数(大家电)
      categories: [] as ICategory[] // 所有分类参数 type === 2
    }
  },
  actions: {
    async getRoleList() {
      const { data } = await handleGetRequest('roles')
      this.roleList = data
    },
    async getRightList() {
      const { data } = await handleGetRequest('rights/tree')
      this.rightList = data
    },
    async getCategoryList() {
      const { data } = await handleGetRequest('categories')
      this.categoryList = data
    },
    async getCategoriesTwo() {
      const { data } = await handleGetRequest('categories?type=2')
      this.categories = data
    }
  }
})
