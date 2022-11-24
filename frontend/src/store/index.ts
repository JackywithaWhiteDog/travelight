import { configureStore } from '@reduxjs/toolkit'
import attractionsReducer from './reducers/attractions'

const store = configureStore({
  reducer: {
    attractions: attractionsReducer
  }
})

export type StoreState = ReturnType<typeof store.getState>
export type StoreDispatch = typeof store.dispatch

export default store
