<template>
  <div class="personalCenter-box">
    <el-row :gutter="20">
      <!-- 个人信息 -->
      <el-col class="personal-info" :xs="24" :sm="12" :md="10" :lg="8">
        <Info />
      </el-col>
      <!-- 个人介绍 -->
      <el-col class="personal-introduce" :xs="24" :sm="12" :md="14" :lg="16">
        <Introduce />
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import Info from './Info/index.vue'
import Introduce from './Introduce/index.vue'

</script>

<script lang="ts">
export default {
  name: 'PersonalCenter'
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
