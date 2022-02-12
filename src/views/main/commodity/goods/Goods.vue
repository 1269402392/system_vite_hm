<template>
  <div class="goods">
    <page-search
      :search-config="searchConfig"
      @handle-query="handleQuery"
      @handle-reset="handleReset"
    />
    <page-content
      ref="contentRef"
      :content-config="contentConfigRef"
      @handle-insert="handleInsert"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onActivated, ref } from 'vue'
import { searchConfig } from './config/search-config'
import { contentConfig } from './config/content-config'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import { useMain } from '@/store/main'
import { usePageSearch } from '@/hook/usePageSearch'
import { useReqContent } from '@/hook/useReqContent'
import { usePageModel } from '@/hook/usePageModel'
export default defineComponent({
  name: 'Goods',
  components: { PageSearch, PageContent },
  setup() {
    const firstOnload = ref(true)
    const mainStore = useMain()
    onActivated(() => {
      // 判断是否是首次加载页面
      if (!firstOnload.value) {
        useReqContent('goods', contentRef.value, mainStore) // 重新请求第一页的数据
      } else {
        firstOnload.value = false
      }
    })
    mainStore.pageName = 'goods'
    // search-hook
    const { contentRef, handleReset, handleQuery } = usePageSearch()

    // model-hook
    const { handleVNode, handleInsert } = usePageModel()

    const contentConfigRef = computed(() => {
      // 给表格添加 修改按钮以及删除按钮 -> render渲染
      contentConfig.table.columns.some((item: any) => {
        if (item.key === 'handle') {
          item.render = (row: any) => handleVNode(row)
        }
      })
      return contentConfig
    })

    return {
      contentRef,
      searchConfig,
      contentConfigRef,
      handleReset,
      handleQuery,
      handleInsert
    }
  }
})
</script>

<style scoped></style>
