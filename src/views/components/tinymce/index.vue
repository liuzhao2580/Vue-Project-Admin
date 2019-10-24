<template>
	<div class="tinymce-box">
        <textarea id="tinymceId" class="tinymce-textarea" />
    </div>
</template>

<script>
/* eslint-disable */
const tinymceCDN = "https://cdn.jsdelivr.net/npm/tinymce-all-in-one@4.9.3/tinymce.min.js";
import load from "./createdTinymce";
import plugins from "./plugins";
import toolbar from "./toolbar";
export default {
	name: "tinymce",
	components: {},
	props: {},
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
			load(tinymceCDN, res => {
				console.log(window.tinymce);
				this.initTinymce();
			});
		},
		initTinymce() {
            const _this = this
			window.tinymce.init({
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
.tinymce-box {
	width: 100%;
	height: 500px;
}
</style>
