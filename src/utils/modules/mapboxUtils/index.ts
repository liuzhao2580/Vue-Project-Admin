type MapboxMap = mapboxgl.Map
const center: [number, number] = [114.341552, 30.546222]
mapboxgl.accessToken = "pk.eyJ1IjoibGl1emhhbzI1ODAiLCJhIjoiY2xmcnV5c2NtMDd4eDNvbmxsbHEwYTMwbCJ9.T0QCxGEJsLWC9ncE1B1rRw"
export class MapboxInit {
  createMap(container: string) {
    return new Promise((resolve) => {
      const map = new mapboxgl.Map({
        container,
        center,
        zoom: 13,
        pitch: 30,
        bearing: 0,
        minZoom: 6,
        maxZoom: 22,
        style: "mapbox://styles/liuzhao2580/cm3r2twl3004z01rd0xnz39wb",
        logoPosition: undefined // 移除 Mapbox logo
      })
      map.on("style.load", () => {
        viewReset(map)
        resolve(map)
      })
    })
  }
}


/**
 * 重置视图
 * @param map
 */
function viewReset(map: MapboxMap) {
  map.flyTo({
    zoom: 12,
    duration: 2000,
    center
  })
}