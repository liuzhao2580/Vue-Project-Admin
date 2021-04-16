<template>
  <div class="threejs-box">
    <p class="document-url">
      <a
        href="http://www.yanhuangxueyuan.com/threejs/docs/index.html#manual/zh/introduction/Creating-a-scene"
        >文档地址</a
      >
    </p>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from "vue-property-decorator"
@Component({
  name: "threeJSComponents",
})
export default class ThreeJSComponents extends Vue {
  name12 = "1234"
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
