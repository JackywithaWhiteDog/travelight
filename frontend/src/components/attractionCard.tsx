import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardActions, CardMedia, Rating, Typography, Box, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditAttributesIcon from '@mui/icons-material/EditAttributes'
import { cancelAttraction, setStayTime } from '../store/reducers/attractions'
import { SelectableAttraction } from '../types'
import { COLORS } from '../constants'
import { StoreState } from '../store'

interface AttractionCardProps {
  attraction: SelectableAttraction
  visibility: boolean
  index: number
  setDraggable?: (draggable: boolean) => void
}

const AttractionCard = ({ attraction, visibility, index, setDraggable }: AttractionCardProps): React.ReactElement => {
  const dispatch = useDispatch()

  const addLeadingZeros = (num: number, totalLength: number): string => String(num).padStart(totalLength, '0')
  const round = (num: number, fractionDigits: number): number => Number(num.toFixed(fractionDigits))
  const departureDay = useSelector((state: StoreState) => state.attractions.setting.departureDay)
  const openingTimeHour = Math.floor(attraction.constraint.openingTimes[departureDay])
  const openingTimeMin = round((attraction.constraint.openingTimes[departureDay] - openingTimeHour) * 60, 0)
  const closingTimeHour = Math.floor(attraction.constraint.closingTimes[departureDay])
  const closingTimeMin = round((attraction.constraint.closingTimes[departureDay] - closingTimeHour) * 60, 0)
  const [staytime, setstaytime] = React.useState(attraction.constraint.stayTime)
  const handleChangeStaytime: any = (event: any) => {
    setstaytime(event.target.value)
  }

  return (
    <Box sx={{ display: visibility ? 'relative' : 'none', position: 'relative', maxWidth: 360 }}>
      {
        attraction.isSelected &&
        <CardActions onClick={() => dispatch(cancelAttraction(attraction.placeId))}
          sx={{ top: 0, right: 0, zIndex: 1, position: 'absolute' }}>
          <IconButton aria-label="delete" sx={{ backgroundColor: COLORS.deleteButtonBackground, opacity: 0.3, borderRadius: '12px', ':hover': { backgroundColor: COLORS.deleteButtonBackground, opacity: 0.8 } }}>
            <DeleteIcon sx={{ opacity: 0.8 }} />
          </IconButton>
        </CardActions>
      }
      {
        index !== -1 &&
        <CardActions onClick={() => {
          dispatch(setStayTime([attraction.placeId, staytime.toString()]))
        }
        }
          sx={{ bottom: '0%', right: '50%', zIndex: 1, position: 'absolute' }}>
          <IconButton aria-label="edit" sx={{ borderRadius: '12px' }}>
            <EditAttributesIcon color={'action'} sx={{ opacity: 1 }} />
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
              {attraction.name}
            </Typography>
            <Box sx={{ display: 'inline-flex' }}>
              <Typography variant="body2" color="text.secondary" component="div" sx={{ paddingLeft: 0.25, paddingRight: 0.2, fontSize: '0.8rem' }}>
                {round(attraction.rating, 1)}
              </Typography>
              <Rating value={attraction.rating} readOnly precision={0.1} size="small" />
            </Box>
            <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
              {attraction.address}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
              {openingTimeHour}:{addLeadingZeros(openingTimeMin, 2)} - {closingTimeHour}:{addLeadingZeros(closingTimeMin, 2)}
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
              停留時間：{
                index !== -1
                  ? <TextField
                    id="staytime"
                    type="number"
                    defaultValue={attraction.constraint.stayTime}
                    onChange={handleChangeStaytime}
                    sx={{ fontSize: '0.8rem' }}
                    {...(setDraggable !== undefined ? { onMouseEnter: () => setDraggable(false), onMouseLeave: () => setDraggable(true) } : {})}
                  />
                  : attraction.constraint.stayTime
              } 小時
            </Typography>

          </CardContent>
        </Box>
        <CardMedia
          component="img"
          sx={{ maxWidth: '50% !important' }}
          image={attraction.pictureURL}
        />
      </Card>
    </Box>
  )
}

AttractionCard.defaultProps = {
  visibility: true
}

export default AttractionCard
