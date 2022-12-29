<template>
  <NLayout :has-sider="!isMobile" class="h-full">
    <NLayoutSider
      v-if="!isMobile"
      collapse-mode="width"
      :collapsed-width="0"
      :width="240"
      show-trigger="arrow-circle"
      bordered
    >
      <NMenu :options="menuOptions" :value="getCurrentMenuValue" />
    </NLayoutSider>
    <NDrawer v-model:show="appStore.showSiderDrawer" :width="210" placement="left">
      <NDrawerContent title="Ling-tool" body-content-style="padding: 0px;">
        <NMenu :options="menuOptions" :value="getCurrentMenuValue" />
      </NDrawerContent>
    </NDrawer>
    <NLayoutContent>
      <RouterView />
    </NLayoutContent>
  </NLayout>
</template>
<script lang="ts" setup name="Tool">
  import {
    NLayout,
    NLayoutSider,
    NLayoutContent,
    NDrawer,
    NDrawerContent,
    MenuOption,
    NMenu
  } from 'naive-ui'
  import { RouterLink } from 'vue-router'

  const appStore = useAppStoreWithOut()

  const isMobile = appStore.getIsMobile

  const menuOptions: MenuOption[] = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: '/tool/removalWatermark'
            }
          },
          { default: () => '短视频去水印' }
        ),
      key: 'removalWatermark'
    }
  ]

  const getCurrentMenuValue = computed(() =>
    window.location.href.substring(window.location.href.lastIndexOf('/') + 1)
  )
</script>
<style lang="less" scoped></style>
