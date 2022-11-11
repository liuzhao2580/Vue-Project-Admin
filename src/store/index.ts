import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import {
  StoreAppModel,
  StoreTagsViewModel,
  StoreUserModel
} from '@/typescript/store'
import user from './modules/user'
import app from './modules/app/index'
import tagsView from './modules/tagsView'

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
