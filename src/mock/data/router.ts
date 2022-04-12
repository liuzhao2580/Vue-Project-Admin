const routerList = [
  {
    path: '/amap',
    title: '地图'
  },
  {
    path: '/components',
    title: '组件',
    children: [
      {
        path: 'richtext',
        title: '富文本编辑器'
      },
      {
        path: 'element',
        title: 'element'
      }
    ]
  }
]
export default routerList