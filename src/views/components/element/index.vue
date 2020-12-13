<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="12">
                <!-- 多选表格实现单选 -->
                <span>多选表格实现单选</span>
                <table-checkout />
            </el-col>
            <el-col :span="12">
                <!-- 自定义表头 -->
                <span>自定义表头</span>
                <table-header />
            </el-col>
        </el-row>
    </div>
</template>

<script>
import tableCheckout from './components/table-checkout'
import tableHeader from './components/table-header'
export default {
    name: 'element-components',
    components: {
        tableCheckout,
        tableHeader
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