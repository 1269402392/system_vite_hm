import { DataTableColumn } from 'naive-ui'

export interface ITableType {
  columns: DataTableColumn[]
  isLoading?: boolean
  isChildren?: boolean //是否展示children数据
  isPagination?: boolean // 是否显示分页
}
