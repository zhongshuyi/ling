<template>
  <div class="flex flex-row">
    <textarea v-model="md" class="w-1/2"></textarea>

    <Markdown :content="md" class="w-1/2" />
  </div>
</template>

<script setup lang="ts">
  import Markdown from './components/markdown/Markdown.vue'

  const md = ref<string>('请输入')
</script>

<style scoped></style>
