import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { cancelAttraction } from '../store/reducers/attractions'
import { SelectableAttraction } from '../types'

interface styleProps {
  visible: boolean
}

const BaseDiv = styled.div<styleProps>`
  border: solid black 1px;
  display: ${props => props.visible ? 'flex' : 'none'};
  align-items: flex-start;
  justify-content: space-between;
`

const AttractionCard = (props: { attraction: SelectableAttraction, visibility: boolean, index: number }): React.ReactElement => {
  const dispatch = useDispatch()

  return (
    <BaseDiv visible={props.visibility} >
      <div>
        <p>{props.attraction.name}</p>
        <p>({props.attraction.location.latitude}, {props.attraction.location.longitude})</p>
        <p>rating: {props.attraction.rating}</p>
      </div>
      {props.attraction.isSelected && <button onClick={() => dispatch(cancelAttraction(props.index))} >取消</button>}
    </BaseDiv>
  )
}

AttractionCard.defaultProps = {
  visibility: true
}

export default AttractionCard
