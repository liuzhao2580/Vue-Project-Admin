<template>
  <el-card class="box-card">
    <el-tabs model-value="active">
      <el-tab-pane label="最近活跃" name="active">
        <active />
      </el-tab-pane>
      <el-tab-pane label="时间线" name="timeline">
        <timeline />
      </el-tab-pane>
      <el-tab-pane label="账号" name="account">
        <account />
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script lang="ts" setup>
import active from './active.vue'
import timeline from './timeline.vue'
import account from './account.vue'
</script>

<script lang="ts">
export default {
  name: 'PersonalIndex'
}
</script>

<style lang="scss" scoped></style>
