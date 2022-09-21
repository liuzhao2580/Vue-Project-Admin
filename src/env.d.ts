// / <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** 判断是哪个环境 */
  readonly VITE_ENV: 'development' | 'production' | 'pages' | 'test'
  /** 使用 mock 地址  */
  readonly VITE_APP_BASE_API: '/prod/api' | '/dev/api'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
