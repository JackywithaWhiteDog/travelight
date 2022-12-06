import {
  GoogleMap,
  DirectionsRenderer,
  Marker,
  InfoBox,
  DirectionsService
} from '@react-google-maps/api'

import { Alert, Box, IconButton, Slide, Snackbar } from '@mui/material'
import { Close } from '@mui/icons-material'
import React, { useEffect } from 'react'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { StoreState } from '../store'
import { selectAttraction, setLocation, setRedirect } from '../store/reducers/attractions'
import AttractionCard from './attractionCard'

import recPin from '../assets/attraction_pin/recPin.svg'
import selPin1 from '../assets/attraction_pin/selPin1.svg'
import selPin2 from '../assets/attraction_pin/selPin2.svg'
import selPin3 from '../assets/attraction_pin/selPin3.svg'
import selPin4 from '../assets/attraction_pin/selPin4.svg'
import selPin5 from '../assets/attraction_pin/selPin5.svg'
import selPin6 from '../assets/attraction_pin/selPin6.svg'
import selPin7 from '../assets/attraction_pin/selPin7.svg'
import selPin8 from '../assets/attraction_pin/selPin8.svg'
import selPin9 from '../assets/attraction_pin/selPin9.svg'
import selPin10 from '../assets/attraction_pin/selPin10.svg'
import { MAX_SCHEDULE_LENGTH, COLORS } from '../constants'
import EditIcon from '@mui/icons-material/Edit'
import CloseIcon from '@mui/icons-material/Close'

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
  const center = useSelector((state: StoreState) => new google.maps.LatLng(state.attractions.location.latitude, state.attractions.location.longitude))
  const attractions = useSelector((state: StoreState) => state.attractions.attractions, shallowEqual)
  const recommendation = useSelector((state: StoreState) => state.attractions.recommendation, shallowEqual)
  const schedule = useSelector((state: StoreState) => (state.attractions.schedule.map(index => state.attractions.attractions[index])), shallowEqual)
  const travelMode = useSelector((state: StoreState) => travelModeMap[state.attractions.setting.transportation])
  const redirect = useSelector((state: StoreState) => state.attractions.redirect)

  const [directionsResponse, setDirectionsResponse] = React.useState<google.maps.DirectionsResult | undefined>()

  const [activePin, setActivePin] = React.useState<number | null>(null)
  const [activeByClick, setActiveByClick] = React.useState<boolean>(false)

  const [map, setMap] = React.useState<google.maps.Map | null>(null)

  const [alertOpen, setAlertOpen] = React.useState<boolean>(false)
  const [changed, setChanged] = React.useState<boolean>(false)
  // const valueRef = React.useRef('')

  useEffect(() => {
    if (redirect && schedule.length <= 1) {
      setDirectionsResponse(undefined)
      dispatch(setRedirect(false))
    }
  }, [schedule])

  let origin = null
  let destination = null
  let waypoints: google.maps.DirectionsWaypoint[] | undefined
  if (redirect && schedule.length > 1) {
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

  const getPin = (placeId: string): string | undefined => {
    for (let i = 0; i < schedule.length; i++) {
      if (schedule[i].placeId === placeId) {
        switch (i + 1) {
          case 1: return selPin1
          case 2: return selPin2
          case 3: return selPin3
          case 4: return selPin4
          case 5: return selPin5
          case 6: return selPin6
          case 7: return selPin7
          case 8: return selPin8
          case 9: return selPin9
          case 10: return selPin10
        }
      }
    }
  }

  return (
    <Box
      sx={{
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      <Snackbar
        open={alertOpen}
        autoHideDuration={1500}
        onClose={() => alertOpen && setAlertOpen(false)}
        TransitionComponent={Slide}
      >
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setAlertOpen(false)}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          最多只能選 {MAX_SCHEDULE_LENGTH} 個景點！
        </Alert>
      </Snackbar>
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
        onClick={() => { !changed && setActivePin(null) }}
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
            position={{ lat: attractions[rec].location.latitude, lng: attractions[rec].location.longitude }}
            icon={attractions[rec].isSelected ? getPin(attractions[rec].placeId) : { url: recPin, scaledSize: new google.maps.Size(30, 45) }}
            key={i}
            onClick={() => {
              if (!attractions[rec].isSelected) {
                if (schedule.length < MAX_SCHEDULE_LENGTH) {
                  dispatch(selectAttraction(rec))
                } else {
                  setAlertOpen(true)
                }
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
                    boxStyle: {},
                    disableAutoPan: true
                  }}
                >
                  <Box>
                  <AttractionCard attraction={attractions[rec]} index={rec} />
                  <div>

                  <IconButton aria-label="edit" onClick={ () => { changed ? setChanged(false) : setChanged(true) }}
                  sx={{ backgroundColor: COLORS.deleteButtonBackground, opacity: 0.3, borderRadius: '12px', ':hover': { backgroundColor: COLORS.deleteButtonBackground, opacity: 0.9 } }}>
                    { changed ? <CloseIcon color={'secondary'} /> : <EditIcon color={'secondary'} />}
                  </IconButton>
                  </div>
                  </Box>
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
        {
          directionsResponse !== undefined && (
            <DirectionsRenderer
              directions={directionsResponse}
              options={{
                preserveViewport: true,
                suppressMarkers: true
              }}
            />
          )
        }
      </GoogleMap>
    </Box>
  )
}

export default Map
