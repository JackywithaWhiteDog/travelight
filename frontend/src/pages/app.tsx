import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getRecommendation } from '../api/attractions'
import Map from '../components/map'
import Schedule from '../components/schedule'
import { StoreState } from '../store'

const BaseDiv = styled.div`
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 30% auto;
  height: 100%;
`

const App = (): React.ReactElement => {
  const dispatch = useDispatch()
  const location = useSelector((state: StoreState) => state.attractions.location)

  useEffect(() => {
    void getRecommendation(location, dispatch)
    console.log('trigger')
  }, [location])

  return (
    <BaseDiv>
      <Schedule />
      <Map />
    </BaseDiv>
  )
}

export default App
