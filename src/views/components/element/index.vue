<template>
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
</template>

<script lang="ts" setup>
import tableCheckout from "./components/table-checkout.vue"
import tableHeader from "./components/table-header.vue"
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
export default {
  name: RouterName.ELEMENT
}
</script>

<style lang="scss" scoped></style>
