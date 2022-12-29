<template>
  <div class="flex justify-center pt-40 text-4xl">
    <div id="ityped"></div>
  </div>
  <Footer />
</template>
<script lang="ts" setup name="LContent">
  import Footer from '@/layouts/default/footer/index.vue'

  import { init } from 'ityped'

  onMounted(() => {
    const oneElement = document.querySelector('#ityped')
    init(oneElement, {
      strings: ['唯有门前镜湖水，春风不改旧时波。'],
      showCursor: true,
      typeSpeed: 300,
      loop: false
    })
  })
</script>
<style lang="less" scoped></style>
