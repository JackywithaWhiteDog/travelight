import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete
} from '@react-google-maps/api'

import { Input, Skeleton, Button, Box } from '@mui/material'
import React from 'react'

import { shallowEqual, useSelector } from 'react-redux'
import { StoreState } from '../store'
import AttractionPin from './attractionPin'

const Map = (): React.ReactElement => {
  const location = useSelector((state: StoreState) => state.attractions.location)
  const recommendation = useSelector((state: StoreState) => state.attractions.recommendation, shallowEqual)
  if (process.env.REACT_APP_GOOGLE_MAPS_API_KEY === undefined) {
    process.env.REACT_APP_GOOGLE_MAPS_API_KEY = ''
  }

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ['places']
  })
  const [map, setMap] = React.useState<google.maps.Map | null>(/** @type google.maps.Map */ (null))
  /** const [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult|null>((null)) */

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = React.useRef<HTMLInputElement>(null)
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = React.useRef<HTMLInputElement>(null)
  const center = { lat: location.latitude, lng: location.longitude }
  if (!isLoaded) {
    return <Skeleton />
  }

  return (
    <div>
      <h1>map</h1>
      <p>location: {location.latitude}, {location.longitude}</p>
      {recommendation.map((attraction, i) => <AttractionPin attraction={attraction} index={i} key={i} />)}
      <Box>
        <div>
        <Autocomplete>
                  <Input type='text' placeholder='Origin' ref={originRef} />
        </Autocomplete>
        </div>
        <div>
        <Autocomplete>
                  <Input
                    type='text'
                    placeholder='Destination'
                    ref={destiantionRef} />
        </Autocomplete>
        </div>
        <Button
          onClick={() => {
            if (map != null) {
              map.panTo(center)
              map.setZoom(15)
            }
          }}
        >
          center back
        </Button>
      </Box>
      <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false
            }}
            onLoad={map => setMap(map)}
          >
            <Marker position={center} />

      </GoogleMap>
    </div>
  )
}

export default Map
