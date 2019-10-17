import Mock from "mockjs"

// const tokens = {
//     token: "token-admin"
// }

Mock.mock("/user/info", "get", {
    data: 1111
})
