<template>
  <div class="handle-goods">
    <n-card class="top box">
      <n-alert title="手写的从前" type="info">
        青春属于表白，阳光属于窗台，而我想我属于一个拥有你的未来
      </n-alert>
    </n-card>
    <n-card title="认真填写商品身份证" class="content box">
      <n-grid x-gap="12" :cols="2">
        <n-gi>
          <n-card title="还是填点名称什么吧(Info)">
            <goods-info ref="infoRef" :goods-info="defaultInfo.goodsInfo" />
          </n-card>
        </n-gi>
        <n-gi>
          <n-space vertical class="space-box">
            <n-card title="其实我可以有很多面(Image)">
              <goods-image ref="imageRef" :image-info="defaultInfo.goodsImages" />
            </n-card>
            <n-card title="让别人更具体的了解(Description)">
              <goods-description
                v-if="defaultInfo.isFlag"
                ref="descriptionRef"
                :default-value="defaultInfo.goodsDescription"
              />
            </n-card>
          </n-space>
        </n-gi>
      </n-grid>
      <n-button class="submit" type="success" size="large" @click="submit"
        >上传商品</n-button
      >
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from 'vue'
import router from '@/router'

import GoodsInfo from '@/views/main/commodity/goods/children/cpn/GoodsInfo.vue'
import GoodsImage from '@/views/main/commodity/goods/children/cpn/GoodsImage.vue'
import GoodsDescription from '@/views/main/commodity/goods/children/cpn/GoodsDescription.vue'

import { useMain } from '@/store/main'
import { showMessage } from '@/hook/useShowMessage'
import { useRoute } from 'vue-router'

import { IMeta } from '@/service/type'

export default defineComponent({
  name: 'HandleGoods',
  components: { GoodsDescription, GoodsImage, GoodsInfo },
  setup() {
    const mainStore = useMain()
    const route = useRoute()
    const defaultInfo = reactive<{
      isFlag: boolean
      goodsInfo: any
      goodsImages: any[]
      goodsDescription: string
    }>({
      // 修改的默认值回显
      isFlag: false, // 富文本需要等到数据回来之后才进行渲染，否则没有不显示默认值
      goodsInfo: {},
      goodsImages: [],
      goodsDescription: ''
    })
    mainStore.pageName = 'goods'
    const infoRef = ref<InstanceType<typeof GoodsInfo>>()
    const imageRef = ref<InstanceType<typeof GoodsImage>>()
    const descriptionRef = ref<InstanceType<typeof GoodsDescription>>()
    onMounted(async () => {
      if (route.query.goods_id) {
        const data: any = await mainStore.handleDataByIdNoList(
          'goods',
          Number(route.query.goods_id)
        )
        defaultInfo.goodsInfo = {
          goods_name: data.goods_name,
          goods_price: data.goods_price + '',
          goods_weight: data.goods_weight + '',
          goods_number: data.goods_number + '',
          goods_cat: Number(data.goods_cat.split(',')[2])
        }
        defaultInfo.goodsImages = data.pics
        defaultInfo.goodsDescription = data.goods_introduce
        defaultInfo.isFlag = true
      } else {
        defaultInfo.goodsInfo = {}
        defaultInfo.goodsImages = []
        defaultInfo.goodsDescription = ''
        defaultInfo.isFlag = true
      }
    })
    const submit = () => {
      infoRef.value?.lyForm?.formRef?.validate(async (valid) => {
        if (valid !== undefined) return false
        // 寻找分类的父id
        const cateObj: any = await mainStore.handleDataByIdNoList(
          'categories',
          mainStore.cat_pid === 0
            ? defaultInfo.goodsInfo.goods_cat
            : mainStore.cat_pid
        )
        const picsImg = imageRef.value?.fileList.map((item: any) => ({
          pic: item.id
        }))
        // 处理图片上传 -> 服务器请求的图片需要用原始路劲 pics_sma...
        const filterImage = (fileList: any[], imgList: any[]) => {
          fileList.forEach((item, index) => {
            imgList.forEach((img) => {
              if (item.pic === img.pics_sma) {
                fileList[index] = { ...img }
              }
            })
          })
          return fileList
        }
        // 汇总数据
        const collect = {
          ...infoRef.value?.formData,
          goods_cat: [
            cateObj.cat_pid,
            cateObj.cat_id,
            infoRef.value?.formData.goods_cat
          ].join(','),
          pics: filterImage(picsImg, defaultInfo.goodsImages),
          goods_introduce: descriptionRef.value?.introduct
        }

        let meta: any = undefined
        try {
          if (route.query.goods_id) {
            meta = await mainStore.handleEditData({
              ...collect,
              id: route.query.goods_id
            })
          } else {
            meta = await mainStore.handleAddData(collect)
          }
        } catch (e) {
          showMessage({ status: 500, msg: '发生了未知的错误, 检查下网络吧...' })
          await router.push('/goods')
        }
        showMessage(meta as IMeta)
        await router.push('/goods')
      })
    }
    return {
      infoRef,
      imageRef,
      descriptionRef,
      defaultInfo,
      submit
    }
  }
})
</script>

<style scoped lang="less">
.submit {
  margin: 10px auto;
  display: block;
  width: 100px;
}
.box {
  margin-top: 10px;
}
.space-box {
  height: 100%;
  :deep(.n-card) {
    height: 100%;
  }
}
:deep(.n-space) {
  > div {
    height: 100%;
  }
}
</style>
