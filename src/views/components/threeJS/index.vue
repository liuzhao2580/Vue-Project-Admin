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
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
@Component({
  name: "threeJSComponents",
})
export default class ThreeJSComponents extends Vue {
  mounted() {
    // this.init()
    this.initGLTF()
  }
  /** 初始化 */
  init() {
    // 1. 创建一个摄像头
    const scene = new THREE.Scene()
    // 2. 创建一个相机
    const camera = new THREE.PerspectiveCamera()
    // 3. 创建一个渲染器
    const renderer = new THREE.WebGLRenderer()
    // 4. 获取容器盒子
    const dom = document.querySelector("#threeJS") as Element
    // 5. 设置渲染 canvas 大小
    renderer.setSize(dom.clientWidth, dom.clientHeight)
    // 6. 将渲染的元素添加到指定的容器中
    dom.appendChild(renderer.domElement)
    // 创建了一个立方体
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    // 对于这个立方体，给定一个材质，这里所做的事情就是相当于在css中添加了一个颜色格式来设置颜色
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    // 创建网格，网格是一个几何体以及应用在此几何体上的材质的对象，可以直接将网格对象放入到场景中
    const cube = new THREE.Mesh(geometry, material)
    // 当我们调用scene.add()的时候，物体将会被添加到坐标为(0,0,0)的位置
    scene.add(cube)

    const render = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    render()
    // 添加控件
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(1, 1, 1)
    controls.update()
  }
  /** 创建一个 gltf  */
  initGLTF() {
    // 1. 创建一个 摄像机
    const scene = new THREE.Scene()
    // 2. 创建一个相机
    const camera = new THREE.Camera()
    // 3. 创建一个渲染器
    const renderer = new THREE.WebGLRenderer()
    // 4. 获取dom元素
    const dom = document.querySelector("#threeJS") as Element
    // 5. 设置渲染 canvas 大小
    renderer.setSize(dom.clientWidth, dom.clientHeight)
    // 6. 将渲染的元素添加到指定的容器中
    dom?.appendChild(renderer.domElement)

    // 添加环境光
    const ambLight = new THREE.AmbientLight(0x404040)
    scene.add(ambLight)
    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    scene.add(directionalLight)
    // 添加半球光
    var hemisLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
    scene.add(hemisLight)
    const loader = new GLTFLoader()
    loader.load(
      "https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf",
      function(gltf) {
        scene.add(gltf.scene)
        gltf.scene.scale.set(0.2, 0.2, 0.2)
      },
      undefined,
      function(error) {
        console.error(error)
      },
    )
    const render = () => {
      renderer.render(scene, camera)
      requestAnimationFrame(render)
    }
    render()
    // 添加控件
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.target.set(1, 1, 1)
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
