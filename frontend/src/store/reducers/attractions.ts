import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location, Region, SelectableAttraction, Setting, Order } from '../../types'

interface State {
  defaultRegions: Region[]
  location: Location
  recommendation: SelectableAttraction[]
  recommendationId: string[]
  schedule: number[]
  scheduleIndex: number[]
  setting: Setting
  checkedSettingIndices: number[]
  reorderByDragging: boolean
  canceledIndex: number | null
  order: Order
}

interface reorderSchedulePayload {
  indices: number[]
  reorderByDragging: boolean
}

const emptyOrder = {
  order: [],
  arriveTimes: [],
  leaveTimes: [],
  transportationTimes: [],
  idleTimes: [],
  savedTime: 0,
  isValid: false
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
  checkedSettingIndices: [5, 5, (new Date()).getDay(), 2],
  reorderByDragging: false,
  canceledIndex: null,
  order: emptyOrder
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
      state.reorderByDragging = false
      state.canceledIndex = null
      state.recommendation[action.payload].isSelected = true
      state.scheduleIndex[action.payload] = state.schedule.length
      state.schedule.push(action.payload)
      state.order = emptyOrder
    },
    cancelAttraction: (state, action: PayloadAction<string>) => {
      /*
      Payload:
        - PlaceId of selected indices: string
      */
      state.reorderByDragging = false
      const scheduleIndex = state.schedule.map(index => state.recommendationId[index]).indexOf(action.payload)
      state.canceledIndex = scheduleIndex
      const index = state.schedule.splice(scheduleIndex, 1)[0]
      state.recommendation[index].isSelected = false
      state.scheduleIndex[scheduleIndex] = -1
      state.order = emptyOrder
    },
    reorderSchedule: (state, action: PayloadAction<reorderSchedulePayload>) => {
      /*
      Payload:
        - Indices of selected indices: number[]
        - Reorder by dragging: boolean
      */
      state.reorderByDragging = action.payload.reorderByDragging
      state.canceledIndex = null
      action.payload.indices.forEach((index, i) => {
        state.scheduleIndex[state.schedule[index]] = i
      })
      state.schedule = action.payload.indices.map(index => state.schedule[index])
      if (action.payload.reorderByDragging) {
        state.order = emptyOrder
      }
    },
    setSetting: (state, action: PayloadAction<SetSettingParams>) => {
      state.setting = action.payload.setting
      state.checkedSettingIndices = action.payload.checkedIndices
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload
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
  setSetting,
  setOrder
} = attractionsSlice.actions

export default attractionsSlice.reducer
