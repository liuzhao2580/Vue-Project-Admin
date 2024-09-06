<template>
  <el-config-provider :locale="locale" :message="{
    max: 1
  }" :button="{ autoInsertSpace: true }">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
export default {
  name: "App",
  data() {
    return {
      locale: zhCn
    }
  }
}
</script>
