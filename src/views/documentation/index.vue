<template>
  <div class="documentation-box">
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        :lg="6"
        :xl="6"
        v-for="cardItem in cardList"
        :key="cardItem.iconClass"
      >
        <el-card
          class="card-item-box"
          shadow="hover"
          @click="jumpURL(cardItem.srcURL)"
        >
          <div class="icon-box">
            <svg-icon
              :style="cardItem.iconClass === 'element' ? 'color: #409eff' : ''"
              :iconClass="cardItem.iconClass"
            />
          </div>
          <div class="title-text">{{ cardItem.titleText }}</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
interface ICard {
  iconClass: string
  titleText: string
  srcURL: string
}
const cardList: ICard[] = [
  {
    iconClass: 'vue',
    titleText: 'Vue3',
    srcURL: 'https://v3.cn.vuejs.org/'
  },
  {
    iconClass: 'element-plus',
    titleText: 'element-plus',
    srcURL: 'https://element-plus.gitee.io/zh-CN/'
  }
]
// 跳转页面
const jumpURL = (URL: string) => {
  window.open(URL)
}
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.DOCUMENTATION
}
</script>

<style lang="scss" scoped>
.card-item-box {
  text-align: center;
  cursor: pointer;
  margin: 10px 0;
  &:hover {
    .icon-box {
      transform: scale(1.2);
    }
  }
  .icon-box {
    font-size: 64px;
    margin-bottom: 10px;
    transition: all 0.3s;
  }
  .title-text {
    font-size: 24px;
  }
}
</style>
