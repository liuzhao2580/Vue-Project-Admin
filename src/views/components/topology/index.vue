<template>
  <div>
    <p>
      <a href="https://antv-x6.gitee.io/zh" target="_block">官网地址</a>
    </p>
    <div id="container"></div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as X6 from "@antv/x6";
import "./antv-x6";
/** 拓扑图组件 */
@Component({
  name: "topology",
})
export default class TopologyComponent extends Vue {
  /** 定义 装拓扑图组件 */
  topologyContent!: HTMLDivElement;
  /** 画布的实例对象 */
  graph;
  data = {
    // 节点
    nodes: [
      {
        id: "node1", // String，可选，节点的唯一标识
        shape: "rect", // 使用 rect 渲染
        x: 40, // Number，必选，节点位置的 x 值
        y: 40, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: "hello", // String，节点标签
        attrs: {
          body: {
            fill: "#2ECC71",
            stroke: "#000",
            strokeDasharray: "10,2",
          },
        },
      },
      {
        id: "node2", // String，节点的唯一标识
        shape: "ellipse", // 使用 ellipse 渲染
        x: 160, // Number，必选，节点位置的 x 值
        y: 180, // Number，必选，节点位置的 y 值
        width: 80, // Number，可选，节点大小的 width 值
        height: 40, // Number，可选，节点大小的 height 值
        label: "world", // String，节点标签
      },
    ],
    /* 
        边
        默认图形 edge 来渲染边，除此之外，在 X6 中还内置了 double-edge 和 shadow-edge 两种图形，可以通过 shape 属性为边指定渲染的图形
        */
    edges: [
      {
        source: "node1", // String，必须，起始节点 id
        target: "node2", // String，必须，目标节点 id
        shape: "double-edge",
        attrs: {
          line: {
            stroke: "orange",
          },
        },
      },
    ],
  };
  mounted() {
    this.topologyContent = document.querySelector("#antv-x6-container") as HTMLDivElement;
  }
  /** 初始化 */
  init() {
    // 创建画布
    this.graph = new X6.Graph({
      container: this.topologyContent,
      width: 800,
      height: 600,
      background: {
        color: "#fffbe6", // 设置画布背景颜色
      },
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 渲染网格背景
      },
    });
    // 创建节点
    const rect = new X6.Shape.Rect({
      id: "rect1",
      width: 80,
      height: 40,
      attrs: {
        body: {
          fill: "blue",
        },
        label: {
          text: "Hello",
          fill: "white",
        },
      },
    });
    const rect2 = new X6.Shape.Rect({
      id: "rect2",
      x: 100,
      y: 200,
      width: 80,
      height: 40,
      attrs: {
        body: {
          fill: "blue",
        },
        label: {
          text: "world",
          fill: "white",
        },
      },
    });
    const edge = new X6.Shape.Edge({
      source: "rect1",
      target: "rect2",
      attrs: {
        line: {
          targetMaker: "block",
          sourceMarker: "block",
        },
      },
    });
    this.graph.addNode(rect);
    this.graph.addNode(rect2);
    this.graph.addEdge(edge);
    // this.graph.fromJSON(this.data) // 渲染画布
    // this.graph.centerContent() // 将画布内容中心与视口中心对齐
    // this.graph.zoom(-0.5) // 缩放画布
    // this.graph.translate(80, 40) // 平移画布
  }
  beforeDestroy() {
    this.graph.dispose();
  }
}
</script>

<style lang="scss" scoped></style>
