import { ITableType } from '@/components/ly-table/type'
import { h } from 'vue'
import { NGradientText, NTag } from 'naive-ui'

export const contentConfig: ITableType = {
  isPagination: false,
  columns: [
    {
      title() {
        return h(
          NGradientText,
          {
            size: '14',
            type: 'success'
          },
          { default: () => '权限ID' }
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
          { default: () => '权限说明' }
        )
      },
      align: 'center',
      key: 'authName',
      render(row) {
        return h(
          NGradientText,
          {
            size: '14',
            type: 'success'
          },
          { default: () => row.authName }
        )
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
          { default: () => '权限层级' }
        )
      },
      align: 'center',
      key: 'level'
    },
    {
      title() {
        return h(
          NGradientText,
          {
            size: '14',
            type: 'error'
          },
          { default: () => '权限父 ID' }
        )
      },
      align: 'center',
      key: 'pid'
    },
    {
      title() {
        return h(
          NGradientText,
          {
            size: '14',
            type: 'success'
          },
          { default: () => '对应访问路劲' }
        )
      },
      align: 'center',
      key: 'path',
      render: (row) =>
        h(NTag, { type: 'info' }, { default: () => `url -> ${row.path}` })
    }
  ]
}
