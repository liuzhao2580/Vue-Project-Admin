<template>
    <div>
        <el-table :data="tableData" style="width: 100%">
            <template v-for="(headerItem, headerIndex) in headerData">
                <!-- 下拉框选择器 -->
                <el-table-column
                    v-if="headerItem.select"
                    :label="headerItem.label"
                    :prop="headerItem.prop"
                    :key="headerIndex"
                >
                    <!-- 表头的 slot -->
                    <template #header>
                        <el-popover placement="bottom" title="请选择" width="200" trigger="click">
                            <div slot="reference" class="search-header">
                                <span class="search-title">{{ headerItem.label }}</span>
                                <i class="search-icon el-icon-search"></i>
                            </div>
                            <el-select v-model="headerItem.selectValue" placeholder="请选择">
                                <el-option
                                    v-for="item in headerItem.selectOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value"
                                >
                                </el-option>
                            </el-select>
                        </el-popover>
                    </template>
                    <!-- 表格的 内容 slot -->
                    <template slot-scope="scope">
                        {{ scope.row[headerItem.prop] }}
                    </template>
                </el-table-column>
                <!-- 日期选择器 -->
                <el-table-column
                    v-else-if="headerItem.dateSelect"
                    :label="headerItem.label"
                    :prop="headerItem.prop"
                    :key="headerIndex"
                >
                    <template #header>
                        <el-popover placement="bottom" title="请选择" trigger="click">
                            <div class="search-header" slot="reference">
                                <span class="search-title">{{ headerItem.label }}</span>
                                <i class="el-icon-arrow-down search-icon"></i>
                            </div>
                            <el-date-picker
                                v-model="headerItem.dateValue"
                                type="daterange"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                            >
                            </el-date-picker>
                        </el-popover>
                    </template>
                    <template slot-scope="scope">
                        {{ scope.row[headerItem.prop] }}
                    </template>
                </el-table-column>
                <!-- 输入框 -->
                <el-table-column
                    v-else-if="headerItem.inputSelect"
                    :label="headerItem.label"
                    :prop="headerItem.prop"
                    :key="headerIndex"
                >
                    <template #header>
                        <el-popover placement="bottom" title="请选择" trigger="click">
                            <div slot="reference" class="search-header">
                                <span class="search-title">{{ headerItem.label }}</span>
                                <i class="search-icon el-icon-search"></i>
                            </div>
                            <el-input v-model="headerItem.inputValue" placeholder="请输入内容"></el-input>
                        </el-popover>
                    </template>
                    <template slot-scope="scope">
                        {{ scope.row[headerItem.prop] }}
                    </template>
                </el-table-column>
                <el-table-column v-else :label="headerItem.label" :prop="headerItem.prop" :key="headerIndex">
                </el-table-column>
            </template>
        </el-table>
        <el-button @click="confirm"> 确定 </el-button>
    </div>
</template>
<script>
export default {
    data() {
        return {
            headerData: [
                {
                    label: '日期',
                    prop: 'date',
                    dateSelect: true,
                    dateValue: '',
                },
                {
                    label: '名称',
                    prop: 'name',
                    inputSelect: true,
                    inputValue: '',
                },
                {
                    label: '类型',
                    prop: 'type',
                    select: true,
                    selectValue: '',
                    selectOptions: [
                        {
                            value: 'Vue',
                            label: 'Vue',
                        },
                        {
                            value: 'React',
                            label: 'React',
                        },
                        {
                            value: 'Angular',
                            label: 'Angular',
                        },
                    ],
                },
            ],
            tableData: [
                {
                    date: '2016-05-02',
                    name: '王小虎',
                    type: 'Vue',
                },
                {
                    date: '2016-05-04',
                    name: '王小虎',
                    type: 'React',
                },
                {
                    date: '2016-05-01',
                    name: '王小虎',
                    type: 'Angular',
                },
            ],
        }
    },
    created() {},
    mounted() {},
    methods: {
        confirm() {
            console.log(this.headerData, 'this.headerData')
        }
    },
}
</script>

<style lang="scss" scoped>
.search-header {
    cursor: pointer;
    .search-title {
        font-weight: 900;
        margin-right: 10px;
    }
    .search-icon {
        font-size: 16px;
    }
}
</style>
