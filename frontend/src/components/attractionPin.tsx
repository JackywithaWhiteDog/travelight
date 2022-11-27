import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '@mui/material'
import { SelectableAttraction } from '../types'
import AttractionCard from './attractionCard'
import { selectAttraction } from '../store/reducers/attractions'

const AttractionPin = (props: { attraction: SelectableAttraction, index: number }): React.ReactElement => {
  const [cardDisplay, setCardDisplay] = useState<boolean>(false)
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
      <AttractionCard attraction={props.attraction} visibility={cardDisplay} />
    </div >
  )
}

export default AttractionPin
