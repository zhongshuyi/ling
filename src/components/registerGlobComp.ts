import type { App } from 'vue'
import MyCode from './markdown/MyCode.vue'

export function registerGlobComp(app: App) {
  app.component('MyCode', MyCode)
}
