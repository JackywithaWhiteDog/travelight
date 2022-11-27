import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import DraggableList from 'react-draggable-list'

import AttractionCard from './attractionCard'
import { optimizeSchedule } from '../api/schedule'
import { StoreState } from '../store'
import { reorderSchedule } from '../store/reducers/attractions'
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

class Template extends React.Component<TemplateProps, {}> {
  render (): React.ReactElement {
    return (
      <div {...this.props.dragHandleProps}>
        <AttractionCard attraction={this.props.item.attraction} />
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
  const reorderByDragging = useSelector((state: StoreState) => state.attractions.reorderByDragging)
  const canceledIndex = useSelector((state: StoreState) => state.attractions.canceledIndex, shallowEqual)
  const schedule = useSelector((state: StoreState) => (state.attractions.schedule.map(index => state.attractions.recommendation[index])), shallowEqual)
  const [listItems, setListItems] = useState<ItemInterface[]>(schedule.map((attraction, index) => ({ index, attraction })))
  const dispatch = useDispatch()

  useEffect(() => {
    if (!reorderByDragging) {
      if (canceledIndex === null) {
        setListItems(schedule.map((attraction, index) => ({ index, attraction })))
      } else {
        listItems.splice(canceledIndex, 1)
        setListItems([...listItems])
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
      <Toolbar
        sx={{
          backgroundColor: 'primary.main',
          justifyContent: 'space-between'
        }}
      >
        <Typography>規劃行程</Typography>
        <Button variant="contained" onClick={() => { void optimizeSchedule(schedule, 0, false, dispatch) }} >Optimize</Button>
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
