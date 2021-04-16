<template>
  <div class="back-to-top-box">
    <ul
      class="infinite-list"
      v-infinite-scroll="load"
      style="overflow:auto;height: 500px"
    >
      <li v-for="i in count" class="infinite-list-item" :key="i">{{ i }}</li>
    </ul>
    <el-backtop target=".infinite-list">
      <svg-icon iconClass="backtop"></svg-icon>
    </el-backtop>
  </div>
</template>

<script>
export default {
  name: "back-to-top",
  components: {},
  props: {},
  data() {
    return {
      count: 0,
    }
  },
  created() {},
  mounted() {},
  methods: {
    load() {
      this.count += 2
    },
  },
  watch: {},
}
</script>

<style lang="scss" scoped></style>
