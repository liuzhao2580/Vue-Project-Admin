<template>
    <div class="article-list-box">
        <table-component :tableData="tableData" :tableConfig="tableConfig" />
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { queryArticleList_API } from "@/api/modules/article"
import { ResultCodeEnum } from "@/typescript/enum"
import { IArticleBasic } from "../share/interface/article-config.interface"
import tableComponent from "@/components/Table/index.vue"
import { TableConfigModel } from "@/typescript/model/tableModel/table-config.model"
import { ColumnTypeEnum, OperationTypeEnum } from "@/typescript/enum/table-enum"
@Component({
    name: "article-list",
    components: {
        tableComponent,
    },
})
export default class ArticleListComponent extends Vue {
    /** 表格的数据 */
    tableData: IArticleBasic[] = []
    /** 表格的列配置 */
    tableConfig: TableConfigModel = {
        loading: true,
        columnConfig: [
            {
                label: "文章标题",
                prop: "article_title",
            },
            {
                label: "创建时间",
                type: ColumnTypeEnum.dateTime,
                prop: "article_time",
            },
        ],
        operation: [
            {
                type: OperationTypeEnum.primary,
                text: "编辑",
                icon: "el-icon-edit",
                handle: () => {
                    console.log("123")
                },
            },
            {
                type: OperationTypeEnum.danger,
                text: "删除",
                icon: "el-icon-delete",
                handle: () => {
                    console.log(46, "123")
                },
            },
        ],
    }
    created() {
        this.init()
    }
    /** 初始化 */
    async init() {
        const result = await queryArticleList_API()
        if (result.code === ResultCodeEnum.success) {
            console.log(result, "data")
            this.tableData = result.data
        }
        this.tableConfig.loading = false
    }
    /** 初始化表格 */
    initTableConfig() {}
}
</script>

<style lang="scss" scoped></style>
