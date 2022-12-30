export enum BpmnTargetNamespaceTypeEnum {
  activiti = "activiti",
  camunda = "camunda",
  flowable = "flowable"
}

/** 根据需要的 流程类型 设置 对应的解析文件 */
export enum BpmnTargetNamespaceEnum {
  activiti = "http://activiti.org/bpmn",
  camunda = "http://bpmn.io/schema/bpmn",
  flowable = "http://flowable.org/bpmn"
}
