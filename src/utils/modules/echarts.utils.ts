import type { ECharts, EChartsOption } from "echarts"

let echartsInterval: any = null

/** 清除 echarts 的定时器 */
export const clearEchartsInterval = () => {
  clearInterval(echartsInterval)
}

/** 自动播放的 echart 图表 */
export const AutoPlayBarEchartsUtils = (myEchart: ECharts): EChartsOption => {
  const xAxisData: string[] = []
  const barSeriesData: number[] = []
  const lineSeriseData: number[] = []
  const whileLength = 10;
  (function () {
    let len = 0
    let now = new Date()
    while (len < whileLength) {
      xAxisData.unshift(now.toLocaleTimeString().replace(/^\D*/, ""))
      barSeriesData.push(Math.floor(Math.random() * 1000) + len)
      lineSeriseData.push(Math.floor(Math.random() * 1000) + len)
      now = new Date(+now - 2000)
      len++
    }
  })()
  echartsInterval = setInterval(() => {
    let now = new Date()
    xAxisData.shift()
    xAxisData.push(now.toLocaleTimeString().replace(/^\D*/, ""))
    barSeriesData.shift()
    lineSeriseData.shift()
    barSeriesData.push(Math.floor(Math.random() * 1000))
    lineSeriseData.push(Math.floor(Math.random() * 1000))
    myEchart.setOption({
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          data: xAxisData
        }
      ],
      series: [
        {
          data: barSeriesData
        },
        {
          data: lineSeriseData
        }
      ]
    })
    myEchart.dispatchAction({
      type: "showTip",
      seriesIndex: 0,
      dataIndex: 0
    })
  }, 2100)
  return {
    title: {
      text: "自动播放的 echart 图表"
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        label: {
          backgroundColor: "#283b56"
        }
      }
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: true,
        data: xAxisData
      }
    ],
    yAxis: [
      {
        type: "value"
      }
    ],
    series: [
      {
        name: "Bar",
        type: "bar",
        data: barSeriesData
      },
      {
        name: "Line",
        type: "line",
        data: lineSeriseData
      }
    ]
  }
}
