/** 用来到处全局的 自定义指令 */
import type { App } from "vue";
import permission from "./permission";
import imgRotote from "./imgRotote";

export default (app: App) => {
  app.directive("img-rotote", imgRotote).directive("permission", permission);
};
