<template>
    <div class="big-screen-title">
        <!-- 文章标题 -->
        <div class="title-input">
            <el-input placeholder="请输入文章标题" class="article-title" v-model="titleValue"></el-input>
        </div>
        <!-- 文章分类 -->
        <div class="article-category">

        </div>
        <!-- 预览按钮 -->
        <div class="button-box">
            <el-button type="primary" :disabled="disabled" @click="dialogVisible = true"
                >预览</el-button
            >
        </div>
        <el-dialog
            title="文章预览"
            :visible.sync="dialogVisible"
            width="70%"
            :close-on-click-modal="false"
            class="article-dialog-box"
        >
            <div class="article-title">{{titleValue}}</div>
            <div v-html="articleContainer"></div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="releaseArticle">发 布</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventBus } from '../../share/utils/EventBus'
import { queryArticleCategory_API } from '@/api/modules/article'
import { ResultCodeEnum } from '@/typescript/enum/config.enum'
@Component({})
/** 大屏幕 下的 标题 */
export default class BigScreenTitle extends Vue {
    /** 按钮是否禁用 */
    btnDisabled: boolean = true
    /** 文章标题 */
    titleValue: string = ''
    /** 文章内容 */
    articleContainer:any = ''
    /** 预览内容弹出框 */
    dialogVisible: boolean = false

    /** 发布按钮和预览按钮禁用取消 */
    get disabled(): boolean {
        let flag: boolean = false
        if (this.btnDisabled || !this.titleValue) flag = true
        return flag
    }

    mounted() {
        this.init_EventBus()
        this.queryArticleCategory()
    }
    /** 使用事件总线获取 当前的内容和 设置按钮的样式 */
    init_EventBus() {
        EventBus.$on('btnDisabled', (flag: boolean) => {
            this.btnDisabled = flag
        })
        EventBus.$on('getContent', (html: HTMLDocument) => {
            this.articleContainer = html
        })
    }
    /** 获取文章分类 */
    async queryArticleCategory() {
        const { data } = await queryArticleCategory_API()
        if(data.code === ResultCodeEnum.success) console.log(data, "")

    }
    /** 发布按钮 */
    releaseArticle(): void {
        this.dialogVisible = false
    }
}
</script>

<style lang="scss" scoped>
.big-screen-title {
    padding: 16px;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    .title-input {
        margin-bottom: 10px;
    }
}
.article-title {
    font-size: 20px;
    font-weight: 900;
}
.article-dialog-box {
    .article-title {
        margin-bottom: 10px;
    }
}
</style>
