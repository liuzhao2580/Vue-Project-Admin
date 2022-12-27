/** 实例 */
let graph: any = null;

const G6 = window.G6;

enum CustomTypeEnum {
  /** 圆形 */
  circleType = "circle-type",
  /** 菱形 */
  diamondType = "diamond-type"
}

interface INodesLabel {
  id: string;
  type: CustomTypeEnum;
  panels: {
    title: string;
    label: string;
  };
}

const nodesLabel: INodesLabel[] = [
  {
    id: "1",
    type: CustomTypeEnum.circleType,
    panels: {
      title: "发起",
      label: "小火车况且况且"
    }
  },
  {
    id: "2",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "费用承担人",
      label: "小火车"
    }
  },
  {
    id: "3",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "一级主管审核",
      label: "小汽车"
    }
  },
  {
    id: "4",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "二级主管审核",
      label: "小飞机"
    }
  },
  {
    id: "5",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "三级主管审核",
      label: "小轮船"
    }
  },
  {
    id: "6",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "法务审批",
      label: "小火箭"
    }
  },
  {
    id: "7",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "会计审核",
      label: "小卡车"
    }
  },
  {
    id: "8",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "财务经理",
      label: "小拖车"
    }
  },
  {
    id: "9",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "财务总监",
      label: "小火车"
    }
  },
  {
    id: "10",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "CFO",
      label: "CFO"
    }
  },
  {
    id: "11",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "提交纸质单据",
      label: "财务扫描枪"
    }
  },
  {
    id: "12",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "待付款",
      label: "总账审批"
    }
  },
  {
    id: "13",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "付款",
      label: "财务付款-自动"
    }
  },
  {
    id: "14",
    type: CustomTypeEnum.diamondType,
    panels: {
      title: "出纳核销",
      label: "出纳核销归档"
    }
  },
  {
    id: "15",
    type: CustomTypeEnum.circleType,
    panels: {
      title: "归档",
      label: "归档"
    }
  }
];
function loopNodes(loopList: INodesLabel[]): any {
  let loopX = 1;
  /** 一行有多少个数据 */
  const lineNumber = 6;
  return loopList.map((itemLabel, index) => {
    const nodesMap = {
      label: itemLabel.panels.label,
      x: 0,
      y: 0,
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
  nodes: loopNodes(nodesLabel),
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
    draw(cfg: any, group: any) {
      console.log(cfg);
      const startPoint = cfg.startPoint;
      const endPoint = cfg.endPoint;
      return group.addShape("path", {
        attrs: {
          stroke: "red",
          path: [
            ["M", startPoint.x, startPoint.y],
            ["L", startPoint.x, endPoint.y / 2],
            ["L", endPoint.x, endPoint.y / 2],
            ["L", endPoint.x, endPoint.y]
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
  drawShape
});

function drawShape(cfg: any, group: any) {
  console.log(cfg, "cfg");
  // const { panels } = cfg
  const shape = group.addShape("circle", {
    attrs: {
      x: 0,
      y: 0,
      r: 20,
      fill: "blue",
      cursor: "pointer"
    }
  });
  return shape;
}
export default {
  init: () => {
    const container = document.getElementById("container") as HTMLDivElement;
    const width = container.scrollWidth;
    const height = container.scrollHeight || 500;
    graph = new G6.Graph({
      container: "container",
      width,
      height,
      fitCenter: true,
      defaultEdge: {
        style: {
          lineAppendWidth: 3,
          endArrow: true
        }
      }
    });

    graph.data(data);
    graph.render();

    graph.on("node:mouseenter", (e: any) => {
      graph.setItemState(e.item, "active", true);
    });
    graph.on("node:mouseleave", (e: any) => {
      graph.setItemState(e.item, "active", false);
    });
    graph.on("edge:mouseenter", (e: any) => {
      graph.setItemState(e.item, "active", true);
    });
    graph.on("edge:mouseleave", (e: any) => {
      graph.setItemState(e.item, "active", false);
    });
  },
  /** 销毁 */
  graphDestory() {
    graph.destroy();
  }
};
