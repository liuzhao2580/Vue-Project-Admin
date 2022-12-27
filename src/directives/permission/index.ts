/** 用来设置权限功能的全局指令 */
import { getCookie, CONST_VARIABLE } from "@/utils/modules/cookies";
import { DirectiveBinding } from "vue";
const permission = {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    const { value: permissionValue } = binding;
    const roleId = getCookie(CONST_VARIABLE.ROLE_ID)?.toString();
    // 说明用户的 权限id 和 当前功能需要的 权限id 不相同
    if (roleId !== permissionValue.toString()) {
      el.style.color = "#c0c4cc";
      el.style.cursor = "not-allowed";
      el.style.backgroundImage = "none";
      el.style.backgroundColor = "#fff";
      el.style.borderColor = "#ebeef5";
      /** 使用 css3 的属性,用来禁用点击事件 但是 ie9 不支持 */
      el.style.pointerEvents = "none";
    }
  }
};

export default permission;
