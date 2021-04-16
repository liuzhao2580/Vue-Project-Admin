<template>
  <div class="threejs-box">
    <p class="document-url">
      <a
        href="http://www.yanhuangxueyuan.com/threejs/docs/index.html#manual/zh/introduction/Creating-a-scene"
        >文档地址</a
      >
    </p>
    <div id="threeJS"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import THREE from "three"
@Component({
  name: "threeJSComponents",
})
export default class ThreeJSComponents extends Vue {
  name12 = "1234"
  mounted() {}
  /** 初始化 */
  init() {
    // 1. 创建一个摄像头
    const sceen = new THREE.Scene()
    // 2. 创建一个相机
    const camera = new THREE.Camera()
    // 3. 创建一个渲染器
    const renderer = new THREE.WebGLRenderer()
  }
}
</script>

<style lang="scss" scoped>
.threejs-box {
  .document-url {
    a {
      color: $brandColor;
    }
  }
}
</style>
