import { IContentType } from '@/components/page-content/type'
import { h } from 'vue'
import { NGradientText } from 'naive-ui'

export const contentConfig: IContentType = {
  title: '参数',
  other: {
    isBatchDisabled: true,
    isInsertDisabled: true
  },
  table: {
    isPagination: false,
    isLoading: true,
    columns: [
      {
        type: 'selection'
      },
      {
        type: 'expand',
        renderExpand: (rowData) => {
          return `本来修改参数属性值是写在这里的, 奈何实力不允许, 唉`
        }
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'warning'
            },
            { default: () => 'ID' }
          )
        },
        align: 'center',
        key: 'attr_id'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '参数名称' }
          )
        },
        align: 'center',
        key: 'attr_name'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'info'
            },
            { default: () => '属性类型' }
          )
        },
        align: 'center',
        key: 'attr_sel'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'error'
            },
            { default: () => '操作' }
          )
        },
        key: 'handle',
        align: 'center'
      }
    ]
  }
}
