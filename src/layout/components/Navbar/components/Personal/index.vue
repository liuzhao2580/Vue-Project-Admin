<template>
  <div class="personal-box">
    <!-- 切换全局样式 -->
    <el-tooltip content="主题样式" placement="bottom" effect="light">
      <ThemeChange class="icon-item" />
    </el-tooltip>
    <!-- 消息提示框 -->
    <el-tooltip content="消息提醒" placement="bottom" effect="light">
      <span class="icon-item">
        <MessageTip />
      </span>
    </el-tooltip>

    <!-- 个人头像下拉选 -->
    <el-dropdown @command="handleCommand" class="personal-box-dropdown">
      <span style="display: inline-block">
        <el-avatar :src="avatar"></el-avatar>
        <el-icon class="el-icon--right"><ArrowDown /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item
            v-for="(item, index) in dropdownList"
            :key="index"
            :command="item.command"
            :divided="item.dividedFlag"
            :icon="item.icon"
          >
            {{ item.title }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
import { Component, computed, shallowRef } from "vue"
import { useRouter } from "vue-router"
import { removeCookie, CONST_VARIABLE } from "@/utils/modules/cookies"
import { resetRouter } from "@/router"
import { useUserStore } from "@/store/user"
import { RouterPath } from "@/router/RouteConst"
import {
  User,
  HomeFilled,
  Document,
  SwitchButton,
  Guide,
  ArrowDown
} from "@element-plus/icons-vue"
import MessageTip from "./components/MessageTip/index.vue"
import ThemeChange from "./components/ThemeChange/index.vue"

const store = useUserStore()

const router = useRouter()

interface IRef {
  command: string
  title: string
  icon: Component
  dividedFlag?: boolean
}

const dropdownList = shallowRef<IRef[]>([
  {
    command: RouterPath.PERSONAL,
    title: "个人中心",
    icon: User
  },
  {
    command: RouterPath.DASHBOARD,
    title: "首页",
    icon: HomeFilled
  },
  {
    command: RouterPath.DOCUMENTATION,
    title: "文档",
    icon: Document
  },
  {
    command: "https://github.com/liuzhao2580/Vue_project",
    title: "GitHub",
    icon: Guide
  },
  {
    command: RouterPath.LOGIN,
    title: "退出登录",
    icon: SwitchButton,
    dividedFlag: true
  }
])

const avatar = computed(() => {
  return store.state.avatar
})
// 登出
const login_Out = () => {
  removeCookie(CONST_VARIABLE.TOKEN)
  removeCookie(CONST_VARIABLE.USER_ID)
  // 重置 路由
  resetRouter()
  router.push({ path: RouterPath.LOGIN })
}
const handleCommand = (command: string) => {
  if (command === RouterPath.LOGIN) {
    login_Out()
  } else if (/http(s?):/.test(command)) {
    window.open(command)
  } else {
    router.push({ path: command })
  }
}
</script>

<script lang="ts">
export default {
  name: "PersonalCom"
}
</script>

<style lang="scss" scoped>
.personal-box {
  margin-right: 10px;
  display: flex;
  .icon-item {
    display: flex;
    align-items: center;
    width: 20px;
    cursor: pointer;
    box-sizing: content-box;
    padding: 0 8px;
    &:hover {
      background-color: #f6f6f6;
    }
  }
  :deep(.el-avatar) {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &-dropdown {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
