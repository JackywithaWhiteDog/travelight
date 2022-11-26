import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import cx from 'classnames'
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
    const dragged = this.props.itemSelected !== 0
    return (
      <div
        className={cx('item', { dragged })}
        {...this.props.dragHandleProps}
      >
        <AttractionCard attraction={this.props.item.attraction} />
      </div>
    )
  }
}

const Schedule = (): React.ReactElement => {
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
