<template>
	<div class="tinymce-box">
        <textarea id="tinymceId" class="tinymce-textarea" v-model="TinyMce_Mess"></textarea>
    </div>
</template>

<script>
/* eslint-disable */
/** 中文文档  http://tinymce.ax-z.cn/ */
const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
import load from "../createdScript";
import plugins from "./plugins";
import toolbar from "./toolbar";
export default {
	name: "TinyMce",
	components: {},
    props: {},
    computed: {
        TinyMce_Mess(){ 
            return "这是一个 TinyMce 富文本编辑器"
        }
    },
	data() {
		return {};
	},
	created() {},
	mounted() {
		this.init();
	},
	methods: {
		// 初始化
		init() {
            load(tinymceCDN).then(res => {
                this.initTinymce()
            })
		},
		initTinymce() {
            const _this = this
			tinymce.init({
                selector: `#tinymceId`,
				language: "zh_CN",
				height: 400,
				body_class: "panel-body ",
				object_resizing: false,
				toolbar: toolbar,
				plugins: plugins,
				end_container_on_empty_block: true,
				powerpaste_word_import: "clean",
				code_dialog_height: 450,
				code_dialog_width: 1000,
				advlist_bullet_styles: "square",
				advlist_number_styles: "default",
                imagetools_cors_hosts: ["www.tinymce.com", "codepen.io"],
                images_upload_url: '/demo/upimg.php',
                images_upload_base_path: '/demo',
				default_link_target: "_blank",
				link_title: false,
				nonbreaking_force_tab: true,
				init_instance_callback: editor => {
					if (_this.value) {
						editor.setContent(_this.value);
					}
					_this.hasInit = true;
					editor.on("NodeChange Change KeyUp SetContent", () => {
						this.hasChange = true;
						this.$emit("input", editor.getContent());
					});
				},
				setup(editor) {
					editor.on("FullscreenStateChanged", e => {
						_this.fullscreen = e.state;
					});
				}
			});
		}
	},
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
