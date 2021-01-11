<template>
    <div class="big-screen-title">
        <div class="title-input">
            <el-input placeholder="请输入文章标题" v-model="titleValue"></el-input>
        </div>
        <div class="button-box">
            <el-button type="primary" :disabled="disabled">发布</el-button>
            <el-button type="primary" :disabled="disabled" @click="previewBtn">预览</el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { EventBus } from '../../share/utils/EventBus'
@Component({})
/** 大屏幕 下的 标题 */
export default class BigScreenTitle extends Vue {
    /** 按钮是否禁用 */
    btnDisabled: boolean = true

    /** 文章标题 */
    titleValue: string = ''

    /** 文章内容 */
    articleContainer: HTMLDocument | undefined

    /** 发布按钮和预览按钮禁用取消 */
    get disabled(): boolean {
        let flag: boolean = false
        if (this.btnDisabled || !this.titleValue) flag = true
        return flag
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

    /** 预览按钮触发 */
    previewBtn(): void {
        console.log(this.articleContainer)
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
</style>
