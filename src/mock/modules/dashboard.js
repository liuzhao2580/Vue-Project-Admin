import Mock from "mockjs"

// const tokens = {
//     token: "token-admin"
// }

Mock.mock("/dashboard", "get", {
    "页面访问次数|1-100": 100
})
