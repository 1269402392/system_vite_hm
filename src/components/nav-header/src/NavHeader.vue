<template>
  <div class="nav-header">
    <div class="top-box">
      <div class="left">
        <n-icon :size="25" @click="collapseClick"><menu-outline /> </n-icon>
        <n-icon :size="18" @click="refreshPage"><reload /> </n-icon>
        <nav-breadcrumb :breadcrumb="breadcrumb" />
      </div>
      <div class="right">
        <ly-popover>
          <n-icon :size="28"><search-outline /></n-icon>
        </ly-popover>
        <ly-popover content="Github">
          <n-icon :size="28"><logo-github /></n-icon>
        </ly-popover>
        <ly-popover content="云服务">
          <n-badge :value="5" :max="15">
            <n-icon :size="32" color="rgb(208,48,80)"><cloud-circle /></n-icon>
          </n-badge>
        </ly-popover>
        <n-dropdown trigger="hover" :options="options" @select="dropClick">
          <n-avatar round size="medium" src="/src/assets/images/head.jpg" />
        </n-dropdown>
        <n-icon :size="24"><settings-outline /></n-icon>
      </div>
    </div>
    <title-tag :title-tag="titleTag" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { renderIcon } from '@/utils/render-icons'
import TitleTag from '@/components/title-tag'
import router from '@/router'
import {
  MenuOutline,
  Reload,
  SearchOutline,
  LogoGithub,
  CloudCircle,
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  SettingsOutline
} from '@vicons/ionicons5'
import NavBreadcrumb from '@/components/nav-breadcrumb'
import LyPopover from '@/components/ly-prpover'
import { cache } from '@/utils/cache'
import { useMain } from '@/store/main'
export default defineComponent({
  name: 'NavHeader',
  components: {
    LyPopover,
    MenuOutline,
    Reload,
    NavBreadcrumb,
    SearchOutline,
    LogoGithub,
    CloudCircle,
    SettingsOutline,
    TitleTag
  },
  emits: ['handleCollapse'],

  setup(props, { emit }) {
    const mainStore = useMain()
    const options = [
      {
        label: '个人信息',
        key: 'profile',
        icon: renderIcon(UserIcon)
      },
      {
        label: '编辑信息',
        key: 'editProfile',
        icon: renderIcon(EditIcon)
      },
      {
        label: '退出登录',
        key: 'logout',
        icon: renderIcon(LogoutIcon)
      }
    ]
    // 退出登陆
    const dropClick = (key: string) => {
      if (key === 'logout') {
        cache.delCache('token')
        cache.delCache('userInfo')
        cache.delCache('menuList')
        cache.delCache('titleTag')
        cache.delCache('authName')
        cache.delCache('menuKey')
        router.push('/login')
      }
    }
    // 头部收缩菜单图标点击
    const collapseClick = () => {
      emit('handleCollapse')
    }
    // 获取面包屑
    const breadcrumb = computed(() => mainStore.breadcrumb)
    // 获取头部路由小标签
    const titleTag = computed(() => mainStore.titleTag)
    // 刷新页面
    const refreshPage = () => {
      router.go(0)
    }
    return {
      options,
      dropClick,
      collapseClick,
      refreshPage,
      breadcrumb,
      titleTag
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  background: rgb(245, 247, 249);
  .top-box {
    display: flex;
    height: 65px;
    justify-content: space-between;
    padding: 0 5px;
    box-sizing: border-box;
    background: white;
    box-shadow: 0 1px 4px #00152914;
    .left {
      display: flex;
      align-items: center;
      width: 250px;
      justify-content: space-around;
    }
    .right {
      display: flex;
      align-items: center;
      width: 250px;
      justify-content: space-around;
    }
  }
}
:deep(.n-icon) {
  cursor: pointer;
}
</style>
