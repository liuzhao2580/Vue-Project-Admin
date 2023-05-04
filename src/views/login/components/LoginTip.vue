<template>
  <div class="login-tip">
    <el-skeleton
      :loading="userList.length === 0"
      animated
    ></el-skeleton>
    <ul>
      <li class="user-item" v-for="user in userList" :key="user.id">
        <span>用户名: <CopyContent :copy-text="user.userName" /></span>
        <span>密码: {{ user.password }}</span>
        <span>权限: {{ user.roleName }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import CopyContent from "@/components/CopyContent/index.vue"
import { IUserBaseInfo } from "@/typescript/shared/interface/user-interface"

interface IProps {
  userList: IUserBaseInfo[]
}

defineProps<IProps>()

</script>

<script lang="ts">
export default {
  name: "LoginTip"
}
</script>

<style scoped lang="scss">
.login-tip {
  .user-item {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin-bottom: 10px;
  }
}
</style>
