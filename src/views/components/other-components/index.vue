<template>
  <div class="other-components">
    <el-row :gutter="10">
      <el-col :xs="24" :sm="8">
        <Calculator />
      </el-col>
      <el-col :xs="24" :sm="8">
        <between-time></between-time>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import BetweenTime from "./components/Between-time.vue"
@Component({
  name: "other-components",
  components: {
    Calculator: () => import("./components/Calculator.vue"),
    BetweenTime,
  },
})
export default class OtherComponents extends Vue {}
</script>

<style lang="scss" scoped></style>
