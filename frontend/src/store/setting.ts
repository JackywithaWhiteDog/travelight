import { createSlice } from '@reduxjs/toolkit'

const settingSlice = createSlice({
  name: 'setting',
  initialState: {
    displaySettingBox: false
  },
  reducers: {
    toggleSettingBox: (state) => {
      state.displaySettingBox = !state.displaySettingBox
    }
  }
})

export const { toggleSettingBox } = settingSlice.actions

export default settingSlice.reducer
