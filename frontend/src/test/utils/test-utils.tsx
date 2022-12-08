import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
// import type { RenderOptions } from '@testing-library/react'
import { configureStore } from '@reduxjs/toolkit'
// import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
// import type { StoreState, StoreDispatch } from '../../store'

// As a basic setup, import your same slice reducers
import attractionsReducer from '../../store/reducers/attractions'
import { StoreType } from '../../store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.

// interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
//   preloadedState?: PreloadedState<StoreState>
//   store?: ReturnType<typeof setupStore>
// }

export const renderWithProviders = (ui: React.ReactElement): StoreType => {
  const store = configureStore({ reducer: { attractions: attractionsReducer } })
  const Wrapper = ({ children }: PropsWithChildren<{}>): JSX.Element => {
    return <Provider store={store}>{children}</Provider>
  }
  render(ui, { wrapper: Wrapper })
  // Return an object with the store and all of RTL's query functions
  return store
}
