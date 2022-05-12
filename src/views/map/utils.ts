import AMapLoader from '@amap/amap-jsapi-loader'
/** 地图 */
let map

export default {
  /** 初始化地图 */
  init() {
    AMapLoader.load({
      key: '845d3f1a1fffaf5b4dba399d55c9d0fd', // 申请好的Web端开发者Key，首次调用 load 时必填
      version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then(AMap => {
        map = new AMap.Map('AMap')
        console.log(map, 'map')
        // map.addControl(new AMap.Scale())
        // map.addControl(new AMap.ToolBar())
      })
      .catch(e => {
        console.log(e)
      })
  }
}
