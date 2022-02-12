<template>
  <div class="title-tag">
    <div
      v-for="(item, index) in titleTag"
      :key="item.title"
      :class="['tag', currentIndex === index ? 'blue' : '']"
      @click="titleClick(item, index)"
    >
      <span>{{ item.title }}</span>
      <n-icon :size="20" @click="removeClick(item)"><close-outline /></n-icon>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, watch } from 'vue'
import { CloseOutline } from '@vicons/ionicons5'
import { ITitleTagType } from '@/components/title-tag/type'
import { useMain } from '@/store/main'
import router from '@/router'
import { cache } from '@/utils/cache'
export default defineComponent({
  name: 'TitleTag',
  components: { CloseOutline },
  props: {
    titleTag: {
      type: Array as PropType<ITitleTagType[]>,
      required: true
    }
  },
  setup(props) {
    // 0 1px 4px #00152914
    const store = useMain()
    const currentIndex = ref(0)

    watch(
      () => store.authName,
      (newValue) => {
        currentIndex.value = store.titleTag.findIndex(
          (item) => item.title === newValue
        )
      },
      { deep: true, immediate: true }
    )
    const mainStore = useMain()
    const isDel = ref(false)
    // 跳转对应的路由
    const titleClick = (value: ITitleTagType, index: number) => {
      if (!isDel.value) {
        store.menuKey = value.key
        store.authName = value.title
        cache.setCache('authName', value.title)
        cache.setCache('menuKey', value.key)
        currentIndex.value = index
        currentIndex.value = index
        router.push(`/${value.path}`)
      } else {
        isDel.value = false
      }
    }
    const removeClick = (value: ITitleTagType) => {
      isDel.value = true
      if (mainStore.titleTag.length !== 1) {
        mainStore.removeTitleTag(value)
      } else {
        ;(window as any).$message.warning('还是留一个比较美观吧')
      }
    }
    return {
      titleClick,
      removeClick,
      currentIndex
    }
  }
})
</script>

<style scoped lang="less">
.title-tag {
  display: flex;
  margin-top: 10px;
  padding: 0 10px 10px 10px;
  border-bottom: 1px solid @blue;
  .tag {
    display: flex;
    align-items: center;
    background: white;
    margin-right: 8px;
    padding: 6px 10px;
    border-radius: 3px;
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      color: @blue;
    }
  }
}
.blue {
  color: @blue;
}
</style>
