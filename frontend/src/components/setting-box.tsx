import React from 'react'
import styled from 'styled-components'

const BaseDiv = styled.div`
  position: fixed;
  top: 80px;
  right: 20px;
  height: 250px;
  width: 400px;
  border: solid black 1px;
`

const SettingBox = (): React.ReactElement => (
  <BaseDiv>
    Setting Box
  </BaseDiv>
)

export default SettingBox
