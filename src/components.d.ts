import SvgIcon from '@/components/SvgIcon/index.vue'
declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon
  }
}
