import { createSlice } from '@reduxjs/toolkit'

interface State {
  displaySettingBox: boolean
}

const initialState: State = {
  displaySettingBox: false
}

const settingSlice = createSlice({
  name: 'setting',
  initialState,
  reducers: {
    toggleSettingBox: (state) => {
      state.displaySettingBox = !state.displaySettingBox
    }
  }
})

export const { toggleSettingBox } = settingSlice.actions

export default settingSlice.reducer
