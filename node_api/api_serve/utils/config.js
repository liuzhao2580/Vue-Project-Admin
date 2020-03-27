module.exports = {
    node_port: 7777,
    API_versions: process.env.NODE_ENV === 'development' ? "/api/v1": '/api/v2',
    token_secret: "node_koa_project",
    mongoDB_USER_STR: "mongodb+srv://admin:admin@cluster0-wjmlp.mongodb.net/test?retryWrites=true&w=majority"
}