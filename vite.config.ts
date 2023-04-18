import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import viteCompression from "vite-plugin-compression"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
import { resolve } from "path"

/** 生产环境需要的配置 plugins */
const isBuildPlugins = (command: "build" | "serve") => {
  const flag = command === "build"
  if (flag)
    return [
      viteCompression({
        ext: ".gz",
        deleteOriginFile: false
      })
    ]
  else return []
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd())
  return {
    server: {
      host: "0.0.0.0",
      port: 9527,
      proxy: {
        // 定义代理的名称
        [`${env.VITE_APP_BASE_API}`]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true, // 是否启动代理
          // 设置之后请求会默认加上  如果你的真实的api路径中没有 /api 这一个路径，把这句加上
          pathRewrite: {
            [`^${env.VITE_APP_BASE_API}`]: ""
          }
        }
      }
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src")
      }
    },
    assetsInclude: [
      "./src/views/components/file-html/components/WordPreview/demo.docx"
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/variables.scss";`
        }
      }
    },
    plugins: [
      vue(),
      // 引入 svg
      createSvgIconsPlugin({
        iconDirs: [resolve(process.cwd(), "src/icons/svg")],
        symbolId: "icon-[name]"
      }),
      ...isBuildPlugins(command)
    ]
  }
})
