<template>
  <el-card>
    <template #header>
      <div class="clearfix">
        <span>个人信息</span>
      </div>
    </template>
    <div class="img-box">
      <UserImg />
      <p>
        <span class="info-title">用户名</span>
        <span class="info-data">
          {{ userInfo.nickName }}
        </span>
      </p>
      <p>
        <span class="info-title">角色</span>
        <span class="info-data">
          <i :class="['iconfont', iconName]"></i>
          {{ userInfo.roleName }}
        </span>
      </p>
    </div>
    <div class="experience">
      <div class="Education">
        <el-divider></el-divider>
        <i class="el-icon-star-on"></i>
        爱好
        <el-divider></el-divider>
        <el-tag v-for="tag in tags" :key="tag.name">{{ tag.name }}</el-tag>
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
import { useUserStore } from "@/store/user"
import UserImg from "@/components/UserImg/index.vue"
import Progress from "@/components/Progress/index.vue"
import { computed, ref, nextTick } from "vue"
import { UserRolesEnum } from "@/typescript/shared/enum/user-enum/user-roles.enum"
const tags = ref([
  { name: "唱", type: "success" },
  { name: "跳", type: "info" },
  { name: "Rap", type: "warning" },
  { name: "篮球", type: "danger" }
])
const iconName = ref("")

const userStore = useUserStore()

const userInfo = computed(() => {
  return userStore.state
})

nextTick(() => {
  switch (userStore.state.roleId) {
    case UserRolesEnum.superAdmin:
      iconName.value = "icon-super-admin"
      break

    case UserRolesEnum.admin:
      iconName.value = "icon-admin"
      break
    case UserRolesEnum.user:
      iconName.value = "icon-user"
      break
  }
})
</script>

<script lang="ts">
export default {
  name: "InfoIndex"
}
</script>

<style lang="scss" scoped></style>
