<template>
	<div class="WangEidtor-box">
        <p>具体配置 <a href="http://www.wangeditor.com/" style="color: #409eff" target="block"> 官方文档</a></p>
        <div :id="CKEditor_ID"></div>
        <el-button type="primary" class="WangEidtor-btn">提交</el-button>
    </div>
</template>

<script>
const WangEidtorCDN =
    "https://unpkg.com/wangeditor@3.1.1/release/wangEditor.min.js";
import load from '../createdScript'
import MathRandom from "@/utils/mathRandom"
import { configMenu, configLang , configColors} from './config'
export default {
	name: "WangEidtor",
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
        this.init()
    },
	mounted() {},
	methods: {
        init() {
            load(WangEidtorCDN).then(res => {
                if (res) {
                    this.initWangEditor()
                }
            })
        },
        initWangEditor() {
            let E = window.wangEditor
            let editor = new E( document.getElementById(this.CKEditor_ID ))
            // 自定义菜单配置
            editor.customConfig.menus = configMenu
            // 使用 base64 保存图片
            editor.customConfig.uploadImgShowBase64 = true
            // 配置语言
            editor.customConfig.lang =  configLang
            // 配置字体颜色、背景色
            editor.customConfig.colors = configColors
            editor.create()
            document.querySelector('.WangEidtor-btn').addEventListener('click', function () {
                // 读取 html
                console.log(editor.txt.html())
            }, false)
        }
    },
	watch: {}
};
</script>

<style lang="scss" scoped>
</style>
