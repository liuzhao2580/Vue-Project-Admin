<template>
  <div class="admin-page">
    <div>
      <span>当前角色权限为:</span>
      <span>{{ roleTransform }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getCookie, CONST_VARIABLE } from '@/utils/cookies'
import { EnumFieldToTransform } from '@/utils/config'
import {
  UserRolesEnum,
  UserRolesTextEnum
} from '@/typescript/shared/enum/user-enum/user-roles.enum'
import { computed } from 'vue'
const roleTransform = computed(() =>
  EnumFieldToTransform(
    UserRolesEnum,
    UserRolesTextEnum,
    getCookie(CONST_VARIABLE.ROLE_ID)
  )
)
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.ADMIN
}
</script>

<style scoped lang="scss">
</style>
