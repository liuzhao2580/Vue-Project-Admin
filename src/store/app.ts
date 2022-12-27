import { defineStore } from "pinia";
import { StoreAppModel } from "@/typescript/store";
import { reactive } from "vue";

export const useAppStore = defineStore("app", () => {
  const state = reactive(new StoreAppModel());
  /**  侧边栏状态 展开 或者 折叠 */
  function changeSideStatus() {
    state.side_status = !state.side_status;
  }
  /** 折叠侧边栏 */
  function flodSide() {
    state.side_status = true;
  }
  /** 展开侧边栏 */
  function unFlodSide() {
    state.side_status = false;
  }
  /** 设置 设备类型 */
  function setDevice(type: boolean) {
    state.isMobile = type;
  }

  return { state, changeSideStatus, flodSide, unFlodSide, setDevice };
});
