<template>
    <div>
        <p>
            <a href="https://antv-x6.gitee.io/zh" target="_block">官网地址</a>
        </p>
        <div id="container"></div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import * as X6 from '@antv/x6'
import './antv-x6'
/** 拓扑图组件 */
@Component({
    name: 'topology',
})
export default class TopologyComponent extends Vue {
    /** 定义 装拓扑图组件 */
    topologyContent: HTMLDivElement
    data = {
        // 节点
        nodes: [
            {
                id: 'node1', // String，可选，节点的唯一标识
                x: 40, // Number，必选，节点位置的 x 值
                y: 40, // Number，必选，节点位置的 y 值
                width: 80, // Number，可选，节点大小的 width 值
                height: 40, // Number，可选，节点大小的 height 值
                label: 'hello', // String，节点标签
            },
            {
                id: 'node2', // String，节点的唯一标识
                x: 160, // Number，必选，节点位置的 x 值
                y: 180, // Number，必选，节点位置的 y 值
                width: 80, // Number，可选，节点大小的 width 值
                height: 40, // Number，可选，节点大小的 height 值
                label: 'world', // String，节点标签
            },
        ],
        // 边
        edges: [
            {
                source: 'node1', // String，必须，起始节点 id
                target: 'node2', // String，必须，目标节点 id
            },
        ],
    }
    mounted() {
        this.topologyContent = document.querySelector('#antv-x6-container') as HTMLDivElement
    }
    /** 初始化 */
    init() {}
}
</script>

<style lang="scss" scoped>
</style>
