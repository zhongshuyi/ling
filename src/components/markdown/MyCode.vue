<template>
  <div class="hljs">
    <slot></slot>
  </div>
</template>
<script lang="ts" setup></script>
<style lang="less" scoped>
  .hljs {
    display: block !important;
    overflow-x: auto !important;
    padding: 0.5em !important;
    background: #282c34 !important;
    font-family: CascadiaCode !important;
    width: 100% !important;
    color: #c7c9ca;
  }

  .hljs,
  .hljs-subst {
    color: #d3e2f1 !important;
  }

  .hljs-comment {
    color: #616a77 !important;
  }

  .hljs-keyword,
  .hljs-attribute,
  .hljs-selector-tag,
  .hljs-meta-keyword,
  .hljs-doctag,
  .hljs-name {
    font-weight: bold !important;
    color: #c578d9 !important;
  }

  .hljs-type,
  .hljs-string,
  .hljs-number,
  .hljs-selector-id,
  .hljs-selector-class,
  .hljs-quote,
  .hljs-template-tag,
  .hljs-deletion {
    color: #97bc63 !important;
  }

  .hljs-title,
  .hljs-section {
    color: #97bc63 !important;
    font-weight: bold !important;
  }

  .hljs-regexp,
  .hljs-symbol,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-link,
  .hljs-selector-attr,
  .hljs-selector-pseudo {
    color: #bc6060 !important;
  }

  .hljs-literal {
    color: #78a960;
  }

  .hljs-built-in,
  .hljs-bullet,
  .hljs-code,
  .hljs-addition {
    color: #397300;
  }

  .hljs-meta {
    color: #1f7199 !important;
  }

  .hljs-meta-string {
    color: #4d99bf !important;
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }

  .hljs-params {
    color: #53caac !important;
  }
</style>
