<template>
  <div id="quill-editor">Quill</div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'
import Quill from 'quill'

const quillEditor = ref()

onMounted(() => {
  init()
})

// 初始化
const init = () => {
  quillEditor.value = new Quill('#quill-editor', {
    theme: 'snow',
    modules: {
      toolbar: [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: ['黑体'] }],
        [{ align: [] }],

        ['clean']
      ]
    }
  })
}

onUnmounted(() => {
  if (quillEditor.value) quillEditor.value = null
})
</script>

<style lang="scss" scoped>
#quill-editor {
  height: 500px;
}
</style>
