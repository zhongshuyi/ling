// 配置信息与主题
<template>
  <NConfigProvider :theme="theme" class="w-full h-full">
    <NGlobalStyle />
    <NMessageProvider>
      <slot></slot>
    </NMessageProvider>
  </NConfigProvider>
</template>
<script lang="ts" setup>
  import { darkTheme, NConfigProvider, NGlobalStyle, NMessageProvider } from 'naive-ui'
  import { BuiltInGlobalTheme } from 'naive-ui/es/themes/interface'
  import { ref, onMounted, watch } from 'vue'

  const theme = ref<BuiltInGlobalTheme>()

  const appStore = useAppStoreWithOut()

  const setNTheme = () => {
    appStore.getRealTheme === ThemeEnum.DARK ? (theme.value = darkTheme) : (theme.value = undefined)
  }

  onMounted(() => {
    setNTheme()
  })

  watch(
    () => appStore.getRealTheme,
    () => setNTheme()
  )
</script>
<style lang="less" scoped></style>
