import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'

interface styleProps {
  visible: boolean
}

const BaseDiv = styled.div<styleProps>`
  position: fixed;
  top: 80px;
  right: 20px;
  height: 250px;
  width: 400px;
  border: solid black 1px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`

const SettingBox = (): React.ReactElement => {
  const displaySettingBox = useSelector((state: StoreState) => state.setting.displaySettingBox)

  return (
    <BaseDiv visible={displaySettingBox} >
      Setting Box
    </BaseDiv>
  )
}

export default SettingBox
