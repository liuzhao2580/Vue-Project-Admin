<template>
  <div class="threejs-box">
    <div class="document-url">
      <a
        href="http://www.yanhuangxueyuan.com/threejs/docs/index.html#manual/zh/introduction/Creating-a-scene"
        target="_black"
        >文档地址</a
      >
      <div class="select-box">
        <el-select
          v-model="selectValue"
          placeholder="请选择"
          @change="selectChange"
        >
          <el-option
            v-for="item in selectOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
      </div>
    </div>
    <div id="threeJS"></div>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
import * as THREE from "three"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
@Component({
  name: "threeJSComponents",
})
export default class ThreeJSComponents extends Vue {
  /** 下拉框选择的数据 */
  selectValue: string = "Happy Face"
  selectOptions: Array<any> = [
    {
      value: "Happy Face",
      label: "笑脸",
    },
    {
      value: "Apache Helicopter",
      label: "直升机",
    },
    {
      value: "Bee",
      label: "小蜜蜂",
    },
  ]
  /** 摄像机 */
  scene
  /** 摄像机 */
  camera
  /** 渲染器 */
  renderer
  /** gltf的加载器 */
  gltfLoader
  mounted() {
    this.init()
  }
  /** 初始化 */
  init() {
    // 1. 获取dom元素
    const dom = document.querySelector("#threeJS") as Element
    // 2. 创建一个 摄像机
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0xeeeeee)
    // 3. 创建一个 相机
    this.camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.001,
      1000,
    )
    this.camera.position.set(0, 0.1, 0.1)
    // 4. 创建一个 渲染器
    this.renderer = new THREE.WebGLRenderer()
    // 5. 设置渲染 canvas 大小
    this.renderer.setSize(dom.clientWidth, dom.clientHeight)
    // 6. 将渲染的元素添加到指定的容器中
    dom.appendChild(this.renderer.domElement)

    // 添加环境光
    const ambLight = new THREE.AmbientLight(0x404040)
    this.scene.add(ambLight)
    // 添加平行光
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    this.scene.add(directionalLight)
    // 添加半球光
    const hemisLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1)
    this.scene.add(hemisLight)

    this.gltfLoader = new GLTFLoader()
    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")
    dracoLoader.preload()
    this.gltfLoader.setDRACOLoader(dracoLoader)
    this.gltfLoader.setPath("/static/model")

    // 添加控件
    const orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement,
    )
    const render = () => {
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(render)
      orbitControls.update()
    }
    render()
    this.initGLTF()
  }
  /** 创建一个 gltf  */
  initGLTF(url?: string) {
    // "https://a.amap.com/jsapi_demos/static/gltf/Duck.gltf"
    this.gltfLoader.load(
      `/gltf/${url ? url : "Happy Face"}.glb`,
      gltf => {
        console.log(gltf, "")
        if (gltf.animations && gltf.animations.length) {
          const mixer = new THREE.AnimationMixer(gltf.scene)
          gltf.animations.forEach(animation => {
            const action = mixer.clipAction(animation)
            action.play()
          })
        }
        this.scene.add(gltf.scene)
      },
      xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
      },
      error => {
        console.log(error)
      },
    )
  }

  /** 下拉框改变事件 */
  selectChange(e) {
    this.initGLTF(e)
  }
}
</script>

<style lang="scss" scoped>
.threejs-box {
  .document-url {
    display: flex;
    justify-content: space-between;
    align-items: center;
    a {
      color: $brandColor;
    }
  }
  #threeJS {
    margin-top: 10px;
    height: 80%;
  }
}
</style>
