<template>
  <div class="loop-list-box">
    <ul class="list-box">
      <li class="item" v-for="index in data.listLength" :key="index">
        {{ "小火车的车厢" + index }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowReactive, onUnmounted } from "vue";

interface IData {
  loopListBox: HTMLDivElement | null;
  listBox: HTMLDivElement | null;
  item: HTMLDivElement | null;
  intervalId: undefined | NodeJS.Timer;
  listLength: number;
}

const data = shallowReactive<IData>({
  loopListBox: null,
  listBox: null,
  item: null,
  intervalId: undefined,
  listLength: 50
});

let getListBoxHight = 0;
let getLoopListBoxHeight = 0;
let timeoutId: undefined | NodeJS.Timer = undefined;
onMounted(() => {
  setTimeout(() => {
    init();
    getListBoxHight = data.listBox?.scrollHeight as number;
    getLoopListBoxHeight = data.loopListBox?.offsetHeight as number;
  }, 1000);
});

const init = () => {
  data.loopListBox = document.querySelector(".loop-list-box");
  data.listBox = document.querySelector(".list-box");
  data.item = document.querySelector(".item");
  data.intervalId = setInterval(intervalEvent, 20);
};

function intervalEvent() {
  if (data.loopListBox && data.listBox) {
    if (data.loopListBox.scrollTop + getLoopListBoxHeight >= getListBoxHight) {
      data.loopListBox?.addEventListener("scroll", loopListScrollEvent);
      clearInterval(data.intervalId);
      data.intervalId = undefined;
    } else {
      data.loopListBox.scrollTop++;
    }
  }
}
function loopListScrollEvent() {
  if(data.intervalId) {
    clearTimeout(timeoutId);
    return;
  }
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = undefined;
  }
  timeoutId = setTimeout(() => {
    timeoutId = undefined;
    data.intervalId = setInterval(intervalEvent, 20);
  }, 500);
}
onUnmounted(() => {
  clearInterval(data.intervalId);
  data.intervalId = undefined;
  data.loopListBox?.removeEventListener("scroll", loopListScrollEvent);
});
</script>

<script lang="ts">
export default {
  name: "LoopList",
  desc$: "滚动的路线图"
};
</script>

<style scoped lang="scss">
.loop-list-box {
  height: 400px;
  overflow: auto;
  transition: all 1s;
  .list-box {
    padding: 0 20px;
    .item {
      text-align: center;
      padding-bottom: 10px;
    }
  }
}
</style>
