import { RouteLocation } from 'vue-router'
/** tagsView 中的接口 */
export interface ITagsView {
  fullPath: RouteLocation['path'],
  meta: RouteLocation['meta'],
  name: RouteLocation['name']
}