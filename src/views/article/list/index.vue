<template>
    <div>article-list</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { queryArticleList_API } from "@/api/modules/article"
import { ResultCodeEnum } from "@/typescript/enum"
@Component({
    name: "article-list",
})
export default class ArticleListComponent extends Vue {
    created() {
        this.init()
    }
    /** 初始化 */
    async init() {
        try {
            const { data } = await queryArticleList_API()
            console.log(data, "data")
        } catch (error) {
            console.log(error, "error")
        }
    }
}
</script>

<style lang="scss" scoped></style>
