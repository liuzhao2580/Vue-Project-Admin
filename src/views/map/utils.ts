/** 操作地图的方法 */

/** 保存全局地图实例方法 */
let AMapDom: any = null
export default {
  /** 初始化地图 */
  AMapInit(AMap) {
    AMapDom = AMap
  },
  /** 设置地图的样式 */
  setAMapStyle(mapStyle) {
    let styleName = "amap://styles/" + mapStyle
    AMapDom.setMapStyle(styleName)
  },
}
