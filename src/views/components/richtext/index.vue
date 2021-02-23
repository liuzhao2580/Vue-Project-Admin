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

<script>
import Quill from './Quill'
import WangEditor from './WangEditor'
export default {
  name: "richtext",
  components: {
    Quill,
    WangEditor
  }
};
</script>

<style lang="scss" scoped>
</style>