import { IFormType } from '@/components/ly-form/type'

export const infoConfig: IFormType = {
  gridCols: 1,
  formItems: [
    {
      label: '商品名称',
      filed: 'goods_name',
      type: 'text',
      placeholder: '请输入商品名称'
    },
    {
      label: '商品价格',
      filed: 'goods_price',
      type: 'text',
      placeholder: '请输入商品价格'
    },
    {
      label: '商品重量',
      filed: 'goods_weight',
      type: 'text',
      placeholder: '请输入商品重量'
    },
    {
      label: '商品数量',
      filed: 'goods_number',
      type: 'text',
      placeholder: '请输入商品数量'
    },
    {
      label: '所属分类',
      filed: 'goods_cat',
      type: 'cascader',
      cOption: []
    }
  ]
}
