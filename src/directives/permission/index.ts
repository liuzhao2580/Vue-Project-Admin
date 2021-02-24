/** 用来设置权限功能的全局指令 */
import { Vue } from "vue-property-decorator"
import { getCookie } from "@/utils/cookies"
Vue.directive("permission", {
  bind(el, binding) {
    const { value: permissionValue } = binding
    const roleId = getCookie("roleId")?.toString()
    // 说明用户的 权限id 和 当前功能需要的 权限id 不相同
    if (roleId !== permissionValue.toString()) {
      el.style.color = "#c0c4cc"
      el.style.cursor = "not-allowed"
      el.style.backgroundImage = "none"
      el.style.backgroundColor = "#fff"
      el.style.borderColor = "#ebeef5"
      el.addEventListener("click", () => {
        return
      })
    }
  },
})
