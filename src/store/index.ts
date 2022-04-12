import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import {
  StoreAppModel,
  StoreTagsViewModel,
  StoreUserModel
} from '@/typescript/store'
import user from './modules/user'
import app from './modules/app'
import tagsView from './modules/tagsView'

// https://webpack.js.org/guides/dependency-management/#requirecontext
// const modulesFiles = require.context("./modules", true, /\.js$/)

// // you do not need `import app from './modules/app'`
// // it will auto require all vuex module from modules file
// const modules = modulesFiles.keys().reduce((modules, modulePath) => {
//     // set './app.js' => 'app'
//     const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, "$1")
//     const value = modulesFiles(modulePath)
//     modules[moduleName] = value.default
//     return modules
// }, {})

export interface State {
  app: StoreAppModel
  user: StoreUserModel
  tagsView: StoreTagsViewModel
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    app,
    user,
    tagsView
  }
})

export function useStore() {
  return baseUseStore(key)
}
