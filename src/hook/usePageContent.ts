import { showMessage } from '@/hook/useShowMessage'
import { handleDeleteRequest } from '@/service/request'
import { ref } from 'vue'
import LyTable from '@/components/ly-table/src/LyTable.vue'
/**
 * 批量删除的方法
 */
export function usePageContent(mainStore: any) {
  const tableRef = ref<InstanceType<typeof LyTable>>()

  const batchClick = async () => {
    if (tableRef.value!.checkKeys.length <= 0) {
      return showMessage({ status: 500, msg: '都没选,删个锤子???' })
    }
    const resultList = tableRef.value?.checkKeys.map(async (id: number) => {
      const { meta } = await handleDeleteRequest(`${mainStore.pageName}/${id}`)
      return meta
    })
    showMessage(await resultList![0])
    mainStore.getDataList(mainStore.pageInfo)
  }
  // 取消批量删除
  const cancelBatch = () => {
    showMessage({ status: 200, msg: '这可能是你唯一的正确选择' })
  }
  return { tableRef, batchClick, cancelBatch }
}
