<template>
  <div class="account-box">
    <el-form label-position="left" label-width="80px" :model="form_account">
      <el-form-item label="名称">
        <el-input v-model="form_account.name"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="form_account.Email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">更新数据</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { useUserStore } from "@/store/user"
import { computed, ref } from "vue"
const userStore = useUserStore()
const nickname = computed(() => {
  return userStore.state.nickname
})
const form_account = ref({
  name: nickname,
  Email: "liuzhao2580"
})
</script>

<script lang="ts">
export default {
  name: "UserAccount"
}
</script>

<style lang="scss" scoped></style>
