import { useNavigate } from 'react-router-dom'
import { Card, CardMedia, Grid, CardContent, Typography } from '@mui/material'
import { setLocation } from '../store/reducers/attractions'
import { useDispatch } from 'react-redux'
import React, { SyntheticEvent, useState } from 'react'
// import Taiwan SVG Map
import { SVGMap } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import Taiwan from '../assets/map'
// import dictionaries whose key value are event.target.id of SVGMap (see onClick, moveOn and moveOut)
import defaultRegions from '../assets/defaultRegions'
import defaultAttractions from '../assets/defaultAttractions'

const AttractionPreview = (props: { name: string, pictureURL: string, index: number }): React.ReactElement => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="100"
        width="150"
        image={props.pictureURL}
      />
      <CardContent sx={{ padding: 1, '&:first-child': { paddingBottom: 1 }, paddingLeft: 2 }}>
        <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.4 }}>
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
    console.log(clickedRegion)
    if (clickedRegion in defaultRegions) {
      console.log(defaultRegions[clickedRegion].location)
      dispatch(setLocation(defaultRegions[clickedRegion].location))
      navigate('map')
    }
  }
  // show default recommendations when mouse moving on.
  const moveOn = (event: SyntheticEvent): void => {
    const region: string = (event.target as any).id
    console.log(region)
    setHovered(region)
  }
  // show default recommendations when mouse moving out.
  const moveOut = (event: SyntheticEvent): void => {
    const region: string = (event.target as any).id
    console.log(region)
    setHovered('')
  }
  // Return introduction, Taiwan map and recommendations if hovered.
  return (
    <Grid container columnSpacing={{ xs: 2, sm: 2, md: 5 }}>
      <Grid item xs={4}>
        <Typography paragraph>
          Before traveling, there are a bunch of things to consider.
          For instance, we need to decide which attractions to visit and how to visit them one by one, so that we can spend less time on transportation while also matching the attractions’ opening hours.

          Coming up with a plan to satisfy the above requirements is often tedious and time-consuming.
          But no worries, here comes your savior -
          Travelight: your best travelling assistant!

          The system not only recommends high-rating attractions, but also optimize your traveling schedule to meet your personal interest as well as external constraints.
          With Travelight, everyone can plan their travelling way more easier!
        </Typography>
      </Grid>
      <Grid item xs={3} sx={{ display: 'flex', width: '500px' }}>
        <SVGMap map={Taiwan} onLocationClick={onClick} onLocationMouseOut={moveOut} onLocationMouseOver={moveOn}
        />
      </Grid>
      <Grid item xs={4} sx={{ display: 'relative', width: '500px' }}>
        <p>{hoveredRegion}</p>
        {
          defaultAttractions[hoveredRegion] === undefined
            ? null
            : defaultAttractions[hoveredRegion].map((attraction, i) => (
              <AttractionPreview name={attraction.name} pictureURL={attraction.pictureURL} index={i} key={i} />
            ))
        }
      </Grid>
    </Grid>
  )
}
export default TaiwanButton
