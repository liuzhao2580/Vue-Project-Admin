<template>
  <div class="content with-diagram" id="js-drop-zone">
    <div class="message error">
      <div class="note">
        <p>Ooops, 出问题啦.</p>

        <div class="details">
          <span>Import Error Details</span>
          <pre></pre>
        </div>
      </div>
    </div>

    <div id="js-canvas" class="canvas"></div>
    <div class="properties-panel-parent" id="js-properties-panel"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from "vue";
import BpmnUtils from "./package";
// 以下为bpmn工作流绘图工具的样式
import "bpmn-js/dist/assets/diagram-js.css";
import "bpmn-js/dist/assets/bpmn-js.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn.css";
import "bpmn-js/dist/assets/bpmn-font/css/bpmn-codes.css";

const bpmnModeler = shallowRef();
onMounted(() => {
  bpmnModeler.value = new BpmnUtils("js-canvas").bpmnModeler;
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
@import "./index.scss";
</style>

<style>
.bjs-powered-by {
  display: none;
}
</style>
