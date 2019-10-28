<template>
    <div class="richtext-box">
        <el-tabs value="TinyMce" type="border-card">
            <el-tab-pane label="TinyMce" name="TinyMce">
                <TinyMce />
            </el-tab-pane>
            <el-tab-pane label="CKEditor" name="CKEditor">
                <CKEditor />
            </el-tab-pane>
            <el-tab-pane label="wangEditor" name="wangEditor">
                <WangEditor />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import TinyMce from "./TinyMce";
import CKEditor from './CKEditor';
import WangEditor from './WangEditor'
export default {
    name: "richtext",
    components: {
        TinyMce,
        CKEditor,
        WangEditor
    }
};
</script>

<style lang="scss" scoped>
</style>