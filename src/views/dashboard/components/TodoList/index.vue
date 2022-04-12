<template>
  <div class="todo-list">
    <header class="header-box">TODO-LIST</header>
    <main class="main-box">
      <!-- 输入框 -->
      <div class="input-box">
        <el-input
          v-model="insertInput"
          placeholder="请输入内容"
          clearable
          @keyup.enter.native="handleInsertInput"
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
            :class="[item.flag ? 'icon-xuanzhong' : 'icon-xuanze', 'iconfont list-icon']"
          ></span>
          <span class="list-title lineEllipsisOne">{{ item.title }}</span>
          <span
            class="iconfont icon-guanbi close-btn"
            v-show="colse_isActive == index"
            @click.stop="removeList(index)"
          ></span>
        </div>
      </div>
    </main>
    <footer class="footer-box">
      <el-radio-group v-model="status">
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

<script>
export default {
  name: 'TodoList',
  components: {},
  props: {},
  data() {
    return {
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
    }
  },
  computed: {
    checkedList() {
      let getAllListArr = ''
      switch (this.status) {
        // 全部
        case 'all':
          getAllListArr = this.listArr
          break
        // 未完成
        case 'active':
          getAllListArr = this.listArr.filter((item) => {
            if (!item.flag) return item
          })
          break
        // 已完成
        case 'component':
          getAllListArr = this.listArr.filter((item) => {
            if (item.flag) return item
          })
          break
      }
      return getAllListArr
    }
  },
  created() {},
  mounted() {},
  methods: {
    // 输入框的回车新增事件
    handleInsertInput() {
      if (!this.insertInput) return
      const setList = {
        title: this.insertInput,
        flag: true
      }
      this.listArr.push(setList)
      this.insertInput = ''
    },
    // 列表点击事件
    handleItemClick(index) {
      this.listArr[index].flag = !this.listArr[index].flag
    },
    // 鼠标移入
    handleMouseEnter(index) {
      this.colse_isActive = index
    },
    // 鼠标移除
    handleMouseLeave() {
      this.colse_isActive = -1
    },
    // 移除 指定的list
    removeList(index) {
      this.listArr.splice(index, 1)
    }
  }
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
