import React from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Card, CardContent, CardActions, CardMedia, Rating, Typography, Box, IconButton, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
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
  // const MAX_TIME = 24
  const addLeadingZeros = (num: number, totalLength: number): string => String(num).padStart(totalLength, '0')
  const round = (num: number, fractionDigits: number): number => Number(num.toFixed(fractionDigits))
  const departureDay = useSelector((state: StoreState) => state.attractions.setting.departureDay)
  const truncate = (str: string, n: number): string => { return (str.length > n) ? str.slice(0, n - 1) + '...' : str }
  const openingTimeHour = Math.floor(attraction.constraint.openingTimes[departureDay])
  const openingTimeMin = round((attraction.constraint.openingTimes[departureDay] - openingTimeHour) * 60, 0)
  const closingTimeHour = Math.floor(attraction.constraint.closingTimes[departureDay])
  const closingTimeMin = round((attraction.constraint.closingTimes[departureDay] - closingTimeHour) * 60, 0)
  const [changed, setChanged] = React.useState<boolean>(false)
  const attractionIndex = useSelector((state: StoreState) => state.attractions.attractionId.indexOf(attraction.placeId), shallowEqual)
  const attractionStaytime = useSelector((state: StoreState) => state.attractions.attractions[attractionIndex].constraint.stayTime, shallowEqual)
  const [staytime, setstaytime] = React.useState(attractionStaytime)
  const handleChangeStaytime: any = (event: any) => {
    while (event.target.value >= 24) { event.target.value -= 24 }
    setstaytime(event.target.value)
    console.log('change', staytime, attractionStaytime)
  }
  return (
    <Box sx={{ display: visibility ? 'relative' : 'none', position: 'relative', maxWidth: 360 } }>
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
        index !== -1 && !changed &&
        <CardActions onClick={() => {
          setstaytime(attractionStaytime)
          setChanged(true)
          console.log('edit', staytime, attractionStaytime)
        }
        }
          sx={{ bottom: 0, left: '7.5rem', zIndex: 1, position: 'absolute' }}>
          <IconButton aria-label="delete" size="small" sx={{ backgroundColor: 'primary', opacity: 0.3, borderRadius: '12px', ':hover': { backgroundColor: COLORS.deleteButtonBackground, opacity: 0.8 } }}>
            <EditIcon sx={{ opacity: 0.8 }} />
          </IconButton>
        </CardActions>
      }
      {
        changed &&
        <CardActions onClick={() => {
          dispatch(setStayTime([attractionIndex, staytime]))
          console.log(staytime, attractionStaytime)
          setChanged(false)
        }
        }
          sx={{ bottom: '0.8rem', left: '6rem', zIndex: 1, position: 'absolute' }}>
          <IconButton aria-label="edit" sx={{ borderRadius: '12px' }}>
            <EditAttributesIcon color={'action'} sx={{ opacity: 1 }} />
          </IconButton>
        </CardActions>
      }
      <Card sx={{
        display: 'flex',
        justifyContent: 'space-between',
        borderRadius: '16px'
      } }>
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
              評論：{attraction.comments} 則
            </Typography>
            <Typography variant="body2" color="text.secondary" component="div" sx={{ fontSize: '0.8rem' }}>
              {truncate(attraction.address, 22)}
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
              停留時間：{
                changed
                  ? <Box> <br/> <TextField
                    id="staytime"
                    type="number"
                    variant="standard"
                    defaultValue={attractionStaytime}
                    onChange={handleChangeStaytime}
                    sx={{ fontSize: '0.5rem', width: { sm: '50%' } }}
                    {...(setDraggable !== undefined ? { onMouseEnter: () => setDraggable(false), onMouseLeave: () => setDraggable(true) } : {})}
                  /> <br/> </Box>
                  : attractionStaytime
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
