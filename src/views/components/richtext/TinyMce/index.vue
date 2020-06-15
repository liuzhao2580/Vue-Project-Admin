<template>
	<div class="tinymce-box">
        <p>目前展示tinymce 的基本使用, 更多的文档和功能请访问 <a href="https://www.tiny.cloud" style="color: #409eff" target="block">官方网站</a> </p>
		<textarea :id="TinyMce_ID" class="tinymce-textarea" v-model="TinyMce_Mess"></textarea>
		<el-button type="primary" @click="onSubmit" class="tinymce-btn">提交</el-button>
	</div>
</template>

<script>
/* eslint-disable */
/** 中文文档  http://tinymce.ax-z.cn/ */
// const tinymceCDN ="https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
// const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce@5.1.0/tinymce.min.js"
const tinymceCDN = "https://cdn.jsdelivr.net/gh/liuzhao2580/TinyMce@1.0/tinymce.min.js"
import load from "../createdScript";
import plugins from "./plugins";
import toolbar from "./toolbar";
import  MathRandom from "@/utils/mathRandom"
export default {
	name: "TinyMce",
	components: {},
	props: {},
	computed: {
		TinyMce_ID() {
			return `${MathRandom()}tinymceId`;
		}
	},
	data() {
		return {
			TinyMce_Mess: "TinyMce_Mess"
		};
	},
	created() {
		this.init();
	},
	mounted() {},
	methods: {
		// 初始化
		init() {
			load(tinymceCDN).then(res => {
				this.initTinymceFnc();
			});
		},
		initTinymceFnc() {
			tinymce.init({
                selector: `#${this.TinyMce_ID}`,
                language: "zh_CN",
                // language_url: "https://cdn.jsdelivr.net/npm/tinymce-lang/langs/zh_CN.js", // site absolute URL
				height: 400,
				body_class: "panel-body ",
				object_resizing: false,
				toolbar: toolbar,
                plugins: plugins,
                // 状态栏指的是编辑器最底下、左侧显示dom信息、右侧显示Tiny版权链接和调整大小的那一条。
                statusbar: false, 
				end_container_on_empty_block: true,
				powerpaste_word_import: "clean",
				code_dialog_height: 450,
				code_dialog_width: 1000,
				advlist_bullet_styles: "square",
				advlist_number_styles: "default",
				// 此处为图片上传处理函数，这个直接用了base64的图片形式上传图片，
				imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
				images_upload_handler: (blobInfo, success, failure) => {
					const img = "data:image/jpeg;base64," + blobInfo.base64();
					success(img);
				}
			});
		},
		onSubmit() {
            // 获得 tinymce 编辑的内容
            console.log(tinymce.activeEditor.getContent())
		}
	}
};
</script>

<style lang="scss" scoped>
</style>
