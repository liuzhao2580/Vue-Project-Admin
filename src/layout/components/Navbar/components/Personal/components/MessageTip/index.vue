<template>
  <el-popover
    :width="240"
    trigger="click"
    placement="bottom-start"
    popper-style="padding-bottom: 0px"
  >
    <template #reference>
      <span class="message-tip">
        <span class="tip-box">
          <span class="iconbell"><Bell /></span>
          <span class="message-num">{{ msgTotal }}</span>
        </span>
      </span>
    </template>
    <template #default>
      <el-tabs stretch v-model="activeName" class="demo-tabs">
        <el-tab-pane :name="tab.name" v-for="tab in tabData" :key="tab.key">
          <template #label>
            <el-badge :value="tab.list.filter(item => !item.readFlag).length" :max="99" class="item">
              <span class="label-title">{{ tab.name }}</span>
            </el-badge>
          </template>
          <MessageList :list="tab.list" @readed="messageReaded"></MessageList>
        </el-tab-pane>
      </el-tabs>
    </template>
  </el-popover>
</template>

<script setup lang="ts">
// 消息
import { computed, ref } from "vue"
import { Bell } from "@element-plus/icons-vue"
import MessageList from "./MessageListCom.vue"

const activeName = ref("notice")
interface IList {
  id: number
  icon: string
  title: string
  date: string
  readFlag: boolean
}
const tabData = ref([
  {
    key: 1,
    label: "通知",
    name: "notice",
    badgeProps: { type: "warning" },
    list: [
      {
        id: 1,
        icon: "ri:message-3-line",
        title: "你收到了5条新消息",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 4,
        icon: "ri:message-3-line",
        title: "Soybean Admin 1.0.0 版本正在筹备中",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 2,
        icon: "ri:message-3-line",
        title: "Soybean Admin 0.9.6 版本发布了",
        date: "2022-06-16",
        readFlag: false
      },
      {
        id: 3,
        icon: "ri:message-3-line",
        title: "Soybean Admin 0.9.5 版本发布了",
        date: "2022-06-07",
        readFlag: false
      },
      {
        id: 5,
        icon: "ri:message-3-line",
        title:
          "测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题测试超长标题",
        date: "2022-06-17",
        readFlag: false
      }
    ]
  },
  {
    key: 2,
    label: "待办",
    name: "todo",
    badgeProps: { type: "info" },
    list: [
      {
        id: 1,
        icon: "ri:calendar-todo-line",
        title: "缓存主题配置",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 2,
        icon: "ri:calendar-todo-line",
        title: "添加锁屏组件、全局Iframe组件",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 3,
        icon: "ri:calendar-todo-line",
        title: "示例页面完善",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 4,
        icon: "ri:calendar-todo-line",
        title: "表单、表格示例",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 5,
        icon: "ri:calendar-todo-line",
        title: "性能优化(优化递归函数)",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 6,
        icon: "ri:calendar-todo-line",
        title: "精简版(新分支thin)",
        date: "2022-06-17",
        readFlag: false
      }
    ]
  }
])

const msgTotal = computed(()=> {
  let total = 0
  tabData.value.forEach(item => {
    total += item.list.length
  })
  return total
})

/** messageList 组件方法 */
function messageReaded(list: IList) {
  list.readFlag = true
}
</script>

<script lang="ts">
export default {
  name: "MessageTip"
}
</script>

<style scoped lang="scss">
.message-tip {
  height: 100%;
  display: flex;
  align-items: center;
  .tip-box {
    position: relative;
    .iconbell {
      display: inline-block;
      width: 18px;
      height: 18px;
      vertical-align: middle;
      animation: bellAnimation 1s infinite;
    }
    .message-num {
      position: absolute;
      top: 0%;
      right: 5px;
      background-color: red;
      font-size: 12px;
      padding: 0 5px;
      border-radius: 8px;
      color: #fff;
      transform: translateY(-50%) translate(100%);
    }
  }
}
.label-title {
  padding: 0 10px;
}

@keyframes bellAnimation {
  0% {
    transform: rotate(0);
  }
  10% {
    transform: rotate(25deg);
  }
  20% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(-25deg);
  }
  40% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(25deg);
  }
  55% {
    transform: rotate(0deg);
  }
  60% {
    transform: rotate(-10deg);
  }
  65% {
    transform: rotate(0deg);
  }
  70% {
    transform: rotate(10deg);
  }
  75% {
    transform: rotate(0deg);
  }
  80% {
    transform: rotate(-10deg);
  }
  85% {
    transform: rotate(0deg);
  }
  90% {
    transform: rotate(10deg);
  }
  95% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(10deg);
  }
}
</style>
