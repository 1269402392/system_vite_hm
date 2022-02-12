import { ref } from 'vue'
import PageContent from '@/components/page-content'
import { useMain } from '@/store/main'
import { showMessage } from '@/hook/useShowMessage'

/**
 * 搜索hook
 * handleQuery 查询 handleReset 重置
 */
export function usePageSearch(searchRef?: any) {
  const contentRef = ref<InstanceType<typeof PageContent>>()
  // 搜索
  const handleQuery = async (query: any) => {
    const mainStore = useMain()
    // 根据id查询 (暂时有角色、商品)
    if (
      Object.keys(query).includes('id') ||
      (query.goods_id && Object.keys(query).includes('goods_id'))
    ) {
      showMessage(await mainStore.handleDataById(query.id ?? query.goods_id))
      return
    }

    contentRef.value!.pageInfo.pagenum = 1
    let copyQuery: any = {}
    if (query.username) {
      copyQuery.query = query.username
    } else if (query.goods_name) {
      copyQuery.query = query.goods_name
    } else {
      copyQuery = { ...query }
    }
    // 分页拿不到搜索条件
    mainStore.query = copyQuery
    contentRef.value?.getDataList(copyQuery)
  }
  const handleReset = () => {
    contentRef.value?.getDataList()
  }
  return { contentRef, handleQuery, handleReset }
}
