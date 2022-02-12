<template>
  <div class="nav-menu">
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="200"
      :collapsed="collapsed"
      show-trigger
      :inverted="true"
      @collapse="collapsed = true"
      @expand="collapsed = false"
    >
      <div class="header">
        <img src="/src/assets/images/menu-logo.svg" alt="menu" />
        <span v-show="!collapsed">Vue3Admin</span>
      </div>
      <n-menu
        v-model:value="activeKey"
        :collapsed="collapsed"
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menuOptions"
        :inverted="true"
        key-field="id"
        label-field="authName"
        @update:value="menuClick"
      />
    </n-layout-sider>
  </div>
</template>

<script lang="ts">
import { defineComponent, h, ref, watch } from 'vue'
import { NIcon } from 'naive-ui'
import router from '@/router'
import {
  PartlyCloudy,
  User,
  Goods,
  Unlock,
  FolderOpened,
  DataAnalysis
} from '@element-plus/icons-vue'
import { useLogin } from '@/store/login'
import { MenuOption } from 'naive-ui'
import { mapPathToBreadcrumb } from '@/utils/map-menus'
import { IBreadcrumbType } from '@/components/nav-breadcrumb/type'
import { useMain } from '@/store/main'
import { cache } from '@/utils/cache'
import { useStore } from '@/store'
function renderIcon(icon: any) {
  return () => h(NIcon, null, { default: () => h(icon) })
}
export default defineComponent({
  name: 'NavMenu',
  setup() {
    const loginStore = useLogin()
    const icons = [PartlyCloudy, User, Unlock, Goods, FolderOpened, DataAnalysis]
    const activeKey = ref()
    activeKey.value = cache.getCache('menuKey') ?? 654

    const menuOptions: MenuOption[] = loginStore.menuList.map(
      (item: any, index: number) => {
        item.icon = renderIcon(icons[index]) // 给菜单添加icon
        item.children.forEach((child: any) => {
          delete child.children // 删除二级菜单无用的children
        })
        return item
      }
    )

    const collapsed = ref(false)
    const mainStore = useMain()
    const breadcrumb = ref<IBreadcrumbType[]>()

    watch(
      () => mainStore.menuKey,
      (newValue) => {
        activeKey.value = newValue
      }
    )

    const menuClick = (key: any, item: any) => {
      mainStore.authName = item.authName
      cache.setCache('menuKey', key)
      router.push(item.path)
      // 修改pinia的数据
      mainStore.$patch({
        breadcrumb: mapPathToBreadcrumb(loginStore.menuList, item.authName)
      })
      mainStore.addTitleTag({ key: item.id, title: item.authName, path: item.path })
      cache.setCache('authName', item.authName) // 将当前路由名称存入缓存, 解决刷新时面包屑丢失问题
    }

    return {
      activeKey,
      collapsed,
      menuOptions,
      breadcrumb,
      menuClick
    }
  }
})
</script>

<style scoped lang="less">
:deep(.n-menu-item-content-header),
:deep(.n-menu-item-content__icon) {
  color: rgb(121, 171, 187);
}

.nav-menu {
  height: 100%;
  background: rgb(0, 20, 40);
  .header {
    background: rgb(36, 54, 98);
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 30px;
      cursor: pointer;
    }
    span {
      display: inline-block;
      margin-left: 10px;
    }
  }
}
</style>
