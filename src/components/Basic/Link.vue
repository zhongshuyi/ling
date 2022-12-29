<template>
  <a :href="props.href" class="dynamic-a">
    <slot></slot>
  </a>
</template>
<script lang="ts" setup name="Link">
  const props = defineProps({
    href: {
      type: String,
      require: true
    }
  })
</script>
<style lang="less" scoped></style>
