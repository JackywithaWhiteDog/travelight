import React, { useState } from 'react'
import { SelectableAttraction } from '../types'
import AttractionCard from './attractionCard'

const AttractionPin = (props: { attraction: SelectableAttraction }): React.ReactElement => {
  const [cardVisibility, setVisibility] = useState(false)

  return (
    <div>
      <button
        disabled={props.attraction.isSelected}
        onMouseEnter={() => setVisibility(true)}
        onMouseLeave={() => setVisibility(false)}
      >
        {props.attraction.name}
      </button>
      <AttractionCard visible={cardVisibility} attraction={props.attraction} />
    </div>
  )
}

export default AttractionPin
