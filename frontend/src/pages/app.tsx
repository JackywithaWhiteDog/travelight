import { Box, Skeleton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useJsApiLoader } from '@react-google-maps/api'
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

  if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY = ''
    console.error('No key undefined')
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })

  return (
    <Box sx={{
      display: 'grid',
      gridTemplateRows: 'auto',
      gridTemplateColumns: '30% auto',
      height: '100%'
    }}>
      <Schedule />
      {isLoaded ? <Map /> : <Skeleton />}
    </Box>
  )
}

export default App
