type TocTree = {
  id: String
  level: Number
  title: String
  children: TocTree[]
}

import MarkdownIt from 'markdown-it'
import hljs from 'highlight.js'
import markdownItAnchor from 'markdown-it-anchor'
import markdownItEmoji from 'markdown-it-emoji'
import markdownItKatex from 'markdown-it-katex-external'

export const md: MarkdownIt = new MarkdownIt({
  html: true,
  xhtmlOut: true,
  linkify: true,
  highlight: (str, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return (
          '<MyCode>' +
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
          '</MyCode>'
        )
      } catch (__) {}
    }

    return (
      '<my-code><pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre></my-code>'
    )
  }
})
  .use(markdownItAnchor, {})
  .use(markdownItEmoji, {})
  .use(markdownItKatex, {})

/**获取页面内目录 */
export function getToc(): TocTree[] {
  const markdown = document.getElementById('markdown')
  if (!markdown) {
    return []
  }
  const h = markdown.querySelectorAll('h1, h2, h3, h4, h5, h6')

  const data: TocTree[] = []

  h.forEach((element) =>
    data.push({
      id: element.getAttribute('id') as String,
      level: parseInt(element.tagName.replace('H', '')),
      title: element.innerHTML,
      children: []
    })
  )

  const copyData = Object.assign([], data)

  const getChildren = (e: TocTree) => {
    const children: TocTree[] = []
    for (let i = data.indexOf(e); i < data.length; i++) {
      if (data[i].level > e.level) {
        children.push(data[i])
      }
      if (e.level >= data[i].level && e != data[i]) {
        break
      }
    }
    for (let i = 0; i < children.length - 1; i++) {
      if (children[i].level < children[i + 1].level) {
        children.splice(i + 1, 1)
        i--
      }
    }
    return children
  }

  const getTree = (element: TocTree, arr: TocTree[]) => {
    const children = getChildren(element)
    element.children = children
    children.forEach((e) => {
      arr.splice(arr.indexOf(e), 1)
    })

    if (children.length === 0) {
      return
    } else {
      children.forEach((el) => {
        getTree(el, arr)
      })
    }
  }

  copyData.forEach((e) => {
    getTree(e, copyData)
  })

  return copyData
}
