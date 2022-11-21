import { configureStore } from '@reduxjs/toolkit'
import settingReducer from './reducers/setting'
import attractionsReducer from './reducers/attractions'

const store = configureStore({
  reducer: {
    setting: settingReducer,
    attractions: attractionsReducer
  }
})

export type StoreState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export default store
