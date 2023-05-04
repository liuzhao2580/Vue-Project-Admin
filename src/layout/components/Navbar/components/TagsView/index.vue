<template>
  <div class="tags-view-box">
    <div class="tag-container-box">
      <el-tag
        v-for="(tag, index) in tagsArray"
        :key="index"
        :closable="is_closable(tag)"
        effect="dark"
        @close="handleClose(tag)"
        size="small"
        @click="handleClick(tag)"
        disable-transitions
        :class="{ 'is-active': is_active(tag.meta?.title) }"
        @contextmenu.prevent="tagContextmenu($event, tag, index)"
        >{{ tag.meta?.title }}</el-tag
      >
    </div>
    <!-- 用来操作开启的 tag 标签 -->
    <ul
      v-show="state.operaTagFlag"
      class="hide-tag-box"
      :style="state.hideTagBox"
    >
      <li
        :class="[disabledFlag ? 'disabled-operation' : 'hide-item']"
        @click="closeNow"
      >
        关闭当前
      </li>
      <li class="hide-item" @click="closeOther">关闭其他</li>
      <li class="hide-item" @click="closeRight">关闭右侧</li>
      <li class="hide-item" @click="closeAll">全部关闭</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, watch } from "vue"
import { RouteRecordName, useRoute, useRouter } from "vue-router"
import { cloneDeep } from "lodash"
import { useUserStore } from "@/store/user"
import { useTagsViewStore } from "@/store/tagsView"
import { ITagsView } from "@/typescript/shared/interface"

const userStore = useUserStore()

const tagsViewStore = useTagsViewStore()

const route = useRoute()

const router = useRouter()

interface IState {
  affixTags: ITagsView[]
  /** tag 操作菜单的显示隐藏 */
  operaTagFlag: boolean
  /** tag 操作菜单的样式 */
  hideTagBox: {
    left: number | string
  }
  /** 记录当前右键的是哪个 tag */
  saveCurrentTag: {
    currentIndex: number
    currentTag: any
  }
}

const state = reactive<IState>({
  affixTags: [],
  operaTagFlag: false,
  hideTagBox: {
    left: 0
  },
  // 记录当前右键的是哪个 tag
  saveCurrentTag: {
    currentIndex: -1,
    currentTag: null
  }
})

/** 当前的 tag 是否可以操作 */
const disabledFlag = computed((): boolean => {
  let flag = false
  if (
    state.saveCurrentTag.currentIndex === 0 ||
    state.saveCurrentTag.currentIndex === 1
  )
    flag = true
  return flag
})

/** tags 的数组 */
const tagsArray = computed(() => {
  return tagsViewStore.state.tagsArray
})

const sideBarList = computed(() => {
  return userStore.state.sideBarList
})

onMounted(() => {
  initTags()
  insertTags()
})
/** 初始化 tags */
const initTags = () => {
  const routes = sideBarList.value
  const affixTags: ITagsView[] = []
  routes.forEach(item => {
    if (item.meta) {
      affixTags.push({
        fullPath: item.path,
        meta: item.meta,
        name: item.name
      })
    }
  })
  changeStoreTags(affixTags)
}

/** 修改 store 中的 tags */
const changeStoreTags = (tags: ITagsView[]) => {
  tagsViewStore.initTags(tags)
}
/** 增加 tags */
const insertTags = () => {
  // 说明存在外链,不存放到 tags 中
  if (route.meta.outsideUrl) return
  const currentTag = {
    fullPath: route.fullPath,
    meta: route.meta,
    name: route.name
  }
  tagsViewStore.insertTags(currentTag)
}
/** 用于高亮当前的tags */
const is_active = (tag: string) => {
  return tag === route.meta.title
}
/** 用于设置 不显示关闭按钮 affix 存在 说明不能被关闭 */
const is_closable = (tag: ITagsView) => {
  if (tag.meta?.affix) return false
  return true
}
/** 点击关闭按钮 路由会跳转到上一个 tagView 页面 */
const handleClose = (tag: ITagsView) => {
  const getIndex = tagsArray.value.indexOf(tag)
  const getCloneTags = cloneDeep(tagsArray.value)
  if (route.fullPath === tag.fullPath) {
    handleClick(tagsArray.value[getIndex - 1])
  }
  getCloneTags.splice(getIndex, 1)
  changeStoreTags(getCloneTags)
}
/** 点击 tags 跳转 */
const handleClick = (tag: ITagsView) => {
  router.push({
    name: tag.name as RouteRecordName
  })
}
/** 鼠标右键菜单 */
const tagContextmenu = (
  e: PointerEvent,
  tag: ITagsView,
  currentIndex: number
) => {
  // 1.获取 tag-container-box html元素
  const getTagBoxDom = document.querySelector(
    ".tag-container-box"
  ) as HTMLElement
  // 2.将伪数组变成真实的数组
  const getRealArr = Array.prototype.slice.call(getTagBoxDom.children)
  state.hideTagBox.left = getRealArr[currentIndex].offsetLeft + "px"
  state.operaTagFlag = true
  state.saveCurrentTag.currentIndex = currentIndex
  state.saveCurrentTag.currentTag = tag
}
/** 关闭当前 */
const closeNow = () => {
  const { currentIndex, currentTag } = state.saveCurrentTag
  if (currentIndex === 0 || currentIndex === 1) return
  handleClose(currentTag)
}
/** 关闭其他 */
const closeOther = () => {
  const { currentIndex, currentTag } = state.saveCurrentTag
  const getCloneTags = cloneDeep(tagsArray.value)
  for (let index = getCloneTags.length - 1; index >= 0; index--) {
    if (index !== 0 && index !== 1 && index !== currentIndex) {
      getCloneTags.splice(index, 1)
    }
  }
  changeStoreTags(getCloneTags)
  // 说明 当前右键选中的 tag 不是当前路由所在，关闭其他之后，路由要跳转到当前位置
  if (!is_active(currentTag.meta.title)) handleClick(currentTag)
}
/** 关闭右侧 */
const closeRight = () => {
  const { currentIndex, currentTag } = state.saveCurrentTag
  tagsArray.value.forEach((item, index) => {
    if (index > currentIndex) tagsArray.value.splice(index, 1)
  })
  // 说明 当前右键选中的 tag 不是当前路由所在，关闭其他之后，路由要跳转到当前位置
  if (!is_active(currentTag.meta.title)) handleClick(currentTag)
}
/** 全部关闭 */
const closeAll = () => {
  tagsArray.value.splice(2)
  router.push("/")
}
/** 关闭 可以 tag 的操作菜单 */
const closeTagOperation = () => {
  state.operaTagFlag = false
}

watch(
  () => route.path,
  () => {
    insertTags()
  }
)
watch(
  () => state.operaTagFlag,
  flag => {
    // 每次只要 开启 就全局监听 click 事件，用来关闭
    if (flag) document.body.addEventListener("click", closeTagOperation)
    else document.body.removeEventListener("click", closeTagOperation)
  }
)
</script>

<script lang="ts">
export default {
  name: "TagsView"
}
</script>

<style lang="scss" scoped>
.tags-view-box {
  padding: 0 20px;
  height: 40px;
  line-height: 40px;
  box-shadow: 0px 2px 2px #ccc;
  white-space: nowrap;
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  .el-tag {
    cursor: pointer;
    height: 28px;
    line-height: 28px;
    color: var(--lz-text-color);
    border-color: var(--lz-border-color);
    margin-right: 5px;
    border-radius: 2px;
    position: relative;
    background-color: transparent;
    &.is-active {
      background-color: $standardColor;
      padding-left: 18px;
      color: #fff;
      &::before {
        content: "";
        position: absolute;
        left: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: #fff;
        color: var(--lz-text-color);
      }
    }
  }
  .hide-tag-box {
    position: fixed;
    z-index: $maxZIndex;
    top: $NavbarHeight;
    background-color: #fafafa;
    box-shadow: 0px 0px 5px #a6a6a6;
    display: inline-block;
    border-radius: 5px;
    .hide-item,
    .disabled-operation {
      cursor: pointer;
      height: 30px;
      line-height: 30px;
      padding: 0px 10px;
      font-size: 14px;
    }
    .disabled-operation {
      cursor: not-allowed;
    }
    .hide-item {
      &:hover {
        background-color: pink;
        color: #fff;
      }
    }
  }
}
</style>
