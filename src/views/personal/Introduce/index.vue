<template>
    <el-card class="box-card">
        <el-tabs value="active">
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

<script>
import active from './active'
import timeline from './timeline'
import account from './account'
export default {
  name: 'Introduce',
  components: {
    active,
    timeline,
    account
  },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
