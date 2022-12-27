<template>
  <p class="video-title">
    <a href="https://v2.h5player.bytedance.com/" target="_black"
      >西瓜视频播放器</a
    >
  </p>
  <div id="video-play"></div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import XGplayer from "xgplayer";

onMounted(() => {
  init();
});

const init = () => {
  let player = new XGplayer({
    id: "video-play",
    autoplay: false,
    volume: 0.3,
    url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
    poster:
      "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-50f2e90e-f860-4396-bbc7-b912e93fa987/3fc59cec-c378-492e-a96e-8488c267c527.jpg",
    playsinline: true,
    thumbnail: {
      pic_num: 44,
      width: 160,
      height: 90,
      col: 10,
      row: 10,
      urls: [
        "//lf9-cdn-tos.bytecdntp.com/cdn/expire-1-M/byted-player-videos/1.0.0/xgplayer-demo-thumbnail.jpg"
      ]
    },
    danmu: {
      comments: [
        {
          duration: 15000,
          id: "1",
          start: 3000,
          txt: "测试弹幕---小火车况且况且",
          style: {
            color: "#ff9500",
            fontSize: "16px",
            padding: "5px 11px",
            backgroundColor: "rgba(255, 255, 255, 0.1)"
          }
        }
      ],
      area: {
        start: 0,
        end: 1
      }
    },
    whitelist: [""]
  });
  player.emit("resourceReady", [
    {
      name: "超清",
      url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-720p.mp4"
    },
    {
      name: "高清",
      url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-480p.mp4"
    },
    {
      name: "标清",
      url: "//sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4"
    }
  ]);
};
</script>

<script lang="ts">
export default {
  name: "VideoComponent"
};
</script>

<style scoped lang="scss">
.video-title {
  margin: 6px 0;
}
#video-play {
  width: 200px;
  height: 200px;
}
</style>
