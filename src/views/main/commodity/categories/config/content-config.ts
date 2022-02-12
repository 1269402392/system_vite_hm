import { IContentType } from '@/components/page-content/type'
import { h } from 'vue'
import { NGradientText, NTag } from 'naive-ui'

export const contentConfig: IContentType = {
  title: '分类',
  table: {
    isPagination: true,
    isLoading: true,
    isChildren: true,
    columns: [
      {
        type: 'selection'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'error'
            },
            { default: () => 'Id' }
          )
        },
        align: 'center',
        key: 'cat_id'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'info'
            },
            { default: () => '分类名称' }
          )
        },
        align: 'center',
        key: 'cat_name'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'error'
            },
            { default: () => '分类父ID' }
          )
        },
        align: 'center',
        key: 'cat_pid',
        render: (row) =>
          h(
            NTag,
            {
              type:
                row.cat_level === 0
                  ? 'info'
                  : row.cat_level === 1
                  ? 'warning'
                  : 'default'
            },
            { default: () => row.cat_pid + '' }
          )
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'warning'
            },
            { default: () => '分类当前层级' }
          )
        },
        align: 'center',
        key: 'cat_level',
        render: (row) =>
          h(
            NTag,
            {
              type:
                row.cat_level === 0
                  ? 'info'
                  : row.cat_level === 1
                  ? 'warning'
                  : 'default'
            },
            {
              default: () => {
                if (Number(row.cat_level) === 0) {
                  return '一级分类'
                }
                if (Number(row.cat_level) === 1) {
                  return '二级分类'
                }
                return '三级分类'
              }
            }
          )
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
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
