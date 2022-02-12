import { defineStore } from 'pinia'
import { handleEcharsGetRequest } from '@/service/echars'
import { IProductType, IRankType, ITrendType } from '@/store/datadir/type'

export const useDataDir = defineStore('datadir', {
  state: () => {
    return {
      trendData: {} as ITrendType,
      productData: [] as IProductType[],
      rankData: [] as IRankType[]
    }
  },
  actions: {
    async getTrendData() {
      this.trendData = await handleEcharsGetRequest(`trend`)
      this.productData = await handleEcharsGetRequest('hotproduct')
      this.rankData = await handleEcharsGetRequest('rank')
    }
  }
})
