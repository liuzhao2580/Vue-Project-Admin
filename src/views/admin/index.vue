<template>
  <div class="admin-page">
    <div class="admin-page-current">
      <span>当前角色权限为:</span>
      <span>{{ roleTransform }}</span>
    </div>
    <div class="admin-page-radio">
      <el-radio-group v-model="currentRole">
        <el-radio-button v-for="radioItem in roleList" :label="radioItem" :key="radioItem" />
      </el-radio-group>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCookie, CONST_VARIABLE } from '@/utils/cookies'
import { EnumFieldToTransform } from '@/utils'
import {
  UserRolesEnum,
  UserRolesTextEnum
} from '@/typescript/shared/enum/user-enum/user-roles.enum'
import { computed, ref } from 'vue'
const roleTransform = computed(() =>
  EnumFieldToTransform(
    UserRolesEnum,
    UserRolesTextEnum,
    getCookie(CONST_VARIABLE.ROLE_ID)
  )
)

const roleList = computed(()=> {
  return Object.values(UserRolesTextEnum)
})

const currentRole = ref(roleTransform.value)

</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.ADMIN
}
</script>

<style scoped lang="scss">
.admin-page{
  &-current {
    font-weight: 700;
  }
  &-radio {
    margin: 10px 0;
  }
}
</style>
