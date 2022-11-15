import React from 'react'
import styled from 'styled-components'
// import { useSelector } from 'react-redux'
// import { StoreState } from '../store'
import { COLORS } from '../constants'

const BaseDiv = styled.div`
  background-color: ${COLORS.secondary};
  height: 100%;
`

const Map = (): React.ReactElement => {
  // const location = useSelector((state: StoreState) => state.attractions.location)

  return (
    <BaseDiv>
      <h1>Schedule</h1>
    </BaseDiv>
  )
}

export default Map
