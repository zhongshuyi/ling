import type { App } from 'vue'

export function customElement(app: App) {
  // mathml 的标签,标记为自定义标签,就不会被vue解析
  app.config.compilerOptions.isCustomElement = (tag) =>
    [
      'math',
      'mi',
      'mn',
      'mo',
      'ms',
      'msup',
      'msub',
      'mfrac',
      'mroot',
      'msqrt',
      'mtable',
      'mtr',
      'mtd',
      'mrow',
      'mmultiscripts',
      'annotation',
      'semantics'
    ].includes(tag)
}
