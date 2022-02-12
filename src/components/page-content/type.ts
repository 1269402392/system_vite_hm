import { ITableType } from '@/components/ly-table/type'

export interface IContentType {
  title?: string
  other?: IOtherType
  table: ITableType
}
interface IOtherType {
  isBatch?: boolean // 是否显示批量删除
  isInsert?: boolean // 是否显示添加按钮
  isBatchDisabled?: boolean // 是否显示禁用批量删除按钮
  isInsertDisabled?: boolean // 是否禁用添加按钮
}
