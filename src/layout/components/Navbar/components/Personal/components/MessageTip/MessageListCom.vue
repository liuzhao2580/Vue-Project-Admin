<template>
  <ul class="list-box" ref="listBoxRef">
    <li
      class="list-item"
      v-for="item in list"
      :key="item.id"
      @click="listItemClick(item)"
    >
      <div class="left"><ChatLineSquare /></div>
      <div class="right">
        <div class="title lineEllipsisOne">
          这些都是测试的数据哟,大阿达哒哒哒!!!
        </div>
        <div class="time">
          {{ dayjs(new Date()).format("YYYY-MM-DD hh:ss:mm") }}
        </div>
      </div>
    </li>
  </ul>
  <footer class="list-footer">
    <span>全部已读</span>
    <span>清空</span>
  </footer>
</template>

<script setup lang="ts">
import { ref } from "vue"
import dayjs from "dayjs"
import { ChatLineSquare } from "@element-plus/icons-vue"

interface IList {
  id: number
  icon: string
  title: string
  date: string
}

interface IProps {
  list: IList[]
}

defineProps<IProps>()

const emits = defineEmits<{
  (e: "readed", item: IList): void;
}>()

const listBoxRef = ref<HTMLUListElement>()

function listItemClick(item: IList) {
  emits("readed", item)
}
</script>

<script lang="ts">
export default {
  name: "MessageListCom"
}
</script>

<style scoped lang="scss">
.list-box {
  width: 100%;
  height: 300px;
  overflow-y: auto;
  overflow-x: hidden;
  .list-item {
    padding: 6px 0;
    border-bottom: 1px solid #eee;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    .left {
      width: 15%;
      height: 100%;
    }
    .right {
      width: 82%;
      .title {
        font-family: cursive;
        padding-bottom: 10px;
      }
      .time {
        font-size: 12px;
      }
    }
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
</style>
