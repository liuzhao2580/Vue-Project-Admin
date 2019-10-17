const tokens = {
    token: "token-admin"
}

export default {
    userInfo: {
        url: '/user/info',
        type: 'get',
        response: () => {
            return tokens
        }
    }
}