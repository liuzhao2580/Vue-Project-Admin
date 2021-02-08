<template>
    <div>
        <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @row-click="handleRowClick"
            @selection-change="handleSelectionChange"
            @select="handleSelect"
        >
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="日期" width="120">
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="姓名" width="120"></el-table-column>
            <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    components: {},
    props: {},
    computed: {},
    data() {
        return {
            tableData: [
                {
                    id: 1,
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    id: 2,
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    id: 3,
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    id: 4,
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
                {
                    id: 5,
                    date: "2016-05-08",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄",
                },
            ],
            multipleSelection: [],
        }
    },
    created() {},
    mounted() {},
    methods: {
        // 当用户手动勾选数据行的 Checkbox 时触发的事件
        handleSelect(selection, row) {
            // 1. 说明当前是选中状态, 需要取消当前的选中状态
            if (selection.length === 0) return
            // 2. 取消其他选中的单元格
            this.$refs.multipleTable.clearSelection()
            // 3. 再选中当前点击的列
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        /** 当某一行被点击时会触发该事件
         * @param {toggleRowSelection(row, selected)} 用于多选表格，切换某一行的选中状态,
         * 如果使用了第二个参数，则是设置这一行选中与否 （selected 为 true 则选中）
         */
        handleRowClick(row) {
            // 1. 获取选中的表格数据
            const getChanged = this.multipleSelection
            // 2. 说明当前是选中状态, 需要取消当前的选中状态
            const getFlag = getChanged.find((item) => item === row)
            if (getFlag) return this.$refs.multipleTable.toggleRowSelection(row, false)
            // 3. 取消其他选中的单元格
            this.$refs.multipleTable.clearSelection()
            // 4. 再选中当前点击的列
            this.$refs.multipleTable.toggleRowSelection(row)
        },
        // 当选择项发生变化时会触发该事件
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
    },
}
</script>

<style lang="scss" scoped></style>
