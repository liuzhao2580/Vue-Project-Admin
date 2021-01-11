<template>
    <el-row :gutter="20">
        <!-- 当页面宽度为 768px 的时候显示 -->
        <el-col class="hidden-sm-and-up" :xs="24">
            <div>title2</div>
        </el-col>
        <el-col :xs="24" :sm="18">
            <content-editor></content-editor>
        </el-col>
        <!-- 当页面的宽度 为 768 px的时候隐藏 -->
        <el-col class="hidden-xs-only" :sm="6">
            <big-screen-title></big-screen-title>
        </el-col>
    </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import ContentEditor from './components/Content-editor.vue'
import BigScreenTitle from './components/Big-screen-title.vue'
import { EventBus } from '../share/utils/EventBus'
@Component({
    name: 'created',
    components: {
        ContentEditor,
        BigScreenTitle
    }
})
export default class CreateArticle extends Vue {
    beforeDestroy() {
        /** 清除所有事件总线 */
        EventBus.$off()
    }
}
</script>

<style lang="scss" scoped></style>
