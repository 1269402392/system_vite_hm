<template>
  <div class="not-found">
    <n-result status="404" title="404 资源不存在" description="生活总归带点荒谬">
      <template #footer>
        <a href="https://lol.qq.com/act/a20220124prespring/index.html">
          <n-button>要不召唤师峡谷见？</n-button>
        </a>
      </template>
    </n-result>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NotFound',
  setup() {
    return {}
  }
})
</script>

<style scoped lang="less">
.not-found {
  padding-top: 200px;
}
a {
  text-decoration: none;
}
</style>
