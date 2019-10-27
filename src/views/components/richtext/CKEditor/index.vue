<template>
	<div class="CKEditor-box">
		<textarea name="content" :id="CKEditor_ID" class="CKEditor-textarea">
            <p>CKEditor 5</p>
        </textarea>
	</div>
</template>

<script>
/* eslint-disable */
const CKEditorCDN =
    "https://cdn.jsdelivr.net/gh/liuzhao2580/CKEditor@1.0/ckeditor.js"
import load from "../createdScript";
// import MyCustomUploadAdapterPlugin  from "./CKEditorUpload"
import MathRandom from "@/utils/mathRandom";
import plugins from "./plugins"
import toolbar from "./toolbar"
export default {
	name: "CKEditor",
	components: {},
	props: {},
	computed: {
		CKEditor_ID() {
			return `${MathRandom()}CKEditorId`;
		}
	},
	data() {
		return {};
	},
	created() {
		this.init();
	},
	mounted() {},
	methods: {
		// 初始化
		init() {
			load(CKEditorCDN).then(reslove => {
                this.initCKEditor();
			});
		},
		initCKEditor() {
			ClassicEditor.create(document.getElementById(this.CKEditor_ID ),{
                language: "zh-cn",
                toolbar,
                plugins,
                // ckfinder: {
                //     openerMethod: 'popup',
                //     uploadUrl: "/text/index",
                //     options: {
                //         resourceType: 'Images'
                //     }
                // }
                // extraPlugins: [MyCustomUploadAdapterPlugin ]
            }).then((editor) => {
                // editor.plugins.get( 'image.toolbar' );
            }).catch(
				error => {
					console.error(error);
				}
            )
            const getMap = ClassicEditor.builtinPlugins.map( plugin => plugin.pluginName );
            console.log(getMap)
		}
	},
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
