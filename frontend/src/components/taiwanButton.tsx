import { Container } from '@mui/material'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { StoreState } from '../store'
import { setLocation } from '../store/reducers/attractions'
import React, { SyntheticEvent, useState } from 'react'
import { SVGMap } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import Taiwan from '../assets/map'
import defaultRegions from '../assets/defaultRegions'
import { Location } from '../types'

const TaiwanButton = (): React.ReactElement => {
  const [hoveredRegion, setHovered] = useState('')
  const dispatch = useDispatch()
  // const defaultRegions = useSelector((state: StoreState) => state.attractions.defaultRegions, shallowEqual)
  const navigate = useNavigate()
  const onClick = (event: SyntheticEvent): void => {
    const clickedRegion: string = (event.target as any).id
    console.log(clickedRegion)
    if (clickedRegion in defaultRegions) {
      dispatch(setLocation(defaultRegions['keelung-city'] as unknown as Location))
      navigate('map')
    }
  }
  const moveOn = (event: SyntheticEvent): void => {
    const region: string = (event.target as any).id
    console.log(region)
    setHovered(region)
  }
  const moveOut = (event: SyntheticEvent): void => {
    const region: string = (event.target as any).id
    console.log(region)
    setHovered('')
  }
  return (
    <Container sx={{ width: '500px' }}>
      <SVGMap
        map={Taiwan} onLocationClick={onClick} onLocationMouseOut={moveOut} onLocationMouseOver={moveOn}
      />
      <p>{hoveredRegion}</p>
      {/* <>{getHovered() == ''? null: <span getHovered() />}</> */}
    </Container>
  )
}

export default TaiwanButton
