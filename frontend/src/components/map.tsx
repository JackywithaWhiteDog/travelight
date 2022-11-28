import {
  GoogleMap,
  DirectionsRenderer
} from '@react-google-maps/api'

import { Button, Box, Typography } from '@mui/material'
import React from 'react'

import { shallowEqual, useSelector } from 'react-redux'
import { StoreState } from '../store'
import AttractionPin from './attractionPin'

const Map = (): React.ReactElement => {
  const location = useSelector((state: StoreState) => state.attractions.location)
  const recommendation = useSelector((state: StoreState) => state.attractions.recommendation, shallowEqual)
  const schedule = useSelector((state: StoreState) => (state.attractions.schedule.map(index => state.attractions.recommendation[index])), shallowEqual)
  const [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult | undefined>()

  const [map, setMap] = React.useState<google.maps.Map | null>(/** @type google.maps.Map */(null))
  /** const [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult|null>((null)) */

  /** @type React.MutableRefObject<HTMLInputElement> */

  async function calculateRoute (): Promise<void> {
    const selectedlist = schedule
    const originpoint = new google.maps.LatLng(selectedlist[0].location.latitude, selectedlist[0].location.longitude)
    const despoint = new google.maps.LatLng(selectedlist[selectedlist.length - 1].location.latitude, selectedlist[selectedlist.length - 1].location.longitude)
    // eslint-disable-next-line no-undefined
    const directionsService = new google.maps.DirectionsService()
    setCenter(despoint)
    if (selectedlist.length > 2) {
      const waypoint = selectedlist.slice(1, -1).map((rec) => {
        return {
          location: { lat: rec.location.latitude, lng: rec.location.longitude },
          stopover: true
        }
      })
      const results = await directionsService.route({

        origin: originpoint,
        destination: despoint,
        waypoints: waypoint,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      })
      setDirectionsResponse(results)
    } else {
      const results = await directionsService.route({

        origin: originpoint,
        destination: despoint,
        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING
      })
      setDirectionsResponse(results)
    }
  }

  const [center, setCenter] = React.useState<google.maps.LatLng>(new google.maps.LatLng(location.latitude, location.longitude))

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      <Typography>Map</Typography>
      <Typography>location: {location.latitude}, {location.longitude}</Typography>
      {recommendation.map((attraction, i) => <AttractionPin attraction={attraction} index={i} key={i} />)}
      <Box>
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
        <Button
          onClick={() => {
            void (calculateRoute())
          }}
        >
          route
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

        {/* <Marker position={center} /> */}
        {directionsResponse !== undefined && <DirectionsRenderer directions={directionsResponse} />}

      </GoogleMap>
    </Box>
  )
}

export default Map
