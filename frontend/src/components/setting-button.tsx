import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleSettingBox } from '../store/reducers/setting'

const SettingButton = (): React.ReactElement => {
  const dispatch = useDispatch()
  return (
    <button onClick={() => dispatch(toggleSettingBox())}>
      Setting
    </button>
  )
}

export default SettingButton
