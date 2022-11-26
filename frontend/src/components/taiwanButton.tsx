import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Card, CardMedia, Grid, CardContent, Typography } from '@mui/material'
import { setLocation } from '../store/reducers/attractions'
import React, { SyntheticEvent, useState } from 'react'
import { SVGMap } from 'react-svg-map'
import 'react-svg-map/lib/index.css'
import Taiwan from '../assets/map'
import defaultRegions from '../assets/defaultRegions'
import { Location } from '../types'
import defaultAttractions from '../assets/defaultAttractions'

const AttractionCard = (props: { name: string, pictureURL: string, index: number }): React.ReactElement => {
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

AttractionCard.defaultProps = {
  visibility: true
}

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
              <AttractionCard name={attraction.name} pictureURL={attraction.pictureURL} index={i} key={i} />
            ))
        }
      </Grid>
    </Grid>
  )
}

export default TaiwanButton
