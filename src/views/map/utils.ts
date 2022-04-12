/** 操作地图的方法 */

import { createScript } from '@/utils/config'
/** window 挂载的AMap */
const AMap = (window as any).AMap
/** 保存全局地图实例方法 */
let AMapDom: any = null
/** 获取点聚合的示例对象 */
let markerClusterInstance: any = null
/** 点聚合的点位数据 */
let markers: Array<any> = []
/** 点聚合的缓存数据 */
let cacheMarkers: Array<any> = []
/** 判断是否是第一次点击 点聚合事件 */
let firstClickMarker = true
export default {
  /** 初始化地图 */
  AMapInit(AMap) {
    AMapDom = AMap
  },
  /** 设置地图的样式 */
  async setAMapStyle(mapStyle) {
    const styleName = 'amap://styles/' + mapStyle
    AMapDom.setMapStyle(styleName)
    await createScript('http://localhost:80/test')
  },
  /** 点聚合  */
  async markerClusterer(type: boolean) {
    // 说明 点聚合
    if (type) {
      // 说明是第一次加载
      if (firstClickMarker) {
        try {
          await createScript('http://a.amap.com/jsapi_demos/static/china.js')
          // const getData = await createScript(
          //   "http://localhost:80/test",
          //   "callbackJSONP",
          // )
          // console.log(getData, "")
          const getWindow = window as any
          const points = getWindow.points
          const controlBar = AMapDom.plugin(['AMap.MarkerClusterer'], () => {
            for (let i = 0; i < points.length; i += 1) {
              markers.push(
                new AMap.Marker({
                  position: points[i]['lnglat'],
                  content:
                    '<div style="background-color: hsla(180, 100%, 50%, 0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;"></div>',
                  offset: new AMap.Pixel(-15, -15)
                })
              )
            }
            cacheMarkers = markers
            markerClusterInstance = new AMap.MarkerClusterer(AMapDom, markers, {
              gridSize: 80
            })
            firstClickMarker = false
          })
          AMapDom.addControl(controlBar)
        } catch (error) {
          console.log(error, '')
        }
      }
      // 说明不是第一次点击点聚合按钮
      else {
        // 说明 已经存在点聚合，不用再次生成点聚合数据
        if (markers.length) return
        markerClusterInstance = new AMap.MarkerClusterer(
          AMapDom,
          cacheMarkers,
          { gridSize: 80 }
        )
      }
    }
    // 说明是清除点聚合
    else {
      markerClusterInstance.clearMarkers()
      markers = []
    }
  }
}
