<template>
  <div class="active-box">
    <div
      class="active-content"
      v-for="item in content_Item"
      :key="item.nickName"
    >
      <div class="portrait">
        <img :src="item.src" />
        <div class="user-info">
          <p class="nickName">{{ item.nickName }}</p>
          <p class="type-time">{{ item.type }} - {{ item.time }}</p>
        </div>
      </div>
      <div class="content">
        <p>{{ item.content }}</p>
        <template v-if="item.Carousel">
          <el-carousel
            :interval="4000"
            type="card"
            height="300px"
            class="Carousel_pic"
          >
            <el-carousel-item
              v-for="(item_pic, index) in item.Carousel_pic"
              :key="index"
            >
              <img :src="item_pic.src" alt="" />
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
      <div class="operation">
        <span>
          <i class="el-icon-share"></i>
          分享
        </span>
        <span class="good">
          <ClickLike />
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import ClickLike from "@/components/ClickLike/index.vue"
import { handleViteImages } from "@/utils"
const content_Item = [
  {
    src: handleViteImages("@/assets/images/jinganglang.png"),
    nickName: "大话西游",
    type: "普通话",
    time: "1994年",
    content:
      "曾经有一份真挚的爱情摆在我的面前,我没有珍惜,直到失去的时候才后悔莫及,尘世间最痛苦的事莫过于此.如果上天能再给我一次机会的话,我会对这个女孩说“我爱你”.如果非要在这份爱加上一个期限,我希望是:一万年"
  },
  {
    src: handleViteImages("@/assets/images/zhizhuxia.png"),
    nickName: "肖申克的救赎",
    type: "英语",
    time: "1994年9月10日",
    content: "生活可以归结为一种简单的选择：不是忙于生存，就是赶着去死"
  },
  {
    src: handleViteImages("@/assets/images/sishi.png"),
    nickName: "死侍-我爱我家",
    type: "英语",
    time: "2018年",
    Carousel: true,
    Carousel_pic: [
      {
        src: handleViteImages("@/assets/images/sishi.jpeg")
      },
      {
        src: handleViteImages("@/assets/images/sishi1.jpeg")
      },
      {
        src: handleViteImages("@/assets/images/sishi2.jpeg")
      }
    ]
  }
]
</script>

<script lang="ts">
export default {
  name: "ActiveIndex"
}
</script>

<style lang="scss" scoped>
.active-box {
  .active-content {
    border-bottom: 1px solid #ccc;
    margin-bottom: 10px;
    .portrait {
      display: flex;
      .user-info {
        padding-top: 10px;
        .nickName {
          margin-bottom: 5px;
          font-weight: 600;
        }
        .type-time {
          font-size: 14px;
          color: #848484;
        }
      }
    }
    .content {
      font-size: 14px;
      line-height: 22px;
      margin-bottom: 10px;
      color: #848484;
      .Carousel_pic {
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .operation {
      text-align: right;
      color: #848484;
      margin-bottom: 10px;
      span {
        margin-right: 20px;
        font-size: 14px;
        cursor: pointer;
        &:hover {
          color: rgb(56, 55, 55);
        }
      }
      .good {
        display: inline-block;
      }
    }
  }
}
</style>
