<template>
  <NLayoutContent class="w-full l-content">
    <RouterView />
  </NLayoutContent>
</template>
<script lang="ts" setup name="LContent">
  import { NLayoutContent } from 'naive-ui'
</script>
<style lang="less" scoped>
  .l-content {
    height: calc(100% - 64px);
  }
</style>
