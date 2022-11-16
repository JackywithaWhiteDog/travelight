import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location, Region, SelectableAttraction } from '../../types'

interface State {
  defaultRegions: Region[]
  location: Location
  recommendation: SelectableAttraction[]
  recommendation_id: string[]
}

const initialState: State = {
  defaultRegions: [],
  location: { longitude: 121.421072, latitude: 25.085651 },
  recommendation: [],
  recommendation_id: []
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
    },
    addRecommendation: (state, action: PayloadAction<SelectableAttraction[]>) => {
      /*
      @TODO: Need to be optimized
      - Currently time complexity: O(N)
      - Redux doesn't support non-serializable class (e.g., Set)
      */
      action.payload.forEach(attraction => {
        if (!state.recommendation_id.includes(attraction.placeId)) {
          state.recommendation.push(attraction)
          state.recommendation_id.push(attraction.placeId)
        }
      })
    }
  }
})

export const { setDefaultRegions, setLocation, addRecommendation } = attractionsSlice.actions

export default attractionsSlice.reducer
