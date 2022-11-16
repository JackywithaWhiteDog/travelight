import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location } from '../../types'

export interface Region {
  name: string
  location: Location
}

interface State {
  defaultRegions: Region[]
  location: Location
}

const initialState: State = {
  defaultRegions: [],
  location: { longitude: 121.421072, latitude: 25.085651 }
}

const attractionsSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    setDefaultRegions: (state, action: PayloadAction<Region[]>) => {
      state.defaultRegions = action.payload
    },
    setLocation: (state, action: PayloadAction<Location>) => {
      state.location = action.payload
    }
  }
})

export const { setDefaultRegions, setLocation } = attractionsSlice.actions

export default attractionsSlice.reducer
