<template>
  <n-card title="项目规范">
    <n-descriptions
      class="margin-top"
      title="Git规范"
      :column="3"
      size="small"
      bordered
      style="margin-top: 12px"
    >
      <template v-for="item in gitConfig" :key="item.label">
        <n-descriptions-item>
          <template #label>
            <div class="cell-item">
              {{ item.label }}
            </div>
          </template>
          <n-tag type="info">
            {{ item.value }}
          </n-tag>
        </n-descriptions-item>
      </template>
    </n-descriptions>
  </n-card>
</template>

<script lang="ts" setup>
import { gitConfig } from '../config/skill-config'
</script>

<style scoped lang="less"></style>
