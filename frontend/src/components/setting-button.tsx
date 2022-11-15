import React from 'react'

const SettingButton = (): React.ReactElement => {
  const toggleSettingBox: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    // TODO: toggle setting box
  }

  return (
    <button onClick={toggleSettingBox}>
      Setting
    </button>
  )
}

export default SettingButton
