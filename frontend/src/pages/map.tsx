import React from 'react'
import { useSelector } from 'react-redux'
import { StoreState } from '../store'

const Map = (): React.ReactElement => {
  const location = useSelector((state: StoreState) => state.attractions.location)

  return (
    <>
      <h1>map</h1>
      <p>latitude: {location.latitude}</p>
      <p>longitude: {location.longitude}</p>
    </>
  )
}

export default Map
