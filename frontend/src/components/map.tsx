import React from 'react'
import { shallowEqual, useSelector } from 'react-redux'
import { StoreState } from '../store'

const Map = (): React.ReactElement => {
  const location = useSelector((state: StoreState) => state.attractions.location)
  const recommendation = useSelector((state: StoreState) => state.attractions.recommendation, shallowEqual)

  return (
    <div>
      <h1>map</h1>
      <p>location: {location.latitude}, {location.longitude}</p>
      {recommendation.map((attraction, i) => <button key={i}>{attraction.name}: ({attraction.location.latitude}, {attraction.location.longitude}), id: {attraction.placeId}, price level: {attraction.priceLevel}, rating: {attraction.rating}</button>)}
    </div>
  )
}

export default Map
