<script lang="ts">
  import { defineComponent, defineAsyncComponent } from 'vue'
  import { md } from '@/utils/md'

  export default defineComponent({
    name: 'Markdown',
    props: {
      content: {
        type: String,
        required: true
      }
    },
    setup: (props) => {
      const AsyncComp = shallowRef()

      const contentUpdate = () => {
        AsyncComp.value = defineAsyncComponent(
          () =>
            new Promise((resolve) => {
              resolve({
                // @ts-ignore
                template: md.render(props.content)
              })
            })
        )
      }

      contentUpdate()

      watch(
        () => props.content,
        () => {
          contentUpdate()
        }
      )

      return { AsyncComp }
    }
  })
</script>

<template>
  <div class="relative markdown">
    <component :is="AsyncComp" />
  </div>
</template>

<style lang="less" scoped></style>
