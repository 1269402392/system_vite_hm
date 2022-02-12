import { IModelType } from '@/components/page-model/type'

export const modelConfig: IModelType = {
  title: '修改订单信息',
  form: {
    gridCols: 1,
    formItems: [
      {
        label: 'id',
        filed: 'order_id',
        type: 'text',
        isShow: true
      },
      {
        label: '订单价格',
        filed: 'order_price',
        type: 'text',
        placeholder: '请输入订单价格'
      },
      {
        label: '是否发货',
        filed: 'is_send',
        type: 'select',
        options: [
          { label: '是', value: '1' },
          { label: '否', value: '0' }
        ]
      },
      {
        label: '支付方式',
        filed: 'order_pay',
        type: 'select',
        options: [
          { label: '未支付', value: '0' },
          { label: '支付宝', value: '1' },
          { label: '微信', value: '2' },
          { label: '银行卡', value: '3' }
        ]
      },
      {
        label: '订单状态',
        filed: 'pay_status',
        type: 'select',
        options: [
          { label: '未付款', value: '0' },
          { label: '已付款', value: '1' }
        ],
        isDisabled: true
      }
    ]
  }
}
