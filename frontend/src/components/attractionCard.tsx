import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardActions, CardMedia, Rating, Typography, Box, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { cancelAttraction } from '../store/reducers/attractions'
import { SelectableAttraction } from '../types'
import { COLORS } from '../constants'
import { StoreState } from '../store'

const AttractionCard = (props: { attraction: SelectableAttraction, visibility: boolean }): React.ReactElement => {
  const dispatch = useDispatch()
  const addLeadingZeros = (num: number, totalLength: number): string => String(num).padStart(totalLength, '0')
  const round = (num: number, fractionDigits: number): number => Number(num.toFixed(fractionDigits))
  const departureDay = useSelector((state: StoreState) => state.attractions.setting.departureDay)

  const openingTimeHour = Math.floor(props.attraction.constraint.openingTimes[departureDay])
  const openingTimeMin = round((props.attraction.constraint.openingTimes[departureDay] - openingTimeHour) * 60, 0)
  const closingTimeHour = Math.floor(props.attraction.constraint.closingTimes[departureDay])
  const closingTimeMin = round((props.attraction.constraint.closingTimes[departureDay] - closingTimeHour) * 60, 0)

  return (
    <Box sx={{ display: props.visibility ? 'relative' : 'none', position: 'relative', maxWidth: 360 }}>
      {
        props.attraction.isSelected &&
        <CardActions onClick={() => dispatch(cancelAttraction(props.attraction.placeId))}
          sx={{ top: 0, right: 0, zIndex: 1, position: 'absolute' }}>
          <IconButton aria-label="delete" sx={{ backgroundColor: COLORS.deleteButtonBackground, opacity: 0.3, borderRadius: '12px', ':hover': { backgroundColor: COLORS.deleteButtonBackground, opacity: 0.8 } }}>
            <DeleteIcon sx={{ opacity: 0.8 }}/>
          </IconButton>
        </CardActions>
      }
      <Card sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '16px'
      }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', minWidth: '170px' }}>
          <CardContent sx={{ padding: 1, '&:last-child': { paddingBottom: 1 }, paddingLeft: 2 }}>
            <Typography component="div" variant="h6" sx={{ fontWeight: 'bold', lineHeight: 1.4, fontSize: '1rem' }}>
              {props.attraction.name}
            </Typography>
            <Box sx={{ display: 'inline-flex' }}>
              <Typography variant="body2" color="text.secondary" component="div" sx={{ paddingLeft: 0.25, paddingRight: 0.2, fontSize: '0.8rem' }}>
                {round(props.attraction.rating, 1)}
              </Typography>
              <Rating value={props.attraction.rating} readOnly precision={0.1} size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
              {props.attraction.address}
            </Typography>
            {
              openingTimeHour === -1 && closingTimeHour === -1
                ? <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem', color: 'red' }}>
              此日不營業
            </Typography>
                : <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
              {openingTimeHour}:{addLeadingZeros(openingTimeMin, 2)} - {closingTimeHour}:{addLeadingZeros(closingTimeMin, 2)}
            </Typography>
            }
            <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
              停留時間：{props.attraction.constraint.stayTime} 小時
            </Typography>
          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ maxWidth: '50% !important' }}
          image={props.attraction.pictureURL}
        />
      </Card>
    </Box>
  )
}

AttractionCard.defaultProps = {
  visibility: true
}

export default AttractionCard
