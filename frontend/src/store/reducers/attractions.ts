import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location, Region, SelectableAttraction, Setting } from '../../types'

interface State {
  defaultRegions: Region[]
  location: Location
  recommendation: SelectableAttraction[]
  recommendationId: string[]
  schedule: number[]
  scheduleIndex: number[]
  setting: Setting
  checkedSettingIndices: number[]
}

const initialState: State = {
  defaultRegions: [],
  location: { longitude: 121.421072, latitude: 25.085651 },
  recommendation: [],
  recommendationId: [],
  schedule: [],
  scheduleIndex: [],
  setting: {
    transportation: 'transit',
    departureDay: (new Date()).getDay(),
    minRating: 0,
    minComments: 0
  },
  checkedSettingIndices: [5, 5, (new Date()).getDay(), 2]
}

interface SetSettingParams {
  setting: Setting
  checkedIndices: number[]
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
        if (!state.recommendationId.includes(attraction.placeId)) {
          state.recommendation.push(attraction)
          state.recommendationId.push(attraction.placeId)
        }
      })
    },
    selectAttraction: (state, action: PayloadAction<number>) => {
      /*
      Payload:
        - Index of recommended attractions: number
      */
      state.recommendation[action.payload].isSelected = true
      state.scheduleIndex[action.payload] = state.schedule.length
      state.schedule.push(action.payload)
    },
    cancelAttraction: (state, action: PayloadAction<number>) => {
      /*
      Payload:
        - Index of selected indices: number
      */
      const index = state.schedule.splice(action.payload, 1)[0]
      state.recommendation[index].isSelected = false
      state.scheduleIndex[action.payload] = -1
    },
    reorderSchedule: (state, action: PayloadAction<number[]>) => {
      /*
      Payload:
        - Indices of selected indices: number[]
      */
      action.payload.forEach((index, i) => {
        state.scheduleIndex[state.schedule[index]] = i
      })
      state.schedule = action.payload.map(index => state.schedule[index])
    },
    setSetting: (state, action: PayloadAction<SetSettingParams>) => {
      state.setting = action.payload.setting
      state.checkedSettingIndices = action.payload.checkedIndices
    }
  }
})

export const {
  setDefaultRegions,
  setLocation,
  addRecommendation,
  selectAttraction,
  cancelAttraction,
  reorderSchedule,
  setSetting
} = attractionsSlice.actions

export default attractionsSlice.reducer
