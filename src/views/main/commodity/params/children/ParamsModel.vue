<template>
  <div class="params-model">
    <n-modal v-model:show="showModal">
      <n-card
        style="width: 600px"
        title="属性值（attr_Vals）"
        :bordered="false"
        size="huge"
        role="dialog"
        aria-modal="true"
      >
        <template #header-extra> 你猜怎么关闭? </template>
        <n-dynamic-tags v-model:value="attr_vals" type="success">
          <template #trigger="{ activate, disabled }">
            <n-button
              size="small"
              type="primary"
              dashed
              :disabled="disabled"
              @click="activate()"
            >
              <template #icon>
                <n-icon> <add /></n-icon>
              </template>
              添加
            </n-button>
          </template>
        </n-dynamic-tags>
        <template #footer> 除了我随便点击别的地方就关闭啦 </template>
      </n-card>
    </n-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import Add from '@vicons/ionicons5/Add'
export default defineComponent({
  name: 'ParamsModel',
  components: { Add },
  emits: ['handleParams'],
  setup(props, { emit }) {
    const showModal = ref(false)
    const attr_vals = ref([]) // 存储原始数据
    const tags = ref([]) // 新添加的数据
    watch(
      () => attr_vals,
      (newValue) => {
        emit('handleParams', newValue.value.join(','))
      },
      { deep: true }
    )
    return {
      tags,
      attr_vals,
      showModal
    }
  }
})
</script>

<style scoped lang="less"></style>
