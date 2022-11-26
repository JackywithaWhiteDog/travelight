import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Toolbar, Typography } from '@mui/material'
import { StoreState } from '../store'
import AttractionCard from './attractionCard'
import { optimizeSchedule } from '../api/schedule'
import cx from 'classnames'
import DraggableList from 'react-draggable-list'
import { SelectableAttraction } from '../types'
import { AnyAction, Dispatch } from '@reduxjs/toolkit'

let schedule: SelectableAttraction[]
let AttraList: any[]
let dispatch: Dispatch<AnyAction>

interface PlanetProps {
  item: any
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
        <h2>{ item }</h2>
      </div>
    )
  }
}

interface ExampleState {
  list: readonly any[]
};
class Example extends React.Component<{}, ExampleState> {
  state = {
    list: []
  }

  _onListChange: any = (newList: readonly any[]) => {
    this.setState({ list: newList })
  }

  render (): any {
    return (
      <div
        className="list"
      >
        {/* {AttraList} */}
        <Button onClick={ () => {
          this.setState({ list: AttraList })
        }}>
          {'update'}
        </Button>
        {/* <Button onClick={ () => {
          console.log(this.state.list[0])
          console.log(this.state.list[1])
          console.log(this.state.list[2])
          console.log(this.state.list[3])
        }}>
          {'show order'}
        </Button> */}
        <DraggableList<any, void, PlanetItem>
          itemKey="key"
          template={PlanetItem}
          list={this.state.list}
          onMoveEnd={(newList) => {
            this._onListChange(newList)
          }}
        />
      </div>
    )
  }
}

const Schedule = (): React.ReactElement => {
  schedule = useSelector((state: StoreState) => state.attractions.schedule.map(index => state.attractions.recommendation[index]))
  AttraList = schedule.map((attraction, i) => <AttractionCard attraction={attraction} index={i} key={i} />)
  dispatch = useDispatch()

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
          margin: '10px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <Example/>
      </Box>
    </Box>
  )
}

export default Schedule
