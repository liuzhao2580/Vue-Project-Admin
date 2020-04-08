const getters = {
    avatar: state => state.user.avatar,
    nickname: state => state.user.nickname,
    token: state => state.user.token,
    RouList: state => state.user.RouList,
    side_status: state => state.app.side_status,
    tags_data: state => state.TagsView.tagsArray
}
export default getters