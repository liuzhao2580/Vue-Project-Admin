<template>
  <span class="title">无限自动滚动</span>
  <div :class="['loop-list-box', data.loopListBoxClass]" @mouseenter="loopListBoxMouseEnter" @mouseleave="loopListBoxMouseLeave">
    <ul :class="['list-box', data.listBoxClass]">
      <li class="item" v-for="item in list" :key="item.id">
        {{ "小火车的车厢" + item.id }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowReactive, onUnmounted, ref } from "vue"

interface IData {
  /** loop-list-box 的自定义 类名 */
  loopListBoxClass: string;
  /** list-box 的自定义 类名 */
  listBoxClass: string;
  loopListBox: HTMLDivElement | null;
  listBox: HTMLDivElement | null;
  item: HTMLDivElement | null;
  intervalId: undefined | NodeJS.Timer;
}

const data = shallowReactive<IData>({
  loopListBoxClass:
    "loop-list-box-" + (+new Date() + Math.floor(Math.random() * 1000)),
  listBoxClass: "list-box-" + (+new Date() + Math.floor(Math.random() * 1000)),
  loopListBox: null,
  listBox: null,
  item: null,
  intervalId: undefined
})

const list = ref([
  {
    id: 1,
    name: "list"
  },
  {
    id: 2,
    name: "list"
  },
  {
    id: 3,
    name: "list"
  },
  {
    id: 4,
    name: "list"
  },
  {
    id: 5,
    name: "list"
  },
  {
    id: 6,
    name: "list"
  },
  {
    id: 7,
    name: "list"
  },
  {
    id: 8,
    name: "list"
  },
  {
    id: 9,
    name: "list"
  },
  {
    id: 10,
    name: "list"
  },
  {
    id: 11,
    name: "list"
  }
])
let loopScroll = 1
let itemHeight = 0
let intervalTime = 10

onMounted(() => {
  setTimeout(() => {
    init()
  }, 1000)
})

const init = () => {
  data.loopListBox = document.querySelector(`.${data.loopListBoxClass}`)
  data.listBox = document.querySelector(`.${data.listBoxClass}`)
  data.intervalId = setInterval(intervalEvent, intervalTime)
  itemHeight = data.listBox?.firstElementChild?.clientHeight as number
}

function intervalEvent() {
  if (data.loopListBox) {
    data.loopListBox.scrollTop++
    loopScroll++
    if (loopScroll === itemHeight) {
      const getItem = list.value.splice(0, 1)
      list.value.push(...getItem)
      loopScroll = 0
    }
  }
}
onUnmounted(() => {
  clearInterval(data.intervalId)
  data.intervalId = undefined
})

function loopListBoxMouseEnter() {
  clearInterval(data.intervalId)
  data.intervalId = undefined
}

function loopListBoxMouseLeave() {
  data.intervalId = setInterval(intervalEvent, intervalTime)
}
</script>

<script lang="ts">
export default {
  name: "LoopList"
}
</script>

<style scoped lang="scss">
.title {
  display: inline-block;
  margin-bottom: 20px;
}
.loop-list-box {
  height: 400px;
  overflow: hidden;
  border: 1px solid #ccc;
  .list-box {
    padding: 20px;
    .item {
      height: 80px;
      text-align: center;
      padding-bottom: 10px;
    }
  }
}
</style>
