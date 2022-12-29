<template>
  <NLayout class="w-full h-full">
    <Header />
    <Content />
  </NLayout>
</template>
<script lang="ts" setup name="LLayout">
  import { NLayout } from 'naive-ui'
  import Header from './header/index.vue'
  import Content from './content/index.vue'
</script>
<style lang="less" scoped></style>
