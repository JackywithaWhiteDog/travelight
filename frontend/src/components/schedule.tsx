import React, { useEffect, useState } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import { StoreDispatch, StoreState } from '../store'
import AttractionCard from './attractionCard'
import { optimizeSchedule } from '../api/schedule'
import cx from 'classnames'
import DraggableList from 'react-draggable-list'
import { reorderSchedule } from '../store/reducers/attractions'
import { SelectableAttraction } from '../types'

interface ItemType {
  index: number
  attraction: SelectableAttraction
}

interface PlanetProps {
  item: ItemType
  itemSelected: number
  dragHandleProps: object
}

interface PlanetState {
  value: number
}

class PlanetItem extends React.Component<PlanetProps, PlanetState> {
  render (): any {
    const { item, itemSelected, dragHandleProps } = this.props
    const dragged = itemSelected !== 0
    return (
      <div
        className={cx('item', { dragged })}
        {...dragHandleProps}
      >
        <AttractionCard attraction={item.attraction} />
      </div>
    )
  }
}

interface ExampleProps {
  listItems: ItemType[]
  setListItems: React.Dispatch<ItemType[]>
  dispatch: StoreDispatch
}

class Example extends React.Component<ExampleProps, {}> {
  render (): React.ReactElement {
    return (
      <DraggableList<any, void, PlanetItem>
        itemKey="index"
        template={PlanetItem}
        list={this.props.listItems}
        onMoveEnd={(newList, movedItem, oldIndex, newIndex) => {
          let indices = Array.from(Array(this.props.listItems.length).keys())
          if (newIndex > oldIndex) {
            const left = indices.slice(0, oldIndex)
            const mid = indices.slice(oldIndex + 1, newIndex + 1)
            const right = indices.slice(newIndex + 1)
            indices = [
              ...left,
              ...mid,
              oldIndex,
              ...right
            ]
          } else {
            const left = indices.slice(0, newIndex)
            const mid = indices.slice(newIndex, oldIndex)
            const right = indices.slice(oldIndex + 1)
            indices = [
              ...left,
              oldIndex,
              ...mid,
              ...right
            ]
          }
          this.props.setListItems(newList.map(item => item as ItemType))
          this.props.dispatch(reorderSchedule({ indices, reorderByDragging: true }))
        }}
      />
    )
  }
}

const Schedule = (): React.ReactElement => {
  const reorderByDragging = useSelector((state: StoreState) => state.attractions.reorderByDragging)
  const canceledIndex = useSelector((state: StoreState) => state.attractions.canceledIndex, shallowEqual)
  const schedule = useSelector((state: StoreState) => (state.attractions.schedule.map(index => state.attractions.recommendation[index])), shallowEqual)
  const [listItems, setListItems] = useState<ItemType[]>(schedule.map((attraction, index) => ({ index, attraction })))
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
        <Example listItems={listItems} setListItems={setListItems} dispatch={dispatch} />
      </Box>
    </Box>
  )
}

export default Schedule
