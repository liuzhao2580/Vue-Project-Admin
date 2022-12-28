import { EnumFieldToTransform } from "@/utils";
import G6, { Graph, IGroup, ModelConfig, NodeConfig } from "@antv/g6";


enum CustomTypeEnum {
  /** 圆形 */
  circleType = "circle-type",
  /** 菱形 */
  diamondType = "diamond-type"
}
/** 当前的数据状态 */
enum NodeStatusEnum {
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
enum NodeStatusColorEnum {
  success = "#aae2ff",
  jump = "#67c23a",
  refuse = "#f56c6c",
  done = "#e6a23c"
}

interface IPanel {
  title: string;
  label: string;
}

interface INodesData extends NodeConfig {
  type: CustomTypeEnum;
  status: NodeStatusEnum;
  panels: IPanel;
}

const nodesData: INodesData[] = [
  {
    id: "1",
    type: CustomTypeEnum.circleType,
    status: NodeStatusEnum.success,
    panels: {
      title: "发起",
      label: "小火车况且况且123123123"
    }
  },
  {
    id: "2",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "费用承担人",
      label: "小火车"
    }
  },
  {
    id: "3",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "一级主管审核",
      label: "小汽车"
    }
  },
  {
    id: "4",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "二级主管审核",
      label: "小飞机"
    }
  },
  {
    id: "5",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.jump,
    panels: {
      title: "三级主管审核",
      label: "小轮船"
    }
  },
  {
    id: "6",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "法务审批",
      label: "小火箭"
    }
  },
  {
    id: "7",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "会计审核",
      label: "小卡车"
    }
  },
  {
    id: "8",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "财务经理",
      label: "小拖车"
    }
  },
  {
    id: "9",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "财务总监",
      label: "小火车"
    }
  },
  {
    id: "10",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "CFO",
      label: "CFO"
    }
  },
  {
    id: "11",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "提交纸质单据",
      label: "财务扫描枪"
    }
  },
  {
    id: "12",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "待付款",
      label: "总账审批"
    }
  },
  {
    id: "13",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "付款",
      label: "财务付款-自动"
    }
  },
  {
    id: "14",
    type: CustomTypeEnum.diamondType,
    status: NodeStatusEnum.success,
    panels: {
      title: "出纳核销",
      label: "出纳核销归档"
    }
  },
  {
    id: "15",
    type: CustomTypeEnum.circleType,
    status: NodeStatusEnum.done,
    panels: {
      title: "归档",
      label: "归档"
    }
  }
];
function loopNodes(loopList: INodesData[]): NodeConfig[] {
  let loopX = 1;
  /** 一行有多少个数据 */
  const lineNumber = 6;
  return loopList.map((itemLabel, index) => {
    const nodesMap: INodesData = {
      label: itemLabel.panels.label,
      x: 0,
      y: 0,
      size: 50,
      ...itemLabel
    };
    if (index % lineNumber > 0) {
      loopX++;
    } else {
      loopX = 1;
    }
    const getFloor = Math.floor(index / lineNumber);

    // 说明是偶数,顺序是从左往右
    if (getFloor % 2 === 0) {
      nodesMap.x = 150 * loopX;
    }
    // 说明是奇数, 顺序是从右往左
    else {
      nodesMap.x = 150 * (lineNumber - loopX + 1);
    }
    nodesMap.y = 80 * (getFloor + 1);
    return nodesMap;
  });
}
const data = {
  // 点集
  nodes: loopNodes(nodesData),
  edges: [
    {
      type: "polyline",
      source: "1", // 起始点 id
      target: "2", // 结束点 id
      style: {
        stroke: "pink"
      }
    },
    {
      source: "1", // 起始点 id
      target: "3", // 结束点 id
      type: "line-arrow",
      style: {}
    }
  ]
};
// 自定义边界线条
G6.registerEdge(
  "line-arrow",
  {
    draw(cfg?: ModelConfig, group?: IGroup) {
      console.log(cfg);
      const startPoint = cfg?.startPoint;
      const endPoint = cfg?.endPoint;
      return (group as IGroup).addShape("path", {
        attrs: {
          stroke: "red",
          path: [
            ["M", startPoint?.x, startPoint?.y],
            ["L", startPoint?.x, (endPoint?.y as number) / 2],
            ["L", endPoint?.x, (endPoint?.y as number) / 2],
            ["L", endPoint?.x, endPoint?.y]
          ]
        },
        name: "path-shape"
      });
    }
  },
  "line"
);

// 自定义 node 元素 圆形
G6.registerNode(CustomTypeEnum.circleType, {
  draw: (cfg?: ModelConfig, group?: IGroup) => {
    console.log(cfg, "cfg");
    let fill = EnumFieldToTransform(
      NodeStatusEnum,
      NodeStatusColorEnum,
      cfg?.status as string
    );
    const setGroup = group as IGroup;
    const panels = cfg?.panels as IPanel;
    const circleRadius = 50; // 圆的半径
    const circleX = circleRadius / 2,
      circleY = circleRadius / 2; // 圆的X和Y轴
    const shape = setGroup.addShape("circle", {
      attrs: {
        x: circleX,
        y: circleY,
        r: circleRadius,
        fill,
        cursor: "pointer"
      }
    });

    // label text
    setGroup.addShape("dom", {
      attrs: {
        width: circleRadius * 2,
        height: 40,
        x: -circleX,
        textAlign: "start",
        html: `
          <div id=${+new Date()} style="width: 100%">
            <div style="color: #000;font-size:12px;text-align:center;white-space: nowrap;margin-bottom: 10px;">${panels.title}</div>
            <div style="color: #000;width: 100%;height:auto;font-size:12px;text-align:center;overflow: hidden;white-space: nowrap;">${panels.label}</div>
          </div>
        `
      }
    });
    return shape;
  }
});

// 自定义 node 元素 菱形
G6.registerNode(CustomTypeEnum.diamondType, {
  draw: (cfg?: ModelConfig, group?: IGroup) => {
    console.log(cfg, "cfg");
    // const { panels } = cfg
    const shape = (group as IGroup).addShape("polygon", {
      attrs: {
        points: [
          [30, 0],
          [60, 30],
          [30, 60],
          [0, 30]
        ],
        fill: "#aae2ff"
      }
    });
    return shape;
  }
});

export default class G6Utils {
  #container: HTMLDivElement;
  /** 实例 */
  #graph: Graph;
  get graph() {
    return this.#graph;
  }
  set graph (_: Graph) {
    this.#graph = _;
  }
  constructor() {
    this.#init();
  }

  #init() {
    this.#container = document.getElementById("container") as HTMLDivElement;
    const width = this.#container.scrollWidth;
    const height = this.#container.scrollHeight || 500;
    this.graph = new G6.Graph({
      container: "container",
      width,
      height,
      renderer: "svg",
      fitCenter: true,
      defaultEdge: {
        style: {
          lineAppendWidth: 3,
          endArrow: true
        }
      }
    });

    this.graph.data(data);
    this.graph.render();

    this.graph.on("node:mouseenter", (e: any) => {
      this.graph.setItemState(e.item, "active", true);
    });
    this.graph.on("node:mouseleave", (e: any) => {
      this.graph.setItemState(e.item, "active", false);
    });
    this.graph.on("edge:mouseenter", (e: any) => {
      this.graph.setItemState(e.item, "active", true);
    });
    this.graph.on("edge:mouseleave", (e: any) => {
      this.graph.setItemState(e.item, "active", false);
    });
  }
  /** 销毁 */
  graphDestory() {
    this.graph.destroy();
  }
  /** 跟随屏幕缩放 */
  graphResize() {
    if (!this.graph || this.graph.get("destroyed")) return;
    if (!this.#container || !this.#container.scrollWidth || !this.#container.scrollHeight) return;
    this.graph.changeSize(this.#container.scrollWidth, this.#container.scrollHeight - 100);
  }
}


