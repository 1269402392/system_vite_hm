<template>
  <div class="goods-image">
    <n-upload
      :file-list="fileList"
      list-type="image"
      :default-upload="false"
      @change="handleFileListChange"
    >
      <n-upload-dragger>
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <archive-icon />
          </n-icon>
        </div>
        <n-text style="font-size: 16px">点击或者拖动文件到该区域来上传</n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
    </n-upload>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { ArchiveOutline as ArchiveIcon } from '@vicons/ionicons5'
import { useMessage } from 'naive-ui'
import { handlePostRequest } from '@/service/request'
export default defineComponent({
  name: 'GoodsImage',
  components: { ArchiveIcon },
  props: {
    imageInfo: {
      type: Array,
      default: () => []
    }
  },
  setup(props) {
    const message = useMessage()
    const fileList: any = ref([])
    watch(
      () => props.imageInfo,
      (newValue) => {
        fileList.value = newValue?.map((image: any) => ({
          id: image.pics_sma,
          name: image.pics_id,
          url: image.pics_sma_url,
          status: 'finished'
        }))
      }
    )
    const handleFileListChange = ({ file }: { file: any }) => {
      const formData = new FormData()
      if (!file.file) {
        // 删除图片
        fileList.value = fileList.value.filter(
          (item: any) => item.name !== file.name
        )
        message.info('干嘛要删掉?, 服务器又不是装不下')
        return
      }
      formData.append('file', file.file)
      handlePostRequest('upload', formData).then(({ data }) => {
        fileList.value.push({
          id: data.tmp_path,
          name: file.name,
          url: data.url,
          status: 'finished'
        })
        message.success('让我们恭喜没有出BUG, 上传成功!')
      })
    }
    return { fileList, handleFileListChange }
  }
})
</script>

<style scoped lang="less">
:deep(.n-upload-trigger) {
  width: 100%;
}
:deep(.n-upload-file-list
    .n-upload-file.n-upload-file--image-type
    .n-upload-file-info
    .n-upload-file-info__thumbnail) {
  width: 50px;
  height: 50px;
}
</style>
