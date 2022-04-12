<template>
  <div class="other-components">
    <el-row :gutter="10">
      <!-- 计算器 -->
      <el-col :xs="24" :sm="8">
        <Calculator />
      </el-col>
      <!-- 计算两者的时间 -->
      <el-col :xs="24" :sm="8">
        <Between-time />
      </el-col>
      <!-- 点击出现水波纹效果 -->
      <el-col :xs="24" :sm="8">
        <Css-component />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BetweenTime from './components/Between-time.vue'
import CssComponent from './components/CssComponent/index.vue'
@Component({
  name: 'other-components',
  components: {
    Calculator: () => import('./components/Calculator.vue'),
    BetweenTime,
    CssComponent
  }
})
export default class OtherComponents extends Vue {}
</script>

<style lang="scss" scoped>
.other-components {
  .el-col {
    margin-bottom: 10px;
  }
}
</style>
