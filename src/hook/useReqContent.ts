/**
 * 重新请求表格数据, 公用(users, roles...)
 * @param pageName
 * @param contentRef
 * @param mainStore
 */
export function useReqContent(pageName: string, contentRef: any, mainStore: any) {
  mainStore.pageName = pageName
  mainStore.pageInfo.pagenum = 1
  contentRef?.getDataList()
}
