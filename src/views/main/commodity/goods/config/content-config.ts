import { IContentType } from '@/components/page-content/type'
import { h } from 'vue'
import { NGradientText, NTag } from 'naive-ui'
import { formatDate } from '@/utils/format-date'

export const contentConfig: IContentType = {
  title: '商品',
  table: {
    isPagination: true,
    isLoading: true,
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
        key: 'goods_id'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'info'
            },
            { default: () => '商品名称' }
          )
        },
        align: 'center',
        key: 'goods_name',
        width: 100,
        ellipsis: {
          tooltip: true
        }
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'error'
            },
            { default: () => '价格' }
          )
        },
        align: 'center',
        key: 'goods_price',
        render: (row) =>
          h(
            NGradientText,
            { type: 'info' },
            {
              default: () => h('strong', {}, { default: () => row.goods_price })
            }
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
            { default: () => '数量' }
          )
        },
        align: 'center',
        key: 'goods_number'
      },

      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '添加时间' }
          )
        },
        align: 'center',
        key: 'add_time',
        render: (row) =>
          h(
            'strong',
            {},
            { default: () => formatDate(Number(row.add_time), 'YYYY-MM-DD') }
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
            { default: () => '更新时间' }
          )
        },
        align: 'center',
        key: 'upd_time',
        render: (row) =>
          h(
            'strong',
            {},
            { default: () => formatDate(Number(row.add_time), 'YYYY-MM-DD') }
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
            { default: () => '是否热销' }
          )
        },
        align: 'center',
        key: 'is_promote',
        render: (row) =>
          h(NTag, { type: 'info' }, { default: () => row.is_promote + '' })
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
        align: 'center',
        key: 'handle'
      }
    ]
  }
}
