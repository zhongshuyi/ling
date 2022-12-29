<template>
  <NLayoutHeader
    class="h-16 w-full border-b border-b-true-gray-100 pl-2 pr-2 flex flex-row items-center lg:pl-8 lg:pr-8"
  >
    <!-- 名称 -->
    <div v-show="!isMobile" class="w-60 text-xl hidden xs:block">
      <div>{{ title }}</div>
    </div>
    <SvgIcon
      v-show="isMobile"
      name="menu"
      size="24"
      class="cursor-pointer"
      @click="appStore.showSiderDrawer = !appStore.showSiderDrawer"
    />
    <!-- 填充 -->
    <div class="flex-grow"></div>
    <NMenu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
    <!-- 主题切换 -->
    <div>
      <NTooltip trigger="hover">
        <template #trigger>
          <SvgIcon
            class="cursor-pointer hover:text-green-600"
            size="20"
            @click="appStore.toggleTheme()"
            :name="(appStore.theme as string)"
          />
        </template>
        {{ '当前' + getThemeName }}
      </NTooltip>
    </div>
  </NLayoutHeader>
</template>
<script lang="ts" setup name="LHeader">
  import { MenuOption, NLayoutHeader, NTooltip, NMenu } from 'naive-ui'

  import SvgIcon from '@/components/Icon/src/SvgIcon.vue'

  import { useGlobSetting } from '@/hooks/setting'
  import { RouterLink } from 'vue-router'

  const appStore = useAppStoreWithOut()

  const isMobile = appStore.getIsMobile

  const getThemeName = computed(() => {
    switch (appStore.theme) {
      case ThemeEnum.SYSTEM:
        return '跟随系统'
      case ThemeEnum.DARK:
        return '黑暗模式'
      case ThemeEnum.LIGHT:
        return '明亮模式'
    }
  })

  const { title } = useGlobSetting()

  const activeKey = ref<string | null>(null)
  const menuOptions: MenuOption[] = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: {
              path: '/tool'
            }
          },
          { default: () => '工具箱' }
        ),
      key: 'tool'
    }
  ]
</script>
<style lang="less" scoped></style>
