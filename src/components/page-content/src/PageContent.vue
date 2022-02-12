<template>
  <div class="page-content">
    <base-header
      :add-click="addClick"
      :batch-click="batchClick"
      :cancel-batch="cancelBatch"
      :title="contentConfig.title"
      v-bind="contentConfig.other"
    />
    <ly-table
      ref="tableRef"
      :loading="loading"
      :data="data"
      v-bind="contentConfig.table"
      :page-info="pageInfo"
      @handle-current-page="handleCurrentPage"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watch } from 'vue'
import LyTable from '@/components/ly-table/src/LyTable.vue'
import BaseHeader from '@/components/base-header'

import { IContentType } from '@/components/page-content/type'
import { useMain } from '@/store/main'
import { usePageContent } from '@/hook/usePageContent'

export default defineComponent({
  name: 'PageContent',
  components: { BaseHeader, LyTable },
  props: {
    contentConfig: {
      type: Object as PropType<IContentType>,
      required: true
    }
  },
  emits: ['handleInsert'],
  setup(props, { emit }) {
    // 是否显示Loading
    const isLoading = ref(props.contentConfig.table.isLoading)
    const mainStore = useMain()
    const loading = ref(true)

    const pageInfo = computed(() => mainStore.pageInfo)

    watch(
      () => pageInfo,
      () => {
        // console.log('yes')
        getDataList(mainStore.query)
      },
      {
        deep: true
      }
    )
    const getDataList = (query: any = undefined) => {
      isLoading.value ? (loading.value = true) : (loading.value = false)
      // 查询参数是否带上分页
      const payload = props.contentConfig.table.isPagination
        ? { ...pageInfo.value, ...query }
        : {}
      mainStore.getDataList(payload).then(() => {
        loading.value = false
      })
    }
    getDataList()

    const data = computed(() => mainStore.dataList)
    // 改变当前页数
    const handleCurrentPage = (value: number) => {
      mainStore.pageInfo.pagenum = value
    }

    const addClick = () => {
      emit('handleInsert')
    }

    const { tableRef, batchClick, cancelBatch } = usePageContent(mainStore)

    return {
      data,
      pageInfo,
      loading,
      tableRef,
      getDataList,
      handleCurrentPage,
      addClick,
      batchClick,
      cancelBatch
    }
  }
})
</script>

<style scoped lang="less">
.page-content {
  background: white;
  margin-top: 10px;
}
</style>
