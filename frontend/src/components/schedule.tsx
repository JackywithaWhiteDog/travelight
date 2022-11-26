import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import { StoreState } from '../store'
import AttractionCard from './attractionCard'
import { optimizeSchedule } from '../api/schedule'

const Schedule = (): React.ReactElement => {
  const schedule = useSelector((state: StoreState) => state.attractions.schedule.map(index => state.attractions.recommendation[index]))
  const { transportation, departureDay } = useSelector((state: StoreState) => ({
    transportation: state.attractions.setting.transportation,
    departureDay: state.attractions.setting.departureDay
  }))
  const dispatch = useDispatch()

  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      <Toolbar
        sx={{
          backgroundColor: 'primary.main',
          justifyContent: 'space-between'
        }}
      >
        <Typography>規劃行程</Typography>
        <Button variant="contained" onClick={() => { void optimizeSchedule(schedule, transportation, departureDay, false, dispatch) }} >Optimize</Button>
      </Toolbar>
      <Box
        sx={{
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        {schedule.map((attraction, i) => <AttractionCard attraction={attraction} index={i} key={i} />)}
      </Box>
    </Box>
  )
}

export default Schedule
