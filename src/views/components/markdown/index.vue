<template>
	<div class="markdown-box">
        <p> 依赖于 mavon-editor <a href="https://github.com/hinesboy/mavonEditor" style="color: #409eff" target="block">GitHub地址</a> </p>
        <mavon-editor @save="mavon_save" v-model="mavon_model" :ishljs = "true"/>
        <el-button type="primary" @click="onSubmit" class="tinymce-btn">提交</el-button>
    </div>
</template>

<script>
import {mavonEditor} from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
	name: "markdown",
	components: {
        mavonEditor
    },
	props: {},
	data() {
		return {
            mavon_model: ""
        };
	},
	mounted() {},
	methods: {
        mavon_save(value ,render) {
            console.log(value,render)
        },
        onSubmit() {
            console.log(this.mavon_model)
        }
    },
	watch: {}
};
</script>

<style lang="scss" scoped>
.markdown-box {
    width: 100%;
    height: 100%;
}
</style>
