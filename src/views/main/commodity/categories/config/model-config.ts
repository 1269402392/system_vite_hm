import { IModelType } from '@/components/page-model/type'

export const modelConfig: IModelType = {
  title: '添加商品分类',
  isTree: false,
  form: {
    gridCols: 1,
    formItems: [
      {
        label: 'id',
        filed: 'id',
        type: 'text',
        isShow: true
      },
      {
        label: '商品分类名称',
        filed: 'cat_name',
        type: 'text',
        placeholder: '请输入商品分类名称'
      },
      {
        label: '选择父级分类',
        filed: 'cat_id',
        type: 'cascader',
        placeholder: '请选择父级分类',
        cOption: [],
        isAll: true,
        isDisabled: false // true为禁用
      }
    ]
  }
}
