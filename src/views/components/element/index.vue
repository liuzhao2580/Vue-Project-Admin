<template>
    <el-row>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
                <!-- 多选表格实现单选 -->
                <span>多选表格实现单选</span>
                <table-checkout />
            </el-col>
            <el-col :xs="24" :sm="12">
                <!-- 自定义表头 -->
                <span>自定义表头</span>
                <table-header />
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :xs="24" :sm="12">
                <get-between-time />
            </el-col>
        </el-row>
    </el-row>
</template>

<script>
import tableCheckout from './components/table-checkout'
import tableHeader from './components/table-header'
import GetBetweenTime from './components/GetBetweenTime'
export default {
  name: 'element-components',
  components: {
    tableCheckout,
    tableHeader,
    GetBetweenTime,
  },
  props: {},
  computed: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
}
</script>

<style lang="scss" scoped>
</style>