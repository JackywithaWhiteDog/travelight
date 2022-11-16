import React from 'react'
import styled from 'styled-components'
import { Attraction } from '../types'

interface styleProps {
  visible: boolean
}

const BaseDiv = styled.div<styleProps>`
  border: solid black 1px;
  visibility: ${props => props.visible ? 'visible' : 'hidden'};
`

const AttractionCard = (props: { attraction: Attraction, visible: boolean }): React.ReactElement => {
  return (
    <BaseDiv visible={props.visible} >
      <p>{props.attraction.name}</p>
      <p>({props.attraction.location.latitude}, {props.attraction.location.longitude})</p>
      <p>rating: {props.attraction.rating}</p>
    </BaseDiv>
  )
}

export default AttractionCard
