<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <!-- 点击表格选中选择框 -->
                <span>点击表格选中选择框</span>
                <table-checkout />
            </el-col>
            <el-col :span="6">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import tableCheckout from './components/table-checkout'
export default {
    name: 'element-components',
    components: {
        tableCheckout
    },
    props: {},
    computed: {},
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {}
}
</script>

<style lang="scss" scoped>
</style>