<template>
  <div class="goods-description">
    <!-- <n-input v-model:value="value" type="textarea" placeholder="填点东西吧..." /> -->
    <div style="border: 1px solid #ccc">
      <Toolbar
        :editor-id="editorId"
        :mode="mode"
        style="border-bottom: 1px solid #ccc"
      />
      <Editor
        :editor-id="editorId"
        :default-config="editorConfig"
        :default-html="defaultValue"
        :mode="mode"
        style="height: 300px"
        @on-change="handleChange"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, ref } from 'vue'
import { Editor, Toolbar, getEditor, removeEditor } from '@wangeditor/editor-for-vue'
import * as _ from 'lodash'
export default defineComponent({
  name: 'GoodsDescription',
  components: { Editor, Toolbar },
  props: {
    defaultValue: {
      type: String,
      default: '一行文字'
    }
  },
  setup(props) {
    const editorId = `quanjuweiyi` //编辑器 id ，要全局唯一
    const introduct = ref('')

    const editorConfig = { placeholder: '请输入内容...' }

    // 组件销毁时，也及时销毁编辑器
    onBeforeUnmount(() => {
      const editor = getEditor(editorId)
      if (editor === null) return
      editor.destroy()
      removeEditor(editorId)
    })
    const handleChange = () => {
      const editor = getEditor(editorId)
      introduct.value = editor!.getHtml().toString()
    }

    return {
      editorId,
      introduct,
      mode: 'default',
      editorConfig,
      handleChange
    }
  }
})
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
<style scoped lang="less">
.goods-description {
  height: 100%;
  .n-input--textarea {
    height: 100%;
  }
}
</style>
