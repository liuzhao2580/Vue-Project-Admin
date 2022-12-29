// @ts-ignore
import BpmnModeler from "bpmn-js/lib/Modeler";
import additionalModules from "./additionalModules";
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
    this.bpmnViewer = new BpmnModeler({
      container,
      additionalModules
    });
  }
}
