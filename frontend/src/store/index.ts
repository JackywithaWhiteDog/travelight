import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './setting'

const store = configureStore({
  reducer: {
    setting: settingReducer
  }
})

export type StoreState = ReturnType<typeof store.getState>
export type StoreDispath = typeof store.dispatch

export default store
