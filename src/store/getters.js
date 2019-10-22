const getters = {
    user_img: state => state.user.user_img,
    user_name: state => state.user.user_name,
    side_status: state => state.app.side_status,
    tags_data: state => state.TagsView.tagsArray
}
export default getters