<template>
  <div id="canvas" class="bpmn-box"></div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import BpmnUtils from "./package";
// 以下为bpmn工作流绘图工具的样式
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";


const bpmnViewer = shallowRef();
onMounted(() => {
  bpmnViewer.value = new BpmnUtils("#canvas").bpmnViewer;
});
</script>

<script lang="ts">
/** 使用 bpmn 开发的流程图 */
import { RouterName } from "@/router/RouteConst";
export default {
  name: RouterName.BPMN
};
</script>

<style scoped lang="scss">
.bpmn-box {
  height: 100%;
  width: 100%;
}
</style>

<style>
.bjs-powered-by {
  display: none;
}
</style>
