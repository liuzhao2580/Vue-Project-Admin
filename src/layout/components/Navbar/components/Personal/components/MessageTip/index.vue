<template>
  <el-popover
    :width="260"
    trigger="click"
    placement="bottom-end"
    popper-style="padding-bottom: 0px"
  >
    <template #reference>
      <span class="message-tip">
        <span class="tip-box">
          <span :class="['iconbell', msgTotal === 0 && 'no-message']"
            ><Bell
          /></span>
          <span class="message-num">{{ msgTotal }}</span>
        </span>
      </span>
    </template>
    <template #default>
      <el-tabs stretch v-model="activeName">
        <el-tab-pane :name="tab.name" v-for="tab in tabData" :key="tab.key">
          <template #label>
            <div class="label-box">
              <el-badge
                :value="tab.list.filter(item => !item.readFlag).length"
                :max="99"
              >
                <span class="label-title">{{ tab.label }}</span>
              </el-badge>
            </div>
          </template>
          <MessageList :list="tab.list" @readed="messageReaded"></MessageList>
        </el-tab-pane>
      </el-tabs>
      <footer class="list-footer">
        <span @click="allRead">全部已读</span>
        <span @click="clearMsg">清空</span>
      </footer>
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
        icon: "icon-happy",
        title: "你收到了5条新消息",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 4,
        icon: "icon-happy",
        title: "天青色等烟雨而我在等你",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 2,
        icon: "icon-happy",
        title: "雨下整夜我的爱溢出就像雨水",
        date: "2022-06-16",
        readFlag: false
      },
      {
        id: 3,
        icon: "icon-happy",
        title: "刮风这天我试过握着你手",
        date: "2022-06-07",
        readFlag: false
      },
      {
        id: 5,
        icon: "icon-happy",
        title:
          "你说把爱渐渐 放下会走更远 或许命运的签 只让我们遇见 只让我们相恋 这一季的秋天 飘落后才发现 这幸福的碎片要我怎么捡",
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
        icon: "icon-eat",
        title: "早上吃早餐",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 2,
        icon: "icon-eat",
        title: "中午吃中餐",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 3,
        icon: "icon-sleep",
        title: "晚上吃晚餐",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 4,
        icon: "icon-read",
        title: "多读书",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 5,
        icon: "icon-read",
        title: "多看报",
        date: "2022-06-17",
        readFlag: false
      },
      {
        id: 6,
        icon: "icon-happy",
        title: "少看手机,多睡觉,打工人对自己好点,快快乐乐开开心心才是福",
        date: "2022-06-17",
        readFlag: false
      }
    ]
  }
])

const msgTotal = computed(() => {
  let total = 0
  tabData.value.forEach(item => {
    item.list.forEach(listItem => {
      total += Number(!listItem.readFlag)
    })
  })
  return total
})

/** messageList 组件方法 */
function messageReaded(list: IList) {
  list.readFlag = true
}

/** 全部已读 */
function allRead() {
  tabData.value.filter(item=> {
    if(item.name === activeName.value) {
      item.list.forEach(Iitem=> Iitem.readFlag = true)
    }
  })
}
/** 清空 */
function clearMsg() {
  tabData.value.filter(item=> {
    if(item.name === activeName.value) {
      item.list = []
    }
  })
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
      &.no-message {
        animation: none;
      }
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
.label-box {
  .label-title {
    padding: 0 8px;
  }
  :deep(.el-badge__content.is-fixed) {
    top: 10px;
  }
}

.list-footer {
  display: flex;
  align-items: center;
  box-shadow: 0 0 20px #eee;
  margin-top: 10px;
  > span {
    width: 50%;
    text-align: center;
    padding: 8px 0;
    cursor: pointer;
    &:first-of-type {
      border-right: 1px solid #eee;
    }
  }
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
