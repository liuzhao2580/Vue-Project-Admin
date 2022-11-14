import { InjectionKey } from 'vue'
import { createStore, Store, useStore as baseUseStore } from 'vuex'
import {
  StoreTagsViewModel,
  StoreUserModel
} from '@/typescript/store'
import user from './modules/user'
import tagsView from './modules/tagsView'

export interface State {
  user: StoreUserModel
  tagsView: StoreTagsViewModel
}

export const key: InjectionKey<Store<State>> = Symbol()

export const store = createStore<State>({
  modules: {
    user,
    tagsView
  }
})

export function useStore() {
  return baseUseStore(key)
}
