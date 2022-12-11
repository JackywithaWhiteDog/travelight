import { useNavigate } from 'react-router-dom'
import { Card, CardMedia, Box, CardContent, Typography } from '@mui/material'
import { useDispatch } from 'react-redux'
import React, { SyntheticEvent, useState } from 'react'
import { SVGMap } from 'react-svg-map'

import { setLocation, setRedirect } from '../store/reducers/attractions'
import Taiwan from '../assets/map'
import defaultRegions from '../assets/defaultRegions'
import defaultAttractions from '../assets/defaultAttractions'

const AttractionPreview = (props: { name: string, pictureURL: string, index: number }): React.ReactElement => {
  return (
    <Card sx={{
      position: 'relative',
      height: '100px'
    }}>
      <CardMedia
        component="img"
        image={props.pictureURL}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          height: '100%',
          width: '100%'
        }}
      />
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '100%',
        background: 'linear-gradient(transparent 0 50%, rgba(0, 0, 0, 0.5) 80% 100%)'
      }}></Box>
      <CardContent sx={{
        position: 'absolute',
        bottom: 0,
        right: 0,
        color: 'white',
        padding: '5px',
        '&:last-child': {
          paddingBottom: '10px'
        }
      }}>
        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
          {props.name}
        </Typography>
      </CardContent>
    </Card>
  )
}

const TaiwanButton = (): React.ReactElement => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [hoveredRegion, setHovered] = useState('')
  // handling click event
  const onClick = (event: SyntheticEvent): void => {
    const clickedRegion: string = (event.target as any).id
    if (clickedRegion in defaultRegions) {
      dispatch(setLocation(defaultRegions[clickedRegion].location))
      dispatch(setRedirect(true))
      navigate('map')
    }
  }
  // show default recommendations when mouse moving on.
  const moveOn = (event: SyntheticEvent): void => {
    const region: string = (event.target as any).id
    setHovered(region)
  }
  // show default recommendations when mouse moving out.
  const moveOut = (event: SyntheticEvent): void => {
    setHovered('')
  }
  // Return introduction, Taiwan map and recommendations if hovered.
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: '50% auto',
      alignItems: 'center',
      marginTop: '10px',
      marginBottom: '10px'
    }}>
      <Box sx={{
        width: '80%',
        '.svg-map': {
          width: '100%',
          height: 'auto',
          stroke: 'gray',
          strokeWidth: 1,
          strokeLinecap: 'round',
          strokeLinejoin: 'round',
          '&__location': {
            fill: '#bcead5',
            cursor: 'pointer',
            '&:focus, &:hover': {
              fill: '#8ec3b0',
              outline: 0
            }
          }
        },
        ...Object.fromEntries(
          Object.keys(defaultAttractions).filter(region => defaultAttractions[region].length > 0).map(region => [
            '#' + region + ':focus' + ', #' + region + ':hover',
            { fill: 'url(#pattern_' + region + ')' }
          ])
        )
      }}>
        <SVGMap
          map={Taiwan}
          onLocationClick={onClick}
          onLocationMouseOut={moveOut}
          onLocationMouseOver={moveOn}
          childrenBefore={
            <defs>
              {Object.keys(defaultAttractions).map((region, i) => (
                defaultAttractions[region].length > 0
                  ? <pattern id={'pattern_' + region} width="1" height="1" key={i}>
                    <image href={defaultAttractions[region][0].pictureURL} />
                  </pattern>
                  : ''
              ))}
            </defs>
          }
        />
      </Box>
      <Box>
        {
          hoveredRegion === ''
            ? null
            : <p>{defaultRegions[hoveredRegion].name}</p>
        }
        <Box sx={{
          display: 'grid',
          gridGap: '10px',
          gridTemplateColumns: 'repeat(auto-fill, 190px)'
        }}>

          {
            defaultAttractions[hoveredRegion] === undefined
              ? null
              : defaultAttractions[hoveredRegion].map((attraction, i) => (
                <AttractionPreview name={attraction.name} pictureURL={attraction.pictureURL} index={i} key={i} />
              ))
          }
        </Box>
      </Box>
    </Box>
  )
}
export default TaiwanButton
