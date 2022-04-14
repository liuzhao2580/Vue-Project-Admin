<template>
  <div class="richtext-box">
    <el-tabs value="Quill" type="border-card">
      <el-tab-pane label="Quill" name="Quill">
        <Quill />
      </el-tab-pane>
      <el-tab-pane label="wangEditor" name="wangEditor">
        <WangEditor />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>


<script lang="ts" setup>
import Quill from './Quill/index.vue'
import WangEditor from './WangEditor/index.vue'
</script>

<script lang="ts">
export default {
  name: 'RichText'
}
</script>

<style lang="scss" scoped></style>
