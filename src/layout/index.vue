<template>
  <div class="app-warpper">
    <el-container :class="[isMobile ? 'mobile' : 'desktop', 'container-box']">
      <el-aside :width="dynamicWidth()" class="sider-box">
        <Sidebar />
      </el-aside>
      <el-main class="main-box" :style="{ marginLeft: dynamicWidth() }">
        <Navbar class="nav-bar" />
        <AppMain class="app-main" />
      </el-main>
      <div
        v-show="isMobile"
        class="click-icon el-icon-s-operation"
        @click="showORhidden"
      ></div>
    </el-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Mixins } from "vue-property-decorator"
import { AppMain, Sidebar, Navbar } from "./components"
import { namespace } from "vuex-class"
import LayoutMixin from "./mixin/Resize"
const App_VUEX = namespace("app")
@Component({
  components: {
    AppMain,
    Sidebar,
    Navbar,
  },
})
export default class LayoutComponent extends Mixins(LayoutMixin) {
  @App_VUEX.Getter side_status: any
  @App_VUEX.Getter isMobile: any
  @App_VUEX.Action ACT_unflodSide!: () => void
  dynamicWidth(): string {
    if (this.isMobile) return "0"
    if (this.side_status) return "64px"
    return "200px"
  }
  created() {}
  mounted() {}
  // 在 mobile 移动端模式下显示隐藏 侧边栏按钮
  showORhidden() {
    this.ACT_unflodSide()
  }
}
</script>

<style lang="scss" scoped>
.app-warpper {
  .container-box {
    .sider-box {
      background-color: #304156;
    }
  }
  .mobile {
    .click-icon {
      cursor: pointer;
      width: 40px;
      height: 40px;
      font-size: 20px;
      text-align: center;
      line-height: 40px;
      box-shadow: 0px 0px 8px #a6a6a6;
      background-color: #fff;
      position: fixed;
      left: 0;
      top: 100px;
      border-top-right-radius: 5px;
      border-bottom-right-radius: 5px;
    }
  }
  .main-box {
    display: flex;
    flex-direction: column;
    /deep/ .app-main {
      flex: 1;
      > div {
        height: 100%;
      }
    }
  }
}
</style>
