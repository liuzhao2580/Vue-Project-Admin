<template>
  <div class="other-components">
    <el-row :gutter="20">
      <el-col :xs="24" :sm="12">
        <!-- 计算两者的时间 -->
        <BetweenTime style="margin-top: 20px" />
      </el-col>
      <!-- 点击出现水波纹效果 -->
      <el-col :xs="24" :sm="12">
        <span style="cursor: pointer" @click="() => num++"
          >爷爷组件的值{{ num }} provide修改</span
        >
        <CssComponent />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col>
        <!-- 计算器 -->
        <Calculator />
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :xs="24" :sm="6">
        <LoopListMouseScroll />
      </el-col>
      <el-col :xs="24" :sm="6">
        <LoopList />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { computed, provide, ref } from "vue"
import BetweenTime from "./components/Between-time.vue"
import CssComponent from "./components/CssComponent/index.vue"
import Calculator from "./components/Calculator.vue"
import LoopListMouseScroll from "./components/LoopList-MouseScroll/index.vue"
import LoopList from "./components/LoopList/index.vue"
const num = ref(0)
provide(
  "numberValue",
  computed(() => num.value)
)
</script>

<script lang="ts">
import { RouterName } from "@/router/RouteConst"
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
