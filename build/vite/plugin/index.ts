import { PluginOption } from 'vite'

import WindiCSS from 'vite-plugin-windicss'
import purgeIcons from 'vite-plugin-purge-icons'
import VueSetupExtend from 'vite-plugin-vue-setup-extend'
import basicSsl from '@vitejs/plugin-basic-ssl'

import { configHtmlPlugin } from './html'

import { configComponentsPlugin } from './components'
import { autoImportPlugin } from './autoImport'
import { configSvgIconsPlugin } from './svgSprite'
import { configVuePlugin } from './vue'

export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  /** 插件数组 */
  const vitePlugins: (PluginOption | PluginOption[])[] = []

  // Vue 支持
  vitePlugins.push(configVuePlugin())

  // 组件名插件
  vitePlugins.push(VueSetupExtend())

  // API 自动引入
  vitePlugins.push(autoImportPlugin())

  // 自动按需引入组件
  vitePlugins.push(configComponentsPlugin())

  // 添加 windicss
  vitePlugins.push(WindiCSS())

  // vite-plugin-html
  vitePlugins.push(configHtmlPlugin(viteEnv, isBuild))

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons())

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild))

  /** https */
  vitePlugins.push(basicSsl())

  return vitePlugins
}
