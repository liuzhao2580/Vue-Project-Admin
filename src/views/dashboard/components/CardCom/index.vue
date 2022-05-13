<template>
  <el-row :gutter="20">
    <el-col
      v-for="index in 4"
      :xs="24"
      :sm="12"
      :md="12"
      :lg="6"
      :xl="6"
      :key="index"
      class="box-card"
    >
      <div class="card-item">
        <div class="img">
          <img v-img-rotote src="~@/assets/images/funny.png" />
        </div>
        <div class="text-title lineEllipsisOne">小火车况且况且</div>
      </div>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
</script>

<script lang="ts">
export default {
  name: 'CardCom'
}
</script>

<style lang="scss" scoped>
.box-card {
  margin-bottom: 10px;
  &:last-of-type {
    margin-bottom: 0;
  }
  .card-item {
    display: flex;
    align-items: center;
    box-shadow: 0px 1px 5px #999;
    border-radius: 5px;
    .img {
      width: 30%;
      img {
        border-radius: 50%;
        width: 100%;
      }
    }
    .text-title {
      flex: 1;
    }
  }
}
</style>
