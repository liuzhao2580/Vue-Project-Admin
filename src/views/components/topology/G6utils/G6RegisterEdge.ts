
import G6, { IGroup, ModelConfig } from "@antv/g6";
import { CustomTypeEnum } from "./type";
/** 自定义线条的方法 */
export default (customCircleRadius: number)=> {
  /** 计算是第几次使用同一个线条 */
  // let edgeIndex = 0;
  // 自定义边界线条
  G6.registerEdge(
    CustomTypeEnum.PAHT_LINE,
    {
      draw(cfg?: ModelConfig, group?: IGroup) {
        console.log(cfg);
        const setGroup = group as IGroup;
        // const panels = cfg?.panels as IPanel;
        const startPoint = cfg?.startPoint as {
          x: number,
          y: number
        };
        const endPoint = cfg?.endPoint as {
          x: number,
          y: number
        };
        return setGroup.addShape("path", {
          attrs: {
            stroke: "red",
            path: [
              ["M", startPoint.x - customCircleRadius, startPoint?.y],
              ["L", startPoint.x - customCircleRadius, endPoint?.y / 2],
              ["L", endPoint?.x + customCircleRadius, endPoint?.y / 2],
              ["L", endPoint?.x + customCircleRadius, endPoint?.y]
            ]
          },
          name: "path-shape"
        });
      }
    },
    "line"
  );
};
