// 注册一个全局自定义指令 `v-image-rotote` 用于设置图片旋转
export default {
  beforeMount(el: HTMLElement) {
    el.onmouseover = () => {
      el.style.transform = "rotate(-360deg)";
      el.style.transition = "all 0.5s";
    };
    el.onmouseleave = () => {
      el.style.transform = "rotate(0)";
    };
  }
};
