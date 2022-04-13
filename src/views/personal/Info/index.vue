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
        <el-tag
          v-for="item in items"
          :key="item.label"
          :type="item.type"
          effect="dark"
          >{{ item.label }}</el-tag
        >
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
import { useStore } from '@/store'
import UserImg from '@/components/UserImg/index.vue'
import Progress from '@/components/Progress/index.vue'
import { computed } from 'vue'

const items = [
  { type: '', label: '唱' },
  { type: 'success', label: '跳' },
  { type: 'info', label: 'rap' },
  { type: 'danger', label: '篮球' },
  { type: 'warning', label: 'music' }
]

const store = useStore()

// const avatar = computed(() => {
//   return store.getters.user.avatar
// })

const nickname = computed(() => {
  return store.getters.user.nickname
})
</script>

<style lang="scss" scoped></style>
