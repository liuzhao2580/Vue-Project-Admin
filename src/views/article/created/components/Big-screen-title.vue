<template>
    <div class="big-screen-title">
        <!-- 文章标题 -->
        <div class="title-input">
            <el-input placeholder="请输入文章标题" class="article-title" v-model="titleValue"></el-input>
        </div>
        <!-- 预览按钮 -->
        <div class="button-box">
            <!-- <el-button type="primary" :disabled="disabled" @click="dialogVisible = true">预览</el-button> -->
            <el-button type="primary" @click="dialogVisible = true">预览</el-button>
        </div>
        <el-dialog
            title="文章预览"
            :visible.sync="dialogVisible"
            width="80%"
            :close-on-click-modal="false"
            class="article-dialog-box"
        >
            <!-- 文章标题 -->
            <div class="article-title">{{ titleValue }}</div>
            <!-- 文章分类 -->
            <div class="article-category-box">
                <p class="article-title">文章分类</p>
                <div class="article-category">
                    <el-radio-group v-model="categoryValue">
                        <el-radio
                            :label="categoryItem.id"
                            v-for="categoryItem in categoryData"
                            :key="categoryItem.id"
                            class="category-item"
                            >{{ categoryItem.category_name }}</el-radio
                        >
                    </el-radio-group>
                </div>
            </div>
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
import { ResultCodeEnum } from '@/typescript/enum'
import { IArticleCategory } from '../../share/interface/article-config.interface'
@Component({})
/** 大屏幕 下的 标题 */
export default class BigScreenTitle extends Vue {
    /** 按钮是否禁用 */
    btnDisabled: boolean = true
    /** 文章标题 */
    titleValue: string = ''
    /** 文章分类 选中项 id */
    categoryValue: string = ''
    /** 文章分类的数据 */
    categoryData: IArticleCategory[] = []
    /** 文章内容 */
    articleContainer: any = ''
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
        const { data: result } = await queryArticleCategory_API({ level: 2 })
        console.log(result, '')
        if (result.code === ResultCodeEnum.success) this.categoryData = result.data
        else this.$message.error(result.msg)
    }

    /** 发布按钮 */
    releaseArticle(): void {
        console.log(this.articleContainer)
        // this.dialogVisible = false
    }
}
</script>

<style lang="scss" scoped>
.big-screen-title {
    border-radius: 5px;
    display: flex;
    .title-input {
        margin-bottom: 10px;
        width: 90%;
        margin-right: 10px;
    }
    // 预览按钮
    .button-box {
        flex: 1;
        .el-button {
            width: 100%;
        }
    }
}
.article-title {
    font-size: 24px;
    font-weight: 900;
}

// 预览弹出框
.article-dialog-box {
    .article-title {
        margin-bottom: 10px;
    }
    .article-name {
        margin: 10px 0;
        font-size: 20px;
        font-weight: 900;
    }
    // 分类
    .article-category-box {
        .article-title {
            font-size: 18px;
        }
        .article-category {
            min-height: 100px;
            max-height: 150px;
            overflow-y: auto;
            border: 1px solid #f0f0f0;
            border-radius: 5px;
            padding: 16px;
            .category-item {
                margin: 5px 20px 5px 0;
            }
        }
    }
}
</style>
