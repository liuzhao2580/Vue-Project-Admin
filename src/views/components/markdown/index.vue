<template>
  <div class="markdown-box">
    <!-- 书写区域 -->
    <textarea class="markdown-box-write" @input="writeChange"></textarea>
    <!-- 编译区域 -->
    <div class="markdown-box-compile" v-html="compileHtml"></div>
  </div>
</template>

<script lang="ts" setup>
import { marked } from "marked";
import { shallowRef } from "vue";
import "highlight.js/styles/monokai-sublime.css";
marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require("highlight.js");
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-",
  breaks: false,
  gfm: true,
  headerIds: true,
  headerPrefix: "",
  mangle: true,
  pedantic: false,
  sanitize: false,
  silent: false,
  smartLists: false,
  smartypants: false,
  xhtml: false
});
const compileHtml = shallowRef();

/** 输入框改变事件 */
const writeChange = (e: Event) => {
  const getTextArea = e.target as HTMLTextAreaElement;
  compileHtml.value = marked.parse(getTextArea.value);
};
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst";
export default {
  name: RouterName.MARKDOWN
};
</script>

<style lang="scss" scoped>
.markdown-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  > * {
    width: 49%;
    border: 1px solid #eee;
    border-radius: 5px;
    padding: 10px;
  }
  &-write {
    resize: none;
    font-size: 16px;
  }
  :deep(&-compile) {
    ul,
    li {
      list-style: inside;
    }
  }
}
</style>
