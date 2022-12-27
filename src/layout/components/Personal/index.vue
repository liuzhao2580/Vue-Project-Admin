<template>
  <div class="Personal-box">
    <!-- 切换全局样式 -->
    <el-switch
      v-model="switchGlobal"
      inline-prompt
      :active-value="switchStyleGlobal.light"
      :inactive-value="switchStyleGlobal.dark"
      :active-icon="Sunny"
      :inactive-icon="Moon"
      class="Personal-box-switch"
      active-color="#b2b2b2"
      inactive-color="#333"
      @change="switchChange"
    />
    <el-dropdown @command="handleCommand" class="Personal-box-dropdown">
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
import { Component, computed, onMounted, ref, shallowRef } from "vue";
import { useRouter } from "vue-router";
import { removeCookie, CONST_VARIABLE } from "@/utils/modules/cookies";
import { resetRouter } from "@/router";
import { useUserStore } from "@/store/user";
import { RouterPath } from "@/router/RouteConst";
import {
  User,
  HomeFilled,
  Document,
  SwitchButton,
  Guide,
  ArrowDown,
  Sunny,
  Moon
} from "@element-plus/icons-vue";

const store = useUserStore();

const router = useRouter();

interface IRef {
  command: string;
  title: string;
  icon: Component;
  dividedFlag?: boolean;
}

enum switchStyleGlobal {
  light = "light",
  dark = "dark"
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
]);

/** 获取 html dom元素 */
const htmlDom = ref<HTMLHtmlElement>();

/** 全局的样式切换 */
const switchGlobal = ref<switchStyleGlobal>(switchStyleGlobal.light);

onMounted(() => {
  htmlDom.value = document.querySelector("html") as HTMLHtmlElement;
});

const avatar = computed(() => {
  return store.state.avatar;
});
// 登出
const login_Out = () => {
  removeCookie(CONST_VARIABLE.TOKEN);
  removeCookie(CONST_VARIABLE.USER_ID);
  // 重置 路由
  resetRouter();
  router.push({ path: RouterPath.LOGIN });
};
const handleCommand = (command: string) => {
  if (command === RouterPath.LOGIN) {
    login_Out();
  } else if (/http(s?):/.test(command)) {
    window.open(command);
  } else {
    router.push({ path: command });
  }
};

type switchStyleGlobalType = switchStyleGlobal | string | number | boolean;

/** 全局样式 switch 改变事件 */
const switchChange = (val: switchStyleGlobalType) => {
  if (!htmlDom.value) return;
  if (val === switchStyleGlobal.light) {
    htmlDom.value.className = "";
  } else if (val === switchStyleGlobal.dark) {
    htmlDom.value.className = switchStyleGlobal.dark;
  }
};
</script>

<script lang="ts">
export default {
  name: "PersonalCom"
};
</script>

<style lang="scss" scoped>
.Personal-box {
  margin-right: 10px;
  display: flex;
  align-items: center;
  :deep(.el-avatar) {
    width: 50px;
    height: 50px;
    img {
      width: 100%;
    }
  }
  &-dropdown {
    margin-left: 10px;
    cursor: pointer;
  }
}
</style>
