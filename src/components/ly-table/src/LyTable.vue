<template>
  <div class="ly-table">
    <n-data-table
      ref="table"
      remote
      :columns="columns"
      :data="data"
      :loading="loading"
      :children-key="isChildren ? 'children' : 'null'"
      :row-key="
        (row) => row.id || row.goods_id || row.attr_id || row.cat_id || row.order_id
      "
      :pagination="isPagination ? pagination : false"
      :on-update:page="updatePage"
      :on-update:checked-row-keys="checkedUpdate"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, PropType, ref, watchEffect } from 'vue'
import { useMain } from '@/store/main'
import { DataTableColumn } from 'naive-ui'
export interface IPageInfo {
  pagenum: number
  pagesize: number
}
export default defineComponent({
  name: 'LyTable',
  props: {
    data: {
      type: Object,
      required: true
    },
    // 是否展示children数据 树状表格
    isChildren: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array as PropType<DataTableColumn[]>,
      required: true
    },
    isPagination: {
      type: Boolean,
      default: true
    },
    // 默认分页
    pageInfo: {
      type: Object as PropType<IPageInfo>,
      default: () => ({
        pagenum: 1,
        pagesize: 5
      })
    }
  },
  emits: ['handleCurrentPage'],
  setup(props, { emit }) {
    const mainStore = useMain()
    const pagination = ref({}) // 分页信息
    watchEffect(() => {
      pagination.value = {
        page: props.pageInfo?.pagenum,
        itemCount: computed(() => mainStore.dataTotal),
        pageSize: props.pageInfo?.pagesize
      }
    })
    const updatePage = (value: number) => {
      emit('handleCurrentPage', value)
    }
    const checkKeys = ref<Array<number>>([])
    const checkedUpdate = (keys: Array<number>) => {
      checkKeys.value = keys
    }
    return {
      pagination,
      checkKeys,
      updatePage,
      checkedUpdate
    }
  }
})
</script>

<style scoped lang="less">
.ly-table {
  background: white;
  padding: 15px;
}
:deep(.n-data-table .n-data-table-expand-trigger) {
  //transform: translate(-30px, 0px);
}
</style>
