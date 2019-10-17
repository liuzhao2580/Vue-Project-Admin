// 引入 mock
import Mock from "mockjs"
import userInfo from "./user"


Mock.setup({
    timeout: 800, // 设置延迟响应，模拟向后端请求数据
});


export default {
    userInfo
}