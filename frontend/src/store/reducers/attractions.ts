import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Location, Region, SelectableAttraction, Setting, Order } from '../../types'

interface State {
  defaultRegions: Region[]
  location: Location
  attractions: SelectableAttraction[]
  attractionId: string[]
  recommendation: number[]
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
  attractions: [],
  attractionId: [],
  recommendation: [],
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
    addAttractions: (state, action: PayloadAction<SelectableAttraction[]>) => {
      /*
      @TODO: Need to be optimized
      - Currently time complexity: O(N)
      - Redux doesn't support non-serializable class (e.g., Set)
      */
      action.payload.forEach(attraction => {
        if (!state.attractionId.includes(attraction.placeId)) {
          if (attraction.rating >= state.setting.minRating) {
            state.recommendation.push(state.attractions.length)
          }
          state.attractions.push(attraction)
          state.attractionId.push(attraction.placeId)
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
      state.attractions[action.payload].isSelected = true
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
      const scheduleIndex = state.schedule.map(index => state.attractionId[index]).indexOf(action.payload)
      state.canceledIndex = scheduleIndex
      const index = state.schedule.splice(scheduleIndex, 1)[0]
      state.attractions[index].isSelected = false
      state.scheduleIndex[scheduleIndex] = -1
      state.order = emptyOrder
      if (state.attractions[index].rating < state.setting.minRating) {
        const recommendedIndex = state.recommendation.indexOf(index)
        state.recommendation.splice(recommendedIndex, 1)
      }
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
      if (
        action.payload.setting.departureDay !== state.setting.departureDay ||
        action.payload.setting.transportation !== state.setting.transportation
      ) {
        state.order = emptyOrder
      }
      state.setting = action.payload.setting
      state.checkedSettingIndices = action.payload.checkedIndices
      state.recommendation = Array.from(Array(state.attractions.length).keys()).filter(index => (
        state.attractions[index].rating >= state.setting.minRating || state.schedule.includes(index)
      ))
    },
    setOrder: (state, action: PayloadAction<Order>) => {
      state.order = action.payload
    }
  }
})

export const {
  setDefaultRegions,
  setLocation,
  addAttractions,
  selectAttraction,
  cancelAttraction,
  reorderSchedule,
  setSetting,
  setOrder
} = attractionsSlice.actions

export default attractionsSlice.reducer
