import { h } from 'vue'
import { NGradientText, NTag } from 'naive-ui'
import { formatDate } from '@/utils/format-date'
import { IContentType } from '@/components/page-content/type'

export const contentConfig: IContentType = {
  title: '订单',
  other: {
    isBatch: false, // 不现实批量删除
    isInsert: false // 不现实添加按钮
  },
  table: {
    isPagination: true,
    columns: [
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '订单ID' }
          )
        },
        align: 'center',
        key: 'order_id'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '用户ID' }
          )
        },
        align: 'center',
        key: 'user_id'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'info'
            },
            { default: () => '订单价格' }
          )
        },
        align: 'center',
        key: 'order_price',
        render(row) {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => row.order_price }
          )
        }
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'info'
            },
            { default: () => '付款方式' }
          )
        },
        align: 'center',
        key: 'order_pay',
        render(row) {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'error'
            },
            {
              default: () =>
                row.order_pay === '0'
                  ? `未支付`
                  : row.order_pay === '1'
                  ? `支付宝`
                  : row.order_pay === '2'
                  ? `微信`
                  : `银行卡`
            }
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
            { default: () => '是否付款' }
          )
        },
        align: 'center',
        key: 'pay_status',
        render: (row) =>
          h(
            NTag,
            { type: row.pay_status === '0' ? 'error' : 'info' },
            { default: () => (row.pay_status === '0' ? '未付款' : '已付款') }
          )
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'error'
            },
            { default: () => '是否发货' }
          )
        },
        align: 'center',
        key: 'is_send'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '发票类别' }
          )
        },
        align: 'center',
        key: 'order_fapiao_title',
        render: (row) =>
          h(NTag, { type: 'info' }, { default: () => `${row.order_fapiao_title}` })
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '创建时间' }
          )
        },
        align: 'center',
        key: 'create_time',
        render: (row) =>
          h('strong', {}, { default: () => formatDate(Number(row.create_time)) })
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
