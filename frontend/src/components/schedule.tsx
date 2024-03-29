import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Alert, Box, Button, IconButton, Slide, Snackbar, Toolbar, Typography } from '@mui/material'
import { Close, TimeToLeave, TwoWheeler, DirectionsBus, DirectionsWalk } from '@mui/icons-material'
import DraggableList from 'react-draggable-list'

import AttractionCard from './attractionCard'
import { optimizeSchedule } from '../api/schedule'
import { StoreState } from '../store'
import { closeScheduleInvalidAlert, reorderSchedule } from '../store/reducers/attractions'
import { SelectableAttraction } from '../types'

interface ItemInterface {
  index: number
  attraction: SelectableAttraction
}

interface TemplateProps {
  item: ItemInterface
  itemSelected: number
  dragHandleProps: object
}

class Template extends React.Component<TemplateProps, { draggable: boolean }> {
  constructor (props: TemplateProps) {
    super(props)
    this.state = { draggable: true }
  }

  ArrivalTime = (): React.ReactElement => {
    const index = useSelector((state: StoreState) => state.attractions.scheduleIndex[state.attractions.attractionId.indexOf(this.props.item.attraction.placeId)])
    const round = (num: number, fractionDigits: number): number => Number(num.toFixed(fractionDigits))
    const arrivalTime = useSelector((state: StoreState) => state.attractions.order.arriveTimes[index])
    const addLeadingZeros = (num: number, totalLength: number): string => String(num).padStart(totalLength, '0')
    const arrivalHour = Math.floor(arrivalTime)
    const arrivalMin = round((arrivalTime - arrivalHour) * 60, 0)

    return (
      <Box sx={{ display: 'flex', paddingBottom: '2px' }}>
        <Box sx={{ backgroundColor: '#8ec3b0', borderRadius: '4px', height: '22px', width: '32px', textAlign: 'center', fontSize: '0.9rem' }} >
          {index + 1}
        </Box>
        <Typography sx={{ paddingLeft: '8px', fontSize: '0.9rem', fontWeight: 'bold', display: arrivalTime === undefined ? 'none' : 'flex' }} >抵達時間  - {arrivalHour}:{addLeadingZeros(arrivalMin, 2)}</Typography>
      </Box>
    )
  }

  TransportationTime = (): React.ReactElement => {
    const index = useSelector((state: StoreState) => state.attractions.scheduleIndex[state.attractions.attractionId.indexOf(this.props.item.attraction.placeId)])
    const transportationTime = useSelector((state: StoreState) => state.attractions.order.transportationTimes[index])
    const idleTime = useSelector((state: StoreState) => state.attractions.order.idleTimes[index])
    const transportationMethod = useSelector((state: StoreState) => state.attractions.setting.transportation)

    // const addLeadingZeros = (num: number, totalLength: number): string => String(num).padStart(totalLength, '0')
    const round = (num: number, fractionDigits: number): number => Number(num.toFixed(fractionDigits))
    const transportationMin = round(transportationTime * 60, 0)
    const idleMin = round(idleTime * 60, 0)

    return (
      <Box sx={{ display: transportationTime === undefined ? 'none' : 'flex', marginTop: '8px' }}>
        <Box sx={{ borderLeft: '2px dashed rgba(0, 0, 0, 0.5)', marginLeft: '15px', marginRight: '10px' }} />
        <Box sx={{ display: transportationMethod === 'driving' ? 'flex' : 'none', paddingTop: '5px', paddingBottom: '5px' }}>
          <TimeToLeave fontSize="medium" color="action" />
        </Box>
        <Box sx={{ display: transportationMethod === 'bicycling' ? 'flex' : 'none', paddingTop: '5px', paddingBottom: '5px' }}>
          <TwoWheeler fontSize="medium" color="action" />
        </Box>
        <Box sx={{ display: transportationMethod === 'transit' ? 'flex' : 'none', paddingTop: '5px', paddingBottom: '5px' }}>
          <DirectionsBus fontSize="medium" color="action" />
        </Box>
        <Box sx={{ display: transportationMethod === 'walking' ? 'flex' : 'none', paddingTop: '5px', paddingBottom: '5px' }}>
          <DirectionsWalk fontSize="medium" color="action" />
        </Box>
        <Typography sx={{ fontSize: '0.9rem', color: '#6B6B6B', fontWeight: 'bold', paddingLeft: '8px', paddingTop: '7px' }} >{transportationMin} 分鐘</Typography>
        <Typography sx={{ display: idleMin > 0 ? 'flex' : 'none', fontSize: '0.6rem', color: '#6B6B6B', paddingLeft: '15px', paddingTop: '9px' }} >
          (空閒時間 {idleMin}分鐘)
        </Typography>
      </Box>
    )
  }

  render (): React.ReactElement {
    return (
      <div {...(this.state.draggable ? this.props.dragHandleProps : {})}>
        <this.ArrivalTime />
        <AttractionCard attraction={this.props.item.attraction} index={this.props.item.index} setDraggable={(draggable) => this.setState({ draggable })} />
        <this.TransportationTime />
      </div>
    )
  }
}

const Schedule = (): React.ReactElement => {
  /*
    CRITICAL ISSUES:

    1. Using react-draggable-list with redux
      When using both react-draggable-list and redux, there are bugs in the animations since
      the dispatch would update slightly slower. As a result, we have to use the proxy lists
      `listItems` to avoid the problems.

    2. The consistency of items' keys
      If the draggable list is reconstructed with different items' keys after an item is dragged
      and dropped, there would be some unxepected animations. As a result, except for selecting
      attractions or optimizing schedule (without drag-and-drop), we have to keep the consistency
      of items' keys.

      - Drag-and-drop:
        1. Update the state of proxy list
        2. Dispatch changes without changing proxy list again
      - Adding attractions / Optimizing schedule
        1. Dispatch changes and reconstruct proxy list
      - Cancel attractions
        1. Dispatch changes
        2. Only removing the canceled attraction and keep all the others
  */
  const { transportation, departureDay } = useSelector((state: StoreState) => ({
    transportation: state.attractions.setting.transportation,
    departureDay: state.attractions.setting.departureDay
  }))
  const schedule = useSelector((state: StoreState) => (state.attractions.schedule.map(index => state.attractions.attractions[index])), shallowEqual)
  const reorderByDragging = useSelector((state: StoreState) => state.attractions.reorderByDragging)
  const canceledIndex = useSelector((state: StoreState) => state.attractions.canceledIndex, shallowEqual)
  const scheduleInvalidAlert = useSelector((state: StoreState) => state.attractions.scheduleInvalidAlert)
  const savedTime = useSelector((state: StoreState) => state.attractions.order.savedTime)
  const [showSavedTime, setShowSavedTime] = useState<boolean>(false)
  const [listItems, setListItems] = useState<ItemInterface[]>(schedule.map((attraction, index) => ({ attraction, index })))
  const dispatch = useDispatch()

  const savedHour = Math.floor(savedTime)
  const savedMin = Math.round((savedTime - savedHour) * 60)

  useEffect(() => {
    if (!reorderByDragging) {
      if (canceledIndex === null) {
        setListItems(schedule.map((attraction, index) => {
          return {
            attraction,
            index
          }
        }))
      } else {
        listItems.splice(canceledIndex, 1)
        setListItems([...listItems])
      }

      if (savedHour > 0 || savedMin > 0) {
        setShowSavedTime(true)
      }
    }
  }, [schedule])

  return (
    <Box
      sx={{
        backgroundColor: 'primary.light',
        height: 'calc(100vh - 64px)',
        overflow: 'auto'
      }}
    >
      <Snackbar
        open={showSavedTime}
        autoHideDuration={1500}
        onClose={() => showSavedTime && setShowSavedTime(false)}
        TransitionComponent={Slide}
      >
        <Alert
          severity="success"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setShowSavedTime(false)}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          此規劃將為您節省{savedHour > 0 && ` ${savedHour} 小時`}{savedMin > 0 && ` ${savedMin} 分鐘`}！
        </Alert>
      </Snackbar>
      <Snackbar
        open={scheduleInvalidAlert}
        autoHideDuration={1500}
        onClose={() => {
          if (scheduleInvalidAlert) {
            dispatch(closeScheduleInvalidAlert())
          }
        }}
        TransitionComponent={Slide}
      >
        <Alert
          severity="error"
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => dispatch(closeScheduleInvalidAlert())}
            >
              <Close fontSize="inherit" />
            </IconButton>
          }
        >
          行程無法滿足您的需求，請減少景點或停留時間！
        </Alert>
      </Snackbar>
      <Toolbar
        variant='dense'
        sx={{
          backgroundColor: 'primary.main',
          justifyContent: 'space-between'
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>您的行程</Typography>
        <Box>
          <Button
            size='small'
            variant="contained"
            onClick={() => { void optimizeSchedule(schedule, transportation, departureDay, true, dispatch) }}
            sx={{ margin: '5px' }}
            color='primary'
            disabled={schedule.length <= 1}
          >檢查</Button>
          <Button
            size='small'
            variant="contained"
            onClick={() => { void optimizeSchedule(schedule, transportation, departureDay, false, dispatch) }}
            sx={{ margin: '5px' }}
            disabled={schedule.length <= 1}
          >規劃</Button>
        </Box>
      </Toolbar>
      <Box
        sx={{
          margin: '10px'
        }}
      >
        <DraggableList<any, void, Template>
          itemKey="index"
          template={Template}
          list={listItems}
          onMoveEnd={(newList, movedItem, oldIndex, newIndex) => {
            const indices = Array.from(Array(listItems.length).keys())
            const left = indices.slice(0, Math.min(oldIndex, newIndex))
            const right = indices.slice(Math.max(oldIndex, newIndex) + 1)
            const mid = newIndex > oldIndex ? [...indices.slice(oldIndex + 1, newIndex + 1), oldIndex] : [oldIndex, ...indices.slice(newIndex, oldIndex)]
            const newIndices = [...left, ...mid, ...right]
            setListItems(newList.map(item => item as ItemInterface))
            dispatch(reorderSchedule({ indices: newIndices, reorderByDragging: true }))
          }}
        />
      </Box>
    </Box>
  )
}

export default Schedule
