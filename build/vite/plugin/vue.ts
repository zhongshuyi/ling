import { PluginOption } from 'vite'
import Vue from '@vitejs/plugin-vue'

export function configVuePlugin() {
  const vuePlugin: PluginOption = Vue({
    include: [/\.vue$/, /\.md$/]
  })

  return vuePlugin
}
