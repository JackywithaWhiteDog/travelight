import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button } from '@mui/material'
import { SelectableAttraction } from '../types'
import AttractionCard from './attractionCard'
import { selectAttraction } from '../store/reducers/attractions'
import { StoreState } from '../store'

const AttractionPin = (props: { attraction: SelectableAttraction, index: number }): React.ReactElement => {
  const [cardDisplay, setCardDisplay] = useState<boolean>(false)
  const scheduleIndex = useSelector((state: StoreState) => state.attractions.scheduleIndex[props.index])
  const dispatch = useDispatch()

  return (
    <div
      onMouseEnter={() => setCardDisplay(true)}
      onMouseLeave={() => setCardDisplay(false)}
    >
      <Button
        variant={props.attraction.isSelected ? 'contained' : 'outlined'}
        onClick={() => !props.attraction.isSelected && dispatch(selectAttraction(props.index))}
        sx={
          props.attraction.isSelected ? {} : { color: 'primary.dark', borderColor: 'primary.dark' }
        }
      >
        {props.attraction.name}
      </Button>
      <AttractionCard attraction={props.attraction} visibility={cardDisplay} index={scheduleIndex} />
    </div >
  )
}

export default AttractionPin
