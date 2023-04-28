<template>
  <ul v-show="list.length" class="list-box" ref="listBoxRef">
    <li
      class="list-item"
      v-for="item in list"
      :key="item.id"
      @click="listItemClick(item)"
      :style="{ opacity: item.readFlag ? '0.3' : '1' }"
    >
      <div class="left">
        <span :class="['iconfont', item.icon]"></span>
      </div>
      <div class="right">
        <div class="title lineEllipsisOne">
          {{ item.title }}
        </div>
        <div class="time">
          {{ item.date }}
        </div>
      </div>
    </li>
  </ul>
  <el-empty v-show="list.length === 0" />
</template>

<script setup lang="ts">
import { ref } from "vue"

interface IList {
  id: number
  icon: string
  title: string
  date: string
  readFlag: boolean
}

interface IProps {
  list: IList[]
}

defineProps<IProps>()

const emits = defineEmits<{
  (e: "readed", item: IList): void
}>()

const listBoxRef = ref<HTMLUListElement>()

/** 每个列表项的点击 */
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
      .iconfont {
        font-size: 30px;
      }
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
</style>
