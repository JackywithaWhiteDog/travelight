import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SelectableAttraction } from '../types'
import AttractionCard from './attractionCard'
import { selectAttraction } from '../store/reducers/attractions'
import styled from 'styled-components'
import { StoreState } from '../store'

interface StyleProps {
  selected: boolean
}

const BaseButton = styled.button<StyleProps>`
  ${props => props.selected ? 'background-color: lightgreen;' : ''}
`

const AttractionPin = (props: { attraction: SelectableAttraction, index: number }): React.ReactElement => {
  const [cardDisplay, setCardDisplay] = useState<boolean>(false)
  const scheduleIndex = useSelector((state: StoreState) => state.attractions.scheduleIndex[props.index])
  const dispatch = useDispatch()

  return (
    <div
      onMouseEnter={() => setCardDisplay(true)}
      onMouseLeave={() => setCardDisplay(false)}
    >
      <BaseButton
        selected={props.attraction.isSelected}
        onClick={() => !props.attraction.isSelected && dispatch(selectAttraction(props.index))}
      >
        {props.attraction.name}
      </BaseButton>
      <AttractionCard attraction={props.attraction} visibility={cardDisplay} index={scheduleIndex} />
    </div>
  )
}

export default AttractionPin
