<template>
  <div class="over-header">
    <n-card class="header" title="故河十九年春">
      <n-icon><bell-filled /></n-icon>
      <h3>
        RMS(Backstage Management System) 是基于 Vue3、Pinia、VueRouter、Vite、
        NaiveUI 、TypeScript、Echart5、mitt、countUp等技术建立的后台管理系统
      </h3>
    </n-card>
    <n-card class="section" title="技术栈">
      <n-descriptions title="Technical Standard" :column="2">
        <template v-for="item in skillList" :key="item.label">
          <n-descriptions-item>
            <template #label>
              <n-icon>
                <component :is="item.iconCpn"></component>
              </n-icon>
              <span class="label"> {{ item.label }} </span>
              <a :href="item.link" target="_blank"
                ><n-gradient-text type="primary">{{
                  item.value
                }}</n-gradient-text></a
              >
            </template>
          </n-descriptions-item>
        </template>
      </n-descriptions>
    </n-card>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { skillList } from '../config/skill-config'

export default defineComponent({
  name: 'OverHeader',
  setup() {
    return { skillList }
  }
})
</script>

<style scoped lang="less">
.header {
  h3 {
    display: inline;
  }
}
.section {
  .label {
    margin-right: 12px;
    display: inline-block;
  }
  :deep(.n-gradient-text) {
    cursor: pointer;
    &:hover {
      color: red;
    }
  }
}
</style>
