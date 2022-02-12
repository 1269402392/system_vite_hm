<template>
  <div class="header">
    <div class="left">
      <h3>{{ title + '列表' }}</h3>
    </div>
    <div class="right">
      <n-popconfirm
        v-if="isBatch"
        @positive-click="batchClick"
        @negative-click="cancelBatch"
      >
        <template #trigger>
          <n-button
            :disabled="isBatchDisabled"
            strong
            secondary
            size="medium"
            type="error"
          >
            <template #icon>
              <n-icon><close-outline /></n-icon>
            </template>
            <strong>批量删除</strong>
          </n-button>
        </template>
        这个有点类似删库跑路? 请三思
      </n-popconfirm>

      <n-button
        v-if="isInsert"
        :disabled="isInsertDisabled"
        strong
        secondary
        size="medium"
        type="info"
        @click="addClick"
      >
        <template #icon>
          <n-icon><medical-outline /></n-icon>
        </template>
        <strong>新增{{ title }}</strong>
      </n-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { CloseOutline, MedicalOutline } from '@vicons/ionicons5'
export default defineComponent({
  name: 'BaseHeader',
  components: { CloseOutline, MedicalOutline },
  props: {
    title: {
      type: String,
      required: true
    },
    batchClick: {
      type: Function,
      required: true
    },
    cancelBatch: {
      type: Function,
      required: true
    },
    addClick: {
      type: Function,
      required: true
    },
    isBatch: {
      type: Boolean,
      default: true
    },
    isInsert: {
      type: Boolean,
      default: true
    },
    isBatchDisabled: {
      type: Boolean,
      default: false
    },
    isInsertDisabled: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px 0 15px;
  box-sizing: border-box;
  .right {
    :deep(.n-button) {
      margin-left: 8px;
    }
  }
}
</style>
