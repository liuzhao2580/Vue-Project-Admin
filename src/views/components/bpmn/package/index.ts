// @ts-ignore
import BpmnModeler from "bpmn-js/lib/Modeler";
import customTranslate from "./designer/translate/customTranslate";
/** 实例化 */
export default class BpmnUtils {

  /** bpmn 的实例 */
  #bpmnViewer: any;
  get bpmnViewer() {
    return this.#bpmnViewer;
  }
  set bpmnViewer(_) {
    this.#bpmnViewer = _;
  }
  constructor(container: string) {
    this.#init(container);
  }
  #init(container: string) {
    const customTranslateModule = {
      translate: ["value", customTranslate]
    };
    this.bpmnViewer = new BpmnModeler({
      container,
      // 添加控制板
      propertiesPanel: {
        parent: "#js-properties-panel"
      },
      additionalModules: [
        customTranslateModule
      ]
    });
  }
}
