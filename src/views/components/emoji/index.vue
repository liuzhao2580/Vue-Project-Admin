<template>
  <div>
    <div class="emojiContent">
      <!-- 文本框内容-->
      <div
        ref="emojiRef"
        contenteditable="true"
        class="contentBox"
        @click.stop="contentClick"
        @blur="onBlur"
        @change="onBlur"
        @input="contentClick"
      ></div>
      <div class="expression">
        <img
          src="@/assets/images/funny.png"
          @click.stop="state.show = !state.show"
        />
      </div>
      <!-- 表情选择框-->
      <div v-if="state.show" class="box" @click.stop>
        <div class="left">
          <ul>
            <li
              v-for="(item, index) in emojiList"
              :key="index"
              :class="['cursor', state.currentType === index ? 'active' : '']"
            >
              <div @click="emojiTypeSelect(index)">
                {{ item.name }}
              </div>
            </li>
          </ul>
        </div>
        <div class="right">
          <button
            v-for="(emoji, index) in state.enableSelectEmojiList"
            :key="index"
            class="emoji"
            @click.stop="emojiSelect(emoji)"
          >
            <img
              :src="placeholder"
              :class="emoji.className"
              :alt="emoji.icon"
            />
          </button>
        </div>
        <span title="关闭" class="emoji_close" @click="state.show = false"
          >X</span
        >
      </div>
    </div>
    <span @click="confirm">确认</span>
  </div>
</template>
<script lang="ts" setup>
import { emojiData } from './emojis'
import { onMounted, reactive, ref, shallowRef, withDefaults } from 'vue'

interface IProps {
  /** 表情框宽度 */
  width: string
  /** 表情框高度 */
  height: string
  /** 内容 */
  value: string
}

interface IEmoji {
  className: string
  icon: string
}

interface IState {
  lastEditRange: Range
  content: string
  show: boolean
  currentType: number
  enableSelectEmojiList: IEmoji[]
  dataSource: IEmoji[]
}

withDefaults(defineProps<IProps>(), {
  width: '50%',
  height: '200px',
  value: ''
})
const placeholder = shallowRef(
  'http://tkeasyemoji.oss-cn-shanghai.aliyuncs.com/images/placeholder.png'
)
const emojiList = shallowRef<any>(emojiData)

const emojiRef = ref<HTMLDivElement>()

const state = reactive<IState>({
  lastEditRange: new Range(),
  content: '',
  show: false,
  currentType: 0,
  enableSelectEmojiList: [],
  dataSource: []
})
onMounted(() => {
  state.enableSelectEmojiList = emojiData[0].iconArr
  emojiData.forEach(item => {
    state.dataSource = state.dataSource.concat(item.iconArr)
  })
})
// 失去焦点 内容返回
const onBlur = () => {
  const text = emojiRef.value?.innerHTML as string
  console.log(text)
  state.content = text
    .replace(/<img style="vertical-align: sub;" class="/g, '')
    .replace(/alt="/g, '')
    .replace(/">/g, '')
    .replace(/bg-.{7}/g, '')
  state.content = state.content.replaceAll('<br>', '\n')
  console.log(state.content)
}
// 表情title点击事件
const emojiTypeSelect = (index: number) => {
  state.currentType = index
  state.enableSelectEmojiList = emojiList[index].iconArr
}
const contentClick = () => {
  // 记录当前光标对象
  state.lastEditRange = getSelection()!.getRangeAt(0)
}
// 表情插入文本框
const emojiSelect = (emoji: IEmoji) => {
  // 输入框
  const selection = getSelection() as Selection
  // 输入框无光标，自动聚焦
  if (state.lastEditRange) {
    selection.removeAllRanges()
    selection.addRange(state.lastEditRange)
  } else {
    emojiRef.value?.focus()
  }
  // eslint-disable-next-line max-len
  const html = `<img style="vertical-align: sub;" src="http://tkeasyemoji.oss-cn-shanghai.aliyuncs.com/images/placeholder.png" class="${emoji.className}" alt="${emoji.icon}">`
  const rangeAt = selection.getRangeAt(0)
  const parentNode = document.createElement('div')
  parentNode.innerHTML = html
  const emojiNode = document.createDocumentFragment()
  // 光标对应的 img 节点
  const lastNode = emojiNode.appendChild(parentNode.firstChild as ChildNode)
  rangeAt.insertNode(emojiNode || null)
  // const rangeAtClone = rangeAt.cloneRange();
  // 将光标设置在新的emoji之前
  rangeAt.setStartAfter(lastNode || null)
  // rangeAt.collapse(true);
  // 清除现有光标，添加新光标
  selection.removeAllRanges()
  selection.addRange(rangeAt || null)
  // 记录最后光标对象
  state.lastEditRange = selection.getRangeAt(0)
}
const confirm = () => {
  console.log(state.content)
}
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.EMOJI_INPUT
}
</script>

<style type="text/css">
.contentBox img {
  display: inline-block !important;
  margin: 0 2px !important;
  height: 22px;
  width: 22px;
  transform: scale(0.85, 0.85);
}
</style>

<style lang="scss" scoped>
@import 'emoji_sorites.css';
.emoji_close {
  font-size: 18px;
  position: absolute;
  top: -5px;
  right: 7px;
  cursor: pointer;
}
.contentBox:hover {
  background-color: #fff;
}
.contentBox:focus {
  background-color: #fff;
}
.contentBox {
  width: calc(100% - 36px);
  height: 100%;
  min-height: 36px;
  max-height: 100px;
  border: 1px solid #e9ebef;
  border-radius: 4px 0 0 4px;
  padding: 4px 12px;
  font-size: 13px;
  line-height: 26px;
  position: relative;
  outline: none;
  overflow: auto;
  background-color: #f5f6f9;
  transition: all 0.3s;
  display: inline-block;
  vertical-align: text-bottom;
}
.emojiContent {
  width: 100%;
  max-height: 100px;
  font-size: 13px;
  vertical-align: middle;
  .expression {
    width: 36px;
    height: 100%;
    border-right: 1px solid #e9ebef;
    border-top: 1px solid #e9ebef;
    border-bottom: 1px solid #e9ebef;
    background-color: #f5f6f9;
    border-radius: 0 4px 4px 0;
    display: inline-block;
    cursor: pointer;
    padding: 3px;
    vertical-align: top;
    img {
      width: 29px;
      height: 28px;
    }
  }
  .box {
    width: 580px;
    border: 1px solid #73a8f9;
    min-height: 400px;
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.2);
    background: #fff;
    z-index: 99999;
    position: absolute;
    display: flex;
  }
  .left {
    width: 90px;
    height: 100%;
    display: table-cell;
    border-right: 1px solid #ebebeb;
    padding: 4px;
    ul {
      padding: 0;
      margin: 0;
      text-align: center;
      list-style-type: none;
      li {
        height: 30px;
        line-height: 30px;
        cursor: pointer;
        font-size: 14px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        button {
          border: none;
          background: none;
          width: 100%;
          height: 100%;
        }
      }
    }
    .active {
      background-color: #3171d1;
      color: #ffffff;
      border-radius: 4px;
      button {
        color: #ffffff;
      }
    }
  }
  .right {
    flex: 1;
    padding-left: 10px;
    padding-top: 15px;
    overflow: auto;
    button {
      border: none;
      padding: 0;
      cursor: pointer;
    }
    .emoji {
      display: inline-block;
      padding: 3px;
      border: 1px solid transparent;
      cursor: pointer;
      background: #fff;
      &:hover {
        height: 32px;
        background-color: #ddded8;
        border: 1px solid #b3c1fd;
        border-radius: 4px;
      }
    }
  }
}
</style>
