<template>
    <div class="table-component-box">
        <el-table
            :border="tableConfig.border !== false"
            :stripe="tableConfig.stripe !== false"
            :data="tableData"
            style="width: 100%"
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
                <template slot-scope="scope">
                    <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button
                    >
                    <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button
                    >
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
    /** 表格的列 type 的类型 */
    ColumnTypeEnum!: ColumnTypeEnum
    created() {}
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
}
</script>

<style lang="scss" scoped></style>
