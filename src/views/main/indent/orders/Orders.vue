<template>
  <div class="orders">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    />
    <page-content
      ref="contentRef"
      page-name="users"
      :content-config="contentConfigRef"
    />
    <page-model
      ref="modelRef"
      :default-value="defaultValue"
      :model-config="modelConfig"
      @handle-model-update="handleModelUpdate"
      @handle-model-leave="handleModelLeave"
    />
    <orders-info ref="orderInfoRef" :order-id="defaultValue.order_id ?? -1" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, ref } from 'vue'
import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'
import { contentConfig } from './config/content-config'
import { searchConfig } from './config/search-config'
import { modelConfig } from './config/model-config'
import { useReqContent } from '@/hook/useReqContent'
import { usePageModel } from '@/hook/usePageModel'
import { usePageSearch } from '@/hook/usePageSearch'
import { useOrders } from './hook/useOrders'
import PageModel from '@/components/page-model/src/PageModel.vue'
import OrdersInfo from '@/views/main/indent/orders/children/OrdersInfo.vue'
export default defineComponent({
  name: 'Orders',
  components: { OrdersInfo, PageModel, PageContent, PageSearch },
  setup() {
    const firstOnload = ref(true)
    const { mainStore, useUpdateData } = usePageModel()
    const { contentRef, handleQuery, handleReset } = usePageSearch()
    mainStore.pageName = 'orders'

    onActivated(() => {
      if (!firstOnload.value) {
        useReqContent('orders', contentRef.value, mainStore) // 重新请求第一页的数据
      } else {
        firstOnload.value = false
      }
    })
    const { modelRef, orderInfoRef, defaultValue, ordersHandleVNode } = useOrders()
    // 给表格添加 修改按钮以及删除按钮 -> render渲染
    const contentConfigRef = computed(() => {
      contentConfig.table.columns.some((item: any) => {
        if (item.key === 'handle') {
          item.render = (row: any) => [...ordersHandleVNode(row)]
          return true
        }
      })
      return contentConfig
    })
    const handleModelUpdate = (formValue: any) => {
      formValue.id = formValue.order_id
      useUpdateData(formValue)
    }
    const handleModelLeave = () => {
      defaultValue.value = {}
    }
    return {
      modelRef,
      contentRef,
      defaultValue,
      orderInfoRef,
      contentConfigRef,
      searchConfig,
      modelConfig,
      handleModelLeave,
      handleQuery,
      handleReset,
      handleModelUpdate
    }
  }
})
</script>

<style scoped></style>
