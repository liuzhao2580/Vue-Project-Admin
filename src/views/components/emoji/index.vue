<template>
  <div></div>
</template>

<script lang="ts">
import { RouterName } from "@/router/RouteConst";
export default {
  name: RouterName.EMOJI_INPUT
};
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
@import "emoji_sorites.css";
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
