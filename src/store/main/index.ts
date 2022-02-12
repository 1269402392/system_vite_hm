import { defineStore } from 'pinia'
import { IBreadcrumbType } from '@/components/nav-breadcrumb/type'
import { ITitleTagType } from '@/components/title-tag/type'
import { cache } from '@/utils/cache'
import {
  handleDeleteRequest,
  handleGetNoLoading,
  handleGetRequest,
  handlePostRequest,
  handlePutRequest
} from '@/service/request'
import { IAddDataType } from '@/store/type'
import { IMeta } from '@/service/type'

const useMain = defineStore('main', {
  state: () => {
    return {
      menuKey: 0, //菜单id
      authName: '', //菜单名
      breadcrumb: [] as IBreadcrumbType[],
      titleTag: [] as ITitleTagType[],
      dataList: [] as any[],
      dataTotal: 0,
      pageInfo: {
        pagenum: 1,
        pagesize: 4
      },
      pageName: '', // 当前页面的标识 user || goods || roles
      cat_pid: 0, // 存储添加/修改商品时的分类pid
      cat_id: 0, // 分类参数需要
      query: undefined // 查询参数, 提供分页
    }
  },
  actions: {
    addTitleTag(value: ITitleTagType) {
      if (!this.titleTag.find((item) => item.title === value.title)) {
        this.titleTag.push(value)
        cache.setCache('titleTag', this.titleTag)
      }
    },
    removeTitleTag(value: ITitleTagType) {
      this.titleTag = this.titleTag.filter((item) => item.title !== value.title)
      cache.setCache('titleTag', this.titleTag)
    },
    // payload -> pagenum and pagesize cannot be null
    async getDataList(payload?: any) {
      const { data } = await handleGetRequest(`${this.pageName}`, payload)
      // console.log(data)
      switch (this.pageName) {
        case 'roles':
          this.dataList = data || []
          break
        case 'goods':
          this.dataList = data?.goods
          this.dataTotal = data?.total
          break
        case 'users':
          this.dataList = data?.users
          this.dataTotal = data?.total
          break
        case 'categories':
          this.dataList = data?.result
          this.dataTotal = data?.total
          break
        case 'orders':
          this.dataList = data?.goods
          this.dataTotal = data?.total
          break
        default:
          break
      }
    },
    async searchOrderData(payload: any) {
      const { data } = await handleGetRequest(`${this.pageName}`, {
        ...this.pageInfo,
        ...payload
      })
      this.dataList = data.goods
      this.dataTotal = data.total
    },
    // 修改用户状态
    async handleUserState(id: number, state: boolean): Promise<IMeta> {
      const { meta } = await handlePutRequest(`users/${id}/state/${state}`)
      return meta
    },
    async handleDeleteData(id: number): Promise<IMeta> {
      const { meta } = await handleDeleteRequest(`${this.pageName}/${id}`)
      this.getDataList(this.pageInfo)
      return meta
    },
    async handleAddData(data: IAddDataType): Promise<IMeta> {
      const { meta } = await handlePostRequest(`${this.pageName}`, data)
      if (this.pageName !== 'goods') {
        this.getDataList(this.pageInfo)
      }
      return meta
    },
    async handleEditData(data: IAddDataType): Promise<IMeta> {
      const { meta } = await handlePutRequest(`${this.pageName}/${data.id}`, data)
      this.getDataList(this.pageInfo)
      return meta
    },
    // 给角色分配权限
    async handleTreeToRids(id: number, rids: string) {
      const { meta } = await handlePostRequest(`roles/${id}/rights`, { rids })
      this.getDataList(this.pageInfo)
      return meta
    },
    // 给用户分配角色
    async handleUserToRole(id: number, rid: number) {
      const { meta } = await handlePutRequest(`users/${id}/role`, { rid })
      this.getDataList(this.pageInfo)
      return meta
    },
    // 根据id查询对象并添加到数组展示
    async handleDataById(id: number): Promise<IMeta> {
      const { data, meta } = await handleGetRequest(`${this.pageName}/${id}`)
      this.dataList = [{ ...data, id: data.roleId }]
      this.dataTotal = 1
      return meta
    },
    async handleDataByIdNoList(pageName: string, id: number): Promise<any> {
      const { data } = await handleGetNoLoading(`${pageName}/${id}`)
      return data
    }
  }
})

export { useMain }
