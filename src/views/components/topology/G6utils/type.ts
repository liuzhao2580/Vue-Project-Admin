import { NodeConfig } from "@antv/g6";

/** 自定义的形状 */
export enum CustomTypeEnum {
  /** 圆形 */
  circleType = "circle-type",
  /** 菱形 */
  diamondType = "diamond",
  /** 自定义的直线 */
  PAHT_LINE = "path-line"
}
/** 当前的数据状态 */
export enum NodeStatusEnum {
  /** 通过 */
  success = "success",
  /** 跳过 */
  jump = "jump",
  /** 退回 */
  refuse = "refuse",
  /** 完成 */
  done = "done"
}

/** 当前数据不同状态的颜色 */
export enum NodeStatusColorEnum {
  success = "#aae2ff",
  jump = "#67c23a",
  refuse = "#f56c6c",
  done = "#e6a23c"
}

export interface IPanel {
  title: string;
  label: string;
}

export interface INodesData extends NodeConfig {
  type: CustomTypeEnum;
  status: NodeStatusEnum;
  panels: IPanel;
}
