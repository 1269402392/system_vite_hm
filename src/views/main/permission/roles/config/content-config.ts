import { IContentType } from '@/components/page-content/type'
import { h } from 'vue'
import { NGradientText } from 'naive-ui'

export const contentConfig: IContentType = {
  title: '用户',
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
          return `${rowData.roleName} -> 别看了, 这里不想写, 我与死亡同行`
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
        key: 'id'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'info'
            },
            { default: () => '角色名' }
          )
        },
        align: 'center',
        key: 'roleName'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '角色描述' }
          )
        },
        align: 'center',
        key: 'roleDesc'
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
