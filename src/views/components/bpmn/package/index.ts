// @ts-ignore
import BpmnModeler from "bpmn-js/lib/Modeler";
import { BpmnTargetNamespaceTypeEnum } from "../type";
import additionalModules from "./additionalModules";
import { defaultEmptyXML } from "./utils";
/** 实例化 */
export default class BpmnUtils {
  /** 大盒子的实例 */
  containerHtml: HTMLDivElement;
  /** bpmn 的实例 */
  #bpmnModeler: any;
  get bpmnModeler() {
    return this.#bpmnModeler;
  }
  set bpmnModeler(_) {
    this.#bpmnModeler = _;
  }
  /**
   * @param {string} container 传递的 id
   */
  constructor(container: string) {
    this.#init(container);
  }
  #init(containerId: string) {
    this.containerHtml = document.getElementById(
      "js-drop-zone"
    ) as HTMLDivElement;
    const container = document.getElementById(containerId) as HTMLDivElement;
    console.log(container);
    this.bpmnModeler = new BpmnModeler({
      container,
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      additionalModules
    });
    // 默认开启迷你地图
    this.bpmnModeler.get("minimap").open();
    this.#createNewDiagram(this.containerHtml);
  }
  /** 创建画图 */
  async #createNewDiagram(containerHtml: HTMLDivElement) {
    try {
      let newId = `Process_${new Date().getTime()}`;
      let newName = `业务流程_${new Date().getTime()}`;
      const xmlString = defaultEmptyXML(newId, newName, BpmnTargetNamespaceTypeEnum.camunda);
      let { warnings } = await this.bpmnModeler.importXML(xmlString);
      if (warnings && warnings.length) {
        warnings.forEach((warn: string) => console.warn(warn));
      }
      containerHtml.className = "content with-diagram";
    } catch (err: any) {
      containerHtml.className = "content with-error";
      containerHtml.getElementsByClassName("error pre")[0].textContent =
        err?.message;
    }
  }
}
