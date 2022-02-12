import { IContentType } from '@/components/page-content/type'
import { h } from 'vue'
import { NButton, NGradientText, NSwitch } from 'naive-ui'
import { formatDate } from '@/utils/format-date'

export const contentConfig: IContentType = {
  title: '用户',
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
            { default: () => '用户名' }
          )
        },
        align: 'center',
        key: 'username'
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
        key: 'role_name'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'success'
            },
            { default: () => '状态' }
          )
        },
        align: 'center',
        key: 'mg_state'
      },
      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'warning'
            },
            { default: () => '手机号' }
          )
        },
        align: 'center',
        key: 'mobile'
      },

      {
        title() {
          return h(
            NGradientText,
            {
              size: '14',
              type: 'info'
            },
            { default: () => '邮箱' }
          )
        },
        align: 'center',
        key: 'email'
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
