<template>
  <div class="get-between-time">
    <p class="title">根据选择的时间，获取中间的间隔时间</p>
    <el-date-picker
      v-model="datePValue"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      @change="dateChange"
      value-format="yyyy-MM-DD"
    >
    </el-date-picker>
  </div>
</template>
<script>
export default {
  name: 'GetBetweenTime',
  data() {
    return {
      datePValue: null
    }
  },
  created() {},
  mounted() {},
  methods: {
    dateChange(value) {
      console.log(value, 'value')
    }
  }
}
</script>

<style lang="scss" scoped>
.get-between-time {
  margin: 10px 0;
  .title {
    margin: 10px 0;
  }
}
</style>
