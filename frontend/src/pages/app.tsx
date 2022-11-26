import { Box } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRecommendation } from '../api/attractions'
import Map from '../components/map'
import Schedule from '../components/schedule'
import { StoreState } from '../store'

const App = (): React.ReactElement => {
  const dispatch = useDispatch()
  const location = useSelector((state: StoreState) => state.attractions.location)
  const { minRating, minComments } = useSelector((state: StoreState) => ({
    minRating: state.attractions.setting.minRating,
    minComments: state.attractions.setting.minComments
  }))

  useEffect(() => {
    void getRecommendation(location, minRating, minComments, dispatch)
  }, [location])

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateRows: 'auto',
      gridTemplateColumns: '30% auto',
      height: '100%'
    }}>
      <Schedule />
      <Map />
    </Box>
  )
}

export default App
