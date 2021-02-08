<template>
    <div class="table-component-box">
        <!-- 表格头部的盒子,用来填充左上角的按钮和右上角的功能按钮 -->
        <div class="table-top-box">
            <div class="operation-left"></div>
            <div class="operation-right">
                <!-- 打印 -->
                <span title="打印" @click="tablePrint" class="right-icon el-icon-printer"></span>
            </div>
        </div>
        <el-table
            style="width: 100%"
            class="table"
            v-loading="tableConfig.loading"
            :border="tableConfig.border !== false"
            :stripe="tableConfig.stripe !== false"
            :data="tableData"
            :header-cell-style="tableHeaderStyle"
        >
            <!-- 多选 -->
            <el-table-column type="selection" width="55" v-if="tableConfig.checkout">
            </el-table-column>
            <!-- 序号 -->
            <el-table-column
                type="index"
                label="序号"
                width="50"
                v-if="tableConfig.index !== false"
            >
            </el-table-column>
            <el-table-column
                :label="tableItem.label"
                :width="tableItem.width"
                v-for="(tableItem, tableIndex) in tableConfig.columnConfig"
                :key="tableIndex"
            >
                <template slot-scope="scope">
                    <!-- 时间,日期转换 -->
                    <span v-if="judgeTime(tableItem.type)"
                        >{{ handleTranslateTime(scope.row[tableItem.prop], tableItem.type) }}
                    </span>
                    <span v-else>{{ scope.row[tableItem.prop] }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template
                    :width="operaItem.width"
                    v-for="(operaItem, operaIndex) in tableConfig.operation"
                >
                    <el-tooltip
                        :key="operaIndex"
                        :content="operaItem.text"
                        placement="top"
                        effect="light"
                    >
                        <el-button
                            size="mini"
                            circle
                            :icon="operaIcon(operaItem.icon)"
                            :type="operaItem.type"
                            @click="operaHandle(operaItem.handle)"
                        ></el-button>
                    </el-tooltip>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator"
import moment from "moment"
import { TableConfigModel } from "@/typescript/model/tableModel/table-config.model"
import { ColumnTypeEnum } from "@/typescript/enum/table-enum"
@Component({
    name: "tableComponent",
})
export default class TableComponent extends Vue {
    /** 表格的数据 */
    @Prop({ required: true, type: Array, default: () => [] }) tableData!: Array<any>
    /** 表格的列配置 */
    @Prop({ required: true, type: Object, default: () => {} }) tableConfig!: TableConfigModel
    /** 表格的样式 */
    get tableHeaderStyle() {
        return { background: "#e0e0e0", color: "#333", fontWeight: 900 }
    }
    /** 表格的列 type 的类型 */
    ColumnTypeEnum!: ColumnTypeEnum
    /** 判断是否是时间type */
    judgeTime(type: ColumnTypeEnum) {
        return ColumnTypeEnum[type]
    }
    /** 处理时间 */
    handleTranslateTime(time: Date, type: ColumnTypeEnum) {
        let translateTime
        if (type === ColumnTypeEnum.time) {
            translateTime = moment(time).format("YYYY-MM-DD")
        } else if (type === ColumnTypeEnum.dateTime) {
            translateTime = moment(time).format("YYYY-MM-DD HH:mm:ss")
        }
        return translateTime
    }
    /** 表格的操作按钮的样式,可能是直接使用的 elementUI默认的icon ,也可能使用的是iconfont的字体图标 */
    operaIcon(icon: string) {
        if (icon.startsWith("el-icon")) {
            return icon
        } else return `iconfont ${icon}`
    }
    /** 表格按钮的操作 */
    operaHandle(handle) {
        handle()
    }
    /** 表格的打印 */
    tablePrint() {
        window.print()
    }
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
