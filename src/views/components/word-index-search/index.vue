<template>
  <div>
    <div class="word-index-search-box">
      <div class="left">
        <div class="left-item" v-for="(lItem, index) in leftList" :key="index">
          <div :class="['index-anchor', `index-anchor-${index}`]">
            {{ index }}
          </div>
          <div class="left-container">
            <span
              class="container-item"
              v-for="nItem in lItem"
              :key="nItem.name"
            >
              {{ nItem.name }}
            </span>
          </div>
        </div>
      </div>
      <ul class="right">
        <li
          :class="['right-item', rightActive === rItem && 'right-active']"
          :data-rindex="rItem"
          v-for="rItem in rightList"
          :key="rItem"
          @click="rightItemClick(rItem, $event)"
        >
          {{ rItem }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { getFirstWord } from "@/utils"
import { RouterName } from "@/router/RouteConst"
import { ref, onMounted } from "vue"
import responseJson from "./response.json"
interface IList {
  name: string
}

interface IWord {
  [key: string]: IList[]
}
const responseList: IList[] = responseJson

const rightList = ref<string[]>([])
const rightActive = ref()
const leftList = ref<IWord>({})
const leftDom = ref<HTMLDivElement>()

onMounted(() => {
  leftDom.value = document.querySelector(".left") as HTMLDivElement
})

// 首先将数据处理为需要的格式
;(function () {
  let firstWordMap: IWord = {}
  responseList.forEach(item => {
    const firstWord = getFirstWord(item.name)
    if (firstWordMap[firstWord]) {
      firstWordMap[firstWord].push(item)
    } else {
      firstWordMap[firstWord] = [item]
    }
  })
  rightList.value = Object.keys(firstWordMap).sort((a, b) => {
    if (a > b) return 1
    else if (a < b) return -1
    return 0
  })
  rightList.value.forEach(item => {
    leftList.value[item] = firstWordMap[item]
  })
})()

// 右侧字母索引的点击事件
function rightItemClick(item: string, event: MouseEvent) {
  rightActive.value = item
  // @ts-ignore 获取绑定的index
  const getRIndex = event.target?.dataset.rindex
  const getLeftAnchor = `index-anchor-${getRIndex}`
  const getAnchorEle = document.querySelector(
    `.${getLeftAnchor}`
  ) as HTMLDivElement
  if (leftDom.value) {
    leftDom.value.scrollTop = getAnchorEle.offsetTop
  }
}
</script>

<script lang="ts">
export default {
  name: RouterName.WORD_INDEX_SEARCH
}
</script>

<style scoped lang="scss">
.word-index-search-box {
  border: 1px solid #ccc;
  border-radius: 6px;
  height: 350px;
  display: flex;
  justify-content: space-between;
  .left {
    flex: 1;
    padding: 16px;
    overflow: auto;
    position: relative;
    scroll-behavior: smooth;
    .left-item {
      margin-bottom: 12px;
      .index-anchor {
        width: 100%;
        font-weight: 700;
        font-size: 18px;
        background-color: #ccc;
        border-radius: 6px;
        padding: 6px;
        margin-bottom: 10px;
      }
      .left-container {
        .container-item {
          margin-right: 10px;
          vertical-align: super;
          cursor: pointer;
        }
      }
    }
  }
  .right {
    border-left: 1px solid #333;
    width: 60px;
    padding: 8px 0;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .right-item {
      text-align: center;
      cursor: pointer;
      padding: 3px 0;
      &:hover {
        background-color: $standardColor;
      }
      &.right-active {
        background-color: $standardColor;
      }
    }
  }
}
</style>
