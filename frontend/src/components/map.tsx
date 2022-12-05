import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoBox,
  DirectionsService
} from '@react-google-maps/api'

import { Box } from '@mui/material'
import React from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../store'
import { selectAttraction, setLocation, setRedirect } from '../store/reducers/attractions'
import AttractionCard from './attractionCard'

const shape = {
  coords: [0, 0, 30, 45],
  type: 'rect'
}

const Map = (): React.ReactElement => {
  const travelModeMap = {
    driving: google.maps.TravelMode.DRIVING,
    bicycling: google.maps.TravelMode.BICYCLING,
    transit: google.maps.TravelMode.TRANSIT,
    walking: google.maps.TravelMode.WALKING
  }

  const dispatch = useDispatch()
  const location = useSelector((state: StoreState) => state.attractions.location)
  const recommendation = useSelector((state: StoreState) => (state.attractions.recommendation.map(index => state.attractions.attractions[index])), shallowEqual)
  const schedule = useSelector((state: StoreState) => (state.attractions.schedule.map(index => state.attractions.attractions[index])), shallowEqual)
  const travelMode = useSelector((state: StoreState) => travelModeMap[state.attractions.setting.transportation])
  const redirect = useSelector((state: StoreState) => state.attractions.redirect)

  const [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult | undefined>()

  const [activePin, setActivePin] = React.useState<number | null>(null)
  const [activeByClick, setActiveByClick] = React.useState<boolean>(false)

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const center = new google.maps.LatLng(location.latitude, location.longitude)

  let origin = null
  let destination = null
  let waypoints: google.maps.DirectionsWaypoint[] | undefined
  if (schedule.length > 1) {
    origin = { lat: schedule[0].location.latitude, lng: schedule[0].location.longitude }
    destination = { lat: schedule[schedule.length - 1].location.latitude, lng: schedule[schedule.length - 1].location.longitude }
    if (schedule.length > 2) {
      waypoints = schedule.slice(1, -1).map(attraction => ({
        location: { lat: attraction.location.latitude, lng: attraction.location.longitude },
        stopover: true
      }))
    }
  }

  let proxyTravelMode = travelMode
  if (waypoints !== undefined && travelMode === google.maps.TravelMode.TRANSIT) {
    proxyTravelMode = google.maps.TravelMode.DRIVING
  }

  const directionsCallback = (result: google.maps.DirectionsResult | null, status: google.maps.DirectionsStatus): void => {
    if (result !== null && status === 'OK') {
      setDirectionsResponse(result)
    }
    dispatch(setRedirect(false))
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      <GoogleMap
        center={center}
        zoom={15}
        mapContainerStyle={{ width: '100%', height: '100%' }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          clickableIcons: false,
          styles: [
            {
              featureType: 'poi',
              stylers: [{
                visibility: 'off'
              }]
            },
            {
              featureType: 'landscape',
              elementType: 'labels.text',
              stylers: [{
                visibility: 'off'
              }]
            }
          ]
        }}
        onLoad={setMap}
        onClick={() => setActivePin(null)}
        onDragEnd={() => {
          if (map !== null) {
            const curCenter = map.getCenter()
            if (curCenter !== undefined && (curCenter.lat() !== center.lat() || curCenter.lng() !== center.lng())) {
              dispatch(setLocation({
                latitude: curCenter.lat(),
                longitude: curCenter.lng()
              }))
            }
          }
        }}
      >
        {recommendation.map((rec, i) => (
          <Marker
            shape={shape}
            position={{ lat: rec.location.latitude, lng: rec.location.longitude }}
            icon={rec.isSelected ? undefined : { url: require('../assets/blue.png'), scaledSize: new google.maps.Size(30, 45) }}
            key={i}
            onClick={() => {
              if (!rec.isSelected) {
                dispatch(selectAttraction(i))
              }
              if (activePin !== i || !activeByClick) {
                setActivePin(i)
                setActiveByClick(true)
              }
            }}
            onMouseOver={() => {
              if (activePin !== i) {
                setActivePin(i)
                setActiveByClick(false)
              }
            }}
            onMouseOut={() => {
              if (activePin === i && !activeByClick) {
                setActivePin(null)
              }
            }}
          >
            {
              i === activePin && (
                <InfoBox
                  options={{
                    closeBoxURL: '',
                    boxStyle: {}
                  }}
                >
                  <AttractionCard attraction={rec} />
                </InfoBox>
              )
            }
          </Marker>
        ))}
        {redirect && origin !== null && destination !== null &&
          <DirectionsService
            options={{
              origin,
              destination,
              travelMode: proxyTravelMode,
              waypoints
            }}
            callback={directionsCallback}
          />
        }
        <DirectionsRenderer
          directions={directionsResponse}
          options={{
            preserveViewport: true,
            suppressMarkers: true
          }}
        />
      </GoogleMap>
    </Box>
  )
}

export default Map
