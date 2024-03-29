import AMapLoader from "@amap/amap-jsapi-loader"
/** 地图 */
let GDMap: any
/** 创建右键菜单 */
let contextMenu

export default {
  /** 初始化地图 */
  init() {
    // @ts-ignore
    window._AMapSecurityConfig = {
      securityJsCode: "e9b65377c9aae70a70efcbc0e728b181"
    }
    AMapLoader.load({
      key: "845d3f1a1fffaf5b4dba399d55c9d0fd", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "1.4.15", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: ["AMap.Scale", "AMap.ToolBar", "AMap.ContextMenu"] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then(AMap => {
        GDMap = new AMap.Map("GDMap")
        GDMap.addControl(new AMap.Scale())
        GDMap.addControl(new AMap.ToolBar())
        this.createContextMenu(AMap)
      })
      .catch(e => {
        console.log(e)
      })
  },
  /** 创建右键菜单 */
  createContextMenu(AMap: any) {
    contextMenu = new AMap.ContextMenu()

    contextMenu.addItem(
      "放大一级",
      function () {
        GDMap.zoomIn()
      },
      0
    )
  }
}
