<template>
  <el-card>
    <template #header>
      <div class="clearfix">
        <span>个人信息</span>
      </div>
    </template>
    <div class="img-box">
      <UserImg />
      <p>{{ nickname }}</p>
    </div>
    <div class="experience">
      <div class="Education">
        <i class="el-icon-star-on"></i>
        爱好
        <el-divider></el-divider>
        <el-tag v-for="tag in tags" :key="tag.name">{{
          tag.name
        }}</el-tag>
      </div>
      <div class="Skills">
        <i class="el-icon-s-order"></i>
        技术
        <el-divider></el-divider>
        <Progress />
      </div>
    </div>
  </el-card>
</template>

<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import UserImg from '@/components/UserImg/index.vue'
import Progress from '@/components/Progress/index.vue'
import { computed, ref } from 'vue'

const tags = ref([
  { name: '唱', type: 'success' },
  { name: '跳', type: 'info' },
  { name: 'Rap', type: 'warning' },
  { name: '篮球', type: 'danger' }
])

const userStore = useUserStore()

const nickname = computed(() => {
  return userStore.state.nickname
})
</script>

<script lang="ts">
export default {
  name: 'InfoIndex'
}
</script>

<style lang="scss" scoped></style>
