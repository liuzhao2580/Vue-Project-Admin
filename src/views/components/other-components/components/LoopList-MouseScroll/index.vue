<template>
  <span class="title">可以使用鼠标上下滚动的滚动条</span>
  <div :class="['loop-list-box', data.loopListBoxClass]">
    <ul :class="['list-box', data.listBoxClass]">
      <li class="item" v-for="index in data.listLength" :key="index">
        {{ "小火车的车厢" + index }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
/** 可以使用鼠标上下滚动的滚动条 */
import { onMounted, shallowReactive, onUnmounted } from "vue"

interface IData {
  /** loop-list-box 的自定义 类名 */
  loopListBoxClass: string;
  /** list-box 的自定义 类名 */
  listBoxClass: string;
  loopListBox: HTMLDivElement | null;
  listBox: HTMLDivElement | null;
  item: HTMLDivElement | null;
  intervalId: undefined | NodeJS.Timer;
  listLength: number;
}

const data = shallowReactive<IData>({
  loopListBoxClass:
    "loop-list-box-" + (+new Date() + Math.floor(Math.random() * 1000)),
  listBoxClass: "list-box-" + (+new Date() + Math.floor(Math.random() * 1000)),
  loopListBox: null,
  listBox: null,
  item: null,
  intervalId: undefined,
  listLength: 50
})

let getListBoxHight = 0
let getLoopListBoxHeight = 0
let timeoutId: undefined | NodeJS.Timer = undefined
onMounted(() => {
  setTimeout(() => {
    init()
    getListBoxHight = data.listBox?.scrollHeight as number
    getLoopListBoxHeight = data.loopListBox?.offsetHeight as number
  }, 1000)
})

const init = () => {
  data.loopListBox = document.querySelector(`.${data.loopListBoxClass}`)
  data.listBox = document.querySelector(`.${data.listBoxClass}`)
  data.intervalId = setInterval(intervalEvent, 20)
}

function intervalEvent() {
  if (data.loopListBox && data.listBox) {
    if (data.loopListBox.scrollTop + getLoopListBoxHeight >= getListBoxHight) {
      data.loopListBox?.addEventListener("scroll", loopListScrollEvent)
      clearInterval(data.intervalId)
      data.intervalId = undefined
    } else {
      data.loopListBox.scrollTop++
    }
  }
}
function loopListScrollEvent() {
  if (data.intervalId) {
    clearTimeout(timeoutId)
    return
  }
  if (timeoutId) {
    clearTimeout(timeoutId)
    timeoutId = undefined
  }
  timeoutId = setTimeout(() => {
    timeoutId = undefined
    data.intervalId = setInterval(intervalEvent, 20)
  }, 500)
}
onUnmounted(() => {
  clearInterval(data.intervalId)
  data.intervalId = undefined
  data.loopListBox?.removeEventListener("scroll", loopListScrollEvent)
})
</script>

<script lang="ts">
export default {
  name: "LoopListMouseScroll"
}
</script>

<style scoped lang="scss">
.title {
  display: inline-block;
  margin-bottom: 20px;
}
.loop-list-box {
  height: 400px;
  overflow: auto;
  border: 1px solid #ccc;
  .list-box {
    padding: 0 20px;
    .item {
      text-align: center;
      padding-bottom: 10px;
    }
  }
}
</style>
