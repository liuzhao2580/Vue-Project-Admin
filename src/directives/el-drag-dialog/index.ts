import { createApp } from "vue"
import drag from "./drag"

// eslint-disable-next-line vue/require-name-property
const app = createApp({})

app.directive("el-drag-dialog", drag)

export default drag
