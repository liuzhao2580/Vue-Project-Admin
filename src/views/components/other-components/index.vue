<template>
  <div class="other-components">
    <el-row :gutter="10">
      <!-- 计算器 -->
      <el-col :xs="24" :sm="8">
        <Calculator />
      </el-col>
      <!-- 计算两者的时间 -->
      <el-col :xs="24" :sm="8">
        <BetweenTime />
      </el-col>
      <!-- 点击出现水波纹效果 -->
      <el-col :xs="24" :sm="8">
        <CssComponent />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import BetweenTime from './components/Between-time.vue'
import CssComponent from './components/CssComponent/index.vue'
import Calculator from './components/Calculator.vue'
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.OTHER_COMPONENTS
}
</script>

<style lang="scss" scoped>
.other-components {
  .el-col {
    margin-bottom: 10px;
  }
}
</style>
