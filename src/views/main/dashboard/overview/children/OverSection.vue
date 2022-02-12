<template>
  <div class="over-section">
    <n-card title="项目规范">
      <n-descriptions
        class="margin-top"
        title="文件规范"
        :column="2"
        size="small"
        bordered
      >
        <template v-for="item in fieldConfig" :key="item.label">
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
      <n-descriptions
        class="margin-top cpn-description"
        title="组件规范"
        :column="2"
        size="small"
        bordered
        style="margin-top: 12px"
      >
        <template v-for="item in componentConfig" :key="item.label">
          <n-descriptions-item>
            <template #label>
              <div class="cell-item">
                <strong>{{ item.label }}</strong>
              </div>
            </template>
            <n-tag type="info">
              {{ item.value }}
            </n-tag>
          </n-descriptions-item>
        </template>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { fieldConfig, componentConfig } from '../config/skill-config'
</script>

<style scoped lang="less"></style>
