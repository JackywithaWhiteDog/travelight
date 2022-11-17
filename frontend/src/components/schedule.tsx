import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../store'
import { COLORS } from '../constants'
import AttractionCard from './attractionCard'
import { optimizeSchedule } from '../api/schedule'

const BaseDiv = styled.div`
  background-color: ${COLORS.secondary};
  height: 100%;
`

const Schedule = (): React.ReactElement => {
  const schedule = useSelector((state: StoreState) => state.attractions.schedule.map(index => state.attractions.recommendation[index]))
  const dispatch = useDispatch()

  return (
    <BaseDiv>
      <h1>Schedule</h1>
      <button onClick={() => { void optimizeSchedule(schedule, dispatch) }} >Optimize</button>
      {schedule.map((attraction, i) => <AttractionCard attraction={attraction} index={i} key={i} />)}
    </BaseDiv>
  )
}

export default Schedule
