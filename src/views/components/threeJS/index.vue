<template>
  <div class="threejs-box">
    <p class="document-url">
      <a
        href="http://www.yanhuangxueyuan.com/threejs/docs/index.html#manual/zh/introduction/Creating-a-scene"
        target="_black"
        >文档地址</a
      >
    </p>
    <div id="threeJS"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import * as THREE from "three"
// import  GLTFLoader from "three/examples/js/loaders/GLTFLoader"
@Component({
  name: "threeJSComponents",
})
export default class ThreeJSComponents extends Vue {
  mounted() {
    this.init()
  }
  /** 初始化 */
  init() {
    // 1. 创建一个摄像头
    const scene = new THREE.Scene()
    // 2. 创建一个相机
    const camera = new THREE.Camera()
    // 3. 创建一个渲染器
    const renderer = new THREE.WebGLRenderer()
    // 4. 获取容器盒子
    const dom = document.querySelector("#threeJS") as Element
    renderer.setSize(dom.clientWidth, dom.clientHeight)
    // 5. 将渲染的元素添加到指定的容器中
    dom.appendChild(renderer.domElement)
    // 创建了一个立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 对于这个立方体，给定一个材质，这里所做的事情就是相当于在css中添加了一个颜色格式来设置颜色
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // 创建网格，网格是一个几何体以及应用在此几何体上的材质的对象，可以直接将网格对象放入到场景中
    const cube = new THREE.Mesh(geometry, material)
    // 当我们调用scene.add()的时候，物体将会被添加到坐标为(0,0,0)的位置
    scene.add(cube)
    renderer.render(scene, camera)
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
  #threeJS {
    height: 100%;
  }
}
</style>
