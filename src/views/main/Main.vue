<template>
  <div class="main">
    <n-layout class="ly-layout" has-sider>
      <nav-menu ref="menuRef" />
      <n-layout>
        <n-layout-header class="ly-header">
          <nav-header @handle-collapse="handleCollapse" />
        </n-layout-header>
        <n-layout-content class="ly-content">
          <router-view v-slot="{ Component }">
            <keep-alive exclude="HandleGoods, Params">
              <Component :is="Component" />
            </keep-alive>
          </router-view>
        </n-layout-content>
      </n-layout>
    </n-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import {
  LogoApple,
  LogoAlipay,
  LogoChrome,
  LogoMicrosoft,
  LogoGoogle
} from '@vicons/ionicons5'
import { useLogin } from '@/store/login'
import { MenuOption } from 'naive-ui'
import { renderIcon } from '@/utils/render-icons'

import NavMenu from '@/components/nav-menu'
import NavHeader from '@/components/nav-header/src/NavHeader.vue'

export default defineComponent({
  name: 'Main',
  components: { NavHeader, NavMenu },
  setup() {
    const loginStore = useLogin()
    const icons = [LogoApple, LogoAlipay, LogoChrome, LogoMicrosoft, LogoGoogle]
    const menuOptions: MenuOption[] = loginStore.menuList.map(
      (item: any, index: number) => {
        item.icon = renderIcon(icons[index]) // 给菜单添加icon
        item.children.forEach((child: any) => {
          delete child.children // 删除二级菜单无用的children
        })
        return item
      }
    )
    const menuRef = ref<InstanceType<typeof NavMenu>>()
    const handleCollapse = () => {
      menuRef.value!.collapsed = !menuRef.value?.collapsed
    }
    return {
      activeKey: ref(null),
      collapsed: ref(false),
      menuOptions,
      menuRef,
      handleCollapse
    }
  }
})
</script>

<style scoped lang="less">
.main {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  .ly-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 9;
  }
}

:deep(.n-layout) {
  //height: 100%;
}
.ly-layout {
  height: 100%;
}

:deep(.n-layout-sider-scroll-container) {
  height: 100%;
}

.n-layout-content {
  background: @bgColor;
  padding: 0 10px;
  box-sizing: border-box;
}
</style>
