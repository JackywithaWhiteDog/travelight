import React from 'react'
import styled from 'styled-components'
import Map from '../components/map'
import Schedule from '../components/schedule'

const BaseDiv = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 30% auto;
`

const App = (): React.ReactElement => {
  return (
    <BaseDiv>
      <Schedule />
      <Map />
    </BaseDiv>
  )
}

export default App
