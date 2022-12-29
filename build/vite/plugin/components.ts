// 自动引入组件 https://github.com/antfu/unplugin-vue-components
import { PluginOption } from 'vite'
import Components from 'unplugin-vue-components/vite'

import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'

export function configComponentsPlugin() {
  const componentsPlugin: PluginOption = Components({
    dts: 'types/components.d.ts',
    resolvers: [NaiveUiResolver()]
  })

  return componentsPlugin
}
