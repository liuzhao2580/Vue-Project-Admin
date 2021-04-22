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

<script>
import Info from "./Info"
import Introduce from "./Introduce"
export default {
  name: "personalCenter",
  components: {
    Info,
    Introduce,
  },
  props: {},
  data() {
    return {}
  },
  created() {},
  mounted() {},
  methods: {},
  watch: {},
}
</script>

<style lang="scss" scoped>
@import "./index.scss";
</style>
