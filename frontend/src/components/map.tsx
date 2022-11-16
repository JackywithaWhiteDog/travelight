import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { StoreState } from '../store'
import AttractionPin from './attractionPin'

const Map = (): React.ReactElement => {
  const location = useSelector((state: StoreState) => state.attractions.location)
  const recommendation = useSelector((state: StoreState) => state.attractions.recommendation, shallowEqual)

  return (
    <div>
      <h1>map</h1>
      <p>location: {location.latitude}, {location.longitude}</p>
      {recommendation.map((attraction, i) => <AttractionPin attraction={attraction} key={i} />)}
    </div>
  )
}

export default Map
