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
        <el-card class="card-item-box" shadow="hover" @click.native="jumpURL(cardItem.srcURL)">
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
    <el-button type="primary" v-permission="1" @click="handle">测试</el-button>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
interface ICard {
  iconClass: string
  titleText: string
  srcURL: string
}
@Component({
  name: "documentation",
})
export default class DocumentationComponent extends Vue {
  cardList: ICard[] = [
    {
      iconClass: "vue",
      titleText: "Vue",
      srcURL: "https://cn.vuejs.org/v2/guide/",
    },
    {
      iconClass: "element",
      titleText: "elementUI",
      srcURL: "https://element.eleme.cn/#/zh-CN/component/installation",
    },
  ]
  // 跳转页面
  jumpURL(URL) {
    window.open(URL)
  }
  handle() {
    console.log(123, "123")
  }
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
