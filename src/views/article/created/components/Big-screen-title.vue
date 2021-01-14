<template>
    <div class="big-screen-title">
        <!-- 文章标题 -->
        <div class="title-input">
            <el-input
                placeholder="请输入文章标题"
                class="article-title"
                v-model="titleValue"
            ></el-input>
        </div>
        <!-- 文章分类 -->
        <div class="article-category">
            <el-cascader v-model="categoryValue" :props="categoryCascaderProps"></el-cascader>
        </div>
        <!-- 预览按钮 -->
        <div class="button-box">
            <el-button type="primary" :disabled="disabled" @click="dialogVisible = true"
                >预览</el-button
            >
            <el-button @click="serttin">设置</el-button>
        </div>
        <el-dialog
            title="文章预览"
            :visible.sync="dialogVisible"
            width="70%"
            :close-on-click-modal="false"
            class="article-dialog-box"
        >
            <!-- 文章标题 -->
            <div class="article-title">{{ titleValue }}</div>
            <!-- 文章分类 -->
            <div class="article-name">文章分类： {{ categoryName }}</div>
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
    categoryValue: number[] = [1,2]
    /** 文章分类 选中项 name */
    categoryName: string = ''
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

    serttin() {
        console.log(this.categoryValue, 'this.')
    }
    mounted() {
        this.init_EventBus()
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
    async queryArticleCategory() {}
    /** 文章分类 的级联选择器 */
    categoryCascaderProps = {
        lazy: true,
        async lazyLoad(node: any, resolve: any) {
            console.log(node, 'node')
            const { level, data: nodeData } = node
            const params = {
                id: nodeData ? nodeData.id : null,
                level: level + 1
            }
            const { data } = await queryArticleCategory_API(params)
            if (data.code === ResultCodeEnum.success) {
                if (data.data.length === 0) {
                    node.data.leaf = true
                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                    return resolve(node)
                } else {
                    const nodes = data.data.map((item: any) => {
                        return {
                            value: item.id,
                            label: item.category_name,
                            id: item.id,
                            leaf: data.hasChildren
                        }
                    })
                    // 通过调用resolve将子节点数据返回，通知组件数据加载完成
                    resolve(nodes)
                }
            }
        }
    }

    /** 文章分类改变事件 */
    categoryChange(value: string) {
        console.log(value, 'value')
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
    padding: 16px;
    border: 1px solid #c0c0c0;
    border-radius: 5px;
    .title-input {
        margin-bottom: 10px;
    }
}
.article-title {
    font-size: 24px;
    font-weight: 900;
}
// 分类
.article-category {
    .article-item {
        margin: 5px;
    }
}
// 预览按钮
.button-box {
    margin-top: 10px;
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
}
</style>
