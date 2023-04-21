<template>
  <div>
    <div class="word-index-search-box">
      <div class="left">
        <div class="left-item"></div>
      </div>
      <ul class="right">
        <li
          class="right-item"
          :data-index="rItem"
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
import { ref } from "vue"

interface IList {
  name: string
}
const responseList: IList[] = [
  {
    name: "华为"
  },
  {
    name: "小米"
  },
  {
    name: "苹果"
  },
  {
    name: "vivo"
  },
  {
    name: "三星"
  },
  {
    name: "oppo"
  },
  {
    name: "真我"
  },
  {
    name: "IQOO"
  },
  {
    name: "魅族"
  },
  {
    name: "联发科"
  },
  {
    name: "英伟达"
  },
  {
    name: "AMD"
  },
  {
    name: "比亚迪"
  },
  {
    name: "传奇"
  },
  {
    name: "红旗"
  },
  {
    name: "因特尔"
  }
]

const rightList = ref<string[]>([])
// const leftList = ref<string[]>([])
interface IWord {
  [key: string]: IList[]
}
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
  console.log(firstWordMap)
})()

// 右侧字母索引的点击事件
function rightItemClick(item: string, event: MouseEvent) {
  // @ts-ignore
  console.log(event.target?.dataset)
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
        background-color: pink;
      }
    }
  }
}
</style>
