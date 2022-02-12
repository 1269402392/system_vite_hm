import { ISearchType } from '@/components/page-search/type'

export const searchConfig: ISearchType = {
  title: '《爷爷泡的茶》 周杰伦',
  form: {
    formItems: [
      {
        label: '查询参数',
        filed: 'query',
        type: 'text',
        placeholder: '请输入查询参数',
        isDisabled: true
      },
      {
        label: '用户ID',
        filed: 'user_id',
        type: 'text',
        placeholder: '请输入用户ID'
      },
      {
        label: '支付状态',
        filed: 'pay_status',
        type: 'select',
        options: [
          {
            label: '已支付',
            value: '0'
          },
          {
            label: '未支付',
            value: '1'
          }
        ],
        placeholder: '请选择支付状态'
      },
      {
        label: '发票类型',
        filed: 'order_fapiao_title',
        type: 'select',
        isDisabled: true,
        options: [
          {
            label: '个人',
            value: '个人'
          },
          {
            label: '公司',
            value: '公司'
          }
        ],
        placeholder: '请选择发票类型'
      }
    ]
  }
}
