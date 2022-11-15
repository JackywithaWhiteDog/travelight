import React from 'react'
import styled from 'styled-components'
import { COLORS } from '../constants'
import SettingBox from './setting-box'
import SettingButton from './setting-button'

const BaseHeader = styled.header`
  position: fixed;
  width: 100%;
`

const BaseNav = styled.nav`
  background: ${COLORS.primary};
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px;
`

const Header = (): React.ReactElement => (
  <BaseHeader>
    <BaseNav>
      <span>Travelight</span>
      <SettingButton />
    </BaseNav>
    <SettingBox />
  </BaseHeader>
)

export default Header
