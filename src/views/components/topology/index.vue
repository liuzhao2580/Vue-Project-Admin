<template>
  <div class="topology-box">
    <p>
      <a
        href="https://antv-g6.gitee.io/zh/docs/manual/getting-started"
        target="_block"
        >官网地址</a
      >
    </p>
    <div id="container"></div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
onMounted(() => {
  init()
})

const init = () => {
  const data = {
    nodes: [
      {
        id: '0',
        label: 'node-0',
        x: 100,
        y: 100,
        description: 'This is node-0.',
        subdescription: 'This is subdescription of node-0.'
      },
      {
        id: '1',
        label: 'node-1',
        x: 250,
        y: 100,
        description: 'This is node-1.',
        subdescription: 'This is subdescription of node-1.'
      },
      {
        id: '2',
        label: 'node-2',
        x: 150,
        y: 310,
        description: 'This is node-2.',
        subdescription: 'This is subdescription of node-2.'
      },
      {
        id: '3',
        label: 'node-3',
        x: 320,
        y: 310,
        description: 'This is node-3.',
        subdescription: 'This is subdescription of node-3.'
      }
    ],
    edges: [
      {
        id: 'e0',
        source: '0',
        target: '1',
        description: 'This is edge from node 0 to node 1.'
      },
      {
        id: 'e1',
        source: '0',
        target: '2',
        description: 'This is edge from node 0 to node 2.'
      },
      {
        id: 'e2',
        source: '0',
        target: '3',
        description: 'This is edge from node 0 to node 3.'
      }
    ]
  }
  const tooltip = new window.G6.Tooltip({
    offsetX: 10,
    trigger: 'click',
    offsetY: 0,
    // v4.2.1 起支持 fixToNode，tooltip 相对于节点固定位置
    fixToNode: [1, 0],
    // the types of items that allow the tooltip show up
    // 允许出现 tooltip 的 item 类型
    itemTypes: ['node'],
    // custom the tooltip's content
    // 自定义 tooltip 内容
    getContent: (e: any | undefined) => {
      const outDiv = document.createElement('div')
      outDiv.style.width = 'fit-content'
      outDiv.innerHTML = `
          <h4>Custom Content</h4>
          <ul>
            <li>Type: ${e.item.getType()}</li>
          </ul>
          <ul>
            <li>Label: ${e.item.getModel().label || e.item.getModel().id}</li>
          </ul>`
      return outDiv
    }
  })
  const container = document.getElementById('container') as HTMLDivElement
  const width = container.scrollWidth
  const height = container.scrollHeight || 500
  const graph = new window.G6.Graph({
    container: 'container',
    width,
    height,
    linkCenter: true,
    plugins: [tooltip],
    modes: {
      default: ['drag-node']
    },
    defaultNode: {
      size: [80, 40],
      type: 'rect'
    }
  })
  graph.data(data)
  graph.render()
}
this
</script>

<script lang="ts">
import { RouterName } from '@/router/RouteConst'
export default {
  name: RouterName.TOPOLOGY
}
</script>

<style lang="scss" scoped>
.topology-box {
  #container {
    height: 600px;
  }
}
</style>
