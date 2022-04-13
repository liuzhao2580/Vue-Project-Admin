<template>
  <div class="todo-list">
    <header class="header-box">TODO-LIST</header>
    <main class="main-box">
      <!-- 输入框 -->
      <div class="input-box">
        <el-input
          v-model="state.insertInput"
          placeholder="请输入内容"
          clearable
          @keyup.enter="handleInsertInput"
        ></el-input>
      </div>
      <!-- todo 展示列表 -->
      <div class="list">
        <div
          v-for="(item, index) in checkedList"
          :key="index"
          @click="handleItemClick(index)"
          class="list-item"
          @mouseenter="handleMouseEnter(index)"
          @mouseleave="handleMouseLeave"
        >
          <span
            :class="[
              item.flag ? 'icon-xuanzhong' : 'icon-xuanze',
              'iconfont list-icon'
            ]"
          ></span>
          <span class="list-title lineEllipsisOne">{{ item.title }}</span>
          <span
            class="iconfont icon-guanbi close-btn"
            v-show="state.colse_isActive == index"
            @click.stop="removeList(index)"
          ></span>
        </div>
      </div>
    </main>
    <footer class="footer-box">
      <el-radio-group v-model="state.status">
        <!-- 全部 -->
        <el-radio label="all">全部</el-radio>
        <!-- 未完成 -->
        <el-radio label="active">未完成</el-radio>
        <!-- 已完成 -->
        <el-radio label="component">已完成</el-radio>
      </el-radio-group>
    </footer>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

interface IListArr {
  title: string
    flag: boolean
}

interface IState {
  insertInput: string
  checkAll: boolean
  isIndeterminate: boolean
  status: string
  listArr: IListArr[]
  colse_isActive: number
}

const state = reactive<IState>({
  // 新增 todolist
  insertInput: '',
  // 全选状态  false 不全选  true 全选
  checkAll: false,
  // 用以表示 checkbox 的不确定状态 只负责样式控制 false
  isIndeterminate: true,
  // all 完成  active未完成  component已完成
  status: 'all',
  listArr: [
    {
      title: '吃饭',
      flag: false
    },
    {
      title: '睡觉',
      flag: false
    },
    {
      title: '打豆豆',
      flag: true
    }
  ],
  // 关闭按钮的显示
  colse_isActive: -1
})

const checkedList = computed(() => {
  let getAllListArr:IListArr[] = []
  switch (state.status) {
    // 全部
    case 'all':
      getAllListArr = state.listArr
      break
    // 未完成
    case 'active':
      getAllListArr = state.listArr.filter(item => {
        if (!item.flag) return item
      })
      break
    // 已完成
    case 'component':
      getAllListArr = state.listArr.filter(item => {
        if (item.flag) return item
      })
      break
  }
  return getAllListArr
})
/** 输入框的回车新增事件 */
const handleInsertInput = () => {
  if (!state.insertInput) return
  const setList = {
    title: state.insertInput,
    flag: true
  }
  state.listArr.push(setList)
  state.insertInput = ''
}

/** 列表点击事件 */
const handleItemClick = (index: number) => {
  state.listArr[index].flag = !state.listArr[index].flag
}
// 鼠标移入
const handleMouseEnter = (index: number) => {
  state.colse_isActive = index
}
// 鼠标移除
const handleMouseLeave = () => {
  state.colse_isActive = -1
}
// 移除 指定的list
const removeList = (index: number) => {
  state.listArr.splice(index, 1)
}
</script>

<script>
export default {
  name: 'TodoList'
}
</script>

<style lang="scss" scoped>
.todo-list {
  position: relative;
  margin-top: 10px;
  color: #999;
  margin-bottom: 20px;
  border: 1px solid #e3e3e3;
  box-shadow: 0px 0px 5px #e3e3e3;
  border-radius: 5px;
  padding: 10px;
  .header-box {
    text-align: center;
  }
  .main-box {
    padding-bottom: 20px;
    .input-box {
      margin-top: 10px;
    }
    .list {
      margin: 10px 0;
      height: 150px;
      overflow: auto;
      .list-item {
        cursor: pointer;
        color: #333;
        margin-bottom: 10px;
        position: relative;
        .iconfont {
          margin-right: 10px;
        }
        .icon-xuanzhong {
          color: #409eff;
        }
        .icon-xuanze + .list-title {
          text-decoration: line-through;
          color: #999;
        }
        .close-btn {
          color: #999;
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
        .icon-xuanzhong ~ .close-btn {
          color: #333;
        }
      }
    }
  }
  .footer-box {
    position: absolute;
    bottom: 10px;
  }
}
</style>
